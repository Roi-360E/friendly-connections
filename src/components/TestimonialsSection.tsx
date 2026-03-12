import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { src: "/videos/testimonial-1.mp4", name: "Cliente 1" },
  { src: "/videos/testimonial-2.mp4", name: "Cliente 2" },
  { src: "/videos/testimonial-3.mp4", name: "Cliente 3" },
];

const VideoCard = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      className="relative flex-shrink-0 w-[280px] sm:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-foreground/5 cursor-pointer group"
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          </div>
        </div>
      )}
      {playing && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-foreground/40 flex items-center justify-center">
            <Pause className="w-6 h-6 text-primary-foreground" />
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
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Veja resultados reais de quem já usa a plataforma para escalar seus anúncios.
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors -ml-2 lg:-ml-5"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-2 py-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="snap-center"
              >
                <VideoCard src={t.src} />
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors -mr-2 lg:-mr-5"
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
