import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "Grátis",
    period: "",
    description: "Ideal para experimentar a plataforma",
    features: [
      "5 cursos gratuitos",
      "Comunidade básica",
      "Certificados digitais",
      "Suporte por email",
    ],
    popular: false,
    cta: "Começar grátis",
  },
  {
    name: "Pro",
    price: "R$ 49",
    period: "/mês",
    description: "Para quem leva o aprendizado a sério",
    features: [
      "Acesso ilimitado a todos os cursos",
      "IA de aprendizado personalizado",
      "Projetos práticos com mentoria",
      "Comunidade premium",
      "Certificados reconhecidos",
      "Suporte prioritário 24/7",
    ],
    popular: true,
    cta: "Assinar agora",
  },
  {
    name: "Empresas",
    price: "Sob consulta",
    period: "",
    description: "Treine sua equipe com eficiência",
    features: [
      "Tudo do plano Pro",
      "Dashboard de gestão",
      "Trilhas personalizadas",
      "Relatórios avançados",
      "API de integração",
      "Gerente de conta dedicado",
    ],
    popular: false,
    cta: "Falar com vendas",
  },
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
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Preços</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Invista no seu{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">futuro</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Planos flexíveis que cabem no seu bolso. Comece grátis e evolua quando quiser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-2xl border relative ${
                plan.popular
                  ? "bg-card border-primary shadow-2xl shadow-primary/10 scale-105"
                  : "bg-card border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Mais popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <Button
                className={`w-full py-6 rounded-xl text-base font-semibold mb-8 ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {plan.cta}
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
