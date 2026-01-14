import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Send, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import TopicInput from "./TopicInput";
import MessageBubble from "./MessageBubble";

export default function PracticeSession({ mode, onBack }) {
  const { token } = useAuth();
  const [sessionId, setSessionId] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [showTopicInput, setShowTopicInput] = useState(true);
  const [modifyingMessage, setModifyingMessage] = useState(null);
  const [modifyInstruction, setModifyInstruction] = useState("");

  const bottomRef = useRef(null);

  /* Auto-scroll to newest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  const startPractice = async () => {
    if (!topic.trim()) return;

    try {
      const data = await api.startSession(topic, mode);
      setSessionId(data.sessionId);
      setShowTopicInput(false);

      if (mode === "ai-answers") {
        setConversation([
          {
            type: "system",
            content: `Great! I'm ready to answer your interview questions about ${topic}. Ask me anything!`,
            timestamp: new Date(),
          },
        ]);
      } else {
        generateQuestion(data.sessionId);
      }
    } catch (err) {
      console.error("Failed to start session:", err);
    }
  };

  const generateQuestion = async (sid) => {
    setLoading(true);
    try {
      const data = await api.generateQuestion(
        sid || sessionId,
        topic,
        conversation
          .filter((c) => c.type === "ai-question")
          .map((c) => c.content)
      );

      const newMessage = {
        type: "ai-question",
        content: data.question,
        timestamp: new Date(),
      };
      setConversation((prev) => [...prev, newMessage]);
    } catch (err) {
      console.error("Failed to generate question:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      type: mode === "ai-answers" ? "user-question" : "user-answer",
      content: inputText,
      timestamp: new Date(),
    };

    setConversation((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      if (mode === "ai-answers") {
        const data = await api.answerQuestion(sessionId, inputText, topic);
        setConversation((prev) => [
          ...prev,
          {
            type: "ai-answer",
            content: data.answer,
            messageId: data.messageId,
            timestamp: new Date(),
          },
        ]);
      } else {
        const lastQuestion = conversation
          .filter((c) => c.type === "ai-question")
          .slice(-1)[0];
        const data = await api.evaluateAnswer(
          sessionId,
          lastQuestion.content,
          inputText
        );
        setConversation((prev) => [
          ...prev,
          {
            type: "ai-feedback",
            content: data.feedback,
            score: data.score,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to process:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleModify = async (messageId) => {
    if (!modifyInstruction.trim()) return;

    setLoading(true);
    try {
      const data = await api.modifyAnswer(
        sessionId,
        messageId,
        modifyInstruction
      );

      setConversation((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId
            ? { ...msg, content: data.modifiedAnswer }
            : msg
        )
      );

      setModifyingMessage(null);
      setModifyInstruction("");
    } catch (err) {
      console.error("Failed to modify answer:", err);
    } finally {
      setLoading(false);
    }
  };

  if (showTopicInput) {
    return (
      <TopicInput
        mode={mode}
        topic={topic}
        setTopic={setTopic}
        onStart={startPractice}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[var(--bg-main)] flex flex-col">
      {/* Header */}
      <div className="bg-[var(--bg-surface)] shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span className="text-sm sm:text-base">Back</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
            <div className="px-3 py-1.5 bg-[#FFF8E8] border border-[var(--accent)] rounded-lg">
              <span className="font-semibold text-[var(--text-primary)]">
                Topic: {topic}
              </span>
            </div>
            <div className="px-3 py-1.5 bg-[#FFF8E8] border border-[var(--accent)] rounded-lg">
              <span className="font-semibold text-[var(--text-primary)]">
                {conversation.length} messages
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {conversation.map((msg, idx) => (
              <MessageBubble
                key={idx}
                message={msg}
                mode={mode}
                onModify={(messageId) => setModifyingMessage(messageId)}
                isModifying={modifyingMessage === msg.messageId}
                modifyInstruction={modifyInstruction}
                setModifyInstruction={setModifyInstruction}
                handleModify={handleModify}
                loading={loading}
              />
            ))}

            {loading && !modifyingMessage && (
              <div className="flex items-center space-x-3 text-[var(--text-primary)]/70">
                <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:150ms]"></div>
                <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:300ms]"></div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-[var(--bg-surface)] border-t border-[var(--accent)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {mode === "user-answers" &&
            conversation.length > 0 &&
            conversation[conversation.length - 1].type === "ai-feedback" && (
              <button
                onClick={() => generateQuestion()}
                disabled={loading}
                className="w-full mb-3 bg-[var(--text-primary)] text-[#FFF8E8] py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Next Question</span>
              </button>
            )}

          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
              className="flex-1 px-4 py-3 rounded-lg border border-[var(--accent)] bg-[#FFF8E8] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
              placeholder={
                mode === "ai-answers"
                  ? "Ask your interview question..."
                  : "Type your answer..."
              }
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !inputText.trim()}
              className="bg-[var(--text-primary)] text-[#FFF8E8] p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
