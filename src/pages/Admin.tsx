import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanData } from "@/components/PricingSection";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "pricing_plans")
      .single();
    
    if (data && !error) {
      setPlans(data.value as PlanData[]);
    }
    setLoading(false);
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

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ value: plans })
      .eq("key", "pricing_plans");

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso!", description: "Os planos foram atualizados no site em tempo real." });
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center mt-10 font-bold">Carregando painel...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-500 font-medium">Edite os preços e as informações do seu site.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="default" onClick={handleSave} disabled={saving} className="font-bold">
              {saving ? "Salvando..." : "Salvar Alterações Globais"}
            </Button>
            <Button variant="outline" onClick={handleLogout} className="font-bold">Sair</Button>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, pIdx) => (
            <Card key={pIdx} className="shadow-md">
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
                    <label className="text-xs font-bold text-gray-500 uppercase">Tokens (Título)</label>
                    <Input value={plan.tokens} onChange={(e) => updatePlanField(pIdx, "tokens", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Link de Compra</label>
                  <Input value={plan.url} onChange={(e) => updatePlanField(pIdx, "url", e.target.value)} />
                </div>
                
                <div className="pt-4 space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase border-b pb-1 flex w-full">Benefícios (Checklist)</label>
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
        </main>
      </div>
    </div>
  );
}
