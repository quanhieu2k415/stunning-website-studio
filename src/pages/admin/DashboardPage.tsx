import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, Wrench, Monitor, Globe, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickLinkProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

const quickLinks: QuickLinkProps[] = [
  {
    title: "Sản phẩm",
    description: "Quản lý sản phẩm, giá cả, thông số",
    href: "/admin/products",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    title: "Danh mục",
    description: "Quản lý danh mục sản phẩm",
    href: "/admin/categories",
    icon: FolderTree,
    color: "bg-green-500",
  },
  {
    title: "Build PC",
    description: "Linh kiện và cấu hình có sẵn",
    href: "/admin/pc-components",
    icon: Monitor,
    color: "bg-purple-500",
  },
  {
    title: "Dịch vụ",
    description: "Dịch vụ và quy trình làm việc",
    href: "/admin/services",
    icon: Wrench,
    color: "bg-orange-500",
  },
  {
    title: "Nội dung trang",
    description: "Hero banner, liên hệ, footer",
    href: "/admin/hero",
    icon: Globe,
    color: "bg-pink-500",
  },
  {
    title: "SEO",
    description: "Tiêu đề, mô tả, Open Graph",
    href: "/admin/seo",
    icon: Settings,
    color: "bg-teal-500",
  },
];

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      description="Tổng quan quản trị website Hải An Technology"
    >
      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Link key={link.href} to={link.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div
                  className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center`}
                >
                  <link.icon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-base">{link.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">Hướng dẫn sử dụng</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p>
            Chào mừng bạn đến với trang quản trị Hải An Technology. Tại đây bạn có thể:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Thêm, sửa, xóa sản phẩm với đầy đủ thông tin: giá, hình ảnh, tính năng, thông số kỹ thuật</li>
            <li>Quản lý danh mục sản phẩm và thương hiệu</li>
            <li>Cập nhật cấu hình Build PC và linh kiện</li>
            <li>Chỉnh sửa nội dung các trang: dịch vụ, giới thiệu, liên hệ</li>
            <li>Cập nhật hero banner, footer, điều hướng</li>
            <li>Thiết lập SEO cho từng trang</li>
          </ul>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default DashboardPage;
