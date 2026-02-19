import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Acesso completo ao App Escalax",
  "Geração de criativos em massa ilimitada",
  "Estrutura Gancho + Corpo + CTA",
  "IA para sugestões de copy",
  "Todos os templates premium",
  "Analytics de performance",
  "Exportação em massa",
  "Aulas completas de tráfego pago",
  "Módulos de copywriting avançado",
  "Comunidade exclusiva de alunos",
  "Atualizações vitalícias",
  "Suporte prioritário",
];

const PricingSection = () => {
  return (
    <section className="py-24" id="precos">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Oferta especial</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Tudo em um{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">único acesso</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            App + Aulas completas. Tudo o que você precisa para escalar seus criativos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto p-10 rounded-2xl border border-primary bg-card shadow-2xl shadow-primary/10 relative"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Acesso completo
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Escalax + Aulas</h3>
            <p className="text-muted-foreground text-sm mb-6">App completo + curso de criativos que convertem</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-muted-foreground line-through text-lg">R$ 497</span>
              <span className="text-5xl font-bold">R$ 297</span>
            </div>
            <span className="text-muted-foreground text-sm">pagamento único · acesso vitalício</span>
          </div>

          <Button
            className="w-full py-6 rounded-xl text-base font-semibold mb-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            Garantir meu acesso agora
          </Button>

          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <p className="text-center text-muted-foreground text-xs mt-8">
            🔒 Garantia de 7 dias ou seu dinheiro de volta
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
