"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send, Sparkles, HelpCircle, Brain, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { vyperXTashaSuggestContact } from '@/ai/flows/vyperx-tasha-suggest-contact';
import { MessageBubble } from '@/components/chat/message-bubble';
import { TypingIndicator } from '@/components/chat/typing-indicator';
import { LeadCapture } from '@/components/chat/lead-capture';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
  animateTypewriter?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'assistant-welcome',
      role: 'assistant',
      content: "Hey there! I'm Tasha, your VyperX growth partner. 👋\n\nI help brands scale with consistent high-quality social media content and websites built for conversions. How can I help you grow today?",
      animateTypewriter: false,
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitializedScroll = useRef(false);

  const logo = PlaceHolderImages.find(img => img.id === 'vyperx-logo');

  const createMessageId = () => {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior,
        });
      }
    }
  };

  useEffect(() => {
    if (!hasInitializedScroll.current) {
      scrollToBottom('auto');
      hasInitializedScroll.current = true;
      return;
    }

    scrollToBottom('smooth');
  }, [messages, isTyping, showLeadForm]);

  useEffect(() => {
    const viewport = window.visualViewport;

    if (!viewport) {
      return;
    }

    const updateKeyboardOffset = () => {
      const nextOffset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop
      );
      setKeyboardOffset(nextOffset);
    };

    updateKeyboardOffset();
    viewport.addEventListener('resize', updateKeyboardOffset);
    viewport.addEventListener('scroll', updateKeyboardOffset);
    window.addEventListener('orientationchange', updateKeyboardOffset);

    return () => {
      viewport.removeEventListener('resize', updateKeyboardOffset);
      viewport.removeEventListener('scroll', updateKeyboardOffset);
      window.removeEventListener('orientationchange', updateKeyboardOffset);
    };
  }, []);

  const handleSend = async (customText?: string) => {
    const userMessage = customText || input.trim();
    if (!userMessage || isTyping) return;

    if (!customText) setInput('');
    
    // Hide lead form if user continues chatting to keep focus on the conversation
    if (showLeadForm) {
      setShowLeadForm(false);
    }

    const newMessages = [
      ...messages,
      {
        id: createMessageId(),
        role: 'user',
        content: userMessage,
        animateTypewriter: false,
      }
    ] as Message[];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await vyperXTashaSuggestContact({
        messages: newMessages.map(m => ({
          role: m.role,
          content: m.content
        }))
      });

      setMessages(prev => [
      ...prev,
      {
        id: createMessageId(),
        role: 'assistant',
        content: response.response,
        animateTypewriter: true,
      },
    ]);
      
    } catch (error) {
      console.error("Failed to get response from Tasha:", error);
      setMessages(prev => [...prev, { 
        id: createMessageId(),
        role: 'assistant', 
        content: "Looks like something went wrong on our end, but no worries — our team can help you directly.\n\nFill the form using the phone icon or book a call here:\nhttps://vyperx.in/pages/contact",
        animateTypewriter: true,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleHelp = () => {
    setMessages(prev => [...prev, { 
      id: createMessageId(),
      role: 'assistant', 
      content: "I'm Tasha, and I'm here to help you scale your brand! 🚀\n\nYou can ask me about our specific growth systems or services. Click one of the plans below to learn more immediately!",
      suggestions: [
        "What plan is best for my business?",
        "Show me pricing",
        "I need a website",
        "I want more sales"
      ],
      animateTypewriter: true,
    }]);
  };

  const toggleLeadForm = () => {
    setShowLeadForm(!showLeadForm);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-full md:max-w-5xl mx-auto md:border-x border-border/30 shadow-2xl overflow-hidden bg-background relative selection:bg-primary/20">
      {/* Header */}
      <header className="px-6 py-5 border-b border-border/30 bg-background/90 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary via-accent to-primary p-[1.5px] rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-full rounded-[14px] bg-background flex items-center justify-center overflow-hidden">
                {logo ? (
                  <Image 
                    src={logo.imageUrl} 
                    alt="VyperX Logo" 
                    width={32} 
                    height={32} 
                    className="object-contain"
                    data-ai-hint={logo.imageHint}
                  />
                ) : (
                  <Sparkles className="w-6 h-6 text-primary" />
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-xl leading-tight tracking-tight flex items-center gap-2">
              Tasha
              <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-body uppercase tracking-[0.2em] font-black border border-primary/20">Active</span>
            </h1>
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">Growth Partner @ VyperX</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLeadForm}
            title="Growth Form"
            className={cn(
              "p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 border transition-colors",
              showLeadForm 
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                : "hover:bg-muted/50 text-muted-foreground border-border/50"
            )}
          >
             <Phone className="w-5 h-5" />
          </button>
          <button 
            onClick={handleHelp}
            title="Help & Suggestions"
            className="p-2.5 hover:bg-muted/50 rounded-xl transition-all hover:scale-105 active:scale-95 border border-border/50"
          >
             <HelpCircle className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <ScrollArea ref={scrollRef} className="flex-1 px-4 md:px-8 py-6 chat-scroll-area">
        <div className="flex flex-col min-h-full">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <MessageBubble
                message={msg}
                onTypingProgress={() => {
                  scrollToBottom('smooth');
                }}
              />
              {msg.suggestions && (
                <div className="flex flex-wrap gap-2 mb-6 ml-12">
                  {msg.suggestions.map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSend(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/20 hover:border-primary transition-all text-primary font-medium"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col gap-2 mb-6">
              <TypingIndicator />
              <p className="text-[10px] text-muted-foreground/60 font-medium px-4 flex items-center gap-2 italic">
                <Brain className="w-3 h-3 thought-animation" />
                Tasha is analyzing your request...
              </p>
            </div>
          )}
          {showLeadForm && (
            <div className="mb-6 animate-fade-in-up">
               <LeadCapture />
            </div>
          )}
          <div className="h-4" />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div
        className="sticky bottom-0 z-20 px-4 md:px-6 pt-4 border-t border-border/30 bg-background/95 backdrop-blur-xl"
        style={{
          transform: keyboardOffset > 0 ? `translateY(-${keyboardOffset}px)` : undefined,
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)',
        }}
      >
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }} 
          className="flex gap-3 items-center bg-secondary/20 p-2 pl-5 rounded-2xl border border-border/50 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/10 transition-all shadow-inner"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about social media plans, websites..."
            disabled={isTyping}
            className="flex-1 bg-transparent border-none outline-none text-sm py-2.5 placeholder:text-muted-foreground/50 font-body"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isTyping}
            className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-11 w-11 shrink-0 shadow-lg shadow-primary/20 transition-all active:scale-90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
        <div className="flex items-center justify-center gap-4 mt-5">
           <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border/30 to-transparent" />
           <p className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-[0.2em] whitespace-nowrap">
             Powered by <span className="text-primary/60">VyperX AI System</span>
           </p>
           <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-border/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
