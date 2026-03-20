import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Pause, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const { content } = useSiteContent();
  const { hero } = content;
  const THUMBNAIL_URL = `https://img.youtube.com/vi/${hero.youtubeId}/maxresdefault.jpg`;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) setProgress((currentTime / duration) * 100);
  };

  return (
    <section className="relative overflow-hidden hero-gradient pt-24 pb-12 md:pt-32 md:pb-20">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern" />
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className={`grid grid-cols-1 ${hero.videoAspectRatio === 'vertical' ? 'lg:flex lg:flex-col lg:items-center lg:text-center' : 'lg:grid-cols-2'} gap-8 lg:gap-12 items-center`}>
          {/* Left: Text content */}
          <div className={`flex flex-col ${hero.videoAspectRatio === 'vertical' ? 'items-center text-center lg:max-w-3xl' : 'items-start text-left'}`}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 md:mb-6 py-2 px-4 rounded-full border border-primary/20 bg-primary/5 inline-flex items-center gap-2"
            >
              <span className="text-xs md:text-sm font-semibold text-primary">
                {hero.badge}
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 tracking-tight text-foreground"
            >
              {hero.headline}{" "}
              <span className="text-primary">{hero.headlineHighlight}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base md:text-lg font-medium text-foreground mb-3"
            >
              {hero.subheadline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-sm md:text-base text-muted-foreground ${hero.videoAspectRatio === 'vertical' ? 'max-w-2xl mx-auto' : 'max-w-lg'} mb-8 leading-relaxed`}
            >
              {hero.description}
            </motion.p>

            {/* CTA Desktop (If horizontal) */}
            {hero.videoAspectRatio !== 'vertical' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col items-start w-full"
              >
                <a href={hero.ctaUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary text-primary-foreground text-sm md:text-base px-8 md:px-10 py-5 md:py-6 rounded-xl border-0 hover:bg-primary/90 hover:scale-[1.02] transition-all glow-primary font-bold tracking-wide"
                  >
                    {hero.ctaText}
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground mt-3">
                  🔒 Acesso imediato • Créditos ilimitados • Garantia de 7 dias
                </p>
              </motion.div>
            )}
          </div>

          {/* Right: Native Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`w-full ${hero.videoAspectRatio === 'vertical' ? 'flex justify-center flex-col items-center' : ''}`}
          >
            <div className={`relative rounded-xl md:rounded-2xl overflow-hidden ${hero.videoAspectRatio === 'vertical' ? 'aspect-[9/16] w-full max-w-[320px] md:max-w-[380px]' : 'aspect-video w-full'} bg-card border border-border shadow-lg`}>
              <video
                key={hero.videoSrc}
                ref={videoRef}
                src={hero.videoSrc}
                poster={THUMBNAIL_URL}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => { setIsPlaying(false); setProgress(0); }}
              />

              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  onClick={handlePlay}
                >
                  <div className="absolute inset-0 bg-foreground/20" />
                  <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
              )}

              {isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  onClick={handlePause}
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-foreground/40 flex items-center justify-center">
                    <Pause className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                  </div>
                </div>
              )}

              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-muted z-20">
                  <div className="h-full bg-primary transition-all duration-300 ease-linear" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>

            {/* CTA (Centered under vertical video) */}
            {hero.videoAspectRatio === 'vertical' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col items-center w-full mt-10"
              >
                <a href={hero.ctaUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary text-primary-foreground text-sm md:text-base px-10 py-6 md:py-7 rounded-xl border-0 hover:bg-primary/90 hover:scale-[1.02] transition-all glow-primary font-bold tracking-wide"
                  >
                    {hero.ctaText}
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  🔒 Acesso imediato • Créditos ilimitados • Garantia de 7 dias
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex justify-center mt-10 md:mt-16">
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
