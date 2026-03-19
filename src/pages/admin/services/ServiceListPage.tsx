import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useAdminServices, useDeleteService } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ServiceListPage = () => {
  const { data: services, isLoading } = useAdminServices();
  const deleteService = useDeleteService();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await deleteService.mutateAsync(deleteId); toast.success("Đã xóa"); } catch { toast.error("Lỗi"); }
    setDeleteId(null);
  };

  return (
    <AdminLayout title="Dịch vụ" description={`${services?.length || 0} dịch vụ`} actions={<div className="flex gap-2"><Link to="/admin/services/new"><Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Thêm</Button></Link><Link to="/admin/process-steps"><Button variant="outline">Quy trình</Button></Link></div>}>
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Icon</TableHead><TableHead>Tiêu đề</TableHead><TableHead>Hiển thị</TableHead><TableHead>Tính năng</TableHead><TableHead className="text-right w-32">Thao tác</TableHead></TableRow></TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-12"><div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /></TableCell></TableRow>
            ) : services?.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="text-sm text-gray-500">{s.icon}</TableCell>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="text-sm">{s.display_context}</TableCell>
                <TableCell className="text-sm text-gray-500">{s.features?.length || 0} tính năng</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link to={`/admin/services/${s.id}`}><Button variant="ghost" size="sm"><Pencil className="w-4 h-4" /></Button></Link>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteId(s.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} onConfirm={handleDelete} title="Xóa dịch vụ" description="Bạn có chắc chắn?" confirmText="Xóa" variant="destructive" />
    </AdminLayout>
  );
};

export default ServiceListPage;
