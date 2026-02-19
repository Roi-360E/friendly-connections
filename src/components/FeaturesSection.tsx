import { motion } from "framer-motion";
import { BookOpen, Brain, BarChart3, Users, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Aprendizado Inteligente",
    description: "IA que adapta o conteúdo ao seu nível e ritmo de aprendizado, garantindo máxima absorção.",
  },
  {
    icon: BookOpen,
    title: "Conteúdo Premium",
    description: "Cursos criados por especialistas renomados, com material atualizado e exercícios práticos.",
  },
  {
    icon: BarChart3,
    title: "Progresso Visual",
    description: "Dashboards intuitivos para acompanhar sua evolução e identificar áreas de melhoria.",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Conecte-se com milhares de alunos, tire dúvidas e participe de projetos colaborativos.",
  },
  {
    icon: Zap,
    title: "Certificados Reconhecidos",
    description: "Certificações aceitas pelo mercado que valorizam seu currículo e abrem portas.",
  },
  {
    icon: Shield,
    title: "Garantia de 30 Dias",
    description: "Teste sem risco. Se não ficar satisfeito, devolvemos 100% do seu investimento.",
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
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">aprender de verdade</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ferramentas poderosas pensadas para transformar sua experiência de aprendizado.
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
