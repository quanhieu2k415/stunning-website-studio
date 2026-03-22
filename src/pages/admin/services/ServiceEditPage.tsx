import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useService, useCreateService, useUpdateService } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { toast } from "sonner";

const ServiceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const { data: existing, isLoading } = useService(id || "");
  const create = useCreateService();
  const update = useUpdateService();

  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayContext, setDisplayContext] = useState("both");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (existing) { setIcon(existing.icon); setTitle(existing.title); setDescription(existing.description); setDisplayContext(existing.display_context); setFeatures(existing.features?.map(f => f.feature) || []); }
  }, [existing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !icon) { toast.error("Vui lòng điền đầy đủ"); return; }
    try {
      if (isNew) { await create.mutateAsync({ icon, title, description, display_context: displayContext, features }); toast.success("Đã tạo dịch vụ"); }
      else { await update.mutateAsync({ id: id!, icon, title, description, display_context: displayContext, features }); toast.success("Đã cập nhật"); }
      navigate("/admin/services");
    } catch (err: any) { toast.error(err?.message || "Có lỗi xảy ra"); }
  };

  if (!isNew && isLoading) return <AdminLayout title="Đang tải..."><div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div></AdminLayout>;

  return (
    <AdminLayout title={isNew ? "Thêm dịch vụ" : `Sửa: ${existing?.title || ""}`} actions={<div className="flex gap-2"><Button variant="outline" onClick={() => navigate("/admin/services")}><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button><Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700"><Save className="w-4 h-4 mr-2" />Lưu</Button></div>}>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Thông tin dịch vụ</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Icon (Lucide) *</Label><Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Shield, Wrench, Monitor..." required /></div>
              <div className="space-y-2">
                <Label>Hiển thị</Label>
                <Select value={displayContext} onValueChange={setDisplayContext}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="both">Cả hai</SelectItem><SelectItem value="homepage">Trang chủ</SelectItem><SelectItem value="services_page">Trang dịch vụ</SelectItem></SelectContent></Select>
              </div>
            </div>
            <div className="space-y-2"><Label>Tiêu đề *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
            <div className="space-y-2"><Label>Mô tả</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Tính năng</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
                  <span className="flex-1 text-sm">{f}</span>
                  <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Nhập tính năng..." onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature(""); } } }} />
              <Button type="button" variant="outline" onClick={() => { if (newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature(""); } }}><Plus className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
};

export default ServiceEditPage;
