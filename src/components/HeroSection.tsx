import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import screenshot1 from "@/assets/app-screenshot-1.png";

const SIGNUP_URL = "https://deploysites.online/";
const YOUTUBE_VIDEO_ID = "QzbsSYNa_KM";

// Load YouTube IFrame API
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
    // small delay for DOM to render the div
    setTimeout(() => {
      playerRef.current = new (window as any).YT.Player("yt-player", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          controls: 0,
          disablekb: 1,
          iv_load_policy: 3,
          playsinline: 1,
        },
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
    <section className="relative overflow-hidden grid-bg pt-28 pb-16">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-primary/15 blur-[150px]" />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-primary text-xs font-mono-title mb-6"
        >
          <Zap className="w-3 h-3" />
          VÍDEOS PROCESSADOS EM MENOS DE 1 MINUTO
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-10 max-w-4xl"
        >
          Fature 10k multiplicando seus anúncios com a Inteligência do{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Escalax.
          </span>
        </motion.h1>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-3xl mb-10"
        >
          <div ref={containerRef} className="relative rounded-2xl overflow-hidden neon-pop-image aspect-video bg-background/50">
            {isPlaying ? (
              <div id="yt-player" className="absolute inset-0 w-full h-full" />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handlePlay}
              >
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                  alt="Preview do vídeo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/40" />
                <div className="relative z-10 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            )}
            {/* Progress bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted/40 z-20">
                <div
                  className="h-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)] transition-all duration-500 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
        >
          A ferramenta que transforma 1 roteiro em 100+ criativos validados.
          Use a lógica de concatenação dos grandes players para escalar no Facebook e TikTok Ads sem esforço.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="neon-btn text-primary-foreground text-lg px-10 py-7 rounded-xl border-0 hover:scale-105 transition-all shadow-lg shadow-primary/25"
            >
              CADASTRE-SE GRATUITAMENTE
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            🔒 Acesso imediato • 100% gratuito
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
