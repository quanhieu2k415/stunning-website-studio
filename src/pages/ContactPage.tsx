import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  { icon: Phone, label: "Hotline", value: "0978 998 811", href: "tel:0978998811" },
  { icon: Mail, label: "Email", value: "congnghehaiantn@gmail.com", href: "mailto:congnghehaiantn@gmail.com" },
  { icon: MapPin, label: "Địa chỉ", value: "Tổ dân phố Cam Giá 2, P. Gia Sàng, TP. Thái Nguyên, Tỉnh Thái Nguyên", href: "#" },
  { icon: Clock, label: "Giờ làm việc", value: "8:00 - 18:00 (T2 - CN)", href: "#" },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-primary py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Đội ngũ tư vấn viên chuyên nghiệp luôn sẵn sàng hỗ trợ bạn 24/7
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact info */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Thông tin liên hệ</h2>
                
                <div className="space-y-4 mb-8">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-card transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-semibold text-foreground">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-border shadow-card">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.8547382945847!2d105.8386!3d21.5925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135274b0a7b7e6f%3A0x4b8b7f3b5f7b7e6f!2zR2lhIFPDoG5nLCBUaMOhaSBOZ3V5w6pu!5e0!3m2!1svi!2s!4v1703500000000!5m2!1svi!2s"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vị trí Hai An Technology - Gia Sàng, Thái Nguyên"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border h-fit">
                <h2 className="text-2xl font-bold text-foreground mb-6">Gửi yêu cầu tư vấn</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Chủ đề
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="tu-van">Tư vấn sản phẩm</option>
                      <option value="bao-gia">Báo giá dự án</option>
                      <option value="ho-tro">Hỗ trợ kỹ thuật</option>
                      <option value="khieu-nai">Khiếu nại - Góp ý</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nội dung *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                      placeholder="Mô tả chi tiết yêu cầu của bạn..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="w-5 h-5" />
                    Gửi yêu cầu
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
