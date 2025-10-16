"use client";
import { useState, useEffect } from "react";
import { db } from "./lib/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";

type Message = {
  user: string;
  text: string;
  createdAt?: any;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // 👇 Convertimos explícitamente cada doc a tipo Message
      const data: Message[] = snapshot.docs.map((doc) => doc.data() as Message);
      setMessages(data);
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;
    await addDoc(collection(db, "messages"), {
      user: name,
      text: text,
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div className="flex flex-col h-screen bg-indigo-100">
      <header className="p-4 text-center bg-indigo-700 border-indigo-950 border-4 rounded-2xl text-white">
        Messager App
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 p-2 bg-indigo-600">
            <b>{msg.user || "Anon"}:</b> {msg.text}
          </div>
        ))}
      </main>

      <form
        onSubmit={sendMessage}
        className="fixed bottom-0 left-0 right-0 bg-indigo-700 p-4 grid grid-cols-3 gap-2"
      >
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-indigo-950 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-2 border-indigo-950 p-2 rounded"
        />
        <button type="submit" className="bg-indigo-950 text-white rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}