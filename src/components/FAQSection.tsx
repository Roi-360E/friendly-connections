import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é a lógica de Gancho + Corpo + CTA?",
    answer: "É a estrutura usada pelos maiores players de anúncios. O Gancho prende a atenção nos 3 primeiros segundos, o Corpo gera desejo com uma explicação lógica, e o CTA converte com uma chamada para ação. O Escalax combina todas as variações automaticamente.",
  },
  {
    question: "Quantos criativos consigo gerar?",
    answer: "Depende do seu plano. No plano Starter você gera até 50 criativos/mês, e no Pro e Agency os criativos são ilimitados. Com 10 ganchos, 5 corpos e 2 CTAs, por exemplo, você gera 100 criativos únicos em uma única leva.",
  },
  {
    question: "O teste grátis é realmente gratuito?",
    answer: "Sim! Você tem 7 dias completos para testar a plataforma sem precisar informar cartão de crédito. Se gostar, escolha um plano mensal. Se não gostar, é só não assinar — sem compromisso.",
  },
  {
    question: "Posso mudar de plano ou cancelar a qualquer momento?",
    answer: "Sim! Você pode fazer upgrade, downgrade ou cancelar seu plano mensal quando quiser, direto pelo app. Sem burocracia, sem multa.",
  },
  {
    question: "Funciona para qualquer nicho?",
    answer: "Sim! A lógica de concatenação funciona para qualquer vertical: e-commerce, infoprodutos, serviços locais, apps, SaaS e mais.",
  },
  {
    question: "Funciona no Facebook e TikTok Ads?",
    answer: "Sim. Os criativos são exportados em formatos compatíveis com todas as plataformas: Facebook, Instagram, TikTok, YouTube e Google Ads.",
  },
  {
    question: "Qual a forma de pagamento?",
    answer: "Aceitamos cartão de crédito, PIX e boleto bancário. O pagamento é recorrente mensal, e você pode cancelar quando quiser.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative grid-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono-title text-xs text-primary tracking-widest uppercase mb-4 block font-bold">
            Dúvidas
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Perguntas Frequentes</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <AccordionItem value={`item-${index}`} className="glass-card rounded-xl px-6 border-0">
                  <AccordionTrigger className="text-left text-sm font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
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
