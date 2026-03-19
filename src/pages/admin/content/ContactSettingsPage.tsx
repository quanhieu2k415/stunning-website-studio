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

interface ContactInfo {
  phones: string[];
  email: string;
  address: string;
  hours: string;
  map_embed_url: string;
  map_link: string;
  form_subjects: string[];
}

const defaultContact: ContactInfo = {
  phones: ["0123.456.789"],
  email: "info@haiantech.vn",
  address: "Số XX, Đường YY, TP. ZZ",
  hours: "8:00 - 18:00 (Thứ 2 - Thứ 7)",
  map_embed_url: "",
  map_link: "",
  form_subjects: ["Tư vấn sản phẩm", "Hỗ trợ kỹ thuật", "Báo giá dự án", "Khác"],
};

const ContactSettingsPage = () => {
  const { data: existing, isLoading } = useSiteSetting<ContactInfo>("contact_info");
  const update = useUpdateSiteSetting();
  const [form, setForm] = useState<ContactInfo>(defaultContact);

  useEffect(() => { if (existing) setForm({ ...defaultContact, ...existing }); }, [existing]);

  const handleSave = async () => {
    try { await update.mutateAsync({ key: "contact_info", value: form as unknown as Record<string, unknown> }); toast.success("Đã cập nhật thông tin liên hệ"); } catch { toast.error("Lỗi"); }
  };

  if (isLoading) return <AdminLayout title="Liên hệ"><div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title="Thông tin liên hệ" description="Số điện thoại, email, địa chỉ, bản đồ" actions={<Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={update.isPending}><Save className="w-4 h-4 mr-2" />Lưu</Button>}>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Thông tin cơ bản</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Số điện thoại</Label>
              {form.phones.map((phone, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={phone} onChange={(e) => { const p = [...form.phones]; p[i] = e.target.value; setForm({ ...form, phones: p }); }} />
                  {form.phones.length > 1 && <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, phones: form.phones.filter((_, j) => j !== i) })} className="text-red-500"><X className="w-4 h-4" /></Button>}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setForm({ ...form, phones: [...form.phones, ""] })}><Plus className="w-4 h-4 mr-1" />Thêm SĐT</Button>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-2"><Label>Địa chỉ</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
            <div className="space-y-2"><Label>Giờ làm việc</Label><Input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Google Maps</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Embed URL (iframe src)</Label><Textarea value={form.map_embed_url} onChange={(e) => setForm({ ...form, map_embed_url: e.target.value })} rows={2} placeholder="https://www.google.com/maps/embed?..." /></div>
            <div className="space-y-2"><Label>Link Google Maps</Label><Input value={form.map_link} onChange={(e) => setForm({ ...form, map_link: e.target.value })} placeholder="https://maps.google.com/..." /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Chủ đề liên hệ (Form)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {form.form_subjects.map((subject, i) => (
              <div key={i} className="flex gap-2">
                <Input value={subject} onChange={(e) => { const s = [...form.form_subjects]; s[i] = e.target.value; setForm({ ...form, form_subjects: s }); }} />
                <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, form_subjects: form.form_subjects.filter((_, j) => j !== i) })} className="text-red-500"><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setForm({ ...form, form_subjects: [...form.form_subjects, ""] })}><Plus className="w-4 h-4 mr-1" />Thêm</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ContactSettingsPage;
