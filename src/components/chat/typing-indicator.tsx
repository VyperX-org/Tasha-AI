import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex space-x-1.5 p-3 px-4 bg-muted/40 rounded-2xl rounded-tl-none w-fit animate-fade-in-up">
      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
    </div>
  );
}
