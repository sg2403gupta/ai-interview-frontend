import React, { useState } from "react";
import { Brain, User, Lock, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = isLogin
        ? await api.login(formData.email, formData.password)
        : await api.register(formData.name, formData.email, formData.password);

      if (data.message) {
        throw new Error(data.message);
      }

      login(data.token, data.user);
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-[var(--bg-main)]">
      <div className="w-full max-w-md">
        <div className="bg-[var(--bg-surface)] rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-[var(--accent)]">
              <Brain className="w-7 h-7 text-[var(--text-primary)]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              AI Interview Coach
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-primary)]/70">
              {isLogin ? "Welcome back!" : "Create your account"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-[#fff0e6] border border-[#e0c5a3] text-[var(--text-primary)] px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent)]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--accent)] bg-[#FFF8E8] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                    required={!isLogin}
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent)]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--accent)] bg-[#FFF8E8] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent)]" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--accent)] bg-[#FFF8E8] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                  required
                  placeholder="••••••••"
                  minLength="6"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-[#FFF8E8] bg-[var(--text-primary)] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-sm text-[var(--text-primary)] hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
