import { motion } from "framer-motion";
import TypingChat from "@/components/TypingChat";
import screenshot6 from "@/assets/app-screenshot-6.png";

const ShowcaseSection = () => {
  return (
    <section className="py-24 relative grid-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono-title text-xs text-primary tracking-widest uppercase mb-4 block">
            Recursos Extras
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tudo que você precisa para{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              escalar de verdade
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <div className="mb-6 w-full">
              <TypingChat />
            </div>
            <span className="font-mono-title text-xs text-primary tracking-wider mb-2">DESTAQUE #1</span>
            <h3 className="text-lg font-bold mb-2">Gerador de Roteiros com IA</h3>
            <p className="text-sm text-muted-foreground">
              Copywriter veterano com 50+ anos de experiência integrado para criar roteiros sob medida.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <div className="neon-pop-image mb-6 w-full">
              <img src={screenshot6} alt="100 criativos gerados automaticamente" className="w-full" />
            </div>
            <span className="font-mono-title text-xs text-primary tracking-wider mb-2">DESTAQUE #2</span>
            <h3 className="text-lg font-bold mb-2">Multiplicação em Massa</h3>
            <p className="text-sm text-muted-foreground">
              10 ganchos × 5 corpos × 2 CTAs = 100 criativos prontos para rodar.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
