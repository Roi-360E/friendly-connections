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
      "Criativos ILIMITADOS",
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
    name: "Vitalício",
    icon: Flame,
    price: "497",
    period: "único",
    highlight: false,
    badge: "MELHOR CUSTO",
    features: [
      "Tudo do Pro para sempre",
      "Créditos ILIMITADOS",
      "Sem mensalidade nunca mais",
      "Acesso a todas as atualizações",
      "Suporte VIP via WhatsApp",
      "Onboarding dedicado",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs text-primary tracking-widest uppercase mb-4 block font-bold">
            Planos
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight text-foreground">
            Escolha como você quer{" "}
            <span className="text-primary">escalar seus criativos.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Garantia incondicional de 7 dias. Não gostou? Devolvemos 100% do seu dinheiro.
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
              className={`rounded-3xl p-8 relative overflow-hidden flex flex-col bg-background border ${
                plan.highlight
                  ? "border-primary shadow-xl shadow-primary/10 scale-[1.03]"
                  : "border-border"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              )}
              {plan.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <plan.icon className="w-5 h-5 text-primary" />
                <span className="text-sm text-primary font-bold uppercase">{plan.name}</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-foreground">R$ {plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className={`w-full text-lg py-6 rounded-xl hover:scale-[1.02] transition-all font-bold uppercase ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "bg-card border border-border text-foreground hover:border-primary/40"
                  }`}
                >
                  QUERO ESSE PLANO
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Garantia de 7 dias • Cancele quando quiser • Pagamento seguro</span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
