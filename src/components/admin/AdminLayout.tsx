import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const AdminLayout = ({ children, title, description, actions }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="pl-12 lg:pl-0">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
