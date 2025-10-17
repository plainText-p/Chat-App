"use client";

import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";

interface Message {
  id: string;
  text: string;
  userId: string;
  userEmail: string;
  userName: string;
  createdAt: any;
}

export default function MessageList() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"), 
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: Message[] = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({
          id: doc.id,
          ...doc.data()
        } as Message);
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-4 mode-bg">
      {messages.length === 0 ? (
        <div className="text-center mode-color mt-8">
          No hay mensajes aún. ¡Sé el primero en escribir!
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwnMessage = message.userId === user?.uid;
            
            return (
              <div
                key={message.id}
                className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}
              >
                {/* Encabezado con el nombre del usuario */}
                <div className="mb-1 px-2">
                  <div className={`text-sm font-semibold px-3 py-1 rounded-t-lg  ${
                    isOwnMessage 
                      ? 'mode-color' 
                      : 'mode-color '
                  }`}>
                    {isOwnMessage ? 'Tú' : message.userName}
                  </div>
                </div>

                {/* Burbuja del mensaje */}
                <div className={`px-4 py-3 rounded-lg max-w-xs lg:max-w-md ${
                  isOwnMessage
                    ? 'mode-fg mode-color rounded-tr-none  '
                    : 'mode-fg mode-color rounded-tl-none  '
                }`}>
                  <div className="text-sm">{message.text}</div>
                  
                  <div className={`text-xs mt-2 ${
                    isOwnMessage ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {message.createdAt?.toDate?.().toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) || 'Enviando...'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}