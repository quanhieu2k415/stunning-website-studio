import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Cpu, Monitor, HardDrive, Fan, Zap, Package, CircuitBoard, MemoryStick, Phone, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

// PC Component types
interface PCComponent {
  id: string;
  name: string;
  price: number;
  specs: string;
  image?: string;
}

interface ComponentCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  required: boolean;
  options: PCComponent[];
}

// Sample PC components data
const componentCategories: ComponentCategory[] = [
  {
    id: "cpu",
    name: "CPU - Bộ xử lý",
    icon: Cpu,
    required: true,
    options: [
      { id: "cpu-1", name: "Intel Core i5-12400F", price: 3990000, specs: "6 Cores, 12 Threads, 4.4GHz" },
      { id: "cpu-2", name: "Intel Core i5-13400F", price: 5290000, specs: "10 Cores, 16 Threads, 4.6GHz" },
      { id: "cpu-3", name: "Intel Core i7-13700F", price: 8490000, specs: "16 Cores, 24 Threads, 5.2GHz" },
      { id: "cpu-4", name: "AMD Ryzen 5 5600", price: 3590000, specs: "6 Cores, 12 Threads, 4.4GHz" },
      { id: "cpu-5", name: "AMD Ryzen 7 5700X", price: 5490000, specs: "8 Cores, 16 Threads, 4.6GHz" },
      { id: "cpu-6", name: "AMD Ryzen 7 7800X3D", price: 11990000, specs: "8 Cores, 16 Threads, 5.0GHz, 3D V-Cache" },
    ],
  },
  {
    id: "mainboard",
    name: "Mainboard - Bo mạch chủ",
    icon: CircuitBoard,
    required: true,
    options: [
      { id: "mb-1", name: "ASUS PRIME B660M-K", price: 2490000, specs: "Intel B660, DDR4, mATX" },
      { id: "mb-2", name: "MSI PRO B660M-A", price: 2890000, specs: "Intel B660, DDR5, mATX" },
      { id: "mb-3", name: "GIGABYTE B760M GAMING X", price: 3290000, specs: "Intel B760, DDR5, mATX" },
      { id: "mb-4", name: "ASUS TUF GAMING B550M-PLUS", price: 2890000, specs: "AMD B550, DDR4, mATX" },
      { id: "mb-5", name: "MSI MAG X670E TOMAHAWK", price: 7990000, specs: "AMD X670E, DDR5, ATX" },
    ],
  },
  {
    id: "ram",
    name: "RAM - Bộ nhớ",
    icon: MemoryStick,
    required: true,
    options: [
      { id: "ram-1", name: "Kingston Fury Beast 16GB DDR4", price: 890000, specs: "16GB (1x16GB) 3200MHz" },
      { id: "ram-2", name: "Kingston Fury Beast 32GB DDR4", price: 1690000, specs: "32GB (2x16GB) 3200MHz" },
      { id: "ram-3", name: "Corsair Vengeance 16GB DDR5", price: 1490000, specs: "16GB (1x16GB) 5600MHz" },
      { id: "ram-4", name: "G.Skill Trident Z5 32GB DDR5", price: 2990000, specs: "32GB (2x16GB) 6000MHz RGB" },
      { id: "ram-5", name: "Corsair Dominator 64GB DDR5", price: 5990000, specs: "64GB (2x32GB) 6400MHz RGB" },
    ],
  },
  {
    id: "gpu",
    name: "VGA - Card đồ họa",
    icon: Monitor,
    required: true,
    options: [
      { id: "gpu-1", name: "NVIDIA GTX 1650 4GB", price: 3690000, specs: "4GB GDDR6, CUDA 896" },
      { id: "gpu-2", name: "AMD RX 6600 8GB", price: 4990000, specs: "8GB GDDR6, Stream 1792" },
      { id: "gpu-3", name: "NVIDIA RTX 4060 8GB", price: 7990000, specs: "8GB GDDR6, DLSS 3, Ray Tracing" },
      { id: "gpu-4", name: "NVIDIA RTX 4070 12GB", price: 14990000, specs: "12GB GDDR6X, DLSS 3, Ray Tracing" },
      { id: "gpu-5", name: "NVIDIA RTX 4080 16GB", price: 29990000, specs: "16GB GDDR6X, DLSS 3, Ray Tracing" },
      { id: "gpu-6", name: "NVIDIA RTX 4090 24GB", price: 49990000, specs: "24GB GDDR6X, DLSS 3, Ray Tracing" },
    ],
  },
  {
    id: "ssd",
    name: "SSD - Ổ cứng",
    icon: HardDrive,
    required: true,
    options: [
      { id: "ssd-1", name: "Kingston NV2 500GB", price: 790000, specs: "NVMe PCIe 4.0, 3500MB/s" },
      { id: "ssd-2", name: "Samsung 980 Pro 1TB", price: 2290000, specs: "NVMe PCIe 4.0, 7000MB/s" },
      { id: "ssd-3", name: "WD Black SN850X 1TB", price: 2490000, specs: "NVMe PCIe 4.0, 7300MB/s" },
      { id: "ssd-4", name: "Samsung 990 Pro 2TB", price: 4690000, specs: "NVMe PCIe 4.0, 7450MB/s" },
    ],
  },
  {
    id: "psu",
    name: "PSU - Nguồn",
    icon: Zap,
    required: true,
    options: [
      { id: "psu-1", name: "Corsair CV550 550W", price: 990000, specs: "550W, 80+ Bronze" },
      { id: "psu-2", name: "Cooler Master MWE 650W", price: 1290000, specs: "650W, 80+ Gold" },
      { id: "psu-3", name: "ASUS ROG Strix 750W", price: 2490000, specs: "750W, 80+ Gold, Full Modular" },
      { id: "psu-4", name: "Corsair RM850x 850W", price: 2990000, specs: "850W, 80+ Gold, Full Modular" },
      { id: "psu-5", name: "Seasonic Prime TX-1000", price: 5990000, specs: "1000W, 80+ Titanium" },
    ],
  },
  {
    id: "case",
    name: "Case - Vỏ máy",
    icon: Package,
    required: true,
    options: [
      { id: "case-1", name: "NZXT H510", price: 1690000, specs: "Mid Tower, Kính cường lực" },
      { id: "case-2", name: "Corsair 4000D Airflow", price: 2290000, specs: "Mid Tower, Tản nhiệt tốt" },
      { id: "case-3", name: "Lian Li O11 Dynamic", price: 3290000, specs: "Mid Tower, Dual Chamber" },
      { id: "case-4", name: "ASUS ROG Hyperion", price: 8990000, specs: "Full Tower, RGB Premium" },
    ],
  },
  {
    id: "cooling",
    name: "Tản nhiệt",
    icon: Fan,
    required: false,
    options: [
      { id: "cool-1", name: "DeepCool AK400", price: 590000, specs: "Tower, 4 ống đồng" },
      { id: "cool-2", name: "Thermalright PA120", price: 890000, specs: "Tower, 6 ống đồng" },
      { id: "cool-3", name: "NZXT Kraken X53", price: 2990000, specs: "AIO 240mm, LCD" },
      { id: "cool-4", name: "Corsair H150i Elite", price: 4290000, specs: "AIO 360mm, RGB" },
      { id: "cool-5", name: "ASUS ROG Ryujin III", price: 6990000, specs: "AIO 360mm, LCD OLED" },
    ],
  },
];

// Pre-built configs
const preBuiltConfigs = [
  {
    id: "budget",
    name: "PC Gaming Phổ Thông",
    description: "Chơi mượt Esports, đồ họa nhẹ",
    price: 15000000,
    specs: ["Intel i5-12400F", "RTX 4060", "16GB RAM", "500GB SSD"],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "mid",
    name: "PC Gaming Cao Cấp",
    description: "Chiến mọi game AAA 1440p",
    price: 32000000,
    specs: ["Intel i7-13700F", "RTX 4070", "32GB RAM", "1TB SSD"],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "high",
    name: "PC Gaming Ultimate",
    description: "Streaming, làm video 4K",
    price: 65000000,
    specs: ["Ryzen 7 7800X3D", "RTX 4080", "64GB RAM", "2TB SSD"],
    color: "from-purple-500 to-purple-600",
  },
];

const BuildPCPage = () => {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, PCComponent | null>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>("cpu");

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, comp) => sum + (comp?.price || 0), 0);
  }, [selectedComponents]);

  const selectedCount = Object.values(selectedComponents).filter(Boolean).length;
  const requiredCount = componentCategories.filter(c => c.required).length;
  const allRequiredSelected = componentCategories.filter(c => c.required).every(c => selectedComponents[c.id]);

  const handleSelectComponent = (categoryId: string, component: PCComponent | null) => {
    setSelectedComponents(prev => ({ ...prev, [categoryId]: component }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleApplyPrebuilt = (configId: string) => {
    // Apply a pre-built configuration
    const configs: Record<string, Record<string, string>> = {
      budget: { cpu: "cpu-1", mainboard: "mb-1", ram: "ram-1", gpu: "gpu-3", ssd: "ssd-1", psu: "psu-2", case: "case-1", cooling: "cool-1" },
      mid: { cpu: "cpu-3", mainboard: "mb-3", ram: "ram-2", gpu: "gpu-4", ssd: "ssd-2", psu: "psu-3", case: "case-2", cooling: "cool-3" },
      high: { cpu: "cpu-6", mainboard: "mb-5", ram: "ram-5", gpu: "gpu-5", ssd: "ssd-4", psu: "psu-5", case: "case-3", cooling: "cool-5" },
    };

    const config = configs[configId];
    if (!config) return;

    const newSelection: Record<string, PCComponent | null> = {};
    componentCategories.forEach(cat => {
      const componentId = config[cat.id];
      if (componentId) {
        const component = cat.options.find(opt => opt.id === componentId);
        newSelection[cat.id] = component || null;
      }
    });
    setSelectedComponents(newSelection);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-primary py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              🎮 Build PC Gaming
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Tự chọn cấu hình PC Gaming theo nhu cầu của bạn hoặc chọn cấu hình có sẵn
            </p>
          </div>
        </section>

        {/* Pre-built Configs */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6 text-center">Cấu Hình Đề Xuất</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {preBuiltConfigs.map(config => (
                <div key={config.id} className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center mb-4`}>
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{config.name}</h3>
                  <p className="text-muted-foreground mb-4">{config.description}</p>
                  <ul className="space-y-1 mb-4 text-sm">
                    {config.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">~{formatPrice(config.price)}₫</span>
                    <Button size="sm" onClick={() => handleApplyPrebuilt(config.id)}>
                      Áp dụng
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PC Builder */}
        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Component selector */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold mb-6">Chọn Linh Kiện</h2>
                
                {componentCategories.map(category => (
                  <div key={category.id} className="bg-card rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <category.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold flex items-center gap-2">
                            {category.name}
                            {category.required && <span className="text-xs text-destructive">*</span>}
                          </h3>
                          {selectedComponents[category.id] ? (
                            <p className="text-sm text-primary">{selectedComponents[category.id]?.name}</p>
                          ) : (
                            <p className="text-sm text-muted-foreground">Chưa chọn</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {selectedComponents[category.id] && (
                          <span className="font-semibold text-primary">
                            {formatPrice(selectedComponents[category.id]!.price)}₫
                          </span>
                        )}
                        <svg
                          className={`w-5 h-5 text-muted-foreground transition-transform ${expandedCategory === category.id ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {expandedCategory === category.id && (
                      <div className="border-t border-border p-4 space-y-2 bg-muted/20">
                        {/* Clear selection */}
                        {selectedComponents[category.id] && (
                          <button
                            onClick={() => handleSelectComponent(category.id, null)}
                            className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-background transition-colors text-muted-foreground"
                          >
                            <X className="w-4 h-4" />
                            Bỏ chọn
                          </button>
                        )}
                        
                        {category.options.map(option => (
                          <button
                            key={option.id}
                            onClick={() => handleSelectComponent(category.id, option)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                              selectedComponents[category.id]?.id === option.id
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50 hover:bg-background"
                            }`}
                          >
                            <div className="text-left">
                              <p className="font-medium">{option.name}</p>
                              <p className="text-sm text-muted-foreground">{option.specs}</p>
                            </div>
                            <span className="font-semibold whitespace-nowrap">{formatPrice(option.price)}₫</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card rounded-2xl border border-border p-6 shadow-card">
                  <h3 className="text-xl font-bold mb-4">Tóm Tắt Cấu Hình</h3>
                  
                  <div className="space-y-3 mb-6">
                    {componentCategories.map(category => (
                      <div key={category.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{category.name.split(" - ")[0]}</span>
                        {selectedComponents[category.id] ? (
                          <span className="font-medium text-right max-w-[150px] truncate" title={selectedComponents[category.id]?.name}>
                            {selectedComponents[category.id]?.name.split(" ").slice(0, 2).join(" ")}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Đã chọn</span>
                      <span>{selectedCount}/{componentCategories.length} linh kiện</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Tổng tiền:</span>
                      <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}₫</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mb-3" 
                    size="lg"
                    disabled={!allRequiredSelected}
                    asChild={allRequiredSelected}
                  >
                    {allRequiredSelected ? (
                      <Link to="/lien-he">
                        <Phone className="w-4 h-4 mr-2" />
                        Liên hệ đặt hàng
                      </Link>
                    ) : (
                      <span>Vui lòng chọn đủ linh kiện (*)</span>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Giá có thể thay đổi, liên hệ để được báo giá chính xác
                  </p>
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

export default BuildPCPage;