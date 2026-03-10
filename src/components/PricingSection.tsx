import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Zap, Crown, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const SIGNUP_URL = "https://deploysites.online/";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "47",
    period: "/mês",
    highlight: false,
    features: [
      "Até 50 criativos/mês",
      "Lógica Gancho + Corpo + CTA",
      "Exportação em HD",
      "Templates básicos de roteiro",
      "Suporte por email",
    ],
  },
  {
    name: "Pro",
    icon: Crown,
    price: "97",
    period: "/mês",
    highlight: true,
    badge: "MAIS POPULAR",
    features: [
      "Criativos ilimitados",
      "Lógica Gancho + Corpo + CTA",
      "IA integrada para roteiros",
      "Exportação em massa (HD/4K)",
      "Templates premium de roteiro",
      "Analytics de performance",
      "Suporte prioritário",
      "Atualizações em primeira mão",
    ],
  },
  {
    name: "Agency",
    icon: Flame,
    price: "197",
    period: "/mês",
    highlight: false,
    features: [
      "Tudo do Pro +",
      "Multi-contas (até 10 marcas)",
      "API de integração",
      "Relatórios white-label",
      "Onboarding dedicado",
      "Suporte VIP via WhatsApp",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/8 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="font-mono-title text-xs text-primary tracking-widest uppercase mb-4 block">
            Planos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Escale seus criativos com o{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              plano certo para você.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Teste grátis por 7 dias. Sem cartão de crédito. Cancele quando quiser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col ${
                plan.highlight
                  ? "border-primary/40 shadow-xl shadow-primary/10 scale-[1.03]"
                  : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
              )}
              {plan.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <plan.icon className="w-5 h-5 text-primary" />
                <span className="font-mono-title text-sm text-primary font-semibold">{plan.name}</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    R$ {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className={`w-full text-lg py-6 rounded-xl border-0 hover:scale-105 transition-all ${
                    plan.highlight
                      ? "neon-btn text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card border border-border text-foreground hover:border-primary/40"
                  }`}
                >
                  COMEÇAR TESTE GRÁTIS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">7 dias grátis • Cancele a qualquer momento • Sem compromisso</span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
