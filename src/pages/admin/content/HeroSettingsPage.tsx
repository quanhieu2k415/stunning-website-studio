import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import { useSiteSetting, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface HeroContent {
  title: string;
  subtitle: string;
  badge_text: string;
  cta_primary: { text: string; href: string };
  cta_secondary: { text: string; href: string };
  hero_image: string;
  stats: { label: string; value: string }[];
}

const defaultHero: HeroContent = {
  title: "Giải Pháp An Ninh & Công Nghệ Toàn Diện",
  subtitle: "Hải An Technology cung cấp camera giám sát, thiết bị mạng, linh kiện máy tính chính hãng với giá tốt nhất",
  badge_text: "🔥 Khuyến mãi đặc biệt",
  cta_primary: { text: "Xem sản phẩm", href: "/san-pham" },
  cta_secondary: { text: "Liên hệ tư vấn", href: "/lien-he" },
  hero_image: "",
  stats: [
    { label: "Sản phẩm", value: "500+" },
    { label: "Khách hàng", value: "100+" },
    { label: "Hỗ trợ", value: "24/7" },
    { label: "Hài lòng", value: "98%" },
  ],
};

const HeroSettingsPage = () => {
  const { data: existing, isLoading } = useSiteSetting<HeroContent>("hero_content");
  const update = useUpdateSiteSetting();
  const [form, setForm] = useState<HeroContent>(defaultHero);

  useEffect(() => { if (existing) setForm({ ...defaultHero, ...existing }); }, [existing]);

  const handleSave = async () => {
    try { await update.mutateAsync({ key: "hero_content", value: form as unknown as Record<string, unknown> }); toast.success("Đã cập nhật Hero Banner"); } catch { toast.error("Lỗi"); }
  };

  if (isLoading) return <AdminLayout title="Hero Banner"><div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title="Hero Banner" description="Chỉnh sửa nội dung hero section trang chủ" actions={<Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={update.isPending}><Save className="w-4 h-4 mr-2" />Lưu</Button>}>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Nội dung chính</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Badge text</Label><Input value={form.badge_text} onChange={(e) => setForm({ ...form, badge_text: e.target.value })} /></div>
            <div className="space-y-2"><Label>Tiêu đề</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Phụ đề</Label><Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Nút CTA</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>CTA chính - Text</Label><Input value={form.cta_primary.text} onChange={(e) => setForm({ ...form, cta_primary: { ...form.cta_primary, text: e.target.value } })} /></div>
              <div className="space-y-2"><Label>CTA chính - Link</Label><Input value={form.cta_primary.href} onChange={(e) => setForm({ ...form, cta_primary: { ...form.cta_primary, href: e.target.value } })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>CTA phụ - Text</Label><Input value={form.cta_secondary.text} onChange={(e) => setForm({ ...form, cta_secondary: { ...form.cta_secondary, text: e.target.value } })} /></div>
              <div className="space-y-2"><Label>CTA phụ - Link</Label><Input value={form.cta_secondary.href} onChange={(e) => setForm({ ...form, cta_secondary: { ...form.cta_secondary, href: e.target.value } })} /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Hình ảnh Hero</CardTitle></CardHeader>
          <CardContent>
            <ImageUploader bucket="site-assets" folder="hero" value={form.hero_image} onChange={(url) => setForm({ ...form, hero_image: url })} onRemove={() => setForm({ ...form, hero_image: "" })} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Thống kê</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {form.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <Input value={stat.value} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], value: e.target.value }; setForm({ ...form, stats: s }); }} placeholder="500+" />
                <Input value={stat.label} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], label: e.target.value }; setForm({ ...form, stats: s }); }} placeholder="Sản phẩm" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default HeroSettingsPage;
