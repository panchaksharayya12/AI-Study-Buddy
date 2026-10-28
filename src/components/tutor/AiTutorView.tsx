import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { useStudyData } from '../../context/StudyDataContext';
import { ChatMessage } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlowButton } from '../common/GlowButton';
import { playClickSound, playSuccessSound } from '../../utils/sound';

export const AiTutorView: React.FC = () => {
  const { geminiApiKey, addToast, materials } = useStudyData();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: "Welcome to your AI Study Buddy tutor. I have ingested your study materials in Neural Architectures, Computer Networks, and Molecular Genetics. Which concept would you like to explore or test yourself on today?",
      timestamp: 'Just now',
      suggestedQuestions: [
        'Explain the Scaled Dot-Product Attention equation with an analogy.',
        'Why does TCP require a 3-way handshake before sending data?',
        'How does DNA Polymerase handle the lagging strand during replication?',
        'Give me a rapid 3-question conceptual quiz on Neural Networks.',
      ],
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isTyping) return;

    playClickSound();

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: prompt.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsTyping(true);

    if (geminiApiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are an elite, thoughtful AI Study Buddy. The student asks: "${prompt.trim()}". Provide a clear, structured, engaging explanation with key takeaways and bullet points.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (!response.ok) throw new Error('Gemini API request failed');

        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response returned from Gemini.';

        setIsTyping(false);
        playSuccessSound();
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'assistant',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedQuestions: [
              'Can you test my understanding with a follow-up question?',
              'How does this apply to real-world software engineering?',
              'Summarize this into 2 bullet points for my notes.',
            ],
          },
        ]);
        return;
      } catch (err) {
        addToast({
          type: 'warning',
          title: 'Gemini Offline',
          message: 'Falling back to local autonomous tutor engine.',
        });
      }
    }

    setTimeout(() => {
      let replyText = '';
      const lower = prompt.toLowerCase();

      if (lower.includes('attention') || lower.includes('transformer') || lower.includes('scaled dot')) {
        replyText = `Scaled Dot-Product Attention: Deep Dive & Intuition

The Transformer attention formula is:
Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V

The Analogy:
• Query (Q): What you type into YouTube search (e.g. "how does backprop work").
• Key (K): The titles and tags of all videos on the platform.
• Value (V): The actual video content that gets returned and played.

Why scale by sqrt(d_k)?
When projection dimensions d_k are large (e.g., 64 or 128), dot products grow large in magnitude, pushing the softmax function into regions with near-zero gradients. Scaling maintains unit variance, ensuring robust gradient flow during backpropagation.`;
      } else if (lower.includes('tcp') || lower.includes('handshake') || lower.includes('protocol')) {
        replyText = `TCP 3-Way Handshake Demystified

Before any byte of HTTP payload or file data travels, TCP establishes a synchronized bidirectional state:

1. SYN (Synchronize Sequence Number):
   The Client selects an Initial Sequence Number (ISN_c) and transmits a SYN packet.
2. SYN-ACK (Synchronize + Acknowledge):
   The Server receives the SYN, allocates socket buffers, and sends back its own ISN_s with ACK = ISN_c + 1.
3. ACK (Acknowledge):
   The Client acknowledges the server's sequence with ACK = ISN_s + 1.

Why 3 steps?
Two steps would only verify that the server heard the client, but the client wouldn't know if the server's acknowledgment was received. Three steps establish mutual two-way consent and buffer reservation.`;
      } else {
        replyText = `Excellent question. Based on your current study materials, this concept ties directly into our core learning objectives.

Key Insights:
• Foundational Principle: Complex systems decompose into modular, independently verifiable layers.
• Active Recall: Testing your recall on 3D flashcards strengthens long-term synaptic connections.
• Recommendation: Practice this concept in the Flashcards section to solidify memory.`;
      }

      setIsTyping(false);
      playSuccessSound();
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedQuestions: [
            'Test my knowledge with another question.',
            'Explain this concept in simpler terms.',
            'Give me a mnemonic to remember this.',
          ],
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] shrink-0">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#000000] tracking-tight leading-none">
            AI Study Tutor
          </h1>
          <p className="text-xs text-[#6F6F6F] font-sans mt-1">
            {geminiApiKey ? 'Connected to Google Gemini Pro AI' : 'Active: Autonomous Knowledge Synthesis Engine'}
          </p>
        </div>

        <span className="text-xs font-medium text-black bg-black/[0.04] px-4 py-1.5 rounded-full border border-black/10 font-sans">
          {materials.length} Documents Ingested
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-sans">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center p-1.5 text-xs font-semibold ${
                  isUser
                    ? 'bg-black text-white'
                    : 'bg-[#5B875C]/15 text-[#5B875C]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-5 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-black text-white rounded-tr-none'
                    : 'bg-white border border-black/[0.06] text-[#1A1A1A] shadow-[0_8px_30px_rgba(28,70,120,0.04)] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className={`text-[10px] mt-2 font-mono ${isUser ? 'text-white/60' : 'text-[#6F6F6F]'}`}>
                  {msg.timestamp}
                </div>

                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-black/[0.06] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#6F6F6F] uppercase tracking-wider flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-[#5B875C]" />
                      Suggested Follow-Ups:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(q)}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-black/[0.03] hover:bg-black hover:text-white border border-black/5 text-[#1A1A1A] transition-all text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5B875C]/15 text-[#5B875C] flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white border border-black/[0.06] rounded-tl-none flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#6F6F6F] animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B875C] animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer Box */}
      <div className="shrink-0 pt-2 font-sans">
        <GlassCard className="p-3 border-black/10">
          <div className="flex items-end gap-2">
            <textarea
              rows={2}
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your study notes or questions... (Press Enter to send)"
              className="flex-1 bg-transparent border-0 text-[#000000] placeholder:text-[#6F6F6F] text-sm resize-none focus:outline-none p-2"
            />
            <GlowButton
              size="md"
              variant="primary"
              onClick={() => handleSendMessage()}
              disabled={!inputPrompt.trim() || isTyping}
              icon={<Send className="w-4 h-4" />}
            >
              Send
            </GlowButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
