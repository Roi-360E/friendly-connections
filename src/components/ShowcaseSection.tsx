import { motion } from "framer-motion";
import TypingChat from "@/components/TypingChat";
import screenshot6 from "@/assets/app-screenshot-6.png";

const ShowcaseSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs text-primary tracking-widest uppercase mb-4 block font-bold">
            Por dentro do app
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight text-foreground">
            Veja o que você vai ter{" "}
            <span className="text-primary">nas suas mãos</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 flex flex-col items-center text-center bg-background border border-border"
          >
            <div className="mb-6 w-full">
              <TypingChat />
            </div>
            <span className="text-xs text-primary tracking-wider mb-2 font-bold uppercase">BÔNUS INCLUSO</span>
            <h3 className="text-lg font-bold mb-2 text-foreground">Roteirista IA Integrado</h3>
            <p className="text-sm text-muted-foreground">
              Gere roteiros de alto impacto com IA treinada nas metodologias de Erico Rocha, Ladeirinha e Hana.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl p-6 flex flex-col items-center text-center bg-background border border-border"
          >
            <div className="rounded-xl overflow-hidden mb-6 w-full border border-border">
              <img src={screenshot6} alt="100 criativos gerados automaticamente" className="w-full" />
            </div>
            <span className="text-xs text-primary tracking-wider mb-2 font-bold uppercase">FUNCIONALIDADE PRINCIPAL</span>
            <h3 className="text-lg font-bold mb-2 text-foreground">Multiplicação em Massa</h3>
            <p className="text-sm text-muted-foreground">
              10 ganchos × 5 corpos × 2 CTAs = 100 criativos prontos para subir nas campanhas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
