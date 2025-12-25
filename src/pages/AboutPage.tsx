import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Eye, Award, Users, CheckCircle2 } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "5000+", label: "Khách hàng" },
  { value: "1000+", label: "Dự án" },
  { value: "98%", label: "Hài lòng" },
];

const values = [
  {
    icon: Target,
    title: "Tận Tâm",
    description: "Luôn đặt lợi ích khách hàng lên hàng đầu, tư vấn giải pháp phù hợp nhất",
  },
  {
    icon: Award,
    title: "Chất Lượng",
    description: "Cam kết sản phẩm chính hãng, dịch vụ đạt tiêu chuẩn cao nhất",
  },
  {
    icon: Eye,
    title: "Chuyên Nghiệp",
    description: "Đội ngũ kỹ thuật được đào tạo bài bản, giàu kinh nghiệm thực tế",
  },
  {
    icon: Users,
    title: "Đồng Hành",
    description: "Hỗ trợ khách hàng 24/7, đồng hành trong suốt quá trình sử dụng",
  },
];

const milestones = [
  { year: "2014", title: "Thành lập công ty", description: "Bắt đầu hoạt động tại Thái Nguyên" },
  { year: "2016", title: "Mở rộng dịch vụ", description: "Trở thành nhà phân phối chính thức Hikvision" },
  { year: "2018", title: "1000 khách hàng", description: "Cột mốc 1000 khách hàng tin dùng" },
  { year: "2020", title: "Đối tác Samsung", description: "Hợp tác phân phối khóa thông minh Samsung" },
  { year: "2023", title: "5000+ khách hàng", description: "Phục vụ hơn 5000 khách hàng toàn quốc" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBanner} alt="Hai An Technology" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
          <div className="container relative text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Về Hai An Technology
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Hơn 10 năm kinh nghiệm trong lĩnh vực camera và giải pháp an ninh
            </p>
          </div>
        </section>

        {/* About */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  Câu chuyện của chúng tôi
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Uy Tín Tạo Nên <span className="text-gradient">Giá Trị</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Hai An Technology</strong> được thành lập năm 2014, 
                    là đơn vị chuyên cung cấp và thi công các giải pháp camera giám sát, thiết bị an ninh 
                    và công nghệ thông minh tại Thái Nguyên và các tỉnh lân cận.
                  </p>
                  <p>
                    Với phương châm <em>"Uy tín tạo nên giá trị - Chất lượng khẳng định thương hiệu"</em>, 
                    chúng tôi cam kết mang đến cho khách hàng những sản phẩm chính hãng, dịch vụ chuyên nghiệp 
                    và giải pháp tối ưu nhất.
                  </p>
                  <p>
                    Là đối tác chính thức của các thương hiệu lớn như Hikvision, Samsung, ZKTeco, Ronald Jack... 
                    chúng tôi tự hào đã phục vụ hơn 5000 khách hàng và hoàn thành hơn 1000 dự án các quy mô khác nhau.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card rounded-2xl p-6 shadow-card border border-border text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Giá trị cốt lõi
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Cam Kết Của <span className="text-gradient">Chúng Tôi</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-2xl p-6 shadow-card border border-border text-center group hover:shadow-card-hover transition-all">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Hành trình phát triển
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Các Cột Mốc <span className="text-gradient">Quan Trọng</span>
              </h2>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              
              <div className="space-y-8">
                {milestones.map((item, index) => (
                  <div key={item.year} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:pr-8 md:text-right" />
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-primary items-center justify-center z-10 shadow-glow">
                      <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 md:pl-8">
                      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                        <span className="text-sm font-bold text-primary">{item.year}</span>
                        <h4 className="text-lg font-bold text-foreground mt-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
