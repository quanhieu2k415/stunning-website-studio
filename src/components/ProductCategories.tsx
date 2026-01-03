import { Camera, Clock, Radio, Shield, Wifi, MonitorSpeaker } from "lucide-react";
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
    icon: Radio,
    title: "Bộ Đàm - Định Vị",
    description: "Bộ đàm cầm tay, thiết bị định vị GPS",
    count: "1 sản phẩm",
    color: "from-orange-500 to-orange-600",
    to: "/san-pham?category=bo-dam",
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
    icon: Wifi,
    title: "Thiết Bị Mạng",
    description: "Switch, router, access point chuyên dụng",
    count: "0 sản phẩm",
    color: "from-cyan-500 to-cyan-600",
    to: "/san-pham",
  },
  {
    icon: MonitorSpeaker,
    title: "Báo Động - PCCC",
    description: "Hệ thống báo cháy, báo động an ninh",
    count: "1 sản phẩm",
    color: "from-red-500 to-red-600",
    to: "/san-pham?category=bao-dong",
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
            Đa Dạng Sản Phẩm <span className="text-gradient">Công Nghệ</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Chúng tôi cung cấp đầy đủ các thiết bị an ninh và công nghệ từ các thương hiệu hàng đầu thế giới
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};

export default ProductCategories;
