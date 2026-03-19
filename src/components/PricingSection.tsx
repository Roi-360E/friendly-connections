import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Zap } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const DEFAULT_SIGNUP_URL = "https://deploysites.online/";

export interface PlanData {
  name: string;
  tokens: string;
  icon: string;
  price: string;
  period: string;
  highlight: boolean;
  url: string;
  badge: string;
  features: string[];
}

const PricingSection = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "pricing_plans")
        .single();
      
      if (data && !error) {
        setPlans(data.value as PlanData[]);
      } else {
        console.error("Erro ao carregar planos", error);
      }
      setLoading(false);
    }
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section id="planos" className="py-24 flex justify-center items-center min-h-[50vh]">
        <div className="text-xl font-bold text-gray-400 animate-pulse">Carregando planos dinâmicos...</div>
      </section>
    );
  }

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
          {plans.slice(0, 3).map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-6">
          {plans.slice(3).map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i + 3} />
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

interface PlanCardProps {
  plan: PlanData;
  index: number;
}

const PlanCard = ({ plan, index }: PlanCardProps) => {
  // Map string to Lucide component
  const IconComponent = (LucideIcons as any)[plan.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
          ⭐ {plan.badge}
        </div>
      )}

      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <div>
          <span className="text-base font-bold text-foreground">{plan.name}</span>
          <p className="text-xs text-muted-foreground">{plan.tokens}</p>
        </div>
      </div>

      <div className="mb-6 mt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-foreground">R$ {plan.price}</span>
          <span className="text-muted-foreground text-sm">{plan.period}</span>
        </div>
      </div>

      <div className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <div key={`${feature}-${i}`} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
        <div className="flex items-start gap-3 mt-4 pt-4 border-t border-border/50">
          <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <span className="text-sm font-semibold text-primary">1 token = 1 vídeo gerado</span>
        </div>
      </div>

      <a href={plan.url || DEFAULT_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className={`w-full text-lg py-6 rounded-xl hover:scale-[1.02] transition-all font-bold ${
            plan.highlight
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          Selecionar
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </a>
    </motion.div>
  );
};

export default PricingSection;
