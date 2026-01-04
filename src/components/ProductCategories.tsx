import { Camera, Clock, Radio, Shield, MonitorSpeaker, Cpu, Monitor, MemoryStick, HardDrive, CircuitBoard, Zap, Package, Fan } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Camera,
    title: "Camera Giám Sát",
    description: "Camera IP, camera Wifi, hệ thống giám sát chuyên nghiệp",
    count: "3 sản phẩm",
    color: "from-blue-500 to-blue-600",
    to: "/san-pham?category=camera",
  },
  {
    icon: Clock,
    title: "Máy Chấm Công",
    description: "Máy chấm công vân tay, khuôn mặt, thẻ từ",
    count: "2 sản phẩm",
    color: "from-emerald-500 to-emerald-600",
    to: "/san-pham?category=cham-cong",
  },
  {
    icon: Shield,
    title: "Kiểm Soát Ra Vào",
    description: "Khóa cửa thông minh, cổng kiểm soát",
    count: "1 sản phẩm",
    color: "from-purple-500 to-purple-600",
    to: "/san-pham?category=kiem-soat",
  },
  {
    icon: MonitorSpeaker,
    title: "Báo Động - PCCC",
    description: "Hệ thống báo cháy, báo động an ninh",
    count: "1 sản phẩm",
    color: "from-red-500 to-red-600",
    to: "/san-pham?category=bao-dong",
  },
  {
    icon: Radio,
    title: "Bộ Đàm - Định Vị",
    description: "Bộ đàm cầm tay, thiết bị định vị GPS",
    count: "1 sản phẩm",
    color: "from-orange-500 to-orange-600",
    to: "/san-pham?category=bo-dam",
  },
];

const pcCategories = [
  {
    icon: Cpu,
    title: "CPU",
    description: "Intel Core, AMD Ryzen các thế hệ mới nhất",
    count: "3 sản phẩm",
    color: "from-cyan-500 to-cyan-600",
    to: "/san-pham?category=cpu",
  },
  {
    icon: Monitor,
    title: "VGA - Card Đồ Họa",
    description: "NVIDIA RTX, AMD Radeon cho gaming & đồ họa",
    count: "3 sản phẩm",
    color: "from-rose-500 to-rose-600",
    to: "/san-pham?category=vga",
  },
  {
    icon: MemoryStick,
    title: "RAM",
    description: "DDR4, DDR5 từ Kingston, Corsair, G.Skill",
    count: "2 sản phẩm",
    color: "from-violet-500 to-violet-600",
    to: "/san-pham?category=ram",
  },
  {
    icon: HardDrive,
    title: "SSD - Ổ Cứng",
    description: "NVMe SSD tốc độ cao Samsung, WD, Kingston",
    count: "2 sản phẩm",
    color: "from-amber-500 to-amber-600",
    to: "/san-pham?category=ssd",
  },
  {
    icon: CircuitBoard,
    title: "Mainboard",
    description: "Bo mạch chủ ASUS, MSI, Gigabyte",
    count: "2 sản phẩm",
    color: "from-teal-500 to-teal-600",
    to: "/san-pham?category=mainboard",
  },
  {
    icon: Zap,
    title: "Nguồn - PSU",
    description: "Nguồn 80+ Bronze, Gold, Platinum",
    count: "2 sản phẩm",
    color: "from-yellow-500 to-yellow-600",
    to: "/san-pham?category=psu",
  },
  {
    icon: Package,
    title: "Case - Vỏ Máy",
    description: "Case gaming NZXT, Corsair, Lian Li",
    count: "2 sản phẩm",
    color: "from-slate-500 to-slate-600",
    to: "/san-pham?category=case",
  },
  {
    icon: Fan,
    title: "Tản Nhiệt",
    description: "Tản khí, tản nước AIO cao cấp",
    count: "2 sản phẩm",
    color: "from-sky-500 to-sky-600",
    to: "/san-pham?category=cooling",
  },
];

const ProductCategories = () => {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Danh mục sản phẩm
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Thiết Bị <span className="text-gradient">An Ninh</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Camera, máy chấm công, kiểm soát ra vào từ các thương hiệu hàng đầu
          </p>
        </div>

        {/* Security categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.to}
              aria-label={`Xem danh mục: ${category.title}`}
              className="group relative bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-border overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {category.description}
              </p>

              {/* Count badge */}
              <span className="inline-flex items-center text-sm font-medium text-primary">
                {category.count}
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* PC Components Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Linh Kiện <span className="text-gradient">PC Gaming</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Build PC theo ý thích với linh kiện chính hãng, giá tốt nhất
          </p>
        </div>

        {/* PC categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pcCategories.map((category, index) => (
            <Link
              key={category.title}
              to={category.to}
              aria-label={`Xem danh mục: ${category.title}`}
              className="group relative bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-border overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
              />

              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className="w-5 h-5 text-white" />
              </div>

              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors text-sm">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Build PC CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/build-pc"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-full shadow-glow hover:shadow-glow-lg transition-all hover:-translate-y-0.5"
          >
            <Cpu className="w-5 h-5" />
            Công cụ Build PC Gaming
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
