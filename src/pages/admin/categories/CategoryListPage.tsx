import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useCategories, useDeleteCategory } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const CategoryListPage = () => {
  const { data: categories, isLoading } = useCategories(false);
  const deleteCategory = useDeleteCategory();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCategory.mutateAsync(deleteId);
      toast.success("Đã xóa danh mục");
    } catch {
      toast.error("Không thể xóa danh mục (có thể còn sản phẩm liên quan)");
    }
    setDeleteId(null);
  };

  return (
    <AdminLayout
      title="Danh mục"
      description={`${categories?.length || 0} danh mục`}
      actions={
        <Link to="/admin/categories/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Thêm danh mục
          </Button>
        </Link>
      }
    >
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Nhóm hiển thị</TableHead>
              <TableHead className="text-center">Thứ tự</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-right w-32">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              categories?.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{cat.slug}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{cat.icon || "—"}</TableCell>
                  <TableCell className="text-sm">{cat.display_group}</TableCell>
                  <TableCell className="text-center text-sm">{cat.sort_order}</TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-block w-2 h-2 rounded-full ${cat.is_active ? "bg-green-500" : "bg-gray-300"}`} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/admin/categories/${cat.id}`}>
                        <Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteId(cat.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Xóa danh mục" description="Bạn có chắc chắn muốn xóa danh mục này?" confirmText="Xóa" variant="destructive" />
    </AdminLayout>
  );
};

export default CategoryListPage;
