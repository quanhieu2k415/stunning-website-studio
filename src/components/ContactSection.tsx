import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp cho chúng tôi.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp cho chúng tôi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Hotline", value: "0978.99.88.11 - 082.589.3333", href: "tel:0978998811" },
    { icon: Mail, label: "Email", value: "congnghehaiantn@gmail.com", href: "mailto:congnghehaiantn@gmail.com" },
    { icon: MapPin, label: "Địa chỉ", value: "SN 531A, đường CMT8 tổ 2, P. Gia Sàng, Thái Nguyên", href: "#" },
    { icon: Clock, label: "Giờ làm việc", value: "8:00 - 18:00 (T2 - CN)", href: "#" },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Liên hệ với chúng tôi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hãy Để Chúng Tôi <span className="text-gradient">Hỗ Trợ</span> Bạn
          </h2>
          <p className="text-muted-foreground text-lg">
            Đội ngũ tư vấn viên chuyên nghiệp luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info & Map */}
          <div>
            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1061!2d105.8529285!3d21.5625716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135274299d84835%3A0x7d6187d98fd0dde6!2zQ8O0bmcgdHkgVE5ISCBDw7RuZyBOZ2jhu4cgSOG6o2kgQW4gVGjDoWkgTmd1ecOqbg!5e0!3m2!1svi!2svn!4v1705800000000!5m2!1svi!2svn"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí Công ty TNHH Công Nghệ Hải An Thái Nguyên"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">Gửi yêu cầu tư vấn</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="0912 345 678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nội dung yêu cầu *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  placeholder="Mô tả yêu cầu của bạn..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                <Send className="w-5 h-5" />
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
