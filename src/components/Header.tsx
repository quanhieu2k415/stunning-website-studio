import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Trang chủ", href: "#home" },
    { name: "Sản phẩm", href: "#products" },
    { name: "Dịch vụ", href: "#services" },
    { name: "Về chúng tôi", href: "#about" },
    { name: "Liên hệ", href: "#contact" },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-primary text-primary-foreground py-2">
        <div className="container flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-6 flex-wrap">
            <a href="tel:0978998811" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              <span className="font-medium">0978 998 811</span>
            </a>
            <a href="mailto:info@haian.vn" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" />
              <span>info@haian.vn</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Tổ dân phố Cam Giá 2, P. Gia Sàng, TP. Thái Nguyên</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-card border-b border-border">
        <div className="container flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-xl">HA</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground leading-tight">HAI AN</h1>
              <p className="text-xs text-muted-foreground font-medium tracking-wider">TECHNOLOGY</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-colors rounded-lg hover:bg-primary/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Search & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-48 lg:w-64 h-10 pl-10 pr-4 rounded-full bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            </div>
            
            <Button size="sm" className="hidden sm:flex">
              Liên hệ ngay
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 font-medium rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                <Button className="w-full">Liên hệ ngay</Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
