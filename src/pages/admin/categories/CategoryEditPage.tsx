import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useCategory, useCreateCategory, useUpdateCategory } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const CategoryEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const { data: existing, isLoading } = useCategory(id || "");
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [displayGroup, setDisplayGroup] = useState("security");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setSlug(existing.slug);
      setIcon(existing.icon || "");
      setColor(existing.color || "");
      setDescription(existing.description || "");
      setDisplayGroup(existing.display_group);
      setSortOrder(existing.sort_order);
      setIsActive(existing.is_active);
    }
  }, [existing]);

  useEffect(() => {
    if (isNew && name) {
      setSlug(name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  }, [name, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) { toast.error("Vui lòng điền tên và slug"); return; }
    try {
      if (isNew) {
        await createCategory.mutateAsync({ slug, name, icon: icon || undefined, color: color || undefined, description: description || undefined, display_group: displayGroup, sort_order: sortOrder, is_active: isActive });
        toast.success("Đã tạo danh mục");
      } else {
        await updateCategory.mutateAsync({ id: id!, slug, name, icon, color, description, display_group: displayGroup, sort_order: sortOrder, is_active: isActive });
        toast.success("Đã cập nhật danh mục");
      }
      navigate("/admin/categories");
    } catch (err: any) { toast.error(err?.message || "Có lỗi xảy ra"); }
  };

  if (!isNew && isLoading) return <AdminLayout title="Đang tải..."><div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title={isNew ? "Thêm danh mục" : `Sửa: ${existing?.name || ""}`} actions={<div className="flex gap-2"><Button variant="outline" onClick={() => navigate("/admin/categories")}><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button><Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700"><Save className="w-4 h-4 mr-2" />Lưu</Button></div>}>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Thông tin danh mục</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Tên *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Camera giám sát" required /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="camera-giam-sat" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Icon (Lucide)</Label><Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Camera, Cpu, HardDrive..." /></div>
              <div className="space-y-2"><Label>Màu gradient</Label><Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="from-blue-500 to-blue-600" /></div>
            </div>
            <div className="space-y-2"><Label>Mô tả</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nhóm hiển thị</Label>
                <Select value={displayGroup} onValueChange={setDisplayGroup}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="security">An ninh</SelectItem>
                    <SelectItem value="pc">PC / Linh kiện</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Thứ tự</Label><Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} /></div>
            </div>
            {!isNew && (
              <div className="flex items-center gap-2"><Switch checked={isActive} onCheckedChange={setIsActive} /><Label>Hiện danh mục</Label></div>
            )}
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
};

export default CategoryEditPage;
