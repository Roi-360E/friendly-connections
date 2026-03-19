import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanData } from "@/components/PricingSection";
import { useSiteContent, SiteContent } from "@/hooks/useSiteContent";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Pricing plans state
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [savingPlans, setSavingPlans] = useState(false);

  // Global Site Content state (Hero text, VSL, etc)
  const { content, isLoading: loadingContent, updateContent, isSaving: savingContent } = useSiteContent();
  const [localContent, setLocalContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  // Sync content hook into local state once loaded
  useEffect(() => {
    if (content) {
      setLocalContent(content);
    }
  }, [content]);

  const fetchPricingPlans = async () => {
    setLoadingPlans(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "pricing_plans")
      .single();
    
    if (data && !error) {
      setPlans(data.value as PlanData[]);
    }
    setLoadingPlans(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const updatePlanField = (index: number, field: keyof PlanData, value: string) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    setPlans(updated);
  };

  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const updated = [...plans];
    updated[planIndex].features[featureIndex] = value;
    setPlans(updated);
  };

  const handleSavePlans = async () => {
    setSavingPlans(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ value: plans })
      .eq("key", "pricing_plans");

    if (error) {
      toast({ title: "Erro ao salvar planos", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso!", description: "Os planos foram atualizados." });
    }
    setSavingPlans(false);
  };

  const handleSaveContent = async () => {
    if (localContent) {
      updateContent(localContent);
    }
  };

  if (loadingPlans || loadingContent || !localContent) {
    return <div className="p-8 text-center mt-10 font-bold text-lg">Carregando painel...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-500 font-medium">Edite todos os vídeos e textos da sua página aqui.</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="font-bold border-red-200 text-red-600 hover:bg-red-50">
            Encerrar Sessão
          </Button>
        </header>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="mb-8 p-1 h-auto flex flex-wrap bg-white shadow-sm border rounded-lg">
            <TabsTrigger value="hero" className="py-2.5 px-6 font-semibold">Topo / VSL</TabsTrigger>
            <TabsTrigger value="testimonials" className="py-2.5 px-6 font-semibold">Depoimentos</TabsTrigger>
            <TabsTrigger value="pricing" className="py-2.5 px-6 font-semibold">Planos de Preço</TabsTrigger>
            <TabsTrigger value="features" className="py-2.5 px-6 font-semibold opacity-50" disabled>Benefícios</TabsTrigger>
          </TabsList>

          {/* VSL HERO TAB */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-xl">Textos e Chamadas Iniciais</CardTitle>
                <CardDescription>O que o cliente lê logo ao abrir seu site.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Alerta (Badge Pequena)</label>
                  <Input 
                    value={localContent.hero.badge} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, badge: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Título Principal (Preto)</label>
                  <Input 
                    value={localContent.hero.headline} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, headline: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Palavra de Destaque (Cor Primária)</label>
                  <Input 
                    value={localContent.hero.headlineHighlight} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, headlineHighlight: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Subtítulo</label>
                  <Input 
                    value={localContent.hero.subheadline} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, subheadline: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600">Descrição Textual (Opcional)</label>
                  <Textarea 
                    rows={3}
                    value={localContent.hero.description} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, description: e.target.value }})} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-xl">Configurações de Vídeo e Botão</CardTitle>
                <CardDescription>Ajuste o VSL exibido e a ação do botão comprar.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">ID do Vídeo YouTube (Ex: wYbHpveuQQs)</label>
                  <Input 
                    value={localContent.hero.youtubeId} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, youtubeId: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Link do Arquivo MP4 Direto (Opcional)</label>
                  <Input 
                    value={localContent.hero.videoSrc} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, videoSrc: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Texto do Botão CTA</label>
                  <Input 
                    value={localContent.hero.ctaText} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, ctaText: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Link do Botão (Checkout)</label>
                  <Input 
                    value={localContent.hero.ctaUrl} 
                    onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, ctaUrl: e.target.value }})} 
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Tela Inicial"}
              </Button>
            </div>
          </TabsContent>

          {/* TESTIMONIALS TAB */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-xl">Textos da Seção</CardTitle>
                <CardDescription>Ajuste o título e textos de chamada dos depoimentos.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Alerta (Badge Pequena)</label>
                  <Input 
                    value={localContent.testimonials.badge} 
                    onChange={e => setLocalContent({...localContent, testimonials: { ...localContent.testimonials, badge: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Título Principal</label>
                  <Input 
                    value={localContent.testimonials.title} 
                    onChange={e => setLocalContent({...localContent, testimonials: { ...localContent.testimonials, title: e.target.value }})} 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-600">Descrição Textual</label>
                  <Textarea 
                    rows={2}
                    value={localContent.testimonials.description} 
                    onChange={e => setLocalContent({...localContent, testimonials: { ...localContent.testimonials, description: e.target.value }})} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Gerenciar Vídeos de Depoimentos</CardTitle>
                  <CardDescription>Insira o link .mp4 de arquivos hospedados na nuvem ou as rotas de seus arquivos locais</CardDescription>
                </div>
                <Button 
                  onClick={() => setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: [...localContent.testimonials.videos, { src: "", name: "Novo Cliente" }]}})} 
                  variant="outline"
                  className="font-bold border-primary text-primary hover:bg-primary/5"
                >
                  + Adicionar Vídeo
                </Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {localContent.testimonials.videos.map((vid, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-3 p-4 bg-gray-50 border rounded-lg items-start md:items-end">
                    <div className="space-y-1.5 w-full md:w-1/3">
                      <label className="text-xs font-bold text-gray-500 uppercase">Nome/Identificação</label>
                      <Input 
                        value={vid.name} 
                        onChange={(e) => {
                          const newVids = [...localContent.testimonials.videos];
                          newVids[idx].name = e.target.value;
                          setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: newVids }});
                        }} 
                      />
                    </div>
                    <div className="space-y-1.5 w-full md:w-full">
                      <label className="text-xs font-bold text-gray-500 uppercase">Link do Vídeo (.mp4 URL externa ou interna)</label>
                      <Input 
                        value={vid.src} 
                        onChange={(e) => {
                          const newVids = [...localContent.testimonials.videos];
                          newVids[idx].src = e.target.value;
                          setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: newVids }});
                        }} 
                      />
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        const newVids = localContent.testimonials.videos.filter((_, i) => i !== idx);
                        setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: newVids }});
                      }}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Depoimentos"}
              </Button>
            </div>
          </TabsContent>

          {/* PRICING TAB */}
          <TabsContent value="pricing" className="space-y-8">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
               <h2 className="font-semibold text-lg">Editor de Preços</h2>
               <Button variant="default" onClick={handleSavePlans} disabled={savingPlans} className="font-bold">
                  {savingPlans ? "Salvando planos..." : "Salvar Cards de Preço"}
                </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {plans.map((plan, pIdx) => (
                <Card key={pIdx} className="shadow-md">
                  <CardHeader className="bg-gray-50/50 pb-4 border-b">
                    <CardTitle className="text-lg text-primary">{plan.name}</CardTitle>
                    <CardDescription>Ajuste os valores exibidos neste card</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                     {/* Same inputs as before */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Nome do Plano</label>
                      <Input value={plan.name} onChange={(e) => updatePlanField(pIdx, "name", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Preço</label>
                        <Input value={plan.price} onChange={(e) => updatePlanField(pIdx, "price", e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Tokens</label>
                        <Input value={plan.tokens} onChange={(e) => updatePlanField(pIdx, "tokens", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Link de Checkout</label>
                      <Input value={plan.url} onChange={(e) => updatePlanField(pIdx, "url", e.target.value)} />
                    </div>
                    
                    <div className="pt-4 space-y-3">
                      <label className="text-xs font-bold text-gray-500 uppercase border-b pb-1 flex w-full">Benefícios do Plano</label>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex gap-2">
                          <Input 
                            value={feat} 
                            onChange={(e) => updateFeature(pIdx, fIdx, e.target.value)} 
                            className="text-sm h-8"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
