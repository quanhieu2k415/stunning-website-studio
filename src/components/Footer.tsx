import { Facebook, Youtube, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    products: [
      { name: "Camera giám sát", href: "/san-pham?category=camera" },
      { name: "Máy chấm công", href: "/san-pham?category=cham-cong" },
      { name: "Bộ đàm - Định vị", href: "/san-pham?category=bo-dam" },
      { name: "Kiểm soát ra vào", href: "/san-pham?category=kiem-soat" },
      { name: "Linh kiện PC", href: "/san-pham?category=cpu" },
    ],
    services: [
      { name: "Thi công lắp đặt", href: "/dich-vu" },
      { name: "Bảo trì bảo dưỡng", href: "/dich-vu" },
      { name: "Tư vấn giải pháp", href: "/lien-he" },
      { name: "Build PC Gaming", href: "/build-pc" },
    ],
    company: [
      { name: "Giới thiệu", href: "/gioi-thieu" },
      { name: "Liên hệ", href: "/lien-he" },
      { name: "Sản phẩm", href: "/san-pham" },
      { name: "Dịch vụ", href: "/dich-vu" },
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
                <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Dịch vụ</h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
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
                src="https://www.google.com/maps?q=21.5625716,105.8555034&hl=vi&z=16&output=embed"
                width="100%"
                height="120"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí Công ty TNHH Công Nghệ Hải An Thái Nguyên"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <a
              href="https://www.google.com/maps/place/C%C3%B4ng+ty+TNHH+C%C3%B4ng+Ngh%E1%BB%87+H%E1%BA%A3i+An+Th%C3%A1i+Nguy%C3%AAn/@21.5625716,105.8529285,1061m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3135274299d84835:0x7d6187d98fd0dde6!8m2!3d21.5625716!4d105.8555034!16s%2Fg%2F11y02bcdkh"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary-foreground/10 px-3 py-2 text-xs text-primary-foreground/80 hover:bg-primary-foreground/15 transition-colors"
            >
              Mở bản đồ trên Google Maps
            </a>
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
