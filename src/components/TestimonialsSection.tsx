import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Lucas Ferreira",
    role: "Gestor de Tráfego",
    content: "Com o Escalax, passei de 5 para 50 criativos por semana. Meu ROAS dobrou porque consigo testar muito mais variações.",
    rating: 5,
  },
  {
    name: "Mariana Costa",
    role: "Media Buyer",
    content: "A estrutura de Gancho + Corpo + CTA simplificou demais meu processo. Criativos que antes levavam horas, faço em minutos.",
    rating: 5,
  },
  {
    name: "Rafael Souza",
    role: "Dono de Agência",
    content: "Minha equipe produz 10x mais criativos. O Escalax virou ferramenta obrigatória na agência para todos os clientes.",
    rating: 5,
  },
  {
    name: "Camila Rocha",
    role: "Infoprodutora",
    content: "Descobri combinações de ganchos que nunca teria pensado sozinha. Minhas campanhas no Meta Ads nunca performaram tão bem.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/50" id="depoimentos">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Quem escala,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">recomenda</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja como profissionais de marketing estão multiplicando resultados com o Escalax.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border relative"
            >
              <Quote className="w-10 h-10 text-primary/15 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 text-lg">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
