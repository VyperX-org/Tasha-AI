"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

interface LeadCaptureProps {
  onSuccess?: () => void;
}

export function LeadCapture({ onSuccess }: LeadCaptureProps) {
  return (
    <div className="w-full flex justify-center py-6 animate-fade-in-up">
      <div 
        className="w-full max-w-4xl p-[28px] rounded-[20px] bg-[linear-gradient(145deg,#12151c,#0c0f14)] border border-[rgba(120,120,255,0.2)] shadow-[0_0_40px_rgba(100,100,255,0.1)] relative overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(120,120,255,0.15)] flex flex-col items-center"
      >
        <div className="absolute top-6 right-6 text-primary/20 pointer-events-none z-10">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        
        <div className="w-full overflow-hidden rounded-xl bg-background/5 border border-white/5 relative h-[475px]">
          <iframe 
            src="https://vyperx-forms.netlify.app/tasha" 
            className="w-full h-full border-none"
            title="VyperX Contact Form"
            loading="lazy"
          />
        </div>
        
        {/* Subtle glow effect at bottom */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-primary/10 blur-[50px] pointer-events-none" />
      </div>
    </div>
  );
}
