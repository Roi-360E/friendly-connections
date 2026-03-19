import { motion } from "framer-motion";
import { Layers, Brain, BarChart3, Repeat, Shield } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

// Icon mapping based on index or title
const iconMap = [Layers, Brain, Repeat, BarChart3, Shield, Layers];

const FeaturesSection = () => {
  const { content } = useSiteContent();
  const { features } = content;

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
            <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-widest">{features.badge}</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mt-3 mb-4 md:mb-5 tracking-tight text-foreground">
              {features.title}{" "}
              <span className="text-primary">{features.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              {features.description}
            </p>
          </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.items.map((feature, index) => {
              const Icon = iconMap[index % iconMap.length];
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-5 md:p-8 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )})}
          </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
