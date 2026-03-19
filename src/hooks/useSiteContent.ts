import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export interface SiteContent {
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    description: string;
    ctaText: string;
    ctaUrl: string;
    youtubeId: string;
    videoSrc: string;
  };
  features: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    items: { title: string; description: string }[];
  };
  authority: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    stats: { value: string; label: string }[];
    ctaText: string;
  };
  showcase: {
    badge: string;
    title: string;
    titleHighlight: string;
    items: { badge: string; title: string; description: string }[];
  };
  faq: {
    badge: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  footer: {
    textLogo: string;
    textLogoHighlight: string;
    links: { label: string; url: string }[];
    copyright: string;
  };
  testimonials: {
    badge: string;
    title: string;
    description: string;
    videos: { src: string; name: string }[];
  };
}

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: "🔥 Créditos ILIMITADOS",
    headline: "Crie anúncios de alta conversão",
    headlineHighlight: "com IA.",
    subheadline: "Escale campanhas como nunca antes.",
    description: "Multiplique 50, 100, 200, 300 criativos por semana com um passo a passo que segue à risca o que o Meta Andromeda exige.",
    ctaText: "ENTRAR AGORA",
    ctaUrl: "https://deploysites.online/",
    youtubeId: "wYbHpveuQQs",
    videoSrc: "/videos/hero-video.mp4"
  },
  features: {
    badge: "O que você recebe",
    title: "A máquina de criativos que vai",
    titleHighlight: "escalar suas campanhas",
    description: "Tudo que media buyers de 6 e 7 dígitos usam para nunca ficar sem criativos novos.",
    items: [
      { title: "Estrutura Gancho + Corpo + CTA", description: "Monte criativos seguindo a fórmula que o Meta Andromeda exige: capture atenção, entregue valor e converta com CTAs poderosos." },
      { title: "Roteirista IA Integrado", description: "Copywriter com lógica de Erico Rocha, Ladeirinha e Hana embutido. Gere roteiros de alto impacto em segundos." },
      { title: "Multiplicação em Massa", description: "10 ganchos × 5 corpos × 2 CTAs = 100 criativos prontos. Produza em escala sem equipe de edição." },
      { title: "Descubra o que Converte", description: "Teste centenas de variações e encontre os criativos vencedores antes de investir pesado em mídia paga." },
      { title: "Processamento em Nuvem", description: "Seus vídeos são processados na nuvem. Não trava, não depende do seu computador, funciona 24h por dia." }
    ]
  },
  authority: {
    badge: "Quem criou isso",
    title: "Desenvolvido por quem",
    titleHighlight: "escala de verdade.",
    description: "São 10 anos de experiência em tecnologia condensados em uma ferramenta que resolve o maior gargalo de quem roda tráfego: a falta de criativos novos toda semana. Cada funcionalidade foi pensada para quem precisa de volume com qualidade.",
    stats: [
      { value: "10+", label: "Anos de experiência" },
      { value: "300+", label: "Criativos por semana" },
      { value: "24h", label: "Processamento em nuvem" }
    ],
    ctaText: "Quero começar agora"
  },
  showcase: {
    badge: "Por dentro do app",
    title: "Veja o que você vai ter",
    titleHighlight: "nas suas mãos",
    items: [
      { badge: "BÔNUS INCLUSO", title: "Roteirista IA Integrado", description: "Gere roteiros de alto impacto com IA treinada nas metodologias de Erico Rocha, Ladeirinha e Hana." },
      { badge: "FUNCIONALIDADE PRINCIPAL", title: "Multiplicação em Massa", description: "10 ganchos × 5 corpos × 2 CTAs = 100 criativos prontos para subir nas campanhas." }
    ]
  },
  faq: {
    badge: "Dúvidas",
    title: "Perguntas Frequentes",
    items: [
      { question: "O que exatamente eu recebo ao comprar?", answer: "Você recebe acesso completo ao aplicativo EscalaxPro..." },
      { question: "Preciso saber editar vídeo?", answer: "Não! O app faz todo o trabalho pesado por você..." },
      { question: "Quantos criativos consigo gerar por semana?", answer: "Com a lógica de multiplicação, você pode gerar facilmente 50 a 300 criativos por semana." },
      { question: "Funciona para qualquer nicho?", answer: "Sim! A lógica de concatenação funciona para qualquer vertical." },
      { question: "Funciona no Facebook e TikTok Ads?", answer: "Sim. Os criativos são exportados em formatos compatíveis." },
      { question: "Tem garantia?", answer: "Sim! Garantia incondicional de 7 dias." },
      { question: "Qual a forma de pagamento?", answer: "Aceitamos cartão de crédito (até 12x), PIX e boleto bancário." }
    ]
  },
  footer: {
    textLogo: "ESCALAX",
    textLogoHighlight: "PRO",
    links: [
      { label: "Termos de Uso", url: "#" },
      { label: "Política de Privacidade", url: "#" },
      { label: "Suporte", url: "#" }
    ],
    copyright: `© ${new Date().getFullYear()} EscalaxPro. Todos os direitos reservados.`
  },
  testimonials: {
    badge: "Depoimentos",
    title: "O que nossos clientes dizem",
    description: "Veja resultados reais de quem já usa a plataforma para escalar seus anúncios.",
    videos: [
      { src: "/videos/testimonial-1.mp4", name: "Cliente 1" },
      { src: "/videos/testimonial-2.mp4", name: "Cliente 2" },
      { src: "/videos/testimonial-3.mp4", name: "Cliente 3" },
      { src: "/videos/testimonial-4.mp4", name: "Cliente 4" }
    ]
  }
};

export function useSiteContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "landing_page_content")
        .single();
      
      if (error || !data || !data.value) return defaultSiteContent;
      
      const db = data.value as Partial<SiteContent>;
      
      // Merge seguro para garantir que chaves antigas não quebrem o site novo
      return {
        hero: { ...defaultSiteContent.hero, ...db.hero },
        features: { ...defaultSiteContent.features, ...db.features },
        authority: { ...defaultSiteContent.authority, ...db.authority },
        showcase: { ...defaultSiteContent.showcase, ...db.showcase },
        faq: { ...defaultSiteContent.faq, ...db.faq },
        footer: { ...defaultSiteContent.footer, ...db.footer },
        testimonials: { ...defaultSiteContent.testimonials, ...db.testimonials }
      } as SiteContent;
    }
  });

  const mutation = useMutation({
    mutationFn: async (newContent: SiteContent) => {
      // Update or insert the JSON payload into DB
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "landing_page_content", value: newContent }, { onConflict: "key" });
      
      if (error) throw error;
      return newContent;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["site_content"], data);
      toast({ title: "Salvo com sucesso!", description: "O site foi atualizado em tempo real." });
    },
    onError: (error) => {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    }
  });

  return {
    content: query.data || defaultSiteContent,
    isLoading: query.isLoading,
    updateContent: mutation.mutate,
    isSaving: mutation.isPending
  };
}
