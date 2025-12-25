import { Wrench, Headphones, Truck, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Thi Công Lắp Đặt",
    description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm, thi công nhanh chóng, đảm bảo chất lượng công trình",
    features: ["Khảo sát miễn phí", "Tư vấn giải pháp", "Bảo hành dài hạn"],
  },
  {
    icon: Headphones,
    title: "Hỗ Trợ 24/7",
    description: "Luôn sẵn sàng hỗ trợ khách hàng mọi lúc mọi nơi với đội ngũ chăm sóc chuyên nghiệp",
    features: ["Hotline 24/7", "Phản hồi nhanh", "Hỗ trợ từ xa"],
  },
  {
    icon: Truck,
    title: "Giao Hàng Nhanh",
    description: "Giao hàng toàn quốc, miễn phí vận chuyển cho đơn hàng từ 1 triệu đồng",
    features: ["Giao hàng toàn quốc", "Miễn phí ship", "Đóng gói cẩn thận"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container relative">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Dịch vụ của chúng tôi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cam Kết <span className="text-gradient">Chất Lượng</span> Dịch Vụ
          </h2>
          <p className="text-muted-foreground text-lg">
            Với hơn 10 năm kinh nghiệm, chúng tôi tự hào mang đến dịch vụ chuyên nghiệp nhất
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
