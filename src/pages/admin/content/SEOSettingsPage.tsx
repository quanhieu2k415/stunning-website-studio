import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import { useSiteSetting, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface SEOSettings {
  title: string;
  description: string;
  og_image: string;
  keywords: string;
}

const defaultSEO: SEOSettings = { title: "Hải An Technology - Giải pháp an ninh & công nghệ", description: "", og_image: "", keywords: "" };

const SEOSettingsPage = () => {
  const { data: existing, isLoading } = useSiteSetting<SEOSettings>("seo_defaults");
  const update = useUpdateSiteSetting();
  const [form, setForm] = useState<SEOSettings>(defaultSEO);

  useEffect(() => { if (existing) setForm({ ...defaultSEO, ...existing }); }, [existing]);

  const handleSave = async () => {
    try { await update.mutateAsync({ key: "seo_defaults", value: form as unknown as Record<string, unknown> }); toast.success("Đã cập nhật SEO"); } catch { toast.error("Lỗi"); }
  };

  if (isLoading) return <AdminLayout title="SEO"><div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title="Cài đặt SEO" description="Tiêu đề, mô tả, Open Graph" actions={<Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={update.isPending}><Save className="w-4 h-4 mr-2" />Lưu</Button>}>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Meta tags mặc định</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Tiêu đề (title)</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><p className="text-xs text-gray-400">{form.title.length}/60 ký tự</p></div>
            <div className="space-y-2"><Label>Mô tả (description)</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /><p className="text-xs text-gray-400">{form.description.length}/160 ký tự</p></div>
            <div className="space-y-2"><Label>Từ khóa (keywords)</Label><Input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} placeholder="camera, an ninh, công nghệ..." /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Open Graph Image</CardTitle></CardHeader>
          <CardContent>
            <ImageUploader bucket="site-assets" folder="seo" value={form.og_image} onChange={(url) => setForm({ ...form, og_image: url })} onRemove={() => setForm({ ...form, og_image: "" })} />
            <p className="text-xs text-gray-400 mt-2">Khuyến nghị: 1200x630px</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SEOSettingsPage;
