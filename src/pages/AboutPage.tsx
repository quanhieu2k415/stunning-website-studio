import Layout from "@/components/Layout";
import { Network, Shield, Monitor, Cpu, Users, Wrench, CheckCircle2, Zap, Award, Building2 } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const expertise = [
  {
    icon: Network,
    title: "Hạ tầng mạng & An ninh",
    description: "Thiết kế, thi công mạng nội bộ và hệ thống camera giám sát thông minh với thiết bị chính hãng từ Hikvision, Samsung, ZKTeco...",
    features: ["Mạng LAN/WAN doanh nghiệp", "Camera giám sát AI", "Hệ thống chấm công", "Khóa cửa thông minh"]
  },
  {
    icon: Cpu,
    title: "Giải pháp phần cứng",
    description: "Tư vấn và lắp đặt hệ thống máy tính chuyên dụng, từ PC văn phòng tối ưu đến các dàn PC Gaming cấu hình cao.",
    features: ["PC Gaming cao cấp", "Workstation đồ họa", "PC văn phòng tối ưu", "Nâng cấp & Bảo trì"]
  },
];

const values = [
  {
    icon: Shield,
    title: "Thiết bị chính hãng",
    description: "Cam kết 100% sản phẩm chính hãng, nguồn gốc rõ ràng",
  },
  {
    icon: Wrench,
    title: "Triển khai đúng kỹ thuật",
    description: "Đội ngũ kỹ sư trẻ, am hiểu kỹ thuật, thi công chuẩn xác",
  },
  {
    icon: Users,
    title: "Tư vấn đúng nhu cầu",
    description: "Lắng nghe và đề xuất giải pháp phù hợp nhất cho từng khách hàng",
  },
  {
    icon: Zap,
    title: "Hỗ trợ nhanh chóng",
    description: "Phản hồi và xử lý sự cố kịp thời, đảm bảo hệ thống luôn ổn định",
  },
];

const clients = [
  { icon: Building2, title: "Văn phòng", description: "Giải pháp mạng và bảo mật toàn diện" },
  { icon: Monitor, title: "Showroom", description: "Hệ thống camera và quản lý chuyên nghiệp" },
  { icon: Award, title: "Cửa hàng", description: "An ninh và kiểm soát ra vào thông minh" },
  { icon: Cpu, title: "Doanh nghiệp", description: "Hạ tầng IT và giải pháp đồng bộ" },
];

const AboutPage = () => {
  return (
    <Layout>
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBanner} alt="Hai An Technology" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
          <div className="container relative text-center">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
              Thành lập năm 2025
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Nền Tảng Công Nghệ Cho <br className="hidden md:block" />
              <span className="text-primary-light">Sự Bứt Phá</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Đơn vị tiên phong tại Thái Nguyên cung cấp hệ sinh thái giải pháp công nghệ toàn diện
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
                <Network className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Triết lý hoạt động</span>
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-6">
                "Một hạ tầng mạng <span className="text-primary">đúng chuẩn – ổn định – lâu dài</span> chính là 
                <span className="text-gradient font-bold"> "mạch máu"</span> để mọi hệ thống vận hành hiệu quả."
              </blockquote>
              <p className="text-muted-foreground text-lg">
                Tại Hai An Technology, uy tín của chúng tôi được xây dựng trên sự ổn định trong hệ thống của bạn.
              </p>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Lĩnh vực chuyên sâu
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Giải Pháp <span className="text-gradient">Toàn Diện</span>
              </h2>
              <p className="text-muted-foreground">
                Chúng tôi mang đến hệ sinh thái công nghệ đầy đủ cho mọi nhu cầu của doanh nghiệp
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {expertise.map((item) => (
                <div key={item.title} className="bg-card rounded-2xl p-8 shadow-card border border-border group hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature) => (
                          <span key={feature} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Cam kết của chúng tôi
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="text-gradient">"Tư Vấn Đúng Nhu Cầu – Triển Khai Đúng Kỹ Thuật"</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-2xl p-6 shadow-card border border-border text-center group hover:shadow-card-hover transition-all">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Đối tượng phục vụ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Giải Pháp Cho <span className="text-gradient">Mọi Quy Mô</span>
              </h2>
              <p className="text-muted-foreground">
                Từ cửa hàng nhỏ đến doanh nghiệp lớn, chúng tôi đều có giải pháp phù hợp
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {clients.map((client) => (
                <div key={client.title} className="bg-card rounded-2xl p-6 shadow-card border border-border text-center group hover:shadow-card-hover transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
                    <client.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{client.title}</h3>
                  <p className="text-muted-foreground text-sm">{client.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-gradient-primary">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto">
              <Users className="w-12 h-12 text-white mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Đội Ngũ Kỹ Sư Trẻ, Năng Động
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                Với đội ngũ kỹ sư trẻ, am hiểu kỹ thuật và không ngừng cập nhật xu hướng công nghệ mới nhất, 
                chúng tôi tự tin mang đến những giải pháp tối ưu, hiện đại cho văn phòng, showroom, 
                cửa hàng và doanh nghiệp của bạn.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Đào tạo chuyên sâu
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Cập nhật công nghệ
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Kinh nghiệm thực tế
                </span>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  );
};

export default AboutPage;
