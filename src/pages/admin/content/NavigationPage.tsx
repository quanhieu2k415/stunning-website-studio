import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useSiteSetting, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, X, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface NavLink {
  name: string;
  href: string;
}

const NavigationPage = () => {
  const { data: existing, isLoading } = useSiteSetting<NavLink[]>("nav_links");
  const update = useUpdateSiteSetting();
  const [links, setLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    if (existing && Array.isArray(existing)) setLinks(existing);
  }, [existing]);

  const handleSave = async () => {
    try { await update.mutateAsync({ key: "nav_links", value: links as unknown as Record<string, unknown> }); toast.success("Đã cập nhật điều hướng"); } catch { toast.error("Lỗi"); }
  };

  if (isLoading) return <AdminLayout title="Điều hướng"><div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title="Điều hướng" description="Quản lý menu chính của website" actions={<Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={update.isPending}><Save className="w-4 h-4 mr-2" />Lưu</Button>}>
      <div className="max-w-xl space-y-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Menu chính</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {links.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <Input value={link.name} onChange={(e) => { const l = [...links]; l[i] = { ...l[i], name: e.target.value }; setLinks(l); }} placeholder="Tên menu" className="w-40" />
                <Input value={link.href} onChange={(e) => { const l = [...links]; l[i] = { ...l[i], href: e.target.value }; setLinks(l); }} placeholder="/duong-dan" className="flex-1" />
                <Button variant="ghost" size="sm" onClick={() => setLinks(links.filter((_, j) => j !== i))} className="text-red-500"><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setLinks([...links, { name: "", href: "" }])} className="w-full"><Plus className="w-4 h-4 mr-1" />Thêm mục menu</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default NavigationPage;
