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
    <section className="py-24 bg-card" id="funcionalidades">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-sm uppercase tracking-widest">O que você recebe</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-5 uppercase tracking-tight text-foreground">
            A máquina de criativos que vai{" "}
            <span className="text-primary">escalar suas campanhas</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tudo que media buyers de 6 e 7 dígitos usam para nunca ficar sem criativos novos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
