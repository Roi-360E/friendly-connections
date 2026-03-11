import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const SIGNUP_URL = "https://deploysites.online/";
const YOUTUBE_VIDEO_ID = "wYbHpveuQQs";

const loadYTApi = (() => {
  let promise: Promise<void> | null = null;
  return () => {
    if (!promise) {
      promise = new Promise<void>((resolve) => {
        if ((window as any).YT?.Player) { resolve(); return; }
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
        (window as any).onYouTubeIframeAPIReady = () => resolve();
      });
    }
    return promise;
  };
})();

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const startTracking = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = window.setInterval(() => {
      const p = playerRef.current;
      if (p?.getCurrentTime && p?.getDuration) {
        const duration = p.getDuration();
        if (duration > 0) setProgress((p.getCurrentTime() / duration) * 100);
      }
    }, 500);
  }, []);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handlePlay = async () => {
    setIsPlaying(true);
    await loadYTApi();
    setTimeout(() => {
      playerRef.current = new (window as any).YT.Player("yt-player", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: { autoplay: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, iv_load_policy: 3, playsinline: 1 },
        events: {
          onReady: (e: any) => { e.target.playVideo(); startTracking(); },
          onStateChange: (e: any) => {
            if (e.data === 0) { setProgress(100); if (intervalRef.current) clearInterval(intervalRef.current); intervalRef.current = null; }
            if (e.data === 1) startTracking();
          },
        },
      });
    }, 100);
  };

  return (
    <section className="relative pt-20 pb-12 md:pt-28 md:pb-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        {/* Urgency banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 md:mb-8 py-2 px-4 md:py-2.5 md:px-6 rounded-full border border-primary bg-primary/10 inline-flex items-center gap-2"
        >
          <Flame className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
          <span className="text-xs md:text-sm font-bold text-primary uppercase">
            🔥 Créditos ILIMITADOS
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black leading-[1.1] mb-4 md:mb-5 max-w-5xl uppercase tracking-tight text-foreground"
        >
          Receba Agora o aplicativo para criar{" "}
          <span className="text-primary">
            300 criativos de vídeos em apenas 30 minutos.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-xl text-muted-foreground max-w-3xl mb-6 md:mb-10 leading-relaxed px-2"
        >
          Você vai multiplicar{" "}
          <span className="text-foreground font-bold">50, 100, 200, 300 criativos por semana</span>{" "}
          com um passo a passo que segue a risca o que o{" "}
          <span className="text-foreground font-bold">Meta Andromeda</span> exige.
        </motion.p>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-3xl mb-6 md:mb-10"
        >
          <div ref={containerRef} className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-video bg-card border border-border shadow-lg">
            {isPlaying ? (
              <div id="yt-player" className="absolute inset-0 w-full h-full" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer group" onClick={handlePlay}>
                <img src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`} alt="Preview do vídeo" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/20" />
                <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-0.5" fill="currentColor" />
                </div>
              </div>
            )}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-muted z-20">
                <div className="h-full bg-primary transition-all duration-500 ease-linear" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
        </motion.div>

        {/* Scarcity text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-sm md:text-lg text-muted-foreground max-w-2xl mb-6 md:mb-8 leading-relaxed px-2"
        >
          Escalar ficou mais fácil — é só ter variedade de criativos, com ângulos diferentes.{" "}
          <span className="text-foreground font-semibold">Chega de apostar tudo no seu "criativo campeão".</span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center w-full"
        >
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground text-base md:text-xl px-8 md:px-14 py-6 md:py-8 rounded-xl md:rounded-2xl border-0 hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 uppercase font-bold tracking-wide"
            >
              TESTE POR 7 DIAS
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </a>
          <p className="text-xs md:text-sm text-muted-foreground mt-3">
            🔒 Acesso imediato • Créditos ilimitados • Garantia de 7 dias
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-10 md:mt-16">
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
