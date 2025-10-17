"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import ChatContainer from "./components/chat/ChatContainer";
import LoginForm from "./components/auth/LoginForm";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 mode-bg flex items-center justify-center z-50">
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
          <p className="mode-color text-sm">Cargando mensajes...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div>
      <ChatContainer />
    </div>
  );
}
