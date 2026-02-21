import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import screenshot1 from "@/assets/app-screenshot-1.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[auto] lg:min-h-screen flex items-center overflow-hidden grid-bg pt-24 pb-12 lg:pt-20 lg:pb-0">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-primary/15 blur-[150px]" />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-primary text-xs font-mono-title mb-6 mx-auto lg:mx-0"
            >
              <Zap className="w-3 h-3" />
              VÍDEOS PROCESSADOS EM MENOS DE 1 MINUTO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Fature 10k multiplicando seus anúncios com a Inteligência do{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Escalax.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed mx-auto lg:mx-0"
            >
              A ferramenta que transforma 1 roteiro em 100+ criativos validados.
              Use a lógica de concatenação dos grandes players para escalar no Facebook e TikTok Ads sem esforço.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col items-center lg:items-start"
            >
              <Button
                size="lg"
                className="neon-btn text-primary-foreground text-lg px-10 py-7 rounded-xl border-0 hover:scale-105 transition-all shadow-lg shadow-primary/25"
              >
                QUERO MEU ACESSO AGORA
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center lg:text-left">
                🔒 Acesso imediato • Garantia de 7 dias
              </p>
            </motion.div>
          </div>

          {/* Right - Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <img
                src={screenshot1}
                alt="Dashboard Escalax mostrando a geração de criativos"
                className="w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
