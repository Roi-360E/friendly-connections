import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const chatLines = [
  "Sou o RoteiroPRO. Vou transformar sua retenção em vendas com roteiros de alto impacto.",
  "Para começar, responda de forma curta:",
  "📋 Qual seu produto/serviço e nicho?",
  "🎯 Quem é seu cliente ideal? (idade, dor principal)",
  "💎 Qual seu diferencial e promessa principal?",
  "🚀 Objetivo do vídeo? (vender, engajar, educar, viralizar)",
  "🎨 Tom da marca? (provocativo, empático, autoritário, educativo)",
  "📊 Tem resultados/números/depoimentos pra usar?",
  "Me envie as informações",
];

const TypingChat = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const fullText = chatLines.join("\n");

  const reset = useCallback(() => {
    setDisplayedText("");
    setLineIndex(0);
    setCharIndex(0);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(reset, 3000);
      return () => clearTimeout(timeout);
    }

    if (lineIndex >= chatLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = chatLines[lineIndex];

    if (charIndex >= currentLine.length) {
      // Move to next line after a small pause
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + "\n");
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }

    const speed = charIndex === 0 ? 80 : 25 + Math.random() * 35;
    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + currentLine[charIndex]);
      setCharIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [lineIndex, charIndex, isComplete, reset]);

  const lines = displayedText.split("\n");

  return (
    <div className="w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border border-primary/20 bg-[hsl(240,10%,4%)] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10 bg-primary/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
            <MessageCircle className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold font-mono-title text-primary">RoteiroPRO IA</span>
        </div>
      </div>

      {/* Chat body */}
      <div className="p-4 min-h-[320px] max-h-[380px] overflow-hidden">
        {/* User bubble */}
        <div className="flex justify-end mb-3">
          <div className="bg-primary text-primary-foreground text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
            oi
          </div>
        </div>

        {/* AI bubble */}
        <div className="flex justify-start">
          <div className="bg-muted/60 text-foreground text-xs px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] leading-relaxed whitespace-pre-wrap">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[2px] h-[14px] bg-primary ml-0.5 align-middle"
              />
            )}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 bg-muted/30 rounded-full px-4 py-2.5 border border-border/50">
          <span className="text-xs text-muted-foreground flex-1">Descreva seu vídeo...</span>
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <MessageCircle className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingChat;
