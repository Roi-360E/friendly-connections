import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Acesso completo ao App Escalax",
  "Multiplique 1 criativo em 100+ automaticamente",
  "Lógica de concatenação Gancho + Corpo + CTA",
  "IA integrada para geração de roteiros",
  "Masterclass de Copywriting de Verdade",
  "Como gravar criativos que vendem",
  "Templates de roteiros prontos",
  "Exportação em massa de criativos",
  "Processamento rápido (menos de 1 minuto)",
  "Atualizações vitalícias",
  "Suporte prioritário",
];

const PricingSection = () => {
  return (
    <section id="oferta" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/8 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono-title text-xs text-primary tracking-widest uppercase mb-4 block">
            Oferta Especial
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Sua Escala Infinita por um{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Preço Ridículo.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />

            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-mono-title text-sm text-primary font-semibold">ESCALAX + AULAS</span>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-muted-foreground line-through text-xl">R$ 497,00</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  R$ 67
                </span>
                <span className="text-2xl font-bold text-foreground">,90</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Pagamento único • Acesso vitalício</p>
            </div>

            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full neon-btn text-primary-foreground text-lg py-7 rounded-xl border-0 hover:scale-105 transition-all shadow-lg shadow-primary/25"
            >
              QUERO MEU ACESSO AGORA
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Garantia incondicional de 7 dias</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
