import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  const features = [
    { icon: Shield, text: "Bảo hành 24 tháng" },
    { icon: Zap, text: "Lắp đặt nhanh chóng" },
    { icon: Award, text: "Sản phẩm chính hãng" },
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Hai An Technology Showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              Uy tín tạo nên giá trị - Chất lượng khẳng định thương hiệu
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Giải Pháp
            <span className="block text-primary">Camera & An Ninh</span>
            Chuyên Nghiệp
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Chuyên cung cấp và thi công lắp đặt camera giám sát, máy chấm công, 
            thiết bị kiểm soát ra vào và các giải pháp công nghệ hiện đại.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" variant="hero" asChild>
              <Link to="/san-pham">
                Xem sản phẩm
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="hero-outline" asChild>
              <Link to="/lien-he">
                Tư vấn miễn phí
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-primary-foreground/90 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
