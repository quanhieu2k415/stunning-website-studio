import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import cameraIpHikvision from "@/assets/products/camera-ip-hikvision.jpg";
import mayChamCongVanTay from "@/assets/products/may-cham-cong-van-tay.jpg";
import khoaCuaThongMinh from "@/assets/products/khoa-cua-thong-minh.jpg";
import dauGhiHinh from "@/assets/products/dau-ghi-hinh.jpg";
import cameraWifi from "@/assets/products/camera-wifi.jpg";
import boDam from "@/assets/products/bo-dam.jpg";
import mayChamCongKhuonMat from "@/assets/products/may-cham-cong-khuon-mat.jpg";
import baoChay from "@/assets/products/bao-chay.jpg";

const allProducts = [
  {
    id: 1,
    name: "Camera IP Hikvision DS-2CD1027G0-L",
    price: "1.650.000",
    originalPrice: "1.890.000",
    image: cameraIpHikvision,
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
    category: "camera",
    brand: "Hikvision",
  },
  {
    id: 2,
    name: "Máy Chấm Công Vân Tay RONALD JACK X628-C",
    price: "2.850.000",
    originalPrice: "3.200.000",
    image: mayChamCongVanTay,
    badge: "Mới",
    badgeColor: "bg-primary",
    category: "cham-cong",
    brand: "Ronald Jack",
  },
  {
    id: 3,
    name: "Khóa Cửa Thông Minh SAMSUNG SHP-DP609",
    price: "12.500.000",
    originalPrice: "14.900.000",
    image: khoaCuaThongMinh,
    badge: "Hot",
    badgeColor: "bg-orange-500",
    category: "kiem-soat",
    brand: "Samsung",
  },
  {
    id: 4,
    name: "Đầu Ghi Hình 8 Kênh Hikvision DS-7108NI",
    price: "3.200.000",
    originalPrice: "3.800.000",
    image: dauGhiHinh,
    badge: null,
    badgeColor: "",
    category: "camera",
    brand: "Hikvision",
  },
  {
    id: 5,
    name: "Camera Wifi Ezviz C6N 2MP",
    price: "890.000",
    originalPrice: "1.100.000",
    image: cameraWifi,
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
    category: "camera",
    brand: "Ezviz",
  },
  {
    id: 6,
    name: "Bộ Đàm Motorola GP328",
    price: "4.500.000",
    originalPrice: "5.200.000",
    image: boDam,
    badge: null,
    badgeColor: "",
    category: "bo-dam",
    brand: "Motorola",
  },
  {
    id: 7,
    name: "Máy Chấm Công Khuôn Mặt ZKTeco MB20",
    price: "5.800.000",
    originalPrice: "6.500.000",
    image: mayChamCongKhuonMat,
    badge: "Mới",
    badgeColor: "bg-primary",
    category: "cham-cong",
    brand: "ZKTeco",
  },
  {
    id: 8,
    name: "Hệ Thống Báo Cháy Hochiki",
    price: "8.900.000",
    originalPrice: "10.500.000",
    image: baoChay,
    badge: null,
    badgeColor: "",
    category: "bao-dong",
    brand: "Hochiki",
  },
  // Linh kiện PC - CPU
  {
    id: 9,
    name: "CPU Intel Core i5-13400F",
    price: "5.290.000",
    originalPrice: "5.990.000",
    image: "/placeholder.svg",
    badge: "Hot",
    badgeColor: "bg-orange-500",
    category: "cpu",
    brand: "Intel",
  },
  {
    id: 10,
    name: "CPU AMD Ryzen 5 5600",
    price: "3.590.000",
    originalPrice: "3.990.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "cpu",
    brand: "AMD",
  },
  {
    id: 11,
    name: "CPU Intel Core i7-13700F",
    price: "8.490.000",
    originalPrice: "9.290.000",
    image: "/placeholder.svg",
    badge: "Mới",
    badgeColor: "bg-primary",
    category: "cpu",
    brand: "Intel",
  },
  // VGA
  {
    id: 12,
    name: "VGA NVIDIA RTX 4060 8GB",
    price: "7.990.000",
    originalPrice: "8.990.000",
    image: "/placeholder.svg",
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
    category: "vga",
    brand: "NVIDIA",
  },
  {
    id: 13,
    name: "VGA NVIDIA RTX 4070 12GB",
    price: "14.990.000",
    originalPrice: "16.490.000",
    image: "/placeholder.svg",
    badge: "Hot",
    badgeColor: "bg-orange-500",
    category: "vga",
    brand: "NVIDIA",
  },
  {
    id: 14,
    name: "VGA AMD RX 6600 8GB",
    price: "4.990.000",
    originalPrice: "5.490.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "vga",
    brand: "AMD",
  },
  // RAM
  {
    id: 15,
    name: "RAM Kingston Fury 32GB DDR5 6000MHz",
    price: "2.990.000",
    originalPrice: "3.490.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "ram",
    brand: "Kingston",
  },
  {
    id: 16,
    name: "RAM Corsair Vengeance 16GB DDR5 5600MHz",
    price: "1.490.000",
    originalPrice: "1.790.000",
    image: "/placeholder.svg",
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
    category: "ram",
    brand: "Corsair",
  },
  // SSD
  {
    id: 17,
    name: "SSD Samsung 990 Pro 1TB NVMe",
    price: "3.290.000",
    originalPrice: "3.890.000",
    image: "/placeholder.svg",
    badge: "Mới",
    badgeColor: "bg-primary",
    category: "ssd",
    brand: "Samsung",
  },
  {
    id: 18,
    name: "SSD WD Black SN850X 1TB",
    price: "2.490.000",
    originalPrice: "2.890.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "ssd",
    brand: "WD",
  },
  // Mainboard
  {
    id: 19,
    name: "Mainboard ASUS TUF Gaming B760M",
    price: "3.990.000",
    originalPrice: "4.490.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "mainboard",
    brand: "ASUS",
  },
  {
    id: 20,
    name: "Mainboard GIGABYTE B650M Gaming X",
    price: "3.290.000",
    originalPrice: "3.690.000",
    image: "/placeholder.svg",
    badge: "Mới",
    badgeColor: "bg-primary",
    category: "mainboard",
    brand: "GIGABYTE",
  },
  // PSU
  {
    id: 21,
    name: "PSU Corsair RM850x 850W 80+ Gold",
    price: "2.990.000",
    originalPrice: "3.390.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "psu",
    brand: "Corsair",
  },
  {
    id: 22,
    name: "PSU ASUS ROG Strix 750W 80+ Gold",
    price: "2.490.000",
    originalPrice: "2.890.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "psu",
    brand: "ASUS",
  },
  // Case
  {
    id: 23,
    name: "Case NZXT H510 Flow",
    price: "1.890.000",
    originalPrice: "2.190.000",
    image: "/placeholder.svg",
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
    category: "case",
    brand: "NZXT",
  },
  {
    id: 24,
    name: "Case Corsair 4000D Airflow",
    price: "2.290.000",
    originalPrice: "2.590.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "case",
    brand: "Corsair",
  },
  // Tản nhiệt
  {
    id: 25,
    name: "Tản nhiệt NZXT Kraken X63 AIO 280mm",
    price: "3.490.000",
    originalPrice: "3.990.000",
    image: "/placeholder.svg",
    badge: "Hot",
    badgeColor: "bg-orange-500",
    category: "cooling",
    brand: "NZXT",
  },
  {
    id: 26,
    name: "Tản nhiệt DeepCool AK620",
    price: "1.290.000",
    originalPrice: "1.490.000",
    image: "/placeholder.svg",
    badge: null,
    badgeColor: "",
    category: "cooling",
    brand: "DeepCool",
  },
];

// Extract unique brands from products
const allBrands = [...new Set(allProducts.map(p => p.brand))].sort();

const categories = [
  { id: "all", name: "Tất cả sản phẩm" },
  { id: "camera", name: "Camera giám sát" },
  { id: "cham-cong", name: "Máy chấm công" },
  { id: "kiem-soat", name: "Kiểm soát ra vào" },
  { id: "bo-dam", name: "Bộ đàm - Định vị" },
  { id: "bao-dong", name: "Báo động - PCCC" },
  { id: "cpu", name: "CPU" },
  { id: "vga", name: "VGA - Card đồ họa" },
  { id: "ram", name: "RAM" },
  { id: "ssd", name: "SSD - Ổ cứng" },
  { id: "mainboard", name: "Mainboard" },
  { id: "psu", name: "Nguồn - PSU" },
  { id: "case", name: "Case - Vỏ máy" },
  { id: "cooling", name: "Tản nhiệt" },
];

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const searchQuery = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Get brands available for selected category
  const availableBrands = selectedCategory === "all"
    ? allBrands
    : [...new Set(allProducts.filter(p => p.category === selectedCategory).map(p => p.brand))].sort();

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Clear brand filters when category changes
  useEffect(() => {
    setSelectedBrands([]);
  }, [selectedCategory]);

  // Filter by category first
  const categoryFiltered = selectedCategory === "all" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);
  
  // Then filter by brand
  const brandFiltered = selectedBrands.length > 0
    ? categoryFiltered.filter(p => selectedBrands.includes(p.brand))
    : categoryFiltered;

  // Then filter by search query
  const filteredProducts = searchQuery
    ? brandFiltered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : brandFiltered;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-primary py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Sản Phẩm Của Chúng Tôi
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Đa dạng thiết bị camera, máy chấm công, kiểm soát ra vào từ các thương hiệu hàng đầu
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12">
          <div className="container">
            {/* Category filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-foreground hover:bg-primary/10"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Brand filters */}
            {availableBrands.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">Thương hiệu:</h3>
                <div className="flex flex-wrap gap-2">
                  {availableBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                        selectedBrands.includes(brand)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                  {selectedBrands.length > 0 && (
                    <button
                      onClick={() => setSelectedBrands([])}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Products count */}
            <p className="text-muted-foreground mb-6">
              Hiển thị <span className="font-semibold text-foreground">{filteredProducts.length}</span> sản phẩm
              {selectedBrands.length > 0 && (
                <span className="ml-2">
                  (Lọc theo: {selectedBrands.join(", ")})
                </span>
              )}
            </p>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
                >
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-3 py-1 ${product.badgeColor} text-primary-foreground text-xs font-semibold rounded-full`}>
                        {product.badge}
                      </span>
                    )}
                  </Link>

                  <div className="p-5">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors h-12">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-primary">{product.price}₫</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}₫</span>
                    </div>

                    <Button className="w-full" size="sm">
                      <ShoppingCart className="w-4 h-4" />
                      Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;