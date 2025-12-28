import { Facebook, Youtube, MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

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
    { icon: Facebook, href: "https://www.facebook.com/congnghehaiantn", label: "Facebook" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: MessageCircle, href: "https://zalo.me/0978998811", label: "Zalo" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Hai An Technology" className="w-12 h-12 rounded-xl object-cover" />
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
            <div className="space-y-2">
              <a
                href="tel:0978998811"
                className="inline-flex items-center gap-3 px-5 py-3 bg-primary rounded-xl hover:bg-primary/90 transition-colors group w-full"
              >
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse-glow">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/80">Gọi ngay</p>
                  <p className="text-xl font-bold">0978.99.88.11</p>
                </div>
              </a>
              <a
                href="tel:0825893333"
                className="inline-flex items-center gap-3 px-5 py-3 bg-primary/80 rounded-xl hover:bg-primary transition-colors group w-full"
              >
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/80">Hotline 2</p>
                  <p className="text-xl font-bold">082.589.3333</p>
                </div>
              </a>
            </div>
            <p className="text-sm text-primary-foreground/60 mt-4 mb-4">
              Tư vấn miễn phí 24/7
            </p>
            
            {/* Small Google Maps */}
            <div className="rounded-xl overflow-hidden border border-primary-foreground/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.8547382945847!2d105.8386!3d21.5925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135274b0a7b7e6f%3A0x4b8b7f3b5f7b7e6f!2zR2lhIFPDoG5nLCBUaMOhaSBOZ3V5w6pu!5e0!3m2!1svi!2s!4v1703500000000!5m2!1svi!2s"
                width="100%"
                height="120"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí Hai An Technology"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
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
