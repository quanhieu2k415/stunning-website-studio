import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tags,
  Monitor,
  Wrench,
  Globe,
  Image,
  Phone,
  FileText,
  Info,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Tổng quan",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Sản phẩm",
    items: [
      { label: "Sản phẩm", href: "/admin/products", icon: Package },
      { label: "Danh mục", href: "/admin/categories", icon: FolderTree },
      { label: "Thương hiệu", href: "/admin/brands", icon: Tags },
    ],
  },
  {
    title: "Build PC",
    items: [
      { label: "Linh kiện", href: "/admin/pc-components", icon: Monitor },
      { label: "Cấu hình có sẵn", href: "/admin/prebuilt-configs", icon: Settings },
    ],
  },
  {
    title: "Nội dung",
    items: [
      { label: "Dịch vụ", href: "/admin/services", icon: Wrench },
      { label: "Hero Banner", href: "/admin/hero", icon: Image },
      { label: "Liên hệ", href: "/admin/contact", icon: Phone },
      { label: "Footer", href: "/admin/footer", icon: FileText },
      { label: "Giới thiệu", href: "/admin/about", icon: Info },
      { label: "Điều hướng", href: "/admin/navigation", icon: Globe },
      { label: "SEO", href: "/admin/seo", icon: Settings },
    ],
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HA</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm">Hai An Tech</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.email || "Admin"}
            </p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
