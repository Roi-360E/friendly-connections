import { motion } from "framer-motion";
import { Layers, Brain, BarChart3, Repeat, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Estrutura Gancho + Corpo + CTA",
    description: "Monte criativos seguindo a fórmula comprovada: capture atenção, entregue valor e converta com CTAs poderosos.",
  },
  {
    icon: Brain,
    title: "Geração com IA",
    description: "Inteligência artificial que sugere variações de copy, headlines e CTAs otimizados para sua audiência.",
  },
  {
    icon: Repeat,
    title: "Produção em Massa",
    description: "Gere dezenas de combinações de criativos em poucos cliques. Teste mais, descubra o que converte.",
  },
  {
    icon: BarChart3,
    title: "Analytics de Performance",
    description: "Acompanhe quais ganchos, corpos e CTAs performam melhor e otimize suas campanhas.",
  },
  {
    icon: Shield,
    title: "Garantia de 7 Dias",
    description: "Teste sem risco. Se não multiplicar seus criativos, devolvemos 100% do seu investimento.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative" id="funcionalidades">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Funcionalidades</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Tudo que você precisa para{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">escalar criativos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ferramentas poderosas para criar, testar e otimizar seus anúncios em escala.
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
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
