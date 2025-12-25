import { Facebook, Youtube, MessageCircle, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    products: [
      "Camera giám sát",
      "Máy chấm công",
      "Bộ đàm - Định vị",
      "Kiểm soát ra vào",
      "Thiết bị mạng",
    ],
    services: [
      "Thi công lắp đặt",
      "Bảo trì bảo dưỡng",
      "Tư vấn giải pháp",
      "Hỗ trợ kỹ thuật",
    ],
    company: [
      "Giới thiệu",
      "Tin tức",
      "Tuyển dụng",
      "Chính sách bảo hành",
    ],
  };

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: MessageCircle, href: "#", label: "Zalo" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">HA</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">HAI AN</h3>
                <p className="text-xs text-primary-foreground/60 tracking-wider">TECHNOLOGY</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Chuyên cung cấp và thi công các giải pháp camera giám sát, 
              an ninh và công nghệ cho doanh nghiệp và gia đình.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Sản phẩm</h4>
            <ul className="space-y-3">
              {links.products.map((link) => (
                <li key={link}>
                  <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Dịch vụ</h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link}>
                  <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hotline */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Hotline tư vấn</h4>
            <a
              href="tel:0932333000"
              className="inline-flex items-center gap-3 px-5 py-4 bg-primary rounded-xl hover:bg-primary/90 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse-glow">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/80">Gọi ngay</p>
                <p className="text-xl font-bold">0932 333 000</p>
              </div>
            </a>
            <p className="text-sm text-primary-foreground/60 mt-4">
              Tư vấn miễn phí 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {currentYear} Hai An Technology. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
