import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import screenshot7 from "@/assets/app-screenshot-7.png";

const SIGNUP_URL = "https://deploysites.online/";

const stats = [
  { value: "10+", label: "Anos de experiência" },
  { value: "300+", label: "Criativos por semana" },
  { value: "24h", label: "Processamento em nuvem" },
];

const AuthoritySection = () => {
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
              Quem criou isso
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 md:mb-6 leading-tight tracking-tight text-foreground">
              Desenvolvido por quem{" "}
              <span className="text-primary">escala de verdade.</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              São 10 anos de experiência em tecnologia condensados em uma ferramenta que resolve
              o maior gargalo de quem roda tráfego:{" "}
              <span className="text-foreground font-semibold">a falta de criativos novos toda semana.</span>{" "}
              Cada funcionalidade foi pensada para quem precisa de volume com qualidade.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="text-xl md:text-2xl font-black text-primary">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold glow-primary">
                Quero começar agora
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
