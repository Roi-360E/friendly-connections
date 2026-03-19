import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import screenshot7 from "@/assets/app-screenshot-7.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const AuthoritySection = () => {
  const { content } = useSiteContent();
  const { authority } = content;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl md:rounded-2xl overflow-hidden border border-border shadow-lg order-2 lg:order-1"
          >
            <img src={screenshot7} alt="Escalax em ação" className="w-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs text-primary tracking-widest uppercase mb-3 md:mb-4 block font-semibold">
              {authority.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 md:mb-6 leading-tight tracking-tight text-foreground">
              {authority.title}{" "}
              <span className="text-primary">{authority.titleHighlight}</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              {authority.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {authority.stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="text-xl md:text-2xl font-black text-primary">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href={content.hero.ctaUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold glow-primary">
                {authority.ctaText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
