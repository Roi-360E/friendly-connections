import { motion } from "framer-motion";
import { Layers, Brain, BarChart3, Repeat, Shield } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Estrutura Gancho + Corpo + CTA",
    description: "Monte criativos seguindo a fórmula que o Meta Andromeda exige: capture atenção, entregue valor e converta com CTAs poderosos.",
  },
  {
    icon: Brain,
    title: "Roteirista IA Integrado",
    description: "Copywriter com lógica de Erico Rocha, Ladeirinha e Hana embutido. Gere roteiros de alto impacto em segundos.",
  },
  {
    icon: Repeat,
    title: "Multiplicação em Massa",
    description: "10 ganchos × 5 corpos × 2 CTAs = 100 criativos prontos. Produza em escala sem equipe de edição.",
  },
  {
    icon: BarChart3,
    title: "Descubra o que Converte",
    description: "Teste centenas de variações e encontre os criativos vencedores antes de investir pesado em mídia paga.",
  },
  {
    icon: Shield,
    title: "Processamento em Nuvem",
    description: "Seus vídeos são processados na nuvem. Não trava, não depende do seu computador, funciona 24h por dia.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24" id="funcionalidades">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-widest">O que você recebe</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mt-3 mb-4 md:mb-5 tracking-tight text-foreground">
            A máquina de criativos que vai{" "}
            <span className="text-primary">escalar suas campanhas</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            Tudo que media buyers de 6 e 7 dígitos usam para nunca ficar sem criativos novos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-5 md:p-8 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
