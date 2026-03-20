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
import { Trash2, Plus, RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [savingPlans, setSavingPlans] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { content, isLoading: loadingContent, updateContent, isSaving: savingContent } = useSiteContent();
  const [localContent, setLocalContent] = useState<SiteContent | null>(null);
  const queryClient = useQueryClient();

  const handleHardRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["site_content"] });
    toast({ title: "Atualizando...", description: "Buscando dados mais recentes do servidor." });
  };

  useEffect(() => {
    fetchPricingPlans();
  }, []);

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

  const updatePlanField = (index: number, field: keyof PlanData, value: string | boolean) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    setPlans(updated);
  };

  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const updated = [...plans];
    updated[planIndex].features[featureIndex] = value;
    setPlans(updated);
  };

  const addPlanFeature = (planIndex: number) => {
    const updated = [...plans];
    updated[planIndex].features.push("Novo Benefício");
    setPlans(updated);
  };

  const removePlanFeature = (planIndex: number, featureIndex: number) => {
    const updated = [...plans];
    updated[planIndex].features = updated[planIndex].features.filter((_, i) => i !== featureIndex);
    setPlans(updated);
  };

  const handleAddPlan = () => {
    setPlans([...plans, {
      name: "Novo Plano",
      tokens: "0 tokens",
      icon: "Star",
      price: "0,00",
      period: "/mês",
      highlight: false,
      url: "",
      badge: "Novo",
      features: ["Benefício 1", "Benefício 2"]
    }]);
  };

  const handleRemovePlan = (idx: number) => {
    setPlans(plans.filter((_, i) => i !== idx));
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
      // Add timestamp to videoSrc to bust cache on site
      const updatedHero = { ...localContent.hero };
      if (updatedHero.videoSrc) {
        const separator = updatedHero.videoSrc.includes('?') ? '&' : '?';
        updatedHero.videoSrc = updatedHero.videoSrc.split('?v=')[0] + `${separator}v=${Date.now()}`;
      }
      updateContent({ ...localContent, hero: updatedHero });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('site_media')
      .upload(filePath, file);

    if (uploadError) {
      let msg = uploadError.message;
      if (msg.toLowerCase().includes("size") || msg.toLowerCase().includes("exceeded")) {
        msg = "O arquivo é muito grande para o seu limite atual do Supabase. Siga o 'Passo 3' do guia para aumentar para 500MB.";
      }
      toast({ title: "Erro no upload", description: msg, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('site_media').getPublicUrl(filePath);
    callback(data.publicUrl);
    setUploading(false);
    toast({ title: "Arquivo enviado com sucesso!" });
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
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleHardRefresh} className="font-bold text-gray-500 border-gray-200">
              <RefreshCw className="w-4 h-4 mr-1" /> Forçar Sincronização
            </Button>
            <Button variant="outline" onClick={handleLogout} className="font-bold border-red-200 text-red-600 hover:bg-red-50">
              Encerrar Sessão
            </Button>
          </div>
        </header>

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500 font-medium">Você navegou para o Painel Global. Você precisa clicar no botão de <strong className="text-primary border-b border-primary">"Salvar {'>'}"</strong> referente à área visível que estiver alterando!</p>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="mb-8 p-1 h-auto flex flex-wrap bg-white shadow-sm border rounded-lg">
            <TabsTrigger value="hero" className="py-2.5 px-6 font-semibold">Topo / VSL</TabsTrigger>
            <TabsTrigger value="features" className="py-2.5 px-6 font-semibold">Benefícios</TabsTrigger>
            <TabsTrigger value="showcase" className="py-2.5 px-6 font-semibold">Por Dentro do App</TabsTrigger>
            <TabsTrigger value="authority" className="py-2.5 px-6 font-semibold">Autoridade</TabsTrigger>
            <TabsTrigger value="testimonials" className="py-2.5 px-6 font-semibold">Depoimentos</TabsTrigger>
            <TabsTrigger value="faq" className="py-2.5 px-6 font-semibold">FAQ</TabsTrigger>
            <TabsTrigger value="images" className="py-2.5 px-6 font-semibold text-purple-600 bg-purple-50">🖼️ Imagens</TabsTrigger>
            <TabsTrigger value="pricing" className="py-2.5 px-6 font-semibold text-primary bg-primary/5">Planos de Preço</TabsTrigger>
            <TabsTrigger value="footer" className="py-2.5 px-6 font-semibold">Rodapé</TabsTrigger>
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
              <CardContent className="pt-6 space-y-5">
                <div className="p-5 bg-gray-50 border rounded-xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Formato do Vídeo</label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                        value={localContent.hero.videoAspectRatio || "horizontal"}
                        onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, videoAspectRatio: e.target.value as any }})}
                      >
                        <option value="horizontal">Horizontal — YouTube / Widescreen (16:9)</option>
                        <option value="vertical">Vertical — Story / Reels / TikTok (9:16)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">
                        {uploading ? (
                          <span className="text-blue-500 animate-pulse">Enviando Vídeo...</span>
                        ) : (
                          "Fazer Novo Upload (MP4)"
                        )}
                      </label>
                      <Input 
                        type="file" accept="video/mp4,video/webm"
                        disabled={uploading}
                        className="bg-white cursor-pointer"
                        onChange={e => handleFileUpload(e, url => {
                          const history = localContent.hero.vslHistory || [];
                          setLocalContent({
                            ...localContent, 
                            hero: { 
                              ...localContent.hero, 
                              videoSrc: url,
                              vslHistory: [url, ...history.filter(v => v !== url)].slice(0, 10)
                            }
                          });
                        })} 
                      />
                    </div>
                  </div>

                  {/* VSL HISTORY LIBRARY */}
                  {(localContent.hero.vslHistory?.length > 0) && (
                    <div className="pt-4 border-t">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">
                        📚 Biblioteca de Vídeos (Histórico)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {localContent.hero.vslHistory.map((videoUrl, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setLocalContent({...localContent, hero: { ...localContent.hero, videoSrc: videoUrl }})}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 ${localContent.hero.videoSrc === videoUrl ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-300'}`}
                          >
                            <video src={videoUrl} className="w-full h-full object-cover pointer-events-none" preload="metadata" />
                            {localContent.hero.videoSrc === videoUrl && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Ativo</span>
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                              <p className="text-[8px] text-white truncate">{videoUrl.split('/').pop()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 italic">* Clique em um vídeo acima para selecioná-lo como o VSL oficial do site.</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Texto do Botão CTA</label>
                    <Input 
                      value={localContent.hero.ctaText} 
                      onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, ctaText: e.target.value }})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Link do Botão (Checkout)</label>
                    <Input 
                      value={localContent.hero.ctaUrl} 
                      onChange={e => setLocalContent({...localContent, hero: { ...localContent.hero, ctaUrl: e.target.value }})} 
                    />
                  </div>

                  {/* LIVE PREVIEW OF SELECTED VSL */}
                  {localContent.hero.videoSrc && (
                    <div className="p-4 bg-slate-900 rounded-xl border-4 border-slate-800 shadow-inner">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          📺 Prévia do VSL Selecionado (Local)
                        </label>
                        {localContent.hero.videoSrc !== content.hero.videoSrc && (
                          <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                            ⚠️ NÃO SALVO NO SITE
                          </span>
                        )}
                      </div>
                      <div className={`relative mx-auto overflow-hidden rounded-lg bg-black ${localContent.hero.videoAspectRatio === 'vertical' ? 'aspect-[9/16] max-w-[180px]' : 'aspect-video w-full max-w-[400px]'}`}>
                        <video 
                          key={localContent.hero.videoSrc}
                          src={localContent.hero.videoSrc} 
                          controls 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {localContent.hero.videoSrc !== content.hero.videoSrc && (
                        <p className="text-center text-amber-400 text-[11px] font-bold mt-3">
                          Você selecionou um novo vídeo. Clique em "Salvar Tela Inicial" abaixo para publicar!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Tela Inicial >"}
              </Button>
            </div>
          </TabsContent>

          {/* FEATURES TAB */}
          <TabsContent value="features" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Benefícios</CardTitle>
                  <CardDescription>Ajuste o título e textos dos blocos de benefícios (Cards).</CardDescription>
                </div>
                <Button 
                  onClick={() => setLocalContent({...localContent, features: { ...localContent.features, items: [...localContent.features.items, { title: "Novo Benefício", description: "" }]}})} 
                  variant="outline"
                  className="font-bold border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-1" /> Adicionar Bloco
                </Button>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Título</label>
                    <Input value={localContent.features.title} onChange={e => setLocalContent({...localContent, features: { ...localContent.features, title: e.target.value }})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Destaque</label>
                    <Input value={localContent.features.titleHighlight} onChange={e => setLocalContent({...localContent, features: { ...localContent.features, titleHighlight: e.target.value }})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Descrição</label>
                  <Textarea rows={2} value={localContent.features.description} onChange={e => setLocalContent({...localContent, features: { ...localContent.features, description: e.target.value }})} />
                </div>
                <hr className="my-2" />
                <h3 className="font-bold text-sm uppercase text-gray-500">Blocos de Benefícios (Cards)</h3>
                {localContent.features.items.map((feat, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white border shadow-sm rounded-lg relative items-start">
                    <div className="flex-1 space-y-3">
                       <label className="text-xs font-bold text-gray-500 uppercase">Título do Benefício</label>
                       <Input value={feat.title} onChange={e => {
                         const n = [...localContent.features.items];
                         n[idx].title = e.target.value;
                         setLocalContent({...localContent, features: {...localContent.features, items: n}});
                       }} placeholder="Ex: Roteirista IA" />
                       <label className="text-xs font-bold text-gray-500 uppercase">Descrição Textual</label>
                       <Textarea value={feat.description} rows={2} onChange={e => {
                         const n = [...localContent.features.items];
                         n[idx].description = e.target.value;
                         setLocalContent({...localContent, features: {...localContent.features, items: n}});
                       }} placeholder="Explicação detalhada..." />
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        const n = localContent.features.items.filter((_, i) => i !== idx);
                        setLocalContent({...localContent, features: { ...localContent.features, items: n }});
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Benefícios >"}
              </Button>
            </div>
          </TabsContent>

          {/* SHOWCASE TAB */}
          <TabsContent value="showcase" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Por Dentro do App (Showcase)</CardTitle>
                  <CardDescription>Ajuste os textos da visualização interna do seu App.</CardDescription>
                </div>
                <Button 
                  onClick={() => setLocalContent({...localContent, showcase: { ...localContent.showcase, items: [...localContent.showcase.items, { badge: "NOVO", title: "Item Adicionado", description: "" }]}})} 
                  variant="outline"
                  className="font-bold border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-1" /> Adicionar Bloco Showocase
                </Button>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Título</label>
                    <Input value={localContent.showcase.title} onChange={e => setLocalContent({...localContent, showcase: { ...localContent.showcase, title: e.target.value }})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Destaque</label>
                    <Input value={localContent.showcase.titleHighlight} onChange={e => setLocalContent({...localContent, showcase: { ...localContent.showcase, titleHighlight: e.target.value }})} />
                  </div>
                </div>
                <hr className="my-2" />
                <h3 className="font-bold text-sm uppercase text-gray-500">Dois Blocos de Imagem</h3>
                {localContent.showcase.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white border shadow-sm rounded-lg relative items-start">
                    <div className="flex-1 space-y-3">
                       <label className="text-xs font-bold text-gray-500 uppercase">Badge/Selo superior</label>
                       <Input value={item.badge} onChange={e => {
                         const n = [...localContent.showcase.items];
                         n[idx].badge = e.target.value;
                         setLocalContent({...localContent, showcase: {...localContent.showcase, items: n}});
                       }} />
                       <label className="text-xs font-bold text-gray-500 uppercase">Título</label>
                       <Input value={item.title} onChange={e => {
                         const n = [...localContent.showcase.items];
                         n[idx].title = e.target.value;
                         setLocalContent({...localContent, showcase: {...localContent.showcase, items: n}});
                       }} />
                       <label className="text-xs font-bold text-gray-500 uppercase">Descrição</label>
                       <Textarea value={item.description} rows={2} onChange={e => {
                         const n = [...localContent.showcase.items];
                         n[idx].description = e.target.value;
                         setLocalContent({...localContent, showcase: {...localContent.showcase, items: n}});
                       }} />
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        const n = localContent.showcase.items.filter((_, i) => i !== idx);
                        setLocalContent({...localContent, showcase: { ...localContent.showcase, items: n }});
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Showcase >"}
              </Button>
            </div>
          </TabsContent>

          {/* AUTHORITY TAB */}
          <TabsContent value="authority" className="space-y-6">
             <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Seção Sobre a Ferramenta / Autoridade</CardTitle>
                  <CardDescription>Ajuste as estatísticas e os botões.</CardDescription>
                </div>
                <Button 
                  onClick={() => setLocalContent({...localContent, authority: { ...localContent.authority, stats: [...localContent.authority.stats, { value: "0", label: "Novo Dado" }]}})} 
                  variant="outline"
                  className="font-bold border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-1" /> Adicionar Célula
                </Button>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Título</label>
                    <Input value={localContent.authority.title} onChange={e => setLocalContent({...localContent, authority: { ...localContent.authority, title: e.target.value }})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Destaque</label>
                    <Input value={localContent.authority.titleHighlight} onChange={e => setLocalContent({...localContent, authority: { ...localContent.authority, titleHighlight: e.target.value }})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Descrição</label>
                  <Textarea rows={3} value={localContent.authority.description} onChange={e => setLocalContent({...localContent, authority: { ...localContent.authority, description: e.target.value }})} />
                </div>
                <hr className="my-2" />
                <h3 className="font-bold text-sm uppercase text-gray-500">Números Relevantes (Stats)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {localContent.authority.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 border rounded-lg shadow-sm space-y-3 bg-white relative">
                       <div className="absolute top-2 right-2">
                         <Button 
                           variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                           onClick={() => {
                             const n = localContent.authority.stats.filter((_, i) => i !== idx);
                             setLocalContent({...localContent, authority: { ...localContent.authority, stats: n }});
                           }}
                         >
                           <Trash2 className="w-4 h-4" />
                         </Button>
                       </div>
                       <label className="text-xs font-bold text-gray-500 uppercase">Valor</label>
                       <Input value={stat.value} placeholder="Ex: 10+" onChange={e => {
                         const n = [...localContent.authority.stats];
                         n[idx].value = e.target.value;
                         setLocalContent({...localContent, authority: {...localContent.authority, stats: n}});
                       }} />
                       <label className="text-xs font-bold text-gray-500 uppercase">Rótulo / Descrição</label>
                       <Input value={stat.label} placeholder="Ex: Anos de mercado" onChange={e => {
                         const n = [...localContent.authority.stats];
                         n[idx].label = e.target.value;
                         setLocalContent({...localContent, authority: {...localContent.authority, stats: n}});
                       }} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Estatísticas >"}
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
                  <CardDescription>Faça upload dos vídeos nativos dos seus clientes</CardDescription>
                </div>
                <Button 
                  onClick={() => setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: [...localContent.testimonials.videos, { src: "", name: "Novo Cliente", aspectRatio: "horizontal" }]}})} 
                  variant="outline"
                  className="font-bold border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-1" /> Adicionar Bloco
                </Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {localContent.testimonials.videos.map((vid, idx) => (
                  <div key={idx} className="p-5 bg-gray-50 border rounded-xl space-y-4 relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Depoimento #{idx + 1}</span>
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newVids = localContent.testimonials.videos.filter((_, i) => i !== idx);
                          setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: newVids }});
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remover
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nome / Identificação</label>
                        <Input 
                          value={vid.name} 
                          placeholder="Ex: João Silva"
                          onChange={(e) => {
                            const newVids = [...localContent.testimonials.videos];
                            newVids[idx].name = e.target.value;
                            setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: newVids }});
                          }} 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Formato do Vídeo</label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                          value={vid.aspectRatio || "vertical"}
                          onChange={(e) => {
                            const newVids = [...localContent.testimonials.videos];
                            newVids[idx].aspectRatio = e.target.value as any;
                            setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: newVids }});
                          }}
                        >
                          <option value="vertical">Vertical — Story / Reels / TikTok (9:16)</option>
                          <option value="horizontal">Horizontal — YouTube / Widescreen (16:9)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">
                        Arquivo de Vídeo MP4 {uploading && <span className="text-blue-500 animate-pulse ml-2">Enviando...</span>}
                      </label>
                      {vid.src && (
                        <p className="text-[11px] text-green-600 font-medium flex items-center gap-1">
                          ✅ Vídeo carregado: <span className="text-gray-500 truncate max-w-[400px]">{vid.src}</span>
                        </p>
                      )}
                      <Input 
                        type="file" accept="video/mp4,video/webm"
                        disabled={uploading}
                        className="bg-white cursor-pointer"
                        onChange={(e) => handleFileUpload(e, (url) => {
                          const newVids = [...localContent.testimonials.videos];
                          newVids[idx].src = url;
                          setLocalContent({...localContent, testimonials: { ...localContent.testimonials, videos: newVids }});
                        })} 
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Depoimentos >"}
              </Button>
            </div>
          </TabsContent>

          {/* FAQ TAB */}
          <TabsContent value="faq" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Perguntas Frequentes (FAQ)</CardTitle>
                  <CardDescription>Ajuste as dúvidas que ficam no rodapé.</CardDescription>
                </div>
                <Button 
                  onClick={() => setLocalContent({...localContent, faq: { ...localContent.faq, items: [...localContent.faq.items, { question: "Nova Pergunta", answer: "" }]}})} 
                  variant="outline"
                  className="font-bold border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-1" /> Adicionar Pergunta
                </Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {localContent.faq.items.map((faq, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-gray-50 border rounded-lg">
                    <div className="w-full space-y-2">
                       <Input value={faq.question} onChange={e => {
                         const n = [...localContent.faq.items];
                         n[idx].question = e.target.value;
                         setLocalContent({...localContent, faq: {...localContent.faq, items: n}});
                       }} className="font-semibold" />
                       <Textarea value={faq.answer} rows={2} onChange={e => {
                         const n = [...localContent.faq.items];
                         n[idx].answer = e.target.value;
                         setLocalContent({...localContent, faq: {...localContent.faq, items: n}});
                       }} />
                    </div>
                    <Button variant="ghost" className="text-red-500 mt-1 hover:bg-red-50 hover:text-red-700" onClick={() => {
                        const n = localContent.faq.items.filter((_, i) => i !== idx);
                        setLocalContent({...localContent, faq: { ...localContent.faq, items: n }});
                    }}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Perguntas >"}
              </Button>
            </div>
          </TabsContent>

          {/* IMAGES TAB */}
          <TabsContent value="images" className="space-y-6">
            {/* Logo & OG */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-purple-50 border-b">
                <CardTitle className="text-xl">🖼️ Logo e Imagem de Compartilhamento</CardTitle>
                <CardDescription>Envie a logo do seu site e a imagem que aparece quando alguém compartilha o link (OG Image).</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 bg-gray-50 border rounded-xl">
                  <label className="text-xs font-bold text-gray-500 uppercase">Logo do Site</label>
                  {localContent.images.logo && (
                    <div className="flex items-center gap-3">
                      <img src={localContent.images.logo} alt="Logo" className="h-12 object-contain rounded border bg-white p-1" />
                      <span className="text-xs text-green-600 font-medium">✅ Logo carregada</span>
                    </div>
                  )}
                  <Input
                    type="file" accept="image/*"
                    disabled={uploading}
                    className="bg-white cursor-pointer"
                    onChange={e => handleFileUpload(e, url => setLocalContent({...localContent, images: { ...localContent.images, logo: url }}))}
                  />
                  {uploading && <span className="text-xs text-blue-500 animate-pulse">Enviando...</span>}
                </div>
                <div className="space-y-3 p-4 bg-gray-50 border rounded-xl">
                  <label className="text-xs font-bold text-gray-500 uppercase">Imagem OG (Preview de Compartilhamento)</label>
                  <p className="text-xs text-gray-400">Aparece quando alguém cola o link no WhatsApp, Facebook, etc. Tamanho ideal: 1200×630px.</p>
                  {localContent.images.ogImage && (
                    <div className="flex items-center gap-3">
                      <img src={localContent.images.ogImage} alt="OG" className="h-16 object-cover rounded border" />
                      <span className="text-xs text-green-600 font-medium">✅ OG Image carregada</span>
                    </div>
                  )}
                  <Input
                    type="file" accept="image/*"
                    disabled={uploading}
                    className="bg-white cursor-pointer"
                    onChange={e => handleFileUpload(e, url => setLocalContent({...localContent, images: { ...localContent.images, ogImage: url }}))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-purple-50 border-b flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-xl">📁 Galeria de Imagens do Site</CardTitle>
                  <CardDescription>Adicione imagens para usar no site em diferentes formatos: Story, Feed, Reels ou Horizontal.</CardDescription>
                </div>
                <Button
                  onClick={() => setLocalContent({...localContent, images: { ...localContent.images, gallery: [...localContent.images.gallery, { src: "", label: "Nova Imagem", format: "feed" }]}})}
                  variant="outline"
                  className="font-bold border-purple-500 text-purple-600 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-1" /> Adicionar Imagem
                </Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {localContent.images.gallery.length === 0 && (
                  <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-xl">
                    <p className="text-4xl mb-3">🖼️</p>
                    <p className="font-semibold">Nenhuma imagem adicionada ainda.</p>
                    <p className="text-sm mt-1">Clique em "Adicionar Imagem" para começar.</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {localContent.images.gallery.map((img, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 border rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Imagem #{idx + 1}</span>
                        <Button
                          variant="destructive" size="sm"
                          onClick={() => {
                            const n = localContent.images.gallery.filter((_, i) => i !== idx);
                            setLocalContent({...localContent, images: { ...localContent.images, gallery: n }});
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      {img.src && (
                        <div className={`w-full overflow-hidden rounded-lg border bg-white ${img.format === 'story' || img.format === 'reels' ? 'aspect-[9/16]' : img.format === 'feed' ? 'aspect-[4/5]' : 'aspect-video'}`}>
                          <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Identificação / Nome</label>
                        <Input
                          value={img.label}
                          placeholder="Ex: Banner Principal"
                          onChange={e => {
                            const n = [...localContent.images.gallery];
                            n[idx].label = e.target.value;
                            setLocalContent({...localContent, images: { ...localContent.images, gallery: n }});
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Formato</label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                          value={img.format}
                          onChange={e => {
                            const n = [...localContent.images.gallery];
                            n[idx].format = e.target.value as any;
                            setLocalContent({...localContent, images: { ...localContent.images, gallery: n }});
                          }}
                        >
                          <option value="story">Story — Vertical 9:16 (1080×1920px)</option>
                          <option value="feed">Feed — Retrato 4:5 (1080×1350px)</option>
                          <option value="reels">Reels — Vertical 9:16 (1080×1920px)</option>
                          <option value="horizontal">Horizontal — Widescreen 16:9 (1920×1080px)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Arquivo da Imagem {uploading && <span className="text-blue-500 animate-pulse ml-1">Enviando...</span>}
                        </label>
                        <Input
                          type="file" accept="image/*"
                          disabled={uploading}
                          className="bg-white cursor-pointer"
                          onChange={e => handleFileUpload(e, url => {
                            const n = [...localContent.images.gallery];
                            n[idx].src = url;
                            setLocalContent({...localContent, images: { ...localContent.images, gallery: n }});
                          })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold bg-purple-600 hover:bg-purple-700">
                {savingContent ? "Publicando..." : "Salvar Imagens >"}
              </Button>
            </div>
          </TabsContent>

          {/* FOOTER TAB */}
          <TabsContent value="footer" className="space-y-6">
             <Card className="shadow-md border-0">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-xl">Rodapé</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Texto Logo</label>
                    <Input value={localContent.footer.textLogo} onChange={e => setLocalContent({...localContent, footer: { ...localContent.footer, textLogo: e.target.value }})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Destaque Preto</label>
                    <Input value={localContent.footer.textLogoHighlight} onChange={e => setLocalContent({...localContent, footer: { ...localContent.footer, textLogoHighlight: e.target.value }})} />
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold">Copyright Final</label>
                    <Input value={localContent.footer.copyright} onChange={e => setLocalContent({...localContent, footer: { ...localContent.footer, copyright: e.target.value }})} />
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveContent} disabled={savingContent} className="px-10 text-lg font-bold">
                {savingContent ? "Publicando..." : "Salvar Configurações Finais"}
              </Button>
            </div>
          </TabsContent>

          {/* PRICING TAB */}
          <TabsContent value="pricing" className="space-y-8">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
               <div>
                 <h2 className="font-semibold text-lg">Editor de Preços</h2>
                 <p className="text-gray-500 text-sm">Adicione, edite ou exclua planos diretamente.</p>
               </div>
               <div className="flex gap-4">
                 <Button variant="outline" className="text-primary border-primary font-bold hover:bg-primary/5" onClick={handleAddPlan}>
                   <Plus className="w-4 h-4 mr-2" />
                   Adicionar Plano
                 </Button>
                 <Button variant="default" onClick={handleSavePlans} disabled={savingPlans} className="font-bold">
                    {savingPlans ? "Salvando planos..." : "Salvar Cards de Preço >"}
                  </Button>
               </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {plans.map((plan, pIdx) => (
                <Card key={pIdx} className="shadow-md relative overflow-hidden group">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="destructive" size="sm" onClick={() => handleRemovePlan(pIdx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardHeader className="bg-gray-50/50 pb-4 border-b">
                    <CardTitle className="text-lg text-primary">{plan.name}</CardTitle>
                    <CardDescription>Ajuste os valores exibidos neste card</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
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
                      <div className="flex justify-between border-b pb-1">
                        <label className="text-xs font-bold text-gray-500 uppercase flex items-center">Benefícios do Plano</label>
                        <button onClick={() => addPlanFeature(pIdx)} className="text-xs text-primary font-bold hover:underline">+ Adicionar</button>
                      </div>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex gap-2">
                          <Input 
                            value={feat} 
                            onChange={(e) => updateFeature(pIdx, fIdx, e.target.value)} 
                            className="text-sm h-8"
                          />
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => removePlanFeature(pIdx, fIdx)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
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
