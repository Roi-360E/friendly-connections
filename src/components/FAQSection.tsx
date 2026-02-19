import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o período de teste gratuito?",
    answer: "Você pode começar a usar a plataforma gratuitamente com acesso a 5 cursos completos. Não pedimos cartão de crédito. Quando quiser acesso completo, basta fazer upgrade para o plano Pro.",
  },
  {
    question: "Os certificados são reconhecidos pelo mercado?",
    answer: "Sim! Nossos certificados são emitidos com verificação digital e são reconhecidos por empresas parceiras. Muitos alunos incluem no LinkedIn e recebem oportunidades.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Absolutamente. Sem multas, sem burocracia. Você pode cancelar diretamente pela plataforma e manterá acesso até o final do período pago.",
  },
  {
    question: "Como funciona a IA de aprendizado?",
    answer: "Nossa IA analisa seu desempenho nos exercícios, tempo de estudo e preferências para adaptar o conteúdo ao seu ritmo. Ela sugere revisões, identifica pontos fracos e otimiza sua trilha de aprendizado.",
  },
  {
    question: "Qual a garantia de satisfação?",
    answer: "Oferecemos 30 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeito, devolvemos 100% do valor investido, sem perguntas.",
  },
  {
    question: "Há suporte para dúvidas técnicas?",
    answer: "Sim! Além do suporte por email e chat, assinantes Pro têm acesso a fóruns exclusivos com mentores e plantões de dúvidas ao vivo semanais.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-muted/50" id="faq">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Perguntas{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">frequentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tire suas dúvidas antes de começar.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg data-[state=open]:border-primary/20 transition-all">
                  <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
