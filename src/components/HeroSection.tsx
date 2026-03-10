import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Flame, Clock, Code, Rocket } from "lucide-react";
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

const stats = [
  { value: "24", label: "HORAS", sub: "Nunca para" },
  { value: "+3", label: "MILHÕES", sub: "de linhas de código" },
  { value: "20", label: "MIL", sub: "campanhas otimizadas" },
];

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
    <section className="relative overflow-hidden pt-28 pb-16">
      {/* Subtle purple ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-secondary/10 blur-[180px]" />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* OneClick-style top pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 py-2.5 px-6 rounded-full border border-primary/30 bg-primary/10 inline-flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">
            A tecnologia que já otimizou 20.642 campanhas dos maiores players do mercado
          </span>
        </motion.div>

        {/* Bold uppercase headline (OneClick style) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-4 max-w-5xl uppercase tracking-tight"
        >
          A ÚNICA I.A. QUE PROTEGE SEU ORÇAMENTO E{" "}
          <span className="text-primary">
            ESCALA SUAS CAMPANHAS POR VOCÊ
          </span>
        </motion.h1>

        {/* PGV-style subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl font-bold text-highlight-green mb-4 uppercase tracking-wide"
        >
          TOTALMENTE AUTÔNOMA. NÃO ERRA. NÃO TE DEIXA NA MÃO.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10"
        >
          Não é um chat que te diz o que fazer. O EscalaxPro é uma plataforma de performance
          que rastreia conversões, fornece dashboards e otimiza as campanhas por você.
        </motion.p>

        {/* Stat cards (OneClick style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl mb-10"
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="text-3xl md:text-4xl font-black font-mono-title text-primary">{stat.value}</div>
              <div className="text-xs md:text-sm font-bold tracking-wider mt-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-3xl mb-10"
        >
          <div ref={containerRef} className="relative rounded-2xl overflow-hidden neon-pop-image aspect-video bg-background/50">
            {isPlaying ? (
              <div id="yt-player" className="absolute inset-0 w-full h-full" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer group" onClick={handlePlay}>
                <img src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`} alt="Preview do vídeo" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-background/40" />
                <div className="relative z-10 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            )}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted/40 z-20">
                <div className="h-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)] transition-all duration-500 ease-linear" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
        </motion.div>

        {/* OneClick-style large CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="neon-btn text-primary-foreground text-lg md:text-xl px-12 py-8 rounded-2xl border-0 hover:scale-105 transition-all shadow-xl shadow-primary/30 uppercase font-bold tracking-wide"
            >
              AGENDAR DEMONSTRAÇÃO AO VIVO
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            ✅ Veja EscalaxPro monitorando campanhas em tempo real
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
