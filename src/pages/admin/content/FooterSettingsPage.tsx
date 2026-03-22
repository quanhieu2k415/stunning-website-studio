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

interface FooterContent {
  company_description: string;
  product_links: { name: string; href: string }[];
  service_links: { name: string; href: string }[];
  company_links: { name: string; href: string }[];
  social_links: { name: string; url: string; icon: string }[];
  hotlines: string[];
}

const defaultFooter: FooterContent = {
  company_description: "",
  product_links: [],
  service_links: [],
  company_links: [],
  social_links: [],
  hotlines: [],
};

const FooterSettingsPage = () => {
  const { data: existing, isLoading } = useSiteSetting<FooterContent>("footer_content");
  const update = useUpdateSiteSetting();
  const [form, setForm] = useState<FooterContent>(defaultFooter);

  useEffect(() => { if (existing) setForm({ ...defaultFooter, ...existing }); }, [existing]);

  const handleSave = async () => {
    try { await update.mutateAsync({ key: "footer_content", value: form as unknown as Record<string, unknown> }); toast.success("Đã cập nhật Footer"); } catch (err: any) { toast.error(err?.message || "Có lỗi xảy ra"); }
  };

  const LinkEditor = ({ title, links, onChange }: { title: string; links: { name: string; href: string }[]; onChange: (links: { name: string; href: string }[]) => void }) => (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {links.map((link, i) => (
          <div key={i} className="flex gap-2">
            <Input value={link.name} onChange={(e) => { const l = [...links]; l[i] = { ...l[i], name: e.target.value }; onChange(l); }} placeholder="Tên" className="w-40" />
            <Input value={link.href} onChange={(e) => { const l = [...links]; l[i] = { ...l[i], href: e.target.value }; onChange(l); }} placeholder="/duong-dan" className="flex-1" />
            <Button variant="ghost" size="sm" onClick={() => onChange(links.filter((_, j) => j !== i))} className="text-red-500"><X className="w-4 h-4" /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => onChange([...links, { name: "", href: "" }])}><Plus className="w-4 h-4 mr-1" />Thêm link</Button>
      </CardContent>
    </Card>
  );

  if (isLoading) return <AdminLayout title="Footer"><div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title="Footer" description="Nội dung footer website" actions={<Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={update.isPending}><Save className="w-4 h-4 mr-2" />Lưu</Button>}>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Mô tả công ty</CardTitle></CardHeader>
          <CardContent><Textarea value={form.company_description} onChange={(e) => setForm({ ...form, company_description: e.target.value })} rows={3} /></CardContent>
        </Card>

        <LinkEditor title="Link sản phẩm" links={form.product_links} onChange={(links) => setForm({ ...form, product_links: links })} />
        <LinkEditor title="Link dịch vụ" links={form.service_links} onChange={(links) => setForm({ ...form, service_links: links })} />
        <LinkEditor title="Link công ty" links={form.company_links} onChange={(links) => setForm({ ...form, company_links: links })} />

        <Card>
          <CardHeader><CardTitle className="text-base">Mạng xã hội</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {form.social_links.map((link, i) => (
              <div key={i} className="flex gap-2">
                <Input value={link.name} onChange={(e) => { const l = [...form.social_links]; l[i] = { ...l[i], name: e.target.value }; setForm({ ...form, social_links: l }); }} placeholder="Tên" className="w-28" />
                <Input value={link.icon} onChange={(e) => { const l = [...form.social_links]; l[i] = { ...l[i], icon: e.target.value }; setForm({ ...form, social_links: l }); }} placeholder="Icon" className="w-28" />
                <Input value={link.url} onChange={(e) => { const l = [...form.social_links]; l[i] = { ...l[i], url: e.target.value }; setForm({ ...form, social_links: l }); }} placeholder="URL" className="flex-1" />
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, social_links: form.social_links.filter((_, j) => j !== i) })} className="text-red-500"><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setForm({ ...form, social_links: [...form.social_links, { name: "", url: "", icon: "" }] })}><Plus className="w-4 h-4 mr-1" />Thêm</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Hotline</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {form.hotlines.map((h, i) => (
              <div key={i} className="flex gap-2">
                <Input value={h} onChange={(e) => { const hl = [...form.hotlines]; hl[i] = e.target.value; setForm({ ...form, hotlines: hl }); }} />
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, hotlines: form.hotlines.filter((_, j) => j !== i) })} className="text-red-500"><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setForm({ ...form, hotlines: [...form.hotlines, ""] })}><Plus className="w-4 h-4 mr-1" />Thêm</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default FooterSettingsPage;
