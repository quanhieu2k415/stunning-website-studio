import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/san-pham" },
    { name: "Dịch vụ", href: "/dich-vu" },
    { name: "Giới thiệu", href: "/gioi-thieu" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-primary text-primary-foreground py-2">
        <div className="container flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <a href="tel:0978998811" className="font-medium hover:opacity-80 transition-opacity">0978.99.88.11</a>
              <span>-</span>
              <a href="tel:0825893333" className="font-medium hover:opacity-80 transition-opacity">082.589.3333</a>
            </div>
            <a href="mailto:congnghehaiantn@gmail.com" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" />
              <span>congnghehaiantn@gmail.com</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>SN 531A, đường CMT8 tổ 2, P. Gia Sàng, Thái Nguyên</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-card border-b border-border">
        <div className="container flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Hai An Technology" className="w-12 h-12 rounded-xl object-cover" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight">HAI AN</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium tracking-wider">TECHNOLOGY</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </Link>
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
            
            <Button size="sm" className="hidden sm:flex" asChild>
              <Link to="/lien-he">Liên hệ ngay</Link>
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
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                <Button className="w-full" asChild>
                  <Link to="/lien-he" onClick={() => setIsMenuOpen(false)}>Liên hệ ngay</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
