import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { usePCComponentCategories, useUpdatePCCategory } from "@/hooks/usePCComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, X, Save } from "lucide-react";
import { toast } from "sonner";

const PCComponentsPage = () => {
  const { data: categories, isLoading } = usePCComponentCategories();
  const updateCategory = useUpdatePCCategory();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [components, setComponents] = useState<{ name: string; price: number; specs: string }[]>([]);

  const startEdit = (catId: string, existing: { name: string; price: number; specs: string }[]) => {
    setEditingId(catId);
    setComponents([...existing]);
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      await updateCategory.mutateAsync({ id: editingId, components });
      toast.success("Đã cập nhật linh kiện");
      setEditingId(null);
    } catch { toast.error("Có lỗi xảy ra"); }
  };

  return (
    <AdminLayout title="Linh kiện Build PC" description="Quản lý các loại linh kiện cho Build PC">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="max-w-3xl space-y-4">
          <Accordion type="single" collapsible className="space-y-2">
            {categories?.map((cat) => (
              <AccordionItem key={cat.id} value={cat.id} className="bg-white rounded-lg border">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {cat.components?.length || 0} linh kiện
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {editingId === cat.id ? (
                    <div className="space-y-3">
                      {components.map((comp, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Input value={comp.name} onChange={(e) => { const c = [...components]; c[i].name = e.target.value; setComponents(c); }} placeholder="Tên" className="flex-1" />
                          <Input type="number" value={comp.price} onChange={(e) => { const c = [...components]; c[i].price = Number(e.target.value); setComponents(c); }} placeholder="Giá" className="w-32" />
                          <Input value={comp.specs} onChange={(e) => { const c = [...components]; c[i].specs = e.target.value; setComponents(c); }} placeholder="Thông số" className="flex-1" />
                          <Button variant="ghost" size="sm" onClick={() => setComponents(components.filter((_, j) => j !== i))} className="text-red-500"><X className="w-4 h-4" /></Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setComponents([...components, { name: "", price: 0, specs: "" }])}><Plus className="w-4 h-4 mr-1" />Thêm</Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={updateCategory.isPending}><Save className="w-4 h-4 mr-1" />Lưu</Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Hủy</Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-1 mb-3">
                        {cat.components?.map((comp) => (
                          <div key={comp.id} className="flex justify-between text-sm py-1 px-2 bg-gray-50 rounded">
                            <span>{comp.name}</span>
                            <span className="text-gray-500">{comp.price.toLocaleString()}đ — {comp.specs}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => startEdit(cat.id, cat.components?.map(c => ({ name: c.name, price: c.price, specs: c.specs })) || [])}>Chỉnh sửa</Button>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </AdminLayout>
  );
};

export default PCComponentsPage;
