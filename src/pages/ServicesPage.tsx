import Layout from "@/components/Layout";
import { Wrench, Headphones, Truck, CheckCircle2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Wrench,
    title: "Thi Công Lắp Đặt",
    description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm, thi công nhanh chóng, đảm bảo chất lượng công trình. Chúng tôi cam kết hoàn thành đúng tiến độ và đạt tiêu chuẩn kỹ thuật cao nhất.",
    features: ["Khảo sát miễn phí tại công trình", "Tư vấn giải pháp phù hợp ngân sách", "Bảo hành dài hạn lên đến 24 tháng", "Hỗ trợ bảo trì định kỳ"],
  },
  {
    icon: Headphones,
    title: "Hỗ Trợ Kỹ Thuật 24/7",
    description: "Luôn sẵn sàng hỗ trợ khách hàng mọi lúc mọi nơi với đội ngũ chăm sóc chuyên nghiệp. Giải quyết mọi vấn đề kỹ thuật nhanh chóng và hiệu quả.",
    features: ["Hotline 24/7", "Phản hồi trong 30 phút", "Hỗ trợ từ xa qua TeamViewer", "Kỹ thuật viên có mặt trong 2h"],
  },
  {
    icon: Truck,
    title: "Giao Hàng & Vận Chuyển",
    description: "Giao hàng toàn quốc, miễn phí vận chuyển cho đơn hàng từ 1 triệu đồng. Đóng gói cẩn thận, bảo đảm hàng hóa nguyên vẹn.",
    features: ["Giao hàng toàn quốc", "Miễn phí ship đơn từ 1 triệu", "Đóng gói chuyên nghiệp", "Bảo hiểm hàng hóa"],
  },
  {
    icon: Settings,
    title: "Bảo Trì & Bảo Dưỡng",
    description: "Dịch vụ bảo trì định kỳ giúp hệ thống hoạt động ổn định, kéo dài tuổi thọ thiết bị. Phát hiện sớm và khắc phục kịp thời các sự cố tiềm ẩn.",
    features: ["Bảo trì định kỳ hàng quý", "Vệ sinh và kiểm tra thiết bị", "Cập nhật firmware mới nhất", "Báo cáo tình trạng chi tiết"],
  },
];

const processSteps = [
  { step: 1, title: "Tiếp nhận yêu cầu", description: "Nhận thông tin và tư vấn sơ bộ qua điện thoại hoặc trực tiếp" },
  { step: 2, title: "Khảo sát thực tế", description: "Đội ngũ kỹ thuật đến khảo sát và đánh giá hiện trạng công trình" },
  { step: 3, title: "Báo giá chi tiết", description: "Lập phương án và báo giá phù hợp với nhu cầu khách hàng" },
  { step: 4, title: "Thi công lắp đặt", description: "Tiến hành thi công theo đúng tiến độ và tiêu chuẩn kỹ thuật" },
  { step: 5, title: "Nghiệm thu & Bàn giao", description: "Hướng dẫn sử dụng và bàn giao đầy đủ hồ sơ, tài liệu" },
];

const ServicesPage = () => {
  return (
    <Layout>
        {/* Hero */}
        <section className="bg-gradient-primary py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Dịch Vụ Của Chúng Tôi
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Giải pháp toàn diện từ tư vấn, lắp đặt đến bảo trì với đội ngũ chuyên nghiệp
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Quy trình làm việc
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                5 Bước <span className="text-gradient">Đơn Giản</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Quy trình làm việc chuyên nghiệp, minh bạch và hiệu quả
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processSteps.map((item, index) => (
                <div key={item.step} className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container">
            <div className="bg-gradient-primary rounded-3xl p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Bạn Cần Tư Vấn?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá tốt nhất
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" asChild>
                  <a href="tel:0978998811">Gọi ngay: 0978 998 811</a>
                </Button>
                <Button size="lg" variant="hero-outline" asChild>
                  <Link to="/lien-he">Gửi yêu cầu tư vấn</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  );
};

export default ServicesPage;
