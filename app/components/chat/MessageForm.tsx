"use client";

import React, { useState } from "react";
import { db } from "../../lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";

interface MessageFormProps {
  text: string;
  setText: (text: string) => void;
}

export default function MessageForm({ text, setText }: MessageFormProps) {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || !user || sending) return;

    setSending(true);

    try {
      const displayName =
        user.displayName || user.email?.split("@")[0] || "Usuario";

      await addDoc(collection(db, "messages"), {
        userId: user.uid,
        userEmail: user.email,
        userName: displayName,
        text: text.trim(),
        createdAt: serverTimestamp(),
      });

      setText("");
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      }) as unknown as React.FormEvent<HTMLFormElement>;
      sendMessage(formEvent);
    }
  };

  return (
    <form onSubmit={sendMessage} className="flex gap-2 items-end">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={sending}
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mode-fg mode-color placeholder-gray-500 disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={!text.trim() || !user || sending}
        className="mode-bg text-white px-6 py-3 rounded-full hover:mode-bg-hover disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        {sending ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando
          </span>
        ) : (
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Enviar
          </span>
        )}
      </button>
    </form>
  );
}
