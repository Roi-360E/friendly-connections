import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />

          <div className="relative z-10">
            <Sparkles className="w-10 h-10 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-5">
              Pronto para transformar sua carreira?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Junte-se a mais de 10.000 alunos que já estão construindo o futuro que sempre sonharam.
            </p>
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 text-lg px-10 py-6 rounded-xl shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Começar agora — É grátis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
