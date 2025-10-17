"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import ChatContainer from "./components/chat/ChatContainer";
import LoginForm from "./components/auth/LoginForm";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div >     
      <ChatContainer />
    </div>
  );
}