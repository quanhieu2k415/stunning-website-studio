-- ============================================
-- Seed data from hardcoded source
-- Run this after 001_create_tables.sql
-- ============================================

-- Categories
INSERT INTO categories (slug, name, icon, color, description, display_group, sort_order) VALUES
('all', 'Tất cả', NULL, NULL, NULL, 'all', 0),
('camera', 'Camera giám sát', 'Camera', 'from-blue-500 to-blue-600', 'Camera IP, camera Wifi, hệ thống giám sát', 'security', 1),
('cham-cong', 'Máy chấm công', 'Clock', 'from-emerald-500 to-emerald-600', 'Máy chấm công vân tay, khuôn mặt, thẻ từ', 'security', 2),
('kiem-soat', 'Kiểm soát ra vào', 'Shield', 'from-purple-500 to-purple-600', 'Khóa cửa thông minh, cổng kiểm soát', 'security', 3),
('bao-dong', 'Báo động - PCCC', 'MonitorSpeaker', 'from-red-500 to-red-600', 'Hệ thống báo cháy, báo động an ninh', 'security', 4),
('bo-dam', 'Bộ đàm', 'Radio', 'from-orange-500 to-orange-600', 'Bộ đàm cầm tay, thiết bị định vị GPS', 'security', 5),
('cpu', 'CPU', 'Cpu', 'from-cyan-500 to-cyan-600', 'Intel Core, AMD Ryzen các thế hệ mới nhất', 'pc', 6),
('vga', 'VGA - Card đồ họa', 'Monitor', 'from-rose-500 to-rose-600', 'NVIDIA RTX, AMD Radeon', 'pc', 7),
('ram', 'RAM', 'MemoryStick', 'from-violet-500 to-violet-600', 'DDR4, DDR5 từ Kingston, Corsair', 'pc', 8),
('ssd', 'SSD - Ổ cứng', 'HardDrive', 'from-amber-500 to-amber-600', 'NVMe SSD Samsung, WD, Kingston', 'pc', 9),
('mainboard', 'Mainboard', 'CircuitBoard', 'from-teal-500 to-teal-600', 'Bo mạch chủ ASUS, MSI, Gigabyte', 'pc', 10),
('psu', 'Nguồn - PSU', 'Zap', 'from-yellow-500 to-yellow-600', 'Nguồn 80+ Bronze, Gold, Platinum', 'pc', 11),
('case', 'Case - Vỏ máy', 'Package', 'from-slate-500 to-slate-600', 'Case gaming NZXT, Corsair, Lian Li', 'pc', 12),
('cooling', 'Tản nhiệt', 'Fan', 'from-sky-500 to-sky-600', 'Tản khí, tản nước AIO cao cấp', 'pc', 13);

-- Brands
INSERT INTO brands (name) VALUES
('Hikvision'), ('Ronald Jack'), ('Samsung'), ('Ezviz'), ('Motorola'),
('ZKTeco'), ('Hochiki'), ('Intel'), ('AMD'), ('NVIDIA'),
('Kingston'), ('Corsair'), ('WD'), ('ASUS'), ('MSI'),
('Gigabyte'), ('Cooler Master'), ('NZXT'), ('Lian Li'), ('Seasonic');

-- Products (26 total)
-- Security products (1-8)
INSERT INTO products (legacy_id, name, slug, price, original_price, category_id, brand_id, badge, badge_color, description, warranty, rating, reviews, is_featured, sort_order) VALUES
(1, 'Camera IP Hikvision DS-2CD1027G0-L', 'camera-ip-hikvision-ds-2cd1027g0-l', '1.650.000', '1.890.000',
 (SELECT id FROM categories WHERE slug='camera'), (SELECT id FROM brands WHERE name='Hikvision'),
 'Bán chạy', 'bg-red-500', 'Camera IP Hikvision DS-2CD1027G0-L ColorVu 2MP với công nghệ hình ảnh màu 24/7, chống nước IP67, hỗ trợ PoE. Phù hợp cho giám sát ngoài trời.', '24 tháng', 4.8, 156, true, 1),

(2, 'Máy Chấm Công Vân Tay RONALD JACK X628-C', 'may-cham-cong-van-tay-ronald-jack-x628-c', '2.850.000', '3.200.000',
 (SELECT id FROM categories WHERE slug='cham-cong'), (SELECT id FROM brands WHERE name='Ronald Jack'),
 'Mới', 'bg-primary', 'Máy chấm công vân tay Ronald Jack X628-C với dung lượng 3.000 vân tay, 100.000 bản ghi. Kết nối USB, TCP/IP.', '12 tháng', 4.6, 89, true, 2),

(3, 'Khóa Cửa Thông Minh SAMSUNG SHP-DP609', 'khoa-cua-thong-minh-samsung-shp-dp609', '12.500.000', '14.900.000',
 (SELECT id FROM categories WHERE slug='kiem-soat'), (SELECT id FROM brands WHERE name='Samsung'),
 'Hot', 'bg-orange-500', 'Khóa cửa thông minh Samsung SHP-DP609 với 5 phương thức mở: vân tay, mã PIN, thẻ từ, chìa cơ, Bluetooth.', '24 tháng', 4.9, 67, true, 3),

(4, 'Đầu Ghi Hình 8 Kênh Hikvision DS-7108NI', 'dau-ghi-hinh-8-kenh-hikvision-ds-7108ni', '3.200.000', '3.800.000',
 (SELECT id FROM categories WHERE slug='camera'), (SELECT id FROM brands WHERE name='Hikvision'),
 NULL, NULL, 'Đầu ghi hình mạng 8 kênh Hikvision DS-7108NI hỗ trợ camera lên đến 4MP, 1 ổ cứng HDD SATA.', '24 tháng', 4.5, 45, true, 4),

(5, 'Camera Wifi Ezviz C6N 2MP', 'camera-wifi-ezviz-c6n-2mp', '890.000', '1.100.000',
 (SELECT id FROM categories WHERE slug='camera'), (SELECT id FROM brands WHERE name='Ezviz'),
 'Bán chạy', 'bg-red-500', 'Camera Wifi Ezviz C6N 2MP xoay 360 độ, đàm thoại 2 chiều, phát hiện chuyển động. Phù hợp giám sát nhà.', '12 tháng', 4.7, 234, false, 5),

(6, 'Bộ Đàm Motorola GP328', 'bo-dam-motorola-gp328', '4.500.000', '5.200.000',
 (SELECT id FROM categories WHERE slug='bo-dam'), (SELECT id FROM brands WHERE name='Motorola'),
 NULL, NULL, 'Bộ đàm Motorola GP328 chuyên nghiệp, phạm vi liên lạc rộng, pin trâu, chống nước tốt.', '12 tháng', 4.4, 32, false, 6),

(7, 'Máy Chấm Công Khuôn Mặt ZKTeco MB20', 'may-cham-cong-khuon-mat-zkteco-mb20', '5.800.000', '6.500.000',
 (SELECT id FROM categories WHERE slug='cham-cong'), (SELECT id FROM brands WHERE name='ZKTeco'),
 'Mới', 'bg-primary', 'Máy chấm công khuôn mặt ZKTeco MB20 nhận diện nhanh dưới 0.5s, lưu 1.500 khuôn mặt.', '12 tháng', 4.5, 56, false, 7),

(8, 'Hệ Thống Báo Cháy Hochiki', 'he-thong-bao-chay-hochiki', '8.900.000', '10.500.000',
 (SELECT id FROM categories WHERE slug='bao-dong'), (SELECT id FROM brands WHERE name='Hochiki'),
 NULL, NULL, 'Hệ thống báo cháy Hochiki gồm trung tâm + 8 đầu báo khói, phù hợp văn phòng, nhà xưởng.', '24 tháng', 4.6, 28, false, 8),

-- PC Components (9-26)
(9, 'CPU Intel Core i5-13400F', 'cpu-intel-core-i5-13400f', '5.290.000', '5.990.000',
 (SELECT id FROM categories WHERE slug='cpu'), (SELECT id FROM brands WHERE name='Intel'),
 'Hot', 'bg-orange-500', 'CPU Intel Core i5-13400F 10 nhân 16 luồng, xung nhịp tối đa 4.6GHz, socket LGA 1700.', '36 tháng', 4.8, 89, false, 9),

(10, 'CPU AMD Ryzen 5 5600', 'cpu-amd-ryzen-5-5600', '3.590.000', '3.990.000',
 (SELECT id FROM categories WHERE slug='cpu'), (SELECT id FROM brands WHERE name='AMD'),
 NULL, NULL, 'CPU AMD Ryzen 5 5600 6 nhân 12 luồng, xung tối đa 4.4GHz, socket AM4.', '36 tháng', 4.7, 67, false, 10),

(11, 'CPU Intel Core i7-13700F', 'cpu-intel-core-i7-13700f', '8.490.000', '9.290.000',
 (SELECT id FROM categories WHERE slug='cpu'), (SELECT id FROM brands WHERE name='Intel'),
 'Mới', 'bg-primary', 'CPU Intel Core i7-13700F 16 nhân 24 luồng, xung tối đa 5.2GHz, socket LGA 1700.', '36 tháng', 4.9, 45, false, 11),

(12, 'VGA NVIDIA RTX 4060 8GB', 'vga-nvidia-rtx-4060-8gb', '7.990.000', '8.990.000',
 (SELECT id FROM categories WHERE slug='vga'), (SELECT id FROM brands WHERE name='NVIDIA'),
 'Bán chạy', 'bg-red-500', 'Card đồ họa RTX 4060 8GB GDDR6, hỗ trợ DLSS 3.0 và Ray Tracing.', '36 tháng', 4.8, 112, false, 12),

(13, 'VGA NVIDIA RTX 4070 12GB', 'vga-nvidia-rtx-4070-12gb', '14.990.000', '16.490.000',
 (SELECT id FROM categories WHERE slug='vga'), (SELECT id FROM brands WHERE name='NVIDIA'),
 'Hot', 'bg-orange-500', 'Card đồ họa RTX 4070 12GB GDDR6X, hiệu năng mạnh mẽ cho gaming 1440p.', '36 tháng', 4.9, 78, false, 13),

(14, 'VGA AMD RX 6600 8GB', 'vga-amd-rx-6600-8gb', '4.990.000', '5.490.000',
 (SELECT id FROM categories WHERE slug='vga'), (SELECT id FROM brands WHERE name='AMD'),
 NULL, NULL, 'Card đồ họa AMD RX 6600 8GB GDDR6, giải pháp gaming 1080p giá rẻ.', '36 tháng', 4.5, 56, false, 14),

(15, 'RAM Kingston Fury 32GB DDR5 6000MHz', 'ram-kingston-fury-32gb-ddr5', '2.990.000', '3.490.000',
 (SELECT id FROM categories WHERE slug='ram'), (SELECT id FROM brands WHERE name='Kingston'),
 NULL, NULL, 'RAM Kingston Fury Beast 32GB (2x16GB) DDR5 6000MHz CL36, tản nhiệt nhôm.', '36 tháng', 4.7, 45, false, 15),

(16, 'RAM Corsair Vengeance 16GB DDR5 5600MHz', 'ram-corsair-vengeance-16gb-ddr5', '1.490.000', '1.790.000',
 (SELECT id FROM categories WHERE slug='ram'), (SELECT id FROM brands WHERE name='Corsair'),
 'Bán chạy', 'bg-red-500', 'RAM Corsair Vengeance 16GB (2x8GB) DDR5 5600MHz, profile Intel XMP 3.0.', '36 tháng', 4.6, 89, false, 16),

(17, 'SSD Samsung 990 Pro 1TB NVMe', 'ssd-samsung-990-pro-1tb', '3.290.000', '3.890.000',
 (SELECT id FROM categories WHERE slug='ssd'), (SELECT id FROM brands WHERE name='Samsung'),
 'Hot', 'bg-orange-500', 'SSD Samsung 990 Pro 1TB NVMe PCIe Gen 4.0 x4, đọc 7.450MB/s, ghi 6.900MB/s.', '60 tháng', 4.9, 134, false, 17),

(18, 'SSD WD Black SN770 1TB', 'ssd-wd-black-sn770-1tb', '2.190.000', '2.690.000',
 (SELECT id FROM categories WHERE slug='ssd'), (SELECT id FROM brands WHERE name='WD'),
 NULL, NULL, 'SSD WD Black SN770 1TB NVMe PCIe Gen 4.0, đọc 5.150MB/s, ghi 4.900MB/s.', '60 tháng', 4.7, 78, false, 18),

(19, 'Mainboard ASUS ROG STRIX B660-A', 'mainboard-asus-rog-strix-b660-a', '4.290.000', '4.890.000',
 (SELECT id FROM categories WHERE slug='mainboard'), (SELECT id FROM brands WHERE name='ASUS'),
 'Mới', 'bg-primary', 'Mainboard ASUS ROG STRIX B660-A DDR5 Gaming WiFi, socket LGA 1700.', '36 tháng', 4.8, 56, false, 19),

(20, 'Mainboard MSI PRO B760M-A', 'mainboard-msi-pro-b760m-a', '3.290.000', '3.690.000',
 (SELECT id FROM categories WHERE slug='mainboard'), (SELECT id FROM brands WHERE name='MSI'),
 NULL, NULL, 'Mainboard MSI PRO B760M-A WiFi DDR5 Micro-ATX, socket LGA 1700.', '36 tháng', 4.6, 42, false, 20),

(21, 'PSU Corsair RM750e 750W', 'psu-corsair-rm750e-750w', '2.490.000', '2.890.000',
 (SELECT id FROM categories WHERE slug='psu'), (SELECT id FROM brands WHERE name='Corsair'),
 'Bán chạy', 'bg-red-500', 'Nguồn Corsair RM750e 80+ Gold Full Modular, quạt 140mm Zero RPM.', '84 tháng', 4.9, 67, false, 21),

(22, 'PSU Seasonic Focus GX-650 650W', 'psu-seasonic-focus-gx-650-650w', '1.990.000', '2.390.000',
 (SELECT id FROM categories WHERE slug='psu'), (SELECT id FROM brands WHERE name='Seasonic'),
 NULL, NULL, 'Nguồn Seasonic Focus GX-650 80+ Gold Full Modular.', '120 tháng', 4.8, 56, false, 22),

(23, 'Case NZXT H510 Flow', 'case-nzxt-h510-flow', '2.090.000', '2.490.000',
 (SELECT id FROM categories WHERE slug='case'), (SELECT id FROM brands WHERE name='NZXT'),
 'Mới', 'bg-primary', 'Case NZXT H510 Flow Mid Tower ATX, mặt lưới thoáng khí, kính cường lực.', '24 tháng', 4.7, 45, false, 23),

(24, 'Case Lian Li Lancool II Mesh', 'case-lian-li-lancool-ii-mesh', '2.590.000', '2.990.000',
 (SELECT id FROM categories WHERE slug='case'), (SELECT id FROM brands WHERE name='Lian Li'),
 NULL, NULL, 'Case Lian Li Lancool II Mesh ATX, luồng gió tối ưu, 3 quạt ARGB kèm theo.', '24 tháng', 4.8, 38, false, 24),

(25, 'Tản Nhiệt Nước AIO Corsair H100i', 'tan-nhiet-nuoc-aio-corsair-h100i', '3.290.000', '3.890.000',
 (SELECT id FROM categories WHERE slug='cooling'), (SELECT id FROM brands WHERE name='Corsair'),
 'Hot', 'bg-orange-500', 'Tản nhiệt nước AIO Corsair iCUE H100i 240mm, 2 quạt RGB, bơm cao cấp.', '60 tháng', 4.8, 56, false, 25),

(26, 'Tản Nhiệt Khí Cooler Master Hyper 212', 'tan-nhiet-khi-cooler-master-hyper-212', '890.000', '1.090.000',
 (SELECT id FROM categories WHERE slug='cooling'), (SELECT id FROM brands WHERE name='Cooler Master'),
 'Bán chạy', 'bg-red-500', 'Tản nhiệt khí Cooler Master Hyper 212 tower, 4 ống đồng, quạt 120mm.', '24 tháng', 4.6, 89, false, 26);

-- PC Component Categories (for Build PC)
INSERT INTO pc_component_categories (slug, name, icon, sort_order) VALUES
('cpu', 'CPU - Bộ xử lý', 'Cpu', 1),
('mainboard', 'Mainboard - Bo mạch chủ', 'CircuitBoard', 2),
('ram', 'RAM - Bộ nhớ', 'MemoryStick', 3),
('vga', 'VGA - Card đồ họa', 'Monitor', 4),
('ssd', 'SSD - Ổ cứng', 'HardDrive', 5),
('hdd', 'HDD - Ổ cứng cơ', 'HardDrive', 6),
('psu', 'PSU - Nguồn', 'Zap', 7),
('case', 'Case - Vỏ máy', 'Package', 8);

-- PC Components
INSERT INTO pc_components (category_id, name, price, specs, sort_order) VALUES
((SELECT id FROM pc_component_categories WHERE slug='cpu'), 'Intel Core i5-12400F', 3990000, '6C/12T, 4.4GHz', 1),
((SELECT id FROM pc_component_categories WHERE slug='cpu'), 'Intel Core i5-13400F', 5290000, '10C/16T, 4.6GHz', 2),
((SELECT id FROM pc_component_categories WHERE slug='cpu'), 'AMD Ryzen 5 5600', 3590000, '6C/12T, 4.4GHz', 3),
((SELECT id FROM pc_component_categories WHERE slug='cpu'), 'Intel Core i7-13700F', 8490000, '16C/24T, 5.2GHz', 4),
((SELECT id FROM pc_component_categories WHERE slug='cpu'), 'AMD Ryzen 7 5800X', 6490000, '8C/16T, 4.7GHz', 5),

((SELECT id FROM pc_component_categories WHERE slug='mainboard'), 'Gigabyte B660M DS3H DDR4', 2490000, 'LGA1700, DDR4', 1),
((SELECT id FROM pc_component_categories WHERE slug='mainboard'), 'MSI PRO B660M-A DDR4', 2890000, 'LGA1700, DDR4', 2),
((SELECT id FROM pc_component_categories WHERE slug='mainboard'), 'ASUS TUF B660M-PLUS DDR4', 3290000, 'LGA1700, DDR4', 3),
((SELECT id FROM pc_component_categories WHERE slug='mainboard'), 'MSI PRO B760M-A WiFi DDR5', 3690000, 'LGA1700, DDR5', 4),
((SELECT id FROM pc_component_categories WHERE slug='mainboard'), 'ASUS ROG STRIX B660-A DDR5', 4890000, 'LGA1700, DDR5', 5),

((SELECT id FROM pc_component_categories WHERE slug='ram'), 'Kingston 16GB DDR4 3200MHz', 890000, '1x16GB', 1),
((SELECT id FROM pc_component_categories WHERE slug='ram'), 'Corsair 16GB DDR4 3600MHz', 1190000, '2x8GB RGB', 2),
((SELECT id FROM pc_component_categories WHERE slug='ram'), 'Kingston Fury 16GB DDR5 5600', 1390000, '1x16GB', 3),
((SELECT id FROM pc_component_categories WHERE slug='ram'), 'Corsair 32GB DDR5 5600MHz', 2490000, '2x16GB', 4),
((SELECT id FROM pc_component_categories WHERE slug='ram'), 'Kingston Fury 32GB DDR5 6000', 2990000, '2x16GB', 5),

((SELECT id FROM pc_component_categories WHERE slug='vga'), 'AMD RX 6600 8GB', 4990000, '8GB GDDR6', 1),
((SELECT id FROM pc_component_categories WHERE slug='vga'), 'NVIDIA RTX 4060 8GB', 7990000, '8GB GDDR6', 2),
((SELECT id FROM pc_component_categories WHERE slug='vga'), 'NVIDIA RTX 4060 Ti 8GB', 10990000, '8GB GDDR6', 3),
((SELECT id FROM pc_component_categories WHERE slug='vga'), 'NVIDIA RTX 4070 12GB', 14990000, '12GB GDDR6X', 4),
((SELECT id FROM pc_component_categories WHERE slug='vga'), 'NVIDIA RTX 4070 Ti 12GB', 18990000, '12GB GDDR6X', 5),

((SELECT id FROM pc_component_categories WHERE slug='ssd'), 'Kingston NV2 500GB', 790000, 'NVMe Gen4', 1),
((SELECT id FROM pc_component_categories WHERE slug='ssd'), 'WD Black SN770 1TB', 2190000, 'NVMe Gen4', 2),
((SELECT id FROM pc_component_categories WHERE slug='ssd'), 'Samsung 990 Pro 1TB', 3290000, 'NVMe Gen4', 3),
((SELECT id FROM pc_component_categories WHERE slug='ssd'), 'Samsung 990 Pro 2TB', 5490000, 'NVMe Gen4', 4),

((SELECT id FROM pc_component_categories WHERE slug='hdd'), 'WD Blue 1TB', 990000, '7200rpm', 1),
((SELECT id FROM pc_component_categories WHERE slug='hdd'), 'Seagate 2TB', 1290000, '7200rpm', 2),
((SELECT id FROM pc_component_categories WHERE slug='hdd'), 'WD Black 2TB', 1890000, '7200rpm', 3),

((SELECT id FROM pc_component_categories WHERE slug='psu'), 'Corsair CV550 550W', 1090000, '80+ Bronze', 1),
((SELECT id FROM pc_component_categories WHERE slug='psu'), 'Seasonic Focus GX-650 650W', 1990000, '80+ Gold FM', 2),
((SELECT id FROM pc_component_categories WHERE slug='psu'), 'Corsair RM750e 750W', 2490000, '80+ Gold FM', 3),
((SELECT id FROM pc_component_categories WHERE slug='psu'), 'Corsair RM850e 850W', 2990000, '80+ Gold FM', 4),

((SELECT id FROM pc_component_categories WHERE slug='case'), 'Xigmatek NYX II', 590000, 'mATX, Mesh', 1),
((SELECT id FROM pc_component_categories WHERE slug='case'), 'NZXT H510 Flow', 2090000, 'ATX, Mesh', 2),
((SELECT id FROM pc_component_categories WHERE slug='case'), 'Lian Li Lancool II Mesh', 2590000, 'ATX, 3 Fan ARGB', 3),
((SELECT id FROM pc_component_categories WHERE slug='case'), 'Corsair 4000D Airflow', 2290000, 'ATX, Mesh', 4);

-- Prebuilt Configs
INSERT INTO prebuilt_configs (slug, name, description, price, color, sort_order) VALUES
('budget', 'PC Văn Phòng - Gaming Nhẹ', 'Cấu hình phù hợp cho công việc văn phòng và gaming nhẹ', 12000000, 'from-blue-500 to-blue-600', 1),
('mid', 'PC Gaming Tầm Trung', 'Cấu hình gaming 1080p mượt mà, phù hợp đa số game', 20000000, 'from-purple-500 to-purple-600', 2),
('high', 'PC Gaming Cao Cấp', 'Cấu hình gaming 1440p/4K, streaming, làm việc nặng', 35000000, 'from-orange-500 to-orange-600', 3);

INSERT INTO prebuilt_config_specs (config_id, label, sort_order) VALUES
((SELECT id FROM prebuilt_configs WHERE slug='budget'), 'Intel i5-12400F', 1),
((SELECT id FROM prebuilt_configs WHERE slug='budget'), 'Gigabyte B660M DS3H', 2),
((SELECT id FROM prebuilt_configs WHERE slug='budget'), '16GB DDR4 3200MHz', 3),
((SELECT id FROM prebuilt_configs WHERE slug='budget'), 'AMD RX 6600 8GB', 4),
((SELECT id FROM prebuilt_configs WHERE slug='budget'), 'SSD 500GB NVMe', 5),
((SELECT id FROM prebuilt_configs WHERE slug='budget'), 'Corsair CV550 550W', 6),

((SELECT id FROM prebuilt_configs WHERE slug='mid'), 'Intel i5-13400F', 1),
((SELECT id FROM prebuilt_configs WHERE slug='mid'), 'MSI PRO B660M-A', 2),
((SELECT id FROM prebuilt_configs WHERE slug='mid'), '16GB DDR4 3600MHz', 3),
((SELECT id FROM prebuilt_configs WHERE slug='mid'), 'RTX 4060 8GB', 4),
((SELECT id FROM prebuilt_configs WHERE slug='mid'), 'SSD 1TB NVMe', 5),
((SELECT id FROM prebuilt_configs WHERE slug='mid'), 'Corsair RM750e 750W', 6),

((SELECT id FROM prebuilt_configs WHERE slug='high'), 'Intel i7-13700F', 1),
((SELECT id FROM prebuilt_configs WHERE slug='high'), 'ASUS ROG STRIX B660-A', 2),
((SELECT id FROM prebuilt_configs WHERE slug='high'), '32GB DDR5 6000MHz', 3),
((SELECT id FROM prebuilt_configs WHERE slug='high'), 'RTX 4070 12GB', 4),
((SELECT id FROM prebuilt_configs WHERE slug='high'), 'Samsung 990 Pro 1TB', 5),
((SELECT id FROM prebuilt_configs WHERE slug='high'), 'Corsair RM850e 850W', 6);

-- Services
INSERT INTO services (icon, title, description, display_context, sort_order) VALUES
('Shield', 'Lắp đặt camera giám sát', 'Tư vấn, thiết kế và lắp đặt hệ thống camera giám sát chuyên nghiệp cho gia đình, văn phòng, nhà xưởng', 'both', 1),
('Wrench', 'Lắp đặt hệ thống mạng', 'Thiết kế và thi công hệ thống mạng LAN, Wifi chuyên nghiệp, đảm bảo tốc độ và ổn định', 'both', 2),
('Monitor', 'Build PC theo yêu cầu', 'Tư vấn và lắp ráp PC gaming, đồ họa, văn phòng theo nhu cầu và ngân sách', 'both', 3),
('Settings', 'Bảo trì & sửa chữa', 'Dịch vụ bảo trì định kỳ, sửa chữa thiết bị an ninh và máy tính', 'services_page', 4);

INSERT INTO service_features (service_id, feature, sort_order) VALUES
((SELECT id FROM services WHERE title = 'Lắp đặt camera giám sát'), 'Khảo sát thực tế miễn phí', 1),
((SELECT id FROM services WHERE title = 'Lắp đặt camera giám sát'), 'Thiết kế hệ thống tối ưu', 2),
((SELECT id FROM services WHERE title = 'Lắp đặt camera giám sát'), 'Thi công nhanh chóng, gọn gàng', 3),
((SELECT id FROM services WHERE title = 'Lắp đặt camera giám sát'), 'Hướng dẫn sử dụng, xem từ xa', 4),
((SELECT id FROM services WHERE title = 'Lắp đặt hệ thống mạng'), 'Khảo sát và thiết kế topology', 1),
((SELECT id FROM services WHERE title = 'Lắp đặt hệ thống mạng'), 'Thi công đi dây chuẩn', 2),
((SELECT id FROM services WHERE title = 'Lắp đặt hệ thống mạng'), 'Cấu hình tối ưu hiệu suất', 3),
((SELECT id FROM services WHERE title = 'Build PC theo yêu cầu'), 'Tư vấn cấu hình phù hợp', 1),
((SELECT id FROM services WHERE title = 'Build PC theo yêu cầu'), 'Linh kiện chính hãng 100%', 2),
((SELECT id FROM services WHERE title = 'Build PC theo yêu cầu'), 'Lắp ráp cẩn thận, test stress', 3),
((SELECT id FROM services WHERE title = 'Bảo trì & sửa chữa'), 'Bảo trì định kỳ theo lịch', 1),
((SELECT id FROM services WHERE title = 'Bảo trì & sửa chữa'), 'Sửa chữa nhanh trong ngày', 2),
((SELECT id FROM services WHERE title = 'Bảo trì & sửa chữa'), 'Linh kiện thay thế chính hãng', 3);

-- Process Steps
INSERT INTO process_steps (step_number, title, description) VALUES
(1, 'Tiếp nhận yêu cầu', 'Lắng nghe và tìm hiểu nhu cầu cụ thể của khách hàng'),
(2, 'Khảo sát & tư vấn', 'Khảo sát thực tế, đề xuất giải pháp phù hợp nhất'),
(3, 'Báo giá & thỏa thuận', 'Báo giá chi tiết, minh bạch. Thỏa thuận hợp đồng'),
(4, 'Thi công & lắp đặt', 'Thực hiện thi công chuyên nghiệp, đúng tiến độ'),
(5, 'Nghiệm thu & bàn giao', 'Kiểm tra, test toàn bộ. Hướng dẫn sử dụng chi tiết');

-- Site Settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('hero_content', '{
  "title": "Giải Pháp An Ninh & Công Nghệ Toàn Diện",
  "subtitle": "Hải An Technology cung cấp camera giám sát, thiết bị mạng, linh kiện máy tính chính hãng với giá tốt nhất",
  "badge_text": "🔥 Khuyến mãi đặc biệt",
  "cta_primary": {"text": "Xem sản phẩm", "href": "/san-pham"},
  "cta_secondary": {"text": "Liên hệ tư vấn", "href": "/lien-he"},
  "hero_image": "",
  "stats": [
    {"label": "Sản phẩm", "value": "500+"},
    {"label": "Khách hàng", "value": "100+"},
    {"label": "Hỗ trợ", "value": "24/7"},
    {"label": "Hài lòng", "value": "98%"}
  ]
}'::jsonb),
('contact_info', '{
  "phones": ["0978.998.811"],
  "email": "info@haiantech.vn",
  "address": "Số 123, Đường ABC, TP. XYZ",
  "hours": "8:00 - 18:00 (Thứ 2 - Thứ 7)",
  "map_embed_url": "",
  "map_link": "",
  "form_subjects": ["Tư vấn sản phẩm", "Hỗ trợ kỹ thuật", "Báo giá dự án", "Hợp tác kinh doanh", "Khác"]
}'::jsonb),
('nav_links', '[
  {"name": "Trang chủ", "href": "/"},
  {"name": "Sản phẩm", "href": "/san-pham"},
  {"name": "Build PC", "href": "/build-pc"},
  {"name": "Dịch vụ", "href": "/dich-vu"},
  {"name": "Giới thiệu", "href": "/gioi-thieu"},
  {"name": "Liên hệ", "href": "/lien-he"}
]'::jsonb),
('seo_defaults', '{
  "title": "Hải An Technology - Giải pháp an ninh & công nghệ",
  "description": "Camera giám sát, máy chấm công, linh kiện PC gaming chính hãng. Tư vấn miễn phí, giá tốt nhất.",
  "og_image": "",
  "keywords": "camera giam sat, may cham cong, linh kien pc, build pc gaming, hai an technology"
}'::jsonb),
('footer_content', '{
  "company_description": "Hải An Technology - Đối tác tin cậy trong lĩnh vực an ninh và công nghệ. Cung cấp giải pháp toàn diện từ tư vấn, lắp đặt đến bảo trì.",
  "hotlines": ["0978.998.811"],
  "product_links": [
    {"name": "Camera giám sát", "href": "/san-pham?category=camera"},
    {"name": "Máy chấm công", "href": "/san-pham?category=cham-cong"},
    {"name": "Kiểm soát ra vào", "href": "/san-pham?category=kiem-soat"},
    {"name": "Linh kiện PC", "href": "/san-pham?category=cpu"}
  ],
  "service_links": [
    {"name": "Lắp đặt camera", "href": "/dich-vu"},
    {"name": "Build PC", "href": "/build-pc"},
    {"name": "Bảo trì", "href": "/dich-vu"}
  ],
  "company_links": [
    {"name": "Giới thiệu", "href": "/gioi-thieu"},
    {"name": "Liên hệ", "href": "/lien-he"}
  ],
  "social_links": [
    {"name": "Facebook", "url": "#", "icon": "Facebook"},
    {"name": "Zalo", "url": "#", "icon": "MessageCircle"}
  ]
}'::jsonb),
('about_page', '{
  "hero_title": "Về Hải An Technology",
  "hero_subtitle": "Đối tác tin cậy trong lĩnh vực an ninh và công nghệ thông tin",
  "philosophy_quote": "Công nghệ phải phục vụ con người, không phải ngược lại",
  "philosophy_author": "Hải An Technology",
  "team_title": "Đội ngũ chuyên nghiệp",
  "team_description": "Với hơn 10 năm kinh nghiệm, đội ngũ Hải An Technology luôn nỗ lực mang đến giải pháp tốt nhất cho khách hàng.",
  "expertise": [],
  "values": [
    {"icon": "Shield", "title": "Chất lượng", "description": "Sản phẩm chính hãng, dịch vụ chuyên nghiệp"},
    {"icon": "Users", "title": "Tận tâm", "description": "Luôn đặt lợi ích khách hàng lên hàng đầu"},
    {"icon": "Zap", "title": "Nhanh chóng", "description": "Phản hồi nhanh, thi công đúng tiến độ"},
    {"icon": "Heart", "title": "Uy tín", "description": "Cam kết bảo hành, hỗ trợ lâu dài"}
  ],
  "clients": [
    {"icon": "Building", "title": "Doanh nghiệp", "description": "Văn phòng, công ty, tập đoàn"},
    {"icon": "Home", "title": "Hộ gia đình", "description": "Nhà riêng, chung cư, biệt thự"},
    {"icon": "Factory", "title": "Nhà xưởng", "description": "Kho bãi, xí nghiệp, nhà máy"},
    {"icon": "Store", "title": "Cửa hàng", "description": "Shop, showroom, trung tâm thương mại"}
  ]
}'::jsonb);
