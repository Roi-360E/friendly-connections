import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { src: "/videos/testimonial-1.mp4", name: "Cliente 1" },
  { src: "/videos/testimonial-2.mp4", name: "Cliente 2" },
  { src: "/videos/testimonial-3.mp4", name: "Cliente 3" },
  { src: "/videos/testimonial-4.mp4", name: "Cliente 4" },
];

const VideoCard = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lazy load: only load video when card is near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause video when it scrolls out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !playing) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playing]);

  const toggle = useCallback(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  }, [playing]);

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-muted cursor-pointer group"
      onClick={toggle}
    >
      {isVisible ? (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <div className="w-full h-full bg-muted animate-pulse" />
      )}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-opacity">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground ml-0.5" />
          </div>
        </div>
      )}
      {playing && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-foreground/40 flex items-center justify-center">
            <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 lg:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Depoimentos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Veja resultados reais de quem já usa a plataforma para escalar seus anúncios.
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors -ml-2 lg:-ml-5"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-1 sm:px-2 py-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="snap-center"
              >
                <VideoCard src={t.src} />
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors -mr-2 lg:-mr-5"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
