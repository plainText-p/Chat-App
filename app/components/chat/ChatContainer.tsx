"use client";

import React, { useState } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import Navbar from "../ui/Navbar";
export default function ChatContainer() {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto border-4">
      {/* Header */}
      <Navbar/>      
      {/* Área de mensajes - ocupa todo el espacio disponible */}
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>
      
      {/* Formulario siempre abajo */}
      <div className="mode-fg rounded-t-2xl border-t p-4">
        <MessageForm 
          text={text} 
          setText={setText} 
        />
      </div>
    </div>
  );
}