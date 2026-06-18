"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Users, ShieldCheck, MessageCircle } from 'lucide-react';

interface SquadChatProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export default function SquadChat({ isOpen, onClose, userName }: SquadChatProps) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Just closed the Andheri case! The dog is safe at the vet.", sender: "Arjun (Squad Leader)", time: "10:42 AM", isSelf: false },
    { id: 2, text: "Great job! I'm heading towards Bandra, got a ping for a cat rescue.", sender: "Priya", time: "10:45 AM", isSelf: false },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text: inputText,
      sender: userName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    }]);
    setInputText("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Chat Window */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh] bg-white rounded-[32px] shadow-2xl z-50 flex flex-col overflow-hidden border border-[#2C2825]/10"
          >
            {/* Header */}
            <div className="bg-[#8B2E49] p-6 text-white flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <Users size={18} className="text-white/80" />
                        <h3 className="font-medium text-lg" style={{ fontFamily: 'var(--font-serif)' }}>Mumbai Squad Alpha</h3>
                    </div>
                    <span className="text-xs font-medium text-white/70 bg-black/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-max">
                        <ShieldCheck size={12} /> 4 Verified Responders
                    </span>
                </div>
                <button onClick={onClose} className="relative z-10 text-white/70 hover:text-white transition-colors bg-black/20 p-2 rounded-full">
                    <X size={18} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 bg-[#FDFBF7] p-6 overflow-y-auto flex flex-col gap-4">
                <div className="text-center mb-4">
                    <span className="text-[10px] font-bold text-[#5C5753] uppercase tracking-widest bg-[#EFECE5] px-3 py-1 rounded-full">Today</span>
                </div>
                
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'} max-w-[85%] ${msg.isSelf ? 'ml-auto' : 'mr-auto'}`}>
                        {!msg.isSelf && <span className="text-[10px] text-[#5C5753] font-bold mb-1 ml-1">{msg.sender}</span>}
                        <div className={`p-3.5 rounded-2xl ${msg.isSelf ? 'bg-[#8B2E49] text-white rounded-br-sm' : 'bg-white text-[#2C2825] border border-[#2C2825]/10 rounded-bl-sm shadow-sm'}`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                        <span className={`text-[9px] text-[#5C5753]/60 mt-1 ${msg.isSelf ? 'mr-1' : 'ml-1'}`}>{msg.time}</span>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-[#2C2825]/5">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MessageCircle size={18} className="text-[#2C2825]/30" />
                    </div>
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Coordinate with your squad..."
                        className="w-full pl-11 pr-12 py-3.5 bg-[#FDFBF7] border border-[#2C2825]/10 rounded-full focus:ring-2 focus:ring-[#8B2E49]/20 focus:border-[#8B2E49] outline-none transition-all text-[#2C2825] text-sm"
                    />
                    <button 
                        type="submit"
                        disabled={!inputText.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#8B2E49] text-white rounded-full flex items-center justify-center hover:bg-[#7A2840] disabled:opacity-50 disabled:hover:bg-[#8B2E49] transition-colors"
                    >
                        <Send size={16} className="ml-1" />
                    </button>
                </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
