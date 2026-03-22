import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useBrands, useCreateBrand, useUpdateBrand, useDeleteBrand } from "@/hooks/useBrands";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const BrandListPage = () => {
  const { data: brands, isLoading } = useBrands(false);
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editBrand, setEditBrand] = useState<{ id?: string; name: string } | null>(null);

  const handleSave = async () => {
    if (!editBrand?.name.trim()) return;
    try {
      if (editBrand.id) {
        await updateBrand.mutateAsync({ id: editBrand.id, name: editBrand.name.trim() });
        toast.success("Đã cập nhật thương hiệu");
      } else {
        await createBrand.mutateAsync({ name: editBrand.name.trim() });
        toast.success("Đã tạo thương hiệu");
      }
      setEditBrand(null);
    } catch (err: any) { toast.error(err?.message || "Có lỗi xảy ra"); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBrand.mutateAsync(deleteId);
      toast.success("Đã xóa thương hiệu");
    } catch (err: any) { toast.error(err?.message || "Không thể xóa"); }
    setDeleteId(null);
  };

  return (
    <AdminLayout title="Thương hiệu" description={`${brands?.length || 0} thương hiệu`} actions={<Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditBrand({ name: "" })}><Plus className="w-4 h-4 mr-2" />Thêm</Button>}>
      <div className="bg-white rounded-lg border shadow-sm max-w-2xl">
        <Table>
          <TableHeader><TableRow><TableHead>Tên thương hiệu</TableHead><TableHead className="text-right w-32">Thao tác</TableHead></TableRow></TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={2} className="text-center py-12"><div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /></TableCell></TableRow>
            ) : brands?.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditBrand({ id: brand.id, name: brand.name })}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteId(brand.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editBrand} onOpenChange={() => setEditBrand(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editBrand?.id ? "Sửa thương hiệu" : "Thêm thương hiệu"}</DialogTitle></DialogHeader>
          <div className="space-y-2"><Label>Tên</Label><Input value={editBrand?.name || ""} onChange={(e) => setEditBrand(prev => prev ? { ...prev, name: e.target.value } : null)} placeholder="Hikvision, Dahua..." autoFocus /></div>
          <DialogFooter><Button variant="outline" onClick={() => setEditBrand(null)}>Hủy</Button><Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>Lưu</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Xóa thương hiệu" description="Bạn có chắc chắn?" confirmText="Xóa" variant="destructive" />
    </AdminLayout>
  );
};

export default BrandListPage;
