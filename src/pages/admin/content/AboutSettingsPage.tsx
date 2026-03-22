import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useSiteSetting, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface AboutContent {
  hero_title: string;
  hero_subtitle: string;
  philosophy_quote: string;
  philosophy_author: string;
  team_title: string;
  team_description: string;
  expertise: { icon: string; title: string; description: string; features: string[] }[];
  values: { icon: string; title: string; description: string }[];
  clients: { icon: string; title: string; description: string }[];
}

const defaultAbout: AboutContent = {
  hero_title: "Về Hải An Technology",
  hero_subtitle: "",
  philosophy_quote: "",
  philosophy_author: "",
  team_title: "",
  team_description: "",
  expertise: [],
  values: [],
  clients: [],
};

const AboutSettingsPage = () => {
  const { data: existing, isLoading } = useSiteSetting<AboutContent>("about_page");
  const update = useUpdateSiteSetting();
  const [form, setForm] = useState<AboutContent>(defaultAbout);

  useEffect(() => { if (existing) setForm({ ...defaultAbout, ...existing }); }, [existing]);

  const handleSave = async () => {
    try { await update.mutateAsync({ key: "about_page", value: form as unknown as Record<string, unknown> }); toast.success("Đã cập nhật trang Giới thiệu"); } catch (err: any) { toast.error(err?.message || "Có lỗi xảy ra"); }
  };

  if (isLoading) return <AdminLayout title="Giới thiệu"><div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title="Trang Giới thiệu" description="Nội dung trang About" actions={<Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={update.isPending}><Save className="w-4 h-4 mr-2" />Lưu</Button>}>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Hero</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Tiêu đề</Label><Input value={form.hero_title} onChange={(e) => setForm({ ...form, hero_title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Phụ đề</Label><Textarea value={form.hero_subtitle} onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })} rows={2} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Triết lý</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Trích dẫn</Label><Textarea value={form.philosophy_quote} onChange={(e) => setForm({ ...form, philosophy_quote: e.target.value })} rows={2} /></div>
            <div className="space-y-2"><Label>Tác giả</Label><Input value={form.philosophy_author} onChange={(e) => setForm({ ...form, philosophy_author: e.target.value })} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Đội ngũ</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Tiêu đề</Label><Input value={form.team_title} onChange={(e) => setForm({ ...form, team_title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Mô tả</Label><Textarea value={form.team_description} onChange={(e) => setForm({ ...form, team_description: e.target.value })} rows={3} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">Chuyên môn</CardTitle><Button variant="outline" size="sm" onClick={() => setForm({ ...form, expertise: [...form.expertise, { icon: "", title: "", description: "", features: [] }] })}><Plus className="w-4 h-4 mr-1" />Thêm</Button></CardHeader>
          <CardContent className="space-y-4">
            {form.expertise.map((exp, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-3 relative">
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, expertise: form.expertise.filter((_, j) => j !== i) })} className="absolute top-1 right-1 text-red-500"><X className="w-4 h-4" /></Button>
                <div className="grid grid-cols-2 gap-2">
                  <Input value={exp.icon} onChange={(e) => { const exps = [...form.expertise]; exps[i] = { ...exps[i], icon: e.target.value }; setForm({ ...form, expertise: exps }); }} placeholder="Icon (Lucide)" />
                  <Input value={exp.title} onChange={(e) => { const exps = [...form.expertise]; exps[i] = { ...exps[i], title: e.target.value }; setForm({ ...form, expertise: exps }); }} placeholder="Tiêu đề" />
                </div>
                <Textarea value={exp.description} onChange={(e) => { const exps = [...form.expertise]; exps[i] = { ...exps[i], description: e.target.value }; setForm({ ...form, expertise: exps }); }} placeholder="Mô tả" rows={2} />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Tính năng</Label>
                    <Button variant="ghost" size="sm" onClick={() => { const exps = [...form.expertise]; exps[i] = { ...exps[i], features: [...exps[i].features, ""] }; setForm({ ...form, expertise: exps }); }} className="h-6 text-xs"><Plus className="w-3 h-3 mr-1" />Thêm</Button>
                  </div>
                  {exp.features.map((feat, fi) => (
                    <div key={fi} className="flex gap-2">
                      <Input value={feat} onChange={(e) => { const exps = [...form.expertise]; const feats = [...exps[i].features]; feats[fi] = e.target.value; exps[i] = { ...exps[i], features: feats }; setForm({ ...form, expertise: exps }); }} placeholder="Tính năng..." className="text-sm" />
                      <Button variant="ghost" size="sm" onClick={() => { const exps = [...form.expertise]; exps[i] = { ...exps[i], features: exps[i].features.filter((_, k) => k !== fi) }; setForm({ ...form, expertise: exps }); }} className="text-red-500 shrink-0"><X className="w-3 h-3" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {form.expertise.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Chưa có mục nào. Nhấn "Thêm" để bắt đầu.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">Giá trị cốt lõi</CardTitle><Button variant="outline" size="sm" onClick={() => setForm({ ...form, values: [...form.values, { icon: "", title: "", description: "" }] })}><Plus className="w-4 h-4 mr-1" />Thêm</Button></CardHeader>
          <CardContent className="space-y-4">
            {form.values.map((v, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2 relative">
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, values: form.values.filter((_, j) => j !== i) })} className="absolute top-1 right-1 text-red-500"><X className="w-4 h-4" /></Button>
                <div className="grid grid-cols-2 gap-2">
                  <Input value={v.icon} onChange={(e) => { const vals = [...form.values]; vals[i] = { ...vals[i], icon: e.target.value }; setForm({ ...form, values: vals }); }} placeholder="Icon (Lucide)" />
                  <Input value={v.title} onChange={(e) => { const vals = [...form.values]; vals[i] = { ...vals[i], title: e.target.value }; setForm({ ...form, values: vals }); }} placeholder="Tiêu đề" />
                </div>
                <Textarea value={v.description} onChange={(e) => { const vals = [...form.values]; vals[i] = { ...vals[i], description: e.target.value }; setForm({ ...form, values: vals }); }} placeholder="Mô tả" rows={2} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">Khách hàng</CardTitle><Button variant="outline" size="sm" onClick={() => setForm({ ...form, clients: [...form.clients, { icon: "", title: "", description: "" }] })}><Plus className="w-4 h-4 mr-1" />Thêm</Button></CardHeader>
          <CardContent className="space-y-4">
            {form.clients.map((c, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-2 relative">
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, clients: form.clients.filter((_, j) => j !== i) })} className="absolute top-1 right-1 text-red-500"><X className="w-4 h-4" /></Button>
                <div className="grid grid-cols-2 gap-2">
                  <Input value={c.icon} onChange={(e) => { const cls = [...form.clients]; cls[i] = { ...cls[i], icon: e.target.value }; setForm({ ...form, clients: cls }); }} placeholder="Icon" />
                  <Input value={c.title} onChange={(e) => { const cls = [...form.clients]; cls[i] = { ...cls[i], title: e.target.value }; setForm({ ...form, clients: cls }); }} placeholder="Tiêu đề" />
                </div>
                <Textarea value={c.description} onChange={(e) => { const cls = [...form.clients]; cls[i] = { ...cls[i], description: e.target.value }; setForm({ ...form, clients: cls }); }} placeholder="Mô tả" rows={2} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AboutSettingsPage;
