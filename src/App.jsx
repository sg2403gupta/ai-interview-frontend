import React from "react";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/dashboard/Dashboard";
import Loading from "./components/common/Loading";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-root">
        <Loading />
      </div>
    );
  }

  return <div className="app-root">{user ? <Dashboard /> : <AuthPage />}</div>;
}
