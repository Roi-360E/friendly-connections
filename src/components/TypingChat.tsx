import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { askGemini } from "@/gemini"; // Puxa a função que criamos antes

interface Message {
  role: "user" | "bot";
  content: string;
}

const TypingChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Olá! Sou o RoteiroPRO. Me diga qual o seu produto ou nicho e eu vou criar um roteiro de alto impacto para você!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Faz o chat rolar para baixo automaticamente quando chega mensagem nova
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput(""); // Limpa o campo de texto
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Chama o seu Google Gemini
      const aiResponse = await askGemini(userMessage);
      setMessages((prev) => [...prev, { role: "bot", content: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "Ops, tive um erro ao conectar. Verifique sua chave da API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden border border-border bg-background shadow-lg flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-bold text-primary uppercase tracking-wider">EscalaXPro IA</span>
        </div>
      </div>

      {/* Chat body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-primary/10"
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card text-foreground border border-border rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border px-4 py-2.5 rounded-2xl rounded-tl-sm">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-2 bg-background rounded-full pl-4 pr-1.5 py-1.5 border border-border focus-within:ring-1 focus-within:ring-primary/50 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Descreva seu vídeo ou nicho..."
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingChat;