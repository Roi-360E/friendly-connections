import { motion } from "framer-motion";
import { Code, TrendingUp, Shield } from "lucide-react";
import screenshot7 from "@/assets/app-screenshot-7.png";

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
            <span className="text-xs text-primary tracking-widest uppercase mb-3 md:mb-4 block font-bold">
              Quem criou isso
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 md:mb-6 leading-tight uppercase tracking-tight text-foreground">
              Desenvolvido por quem{" "}
              <span className="text-primary">escala de verdade.</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              São 10 anos de experiência em tecnologia condensados em uma ferramenta que resolve
              o maior gargalo de quem roda tráfego:{" "}
              <span className="text-foreground font-semibold">a falta de criativos novos toda semana.</span>{" "}
              Cada funcionalidade foi pensada para quem precisa de volume com qualidade.
            </p>

            <div className="flex flex-col gap-3 md:gap-4">
              {[
                { icon: Code, text: "Tecnologia proprietária de concatenação de vídeos" },
                { icon: TrendingUp, text: "Usado por media buyers que faturam 6 e 7 dígitos/mês" },
                { icon: Shield, text: "Processamento em nuvem — funciona 24h sem travar" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
