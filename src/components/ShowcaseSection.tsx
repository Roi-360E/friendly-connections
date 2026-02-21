import { motion } from "framer-motion";
import TypingChat from "@/components/TypingChat";
import screenshot6 from "@/assets/app-screenshot-6.png";
import screenshot2 from "@/assets/app-screenshot-2.png";

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
            Bônus Inclusos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tudo que você precisa para{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              escalar de verdade
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
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
            <span className="font-mono-title text-xs text-primary tracking-wider mb-2">BÔNUS #1</span>
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
            <div className="relative rounded-xl overflow-hidden mb-6 w-full">
              <img src={screenshot6} alt="100 criativos gerados automaticamente" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
            </div>
            <span className="font-mono-title text-xs text-primary tracking-wider mb-2">BÔNUS #2</span>
            <h3 className="text-lg font-bold mb-2">Multiplicação em Massa</h3>
            <p className="text-sm text-muted-foreground">
              10 ganchos × 5 corpos × 2 CTAs = 100 criativos prontos para rodar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <div className="rounded-xl overflow-hidden border border-primary/10 mb-6 w-full">
              <img src={screenshot2} alt="Configurações de processamento" className="w-full" />
            </div>
            <span className="font-mono-title text-xs text-primary tracking-wider mb-2">BÔNUS #3</span>
            <h3 className="text-lg font-bold mb-2">Masterclass de Copywriting</h3>
            <p className="text-sm text-muted-foreground">
              Aulas completas de copy para criativos que convertem de verdade.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
