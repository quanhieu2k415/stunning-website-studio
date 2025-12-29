import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Phone, Shield, Truck, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import cameraIpHikvision from "@/assets/products/camera-ip-hikvision.jpg";
import mayChamCongVanTay from "@/assets/products/may-cham-cong-van-tay.jpg";
import khoaCuaThongMinh from "@/assets/products/khoa-cua-thong-minh.jpg";
import dauGhiHinh from "@/assets/products/dau-ghi-hinh.jpg";
import cameraWifi from "@/assets/products/camera-wifi.jpg";
import boDam from "@/assets/products/bo-dam.jpg";
import mayChamCongKhuonMat from "@/assets/products/may-cham-cong-khuon-mat.jpg";
import baoChay from "@/assets/products/bao-chay.jpg";

// Mock product data
const products = {
  "1": {
    id: "1",
    name: "Camera IP Hikvision DS-2CD1027G0-L",
    price: "1.650.000",
    originalPrice: "1.890.000",
    images: [cameraIpHikvision],
    rating: 4.8,
    reviews: 124,
    badge: "Bán chạy",
    category: "Camera giám sát",
    categoryId: "camera",
    brand: "Hikvision",
    description: "Camera IP Hikvision DS-2CD1027G0-L là dòng camera ColorVu với khả năng ghi hình màu 24/7, ngay cả trong điều kiện ánh sáng yếu. Với độ phân giải 2MP Full HD 1080P, camera mang đến hình ảnh sắc nét và chi tiết. Thiết kế chống nước IP67 phù hợp lắp đặt ngoài trời.",
    features: [
      "Hình ảnh màu 24/7 với công nghệ ColorVu",
      "Độ phân giải 2MP Full HD 1080P",
      "Ống kính cố định 2.8mm/4mm",
      "Hỗ trợ PoE, tiết kiệm dây nguồn",
      "Chống nước IP67, lắp đặt ngoài trời",
      "Hỗ trợ khe cắm thẻ nhớ microSD lên đến 256GB",
    ],
    specs: {
      "Độ phân giải": "2MP (1920 x 1080)",
      "Ống kính": "2.8mm / 4mm cố định",
      "Góc nhìn": "107° (2.8mm) / 87° (4mm)",
      "Tầm xa hồng ngoại": "30m",
      "Chuẩn nén": "H.265+ / H.265 / H.264+ / H.264",
      "Nguồn điện": "12V DC / PoE (802.3af)",
      "Chống nước": "IP67",
      "Nhiệt độ hoạt động": "-30°C đến 60°C",
      "Kích thước": "Φ70mm × 155mm",
      "Trọng lượng": "450g",
    },
    warranty: "24 tháng",
    inStock: true,
  },
  "2": {
    id: "2",
    name: "Máy Chấm Công Vân Tay RONALD JACK X628-C",
    price: "2.850.000",
    originalPrice: "3.200.000",
    images: [mayChamCongVanTay],
    rating: 4.9,
    reviews: 89,
    badge: "Mới",
    category: "Máy chấm công",
    categoryId: "cham-cong",
    brand: "Ronald Jack",
    description: "Máy chấm công vân tay RONALD JACK X628-C là thiết bị chấm công hiện đại với khả năng nhận diện vân tay nhanh chóng và chính xác. Hỗ trợ kết nối TCP/IP và USB, dễ dàng tích hợp với phần mềm quản lý nhân sự. Màn hình LCD màu 2.8 inch hiển thị rõ ràng.",
    features: [
      "Dung lượng 3.000 vân tay, 100.000 bản ghi",
      "Nhận diện vân tay dưới 0.5 giây",
      "Màn hình LCD màu 2.8 inch",
      "Kết nối TCP/IP, USB, RS232/485",
      "Phần mềm chấm công tiếng Việt miễn phí",
      "Hỗ trợ xuất báo cáo Excel",
    ],
    specs: {
      "Dung lượng vân tay": "3.000 mẫu",
      "Dung lượng bản ghi": "100.000 bản ghi",
      "Màn hình": "LCD màu 2.8 inch TFT",
      "Giao tiếp": "TCP/IP, USB, RS232/485",
      "Tốc độ nhận diện": "< 0.5 giây",
      "Tỷ lệ lỗi FAR": "< 0.0001%",
      "Tỷ lệ lỗi FRR": "< 0.1%",
      "Nguồn điện": "DC 5V",
      "Nhiệt độ hoạt động": "0°C đến 45°C",
      "Kích thước": "188 x 140 x 35mm",
    },
    warranty: "12 tháng",
    inStock: true,
  },
  "3": {
    id: "3",
    name: "Khóa Cửa Thông Minh SAMSUNG SHP-DP609",
    price: "12.500.000",
    originalPrice: "14.900.000",
    images: [khoaCuaThongMinh],
    rating: 5.0,
    reviews: 56,
    badge: "Hot",
    category: "Kiểm soát ra vào",
    categoryId: "kiem-soat",
    brand: "Samsung",
    description: "Khóa cửa thông minh SAMSUNG SHP-DP609 với thiết kế sang trọng, hiện đại. Hỗ trợ 4 phương thức mở khóa: vân tay, mã số, thẻ từ và chìa khóa cơ. Tích hợp công nghệ chống đột nhập và cảnh báo xâm nhập thông minh.",
    features: [
      "4 phương thức mở khóa: Vân tay, mã số, thẻ từ, chìa khóa",
      "Dung lượng 100 vân tay, 30 mã số",
      "Công nghệ chống đột nhập",
      "Cảnh báo xâm nhập thông minh",
      "Pin AA tiêu chuẩn, sử dụng 12 tháng",
      "Thiết kế sang trọng, chống nước IP55",
    ],
    specs: {
      "Dung lượng vân tay": "100 mẫu",
      "Dung lượng mã số": "30 mã",
      "Dung lượng thẻ từ": "20 thẻ",
      "Màn hình": "Màn hình cảm ứng LED",
      "Nguồn điện": "4 pin AA (12 tháng)",
      "Nguồn dự phòng": "9V DC",
      "Chống nước": "IP55",
      "Vật liệu": "Hợp kim nhôm cao cấp",
      "Kích thước": "78 x 380 x 22mm",
      "Trọng lượng": "3.2kg",
    },
    warranty: "24 tháng",
    inStock: true,
  },
  "4": {
    id: "4",
    name: "Đầu Ghi Hình 8 Kênh Hikvision DS-7108NI",
    price: "3.200.000",
    originalPrice: "3.800.000",
    images: [dauGhiHinh],
    rating: 4.7,
    reviews: 78,
    badge: null,
    category: "Đầu ghi hình",
    categoryId: "camera",
    brand: "Hikvision",
    description: "Đầu ghi hình 8 kênh Hikvision DS-7108NI hỗ trợ camera IP lên đến 4MP. Tích hợp công nghệ H.265+ tiết kiệm dung lượng ổ cứng. Hỗ trợ 1 ổ cứng SATA lên đến 6TB, phù hợp cho gia đình và văn phòng nhỏ.",
    features: [
      "8 kênh camera IP, độ phân giải tối đa 4MP",
      "Công nghệ nén H.265+ tiết kiệm 80% dung lượng",
      "Hỗ trợ 1 ổ cứng SATA lên đến 6TB",
      "Xem từ xa qua điện thoại và máy tính",
      "Hỗ trợ tìm kiếm thông minh",
      "Cổng HDMI và VGA xuất hình đồng thời",
    ],
    specs: {
      "Số kênh": "8 kênh IP",
      "Độ phân giải ghi hình": "Tối đa 4MP",
      "Chuẩn nén": "H.265+ / H.265 / H.264+ / H.264",
      "Ổ cứng": "1 SATA, tối đa 6TB",
      "Băng thông": "80Mbps đầu vào, 60Mbps đầu ra",
      "Cổng xuất hình": "1 HDMI, 1 VGA",
      "Cổng mạng": "1 RJ45 100Mbps",
      "Nguồn điện": "DC 48V",
      "Kích thước": "260 x 225 x 48mm",
      "Trọng lượng": "0.9kg (không ổ cứng)",
    },
    warranty: "24 tháng",
    inStock: true,
  },
  "5": {
    id: "5",
    name: "Camera Wifi Ezviz C6N 2MP",
    price: "890.000",
    originalPrice: "1.100.000",
    images: [cameraWifi],
    rating: 4.6,
    reviews: 95,
    badge: "Bán chạy",
    category: "Camera giám sát",
    categoryId: "camera",
    brand: "Ezviz",
    description: "Camera Wifi Ezviz C6N 2MP là camera trong nhà thông minh với khả năng xoay 360 độ, theo dõi chuyển động tự động. Hỗ trợ đàm thoại 2 chiều và thông báo qua điện thoại.",
    features: [
      "Xoay 360 độ theo dõi chuyển động",
      "Độ phân giải 2MP Full HD 1080P",
      "Đàm thoại 2 chiều",
      "Hồng ngoại ban đêm 10m",
      "Khe cắm thẻ nhớ 256GB",
      "Kết nối Wifi 2.4GHz",
    ],
    specs: {
      "Độ phân giải": "2MP (1920 x 1080)",
      "Ống kính": "4mm cố định",
      "Góc xoay": "Pan 340°, Tilt 55°",
      "Tầm xa hồng ngoại": "10m",
      "Lưu trữ": "Thẻ nhớ microSD 256GB / Cloud",
      "Kết nối": "Wifi 2.4GHz",
      "Nguồn điện": "DC 5V/1A",
      "Kích thước": "Φ87.5mm × 117.6mm",
    },
    warranty: "12 tháng",
    inStock: true,
  },
  "6": {
    id: "6",
    name: "Bộ Đàm Motorola GP328",
    price: "4.500.000",
    originalPrice: "5.200.000",
    images: [boDam],
    rating: 4.8,
    reviews: 42,
    badge: null,
    category: "Bộ đàm - Định vị",
    categoryId: "bo-dam",
    brand: "Motorola",
    description: "Bộ đàm Motorola GP328 chuyên nghiệp với công suất cao, phạm vi liên lạc xa. Thiết kế chắc chắn, chống bụi chống nước IP54, phù hợp cho công trình, bảo vệ, sự kiện.",
    features: [
      "Công suất phát 5W, phạm vi xa",
      "16 kênh lập trình",
      "Pin Li-Ion dung lượng cao",
      "Chống bụi chống nước IP54",
      "Âm thanh rõ ràng, chống nhiễu",
      "Thiết kế chắc chắn, bền bỉ",
    ],
    specs: {
      "Công suất": "5W",
      "Số kênh": "16 kênh",
      "Tần số": "VHF 136-174MHz / UHF 403-470MHz",
      "Pin": "Li-Ion 1500mAh",
      "Chống nước": "IP54",
      "Thời gian sử dụng": "8-10 giờ",
      "Kích thước": "137 x 57.5 x 36mm",
      "Trọng lượng": "320g (có pin)",
    },
    warranty: "12 tháng",
    inStock: true,
  },
  "7": {
    id: "7",
    name: "Máy Chấm Công Khuôn Mặt ZKTeco MB20",
    price: "5.800.000",
    originalPrice: "6.500.000",
    images: [mayChamCongKhuonMat],
    rating: 4.9,
    reviews: 67,
    badge: "Mới",
    category: "Máy chấm công",
    categoryId: "cham-cong",
    brand: "ZKTeco",
    description: "Máy chấm công khuôn mặt ZKTeco MB20 với công nghệ nhận diện AI tiên tiến, chính xác cao. Hỗ trợ cả vân tay và khuôn mặt, màn hình cảm ứng 7 inch hiện đại.",
    features: [
      "Nhận diện khuôn mặt AI chính xác",
      "Dung lượng 1.500 khuôn mặt, 2.000 vân tay",
      "Màn hình cảm ứng 7 inch",
      "Kết nối TCP/IP, USB, Wifi",
      "Phần mềm ZKTime miễn phí",
      "Hoạt động trong điều kiện ánh sáng yếu",
    ],
    specs: {
      "Dung lượng khuôn mặt": "1.500 mẫu",
      "Dung lượng vân tay": "2.000 mẫu",
      "Màn hình": "7 inch cảm ứng",
      "Giao tiếp": "TCP/IP, USB, Wifi",
      "Tốc độ nhận diện": "< 1 giây",
      "Nguồn điện": "DC 12V/3A",
      "Nhiệt độ hoạt động": "0°C đến 45°C",
      "Kích thước": "220 x 158 x 35mm",
    },
    warranty: "12 tháng",
    inStock: true,
  },
  "8": {
    id: "8",
    name: "Hệ Thống Báo Cháy Hochiki",
    price: "8.900.000",
    originalPrice: "10.500.000",
    images: [baoChay],
    rating: 4.7,
    reviews: 34,
    badge: null,
    category: "Báo động - PCCC",
    categoryId: "bao-dong",
    brand: "Hochiki",
    description: "Hệ thống báo cháy Hochiki gồm tủ trung tâm và đầu báo khói chuyên nghiệp. Đạt tiêu chuẩn PCCC Việt Nam, phù hợp cho nhà xưởng, văn phòng, chung cư.",
    features: [
      "Tủ trung tâm 4 zone",
      "4 đầu báo khói quang học",
      "Còi báo động 24V",
      "Đạt tiêu chuẩn PCCC Việt Nam",
      "Có chứng nhận phòng cháy",
      "Lắp đặt và nghiệm thu trọn gói",
    ],
    specs: {
      "Số zone": "4 zone",
      "Đầu báo": "4 đầu báo khói SLR-24H",
      "Còi báo": "1 còi AH-9719",
      "Nguồn điện": "AC 220V / DC 24V backup",
      "Pin dự phòng": "7Ah",
      "Tiêu chuẩn": "TCVN, EN54",
      "Kích thước tủ": "350 x 300 x 100mm",
    },
    warranty: "24 tháng",
    inStock: true,
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products[id as keyof typeof products];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Không tìm thấy sản phẩm</h1>
            <Link to="/">
              <Button>Về trang chủ</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/50 py-4">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
              <span>/</span>
              <Link to={`/san-pham?category=${product.categoryId}`} className="hover:text-primary transition-colors">{product.category}</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Info */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div>
                {/* Main Image */}
                <div className="relative aspect-square bg-card rounded-2xl overflow-hidden border border-border mb-4 group">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      {product.badge}
                    </span>
                  )}
                  
                  {/* Navigation arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-primary shadow-glow"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">{product.brand}</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} đánh giá)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl font-bold text-primary">{product.price}₫</span>
                  <span className="text-xl text-muted-foreground line-through">{product.originalPrice}₫</span>
                  <span className="px-2 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded">
                    -{Math.round((1 - parseInt(product.price.replace(/\./g, "")) / parseInt(product.originalPrice.replace(/\./g, ""))) * 100)}%
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Stock status */}
                <div className="flex items-center gap-2 mb-6">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">Còn hàng</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium text-foreground">Số lượng:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="flex-1">
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:0978998811">
                      <Phone className="w-5 h-5" />
                      Gọi đặt hàng
                    </a>
                  </Button>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-muted/50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Bảo hành</p>
                      <p className="text-muted-foreground text-sm">{product.warranty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Miễn phí ship</p>
                      <p className="text-muted-foreground text-sm">Đơn từ 1 triệu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Đổi trả</p>
                      <p className="text-muted-foreground text-sm">Trong 7 ngày</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Specs */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Features */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Tính năng nổi bật</h2>
                <ul className="space-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Thông số kỹ thuật</h2>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <div
                      key={key}
                      className={`flex justify-between py-3 ${
                        index !== Object.entries(product.specs).length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                    >
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium text-foreground text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
