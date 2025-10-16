"use client";

import React,{ useEffect, useState } from "react";
import { db } from "./lib/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

type Message = {
  user: string;
  text: string;
  createdAt?: Timestamp;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Message[] = snapshot.docs.map(
        (doc) => doc.data() as Message
      );
      setMessages(data);
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;

    await addDoc(collection(db, "messages"), {
      user: name,
      text,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <h1 className="text-2xl font-bold mt-4 mode-color">Live Chat</h1>

      <div className="w-full max-w-md mt-4 mode-fg rounded-xl shadow-lg p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 h-96 border border-indigo-300 rounded-lg p-2">
          {messages.map((msg, i) => (
            <p key={i} className="mb-2 mode-color" >
            
              <strong>{msg.user}:</strong> {msg.text}
            </p>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-indigo-400 mode-color rounded-md px-2 py-1"
          />
          <input
            type="text"
            placeholder="Escribí un mensaje..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-indigo-400 mode-color rounded-md px-2 py-1"
          />
          <button
            type="submit"
            className="mode-bg text-white py-1 rounded-md mode-bg-hover transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}