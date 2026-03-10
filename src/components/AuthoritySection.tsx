import { motion } from "framer-motion";
import { Code, TrendingUp, Shield } from "lucide-react";
import screenshot7 from "@/assets/app-screenshot-7.png";

const AuthoritySection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-border shadow-lg"
          >
            <img src={screenshot7} alt="Escalax em ação" className="w-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xs text-primary tracking-widest uppercase mb-4 block font-bold">
              Built by a Dev
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight uppercase tracking-tight text-foreground">
              Desenvolvido por quem entende{" "}
              <span className="text-primary">o código por trás do lucro.</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              São 10 anos de experiência em tecnologia condensados em uma ferramenta que resolve
              a falta de criativos para quem escala sério. Cada linha de código foi pensada
              para performance e resultado.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: Code, text: "Tecnologia proprietária de concatenação de vídeos" },
                { icon: TrendingUp, text: "Testado por media buyers que faturam 6 dígitos" },
                { icon: Shield, text: "Infraestrutura robusta e processamento em nuvem" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
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
