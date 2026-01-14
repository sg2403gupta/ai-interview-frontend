const API_URL = "https://ai-interview-backend-kf8r.onrender.com";

class ApiService {
  constructor() {
    this.baseURL = API_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Auth endpoints
  async register(name, email, password) {
    const response = await fetch(`${this.baseURL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  }

  async login(email, password) {
    const response = await fetch(`${this.baseURL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  // Practice session endpoints
  async startSession(topic, mode) {
    const response = await fetch(`${this.baseURL}/api/practice/start-session`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ topic, mode }),
    });
    return response.json();
  }

  async generateQuestion(sessionId, topic, previousQuestions) {
    const response = await fetch(
      `${this.baseURL}/api/practice/generate-question`,
      {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ sessionId, topic, previousQuestions }),
      }
    );
    return response.json();
  }

  async answerQuestion(sessionId, question, topic) {
    const response = await fetch(
      `${this.baseURL}/api/practice/answer-question`,
      {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ sessionId, question, topic }),
      }
    );
    return response.json();
  }

  async evaluateAnswer(sessionId, question, answer) {
    const response = await fetch(
      `${this.baseURL}/api/practice/evaluate-answer`,
      {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ sessionId, question, answer }),
      }
    );
    return response.json();
  }

  async modifyAnswer(sessionId, messageId, instruction) {
    const response = await fetch(`${this.baseURL}/api/practice/modify-answer`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ sessionId, messageId, instruction }),
    });
    return response.json();
  }

  async getHistory() {
    const response = await fetch(`${this.baseURL}/api/practice/history`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async deleteSession(sessionId) {
    const response = await fetch(
      `${this.baseURL}/api/practice/session/${sessionId}`,
      {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      }
    );
    return response.json();
  }
}

export default new ApiService();
