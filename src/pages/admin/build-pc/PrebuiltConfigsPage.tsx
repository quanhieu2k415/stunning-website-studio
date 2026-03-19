import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { usePrebuiltConfigs, useUpdatePrebuiltConfig } from "@/hooks/usePCComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Pencil, Plus, X } from "lucide-react";
import { toast } from "sonner";

const PrebuiltConfigsPage = () => {
  const { data: configs, isLoading } = usePrebuiltConfigs();
  const updateConfig = useUpdatePrebuiltConfig();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: 0, configSpecs: [] as string[] });

  const startEdit = (config: any) => {
    setEditingId(config.id);
    setForm({ name: config.name, description: config.description || "", price: config.price, configSpecs: config.specs?.map((s: any) => s.label) || [] });
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      await updateConfig.mutateAsync({ id: editingId, ...form });
      toast.success("Đã cập nhật cấu hình");
      setEditingId(null);
    } catch { toast.error("Có lỗi xảy ra"); }
  };

  return (
    <AdminLayout title="Cấu hình PC có sẵn" description="Quản lý các cấu hình PC đề xuất">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configs?.map((config) => (
            <Card key={config.id}>
              <CardHeader>
                <CardTitle className="text-base">{config.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {editingId === config.id ? (
                  <div className="space-y-3">
                    <div className="space-y-1"><Label className="text-xs">Tên</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                    <div className="space-y-1"><Label className="text-xs">Mô tả</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
                    <div className="space-y-1"><Label className="text-xs">Giá (VND)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
                    <div className="space-y-1">
                      <Label className="text-xs">Thông số</Label>
                      {form.configSpecs.map((spec, i) => (
                        <div key={i} className="flex gap-1">
                          <Input value={spec} onChange={(e) => { const s = [...form.configSpecs]; s[i] = e.target.value; setForm({ ...form, configSpecs: s }); }} className="text-sm" />
                          <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, configSpecs: form.configSpecs.filter((_, j) => j !== i) })} className="text-red-500 px-2"><X className="w-3 h-3" /></Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => setForm({ ...form, configSpecs: [...form.configSpecs, ""] })} className="w-full"><Plus className="w-3 h-3 mr-1" />Thêm</Button>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}><Save className="w-3 h-3 mr-1" />Lưu</Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Hủy</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">{config.description}</p>
                    <p className="font-bold text-red-600 mb-3">{config.price.toLocaleString()}đ</p>
                    <ul className="text-sm space-y-1 mb-3">
                      {config.specs?.map((s) => (<li key={s.id} className="text-gray-600">• {s.label}</li>))}
                    </ul>
                    <Button variant="outline" size="sm" onClick={() => startEdit(config)}><Pencil className="w-3 h-3 mr-1" />Sửa</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default PrebuiltConfigsPage;
