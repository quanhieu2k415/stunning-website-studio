import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useAdminProducts, useDeleteProduct, useUpdateProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, Star, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const ProductListPage = () => {
  const { data: products, isLoading } = useAdminProducts();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct.mutateAsync(deleteId);
      toast.success("Đã xóa sản phẩm");
    } catch {
      toast.error("Không thể xóa sản phẩm");
    }
    setDeleteId(null);
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      await updateProduct.mutateAsync({ id, is_featured: !current });
      toast.success(current ? "Đã bỏ nổi bật" : "Đã đặt nổi bật");
    } catch {
      toast.error("Không thể cập nhật");
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await updateProduct.mutateAsync({ id, is_active: !current });
      toast.success(current ? "Đã ẩn sản phẩm" : "Đã hiện sản phẩm");
    } catch {
      toast.error("Không thể cập nhật");
    }
  };

  return (
    <AdminLayout
      title="Sản phẩm"
      description={`${products?.length || 0} sản phẩm`}
      actions={
        <Link to="/admin/products/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </Link>
      }
    >
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead className="w-20 text-center">Nổi bật</TableHead>
              <TableHead className="w-20 text-center">Trạng thái</TableHead>
              <TableHead className="w-32 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filtered?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                  {search ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm nào"}
                </TableCell>
              </TableRow>
            ) : (
              filtered?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-gray-500 text-xs">
                    {product.legacy_id || "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {product.brand?.name || "—"}
                        </p>
                      </div>
                      {product.badge && (
                        <Badge
                          variant="secondary"
                          className={`${product.badge_color || "bg-gray-100"} text-white text-xs`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {product.category?.name || "—"}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm text-red-600">
                        {product.price}đ
                      </p>
                      {product.original_price !== product.price && (
                        <p className="text-xs text-gray-400 line-through">
                          {product.original_price}đ
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() => toggleFeatured(product.id, product.is_featured)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          product.is_featured
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() => toggleActive(product.id, product.is_active)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {product.is_active ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-300" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/admin/products/${product.id}`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(product.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
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

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Xóa sản phẩm"
        description="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        variant="destructive"
      />
    </AdminLayout>
  );
};

export default ProductListPage;
