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
      
      if (error || !data) return defaultSiteContent;
      return data.value as SiteContent;
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
