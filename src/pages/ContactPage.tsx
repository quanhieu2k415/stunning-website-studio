import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const contactInfo = [
  { icon: Phone, label: "Hotline", value: "0978.99.88.11 - 082.589.3333", href: "tel:0978998811" },
  { icon: Mail, label: "Email", value: "congnghehaiantn@gmail.com", href: "mailto:congnghehaiantn@gmail.com" },
  { icon: MapPin, label: "Địa chỉ", value: "SN 531A, đường CMT8 tổ 2, P. Gia Sàng, Thái Nguyên", href: "#" },
  { icon: Clock, label: "Giờ làm việc", value: "8:00 - 18:00 (T2 - CN)", href: "#" },
];

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get("product");
  const variantLabel = searchParams.get("variant");
  const variantPrice = searchParams.get("price");

  const [formData, setFormData] = useState(() => {
    if (!productName) {
      return { name: "", phone: "", email: "", subject: "", message: "" };
    }
    const parts = [`Tôi muốn được tư vấn về sản phẩm: ${productName}`];
    if (variantLabel) parts.push(`Phiên bản: ${variantLabel}`);
    if (variantPrice) parts.push(`Giá: ${variantPrice}`);
    return {
      name: "",
      phone: "",
      email: "",
      subject: "tu-van",
      message: parts.join("\n"),
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!formData.name.trim()) { toast.error("Vui lòng nhập họ tên"); return false; }
    if (!formData.phone.trim()) { toast.error("Vui lòng nhập số điện thoại"); return false; }
    if (!/^[0-9]{9,11}$/.test(formData.phone.replace(/[\s.-]/g, ""))) { toast.error("Số điện thoại không hợp lệ"); return false; }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { toast.error("Email không hợp lệ"); return false; }
    if (!formData.message.trim()) { toast.error("Vui lòng nhập nội dung tin nhắn"); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp cho chúng tôi.");
      }
    } catch {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp cho chúng tôi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
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
                    src="https://www.google.com/maps?q=21.5625716,105.8555034&hl=vi&z=16&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vị trí Công ty TNHH Công Nghệ Hải An Thái Nguyên"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="mt-3">
                  <Button asChild variant="secondary" className="w-full">
                    <a
                      href="https://www.google.com/maps/place/C%C3%B4ng+ty+TNHH+C%C3%B4ng+Ngh%E1%BB%87+H%E1%BA%A3i+An+Th%C3%A1i+Nguy%C3%AAn/@21.5625716,105.8529285,1061m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3135274299d84835:0x7d6187d98fd0dde6!8m2!3d21.5625716!4d105.8555034!16s%2Fg%2F11y02bcdkh"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Mở bản đồ trên Google Maps
                    </a>
                  </Button>
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
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  );
};

export default ContactPage;
