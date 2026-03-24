import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  reasoning_details?: any;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant';
  const [isOpen, setIsOpen] = useState(false);

  const renderFormattedContent = (text: string) => {
    // Regex matches:
    // 1. Markdown links: [text](url)
    // 2. Bold (double asterisk): **text**
    // 3. Bold/Italic (single asterisk): *text*
    // 4. Raw URLs: https://... or www....
    const regex = /(\[.*?\]\(.*?\))|(\*\*.*?\*\*)|(\*.*?\*)|(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    
    const parts = text.split(regex);

    return parts.filter(Boolean).map((part, index) => {
      // Handle Markdown Links: [text](url)
      const mdMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (mdMatch) {
        return (
          <a
            key={index}
            href={mdMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all text-inherit"
          >
            {mdMatch[1]}
          </a>
        );
      }

      // Handle Bold (Double Asterisk): **text**
      const bold2Match = part.match(/^\*\*(.*?)\*\*$/);
      if (bold2Match) {
        return (
          <strong key={index} className="font-bold text-primary/90">
            {bold2Match[1]}
          </strong>
        );
      }

      // Handle Bold (Single Asterisk): *text*
      const bold1Match = part.match(/^\*(.*?)\*$/);
      if (bold1Match) {
        return (
          <strong key={index} className="font-bold text-primary/90">
            {bold1Match[1]}
          </strong>
        );
      }

      // Handle Raw URLs
      const isUrl = /^(https?:\/\/[^\s]+|www\.[^\s]+)$/.test(part);
      if (isUrl) {
        // Exclude trailing punctuation from the clickable part
        const punctuationMatch = part.match(/[!.,?]+$/);
        const cleanUrl = punctuationMatch ? part.slice(0, punctuationMatch.index) : part;
        const punctuation = punctuationMatch ? punctuationMatch[0] : "";
        
        const href = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
        return (
          <React.Fragment key={index}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all text-inherit"
            >
              {cleanUrl}
            </a>
            {punctuation}
          </React.Fragment>
        );
      }

      return part;
    });
  };

  return (
    <div
      className={cn(
        "flex w-full mb-6 animate-fade-in-up items-end gap-3",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant && (
        <Avatar className="w-10 h-10 border-2 border-primary/30 shrink-0 shadow-lg shadow-primary/10">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-headline font-bold">
            T
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("flex flex-col gap-1.5", isAssistant ? "items-start" : "items-end max-w-[85%]")}>
        <div
          className={cn(
            "px-5 py-4 text-sm md:text-base transition-all shadow-md",
            isAssistant
              ? "bg-secondary/40 text-foreground rounded-3xl rounded-bl-none border border-border/50 backdrop-blur-sm"
              : "bg-primary text-primary-foreground rounded-3xl rounded-br-none font-medium"
          )}
        >
          <div className="whitespace-pre-wrap leading-relaxed font-body">
            {renderFormattedContent(message.content)}
          </div>
        </div>

        {isAssistant && message.reasoning_details && (
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full mt-1 px-2"
          >
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-bold">
                <Brain className="w-3 h-3" />
                <span>View Tasha's Reasoning</span>
                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 p-3 bg-muted/20 border border-border/30 rounded-xl text-[11px] text-muted-foreground/80 font-code italic leading-snug">
              {typeof message.reasoning_details === 'string' 
                ? message.reasoning_details 
                : JSON.stringify(message.reasoning_details, null, 2)}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
      
      {!isAssistant && (
        <Avatar className="w-8 h-8 shrink-0 bg-muted/30">
          <AvatarFallback className="text-[10px] text-muted-foreground font-bold">YOU</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
