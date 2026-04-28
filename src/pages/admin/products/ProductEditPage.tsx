import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { useProduct, useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Plus, X, GripVertical } from "lucide-react";
import { toast } from "sonner";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const { data: existingProduct, isLoading } = useProduct(id || "");
  const { data: categories } = useCategories(false);
  const { data: brands } = useBrands(false);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [badge, setBadge] = useState("");
  const [badgeColor, setBadgeColor] = useState("bg-red-500");
  const [description, setDescription] = useState("");
  const [warranty, setWarranty] = useState("12 tháng");
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);
  const [images, setImages] = useState<{ url: string; is_primary: boolean }[]>([]);
  const [variants, setVariants] = useState<
    { label: string; price: string; original_price: string }[]
  >([]);
  const [newFeature, setNewFeature] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newVariantLabel, setNewVariantLabel] = useState("");
  const [newVariantPrice, setNewVariantPrice] = useState("");
  const [newVariantOriginal, setNewVariantOriginal] = useState("");

  // Load existing data
  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setSlug(existingProduct.slug);
      setSku(existingProduct.sku || "");
      setPrice(existingProduct.price);
      setOriginalPrice(existingProduct.original_price);
      setCategoryId(existingProduct.category_id || "");
      setBrandId(existingProduct.brand_id || "");
      setBadge(existingProduct.badge || "");
      setBadgeColor(existingProduct.badge_color || "bg-red-500");
      setDescription(existingProduct.description || "");
      setWarranty(existingProduct.warranty);
      setInStock(existingProduct.in_stock);
      setIsFeatured(existingProduct.is_featured);
      setFeatures(existingProduct.features?.map((f) => f.feature) || []);
      setSpecs(
        existingProduct.specs?.map((s) => ({
          key: s.spec_key,
          value: s.spec_value,
        })) || []
      );
      setImages(
        existingProduct.images?.map((img) => ({
          url: img.image_url,
          is_primary: img.is_primary,
        })) || []
      );
      setVariants(
        (existingProduct.variants || [])
          .slice()
          .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .map((v: any) => ({
            label: v.label,
            price: v.price,
            original_price: v.original_price || "",
          }))
      );
    }
  }, [existingProduct]);

  // Auto-generate slug from name
  useEffect(() => {
    if (isNew && name) {
      const generated = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  }, [name, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !originalPrice) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    const variantsPayload = variants.map((v) => ({
      label: v.label,
      price: v.price,
      original_price: v.original_price || null,
    }));

    try {
      if (isNew) {
        await createProduct.mutateAsync({
          name,
          slug,
          sku: sku || undefined,
          price,
          original_price: originalPrice,
          category_id: categoryId || undefined,
          brand_id: brandId || undefined,
          badge: badge || undefined,
          badge_color: badge ? badgeColor : undefined,
          description: description || undefined,
          warranty,
          in_stock: inStock,
          is_featured: isFeatured,
          features,
          specs,
          images,
          variants: variantsPayload,
        });
        toast.success("Đã tạo sản phẩm mới");
      } else {
        await updateProduct.mutateAsync({
          id: id!,
          name,
          slug,
          sku: sku || null,
          price,
          original_price: originalPrice,
          category_id: categoryId || null,
          brand_id: brandId || null,
          badge: badge || null,
          badge_color: badge ? badgeColor : null,
          description: description || null,
          warranty,
          in_stock: inStock,
          is_featured: isFeatured,
          features,
          specs,
          images,
          variants: variantsPayload,
        });
        toast.success("Đã cập nhật sản phẩm");
      }
      navigate("/admin/products");
    } catch (err: any) {
      console.error("Product save error:", err);

      // Map common Postgres / PostgREST codes to actionable Vietnamese
      // messages. Operators can act on these without needing to read logs.
      const code = err?.code;
      const codeMessages: Record<string, string> = {
        PGRST202:
          "Hàm replace_product_variants chưa tồn tại. Vui lòng chạy migration 005 trong Supabase.",
        PGRST205:
          "Bảng dữ liệu chưa tồn tại. Vui lòng chạy các migration 004/005 trong Supabase.",
        "42P01":
          "Bảng dữ liệu chưa tồn tại trong Supabase. Hãy chạy migration tương ứng (004 cho phiên bản).",
        "23505": "Trùng dữ liệu (slug hoặc SKU đã tồn tại).",
        "23503": "Tham chiếu không hợp lệ (danh mục hoặc thương hiệu đã bị xóa).",
        "23502": "Thiếu thông tin bắt buộc.",
      };

      const mapped = code ? codeMessages[code] : null;
      const detail = mapped
        ? mapped
        : import.meta.env.DEV
          ? err?.message
          : code
            ? `Mã lỗi: ${code}`
            : "";

      toast.error(
        detail ? `Có lỗi xảy ra. ${detail}` : "Có lỗi xảy ra. Vui lòng thử lại."
      );
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecs([...specs, { key: newSpecKey.trim(), value: newSpecValue.trim() }]);
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    if (newVariantLabel.trim() && newVariantPrice.trim()) {
      setVariants([
        ...variants,
        {
          label: newVariantLabel.trim(),
          price: newVariantPrice.trim(),
          original_price: newVariantOriginal.trim(),
        },
      ]);
      setNewVariantLabel("");
      setNewVariantPrice("");
      setNewVariantOriginal("");
    }
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const addImage = (url: string) => {
    setImages([...images, { url, is_primary: images.length === 0 }]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    if (newImages.length > 0 && !newImages.some((img) => img.is_primary)) {
      newImages[0].is_primary = true;
    }
    setImages(newImages);
  };

  const setPrimaryImage = (index: number) => {
    setImages(
      images.map((img, i) => ({
        ...img,
        is_primary: i === index,
      }))
    );
  };

  if (!isNew && isLoading) {
    return (
      <AdminLayout title="Đang tải...">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isNew ? "Thêm sản phẩm mới" : `Sửa: ${existingProduct?.name || ""}`}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/products")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={createProduct.isPending || updateProduct.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            {createProduct.isPending || updateProduct.isPending ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên sản phẩm *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Camera IP Hikvision DS-2CD1023G0E-I"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="camera-ip-hikvision-ds-2cd1023g0e-i"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">Mã sản phẩm (SKU)</Label>
              <Input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="DS-2CD1023G0E-I"
                className="max-w-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Giá bán *</Label>
                <Input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1.650.000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Giá gốc *</Label>
                <Input
                  id="originalPrice"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="2.100.000"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Danh mục</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Thương hiệu</Label>
                <Select value={brandId} onValueChange={setBrandId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thương hiệu" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands?.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mô tả chi tiết</Label>
              <RichTextEditor value={description} onChange={setDescription} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="warranty">Bảo hành</Label>
                <Input
                  id="warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  placeholder="12 tháng"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Bán chạy, Mới, Hot..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badgeColor">Màu badge</Label>
                <Select value={badgeColor} onValueChange={setBadgeColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-red-500">Đỏ</SelectItem>
                    <SelectItem value="bg-blue-500">Xanh dương</SelectItem>
                    <SelectItem value="bg-green-500">Xanh lá</SelectItem>
                    <SelectItem value="bg-orange-500">Cam</SelectItem>
                    <SelectItem value="bg-purple-500">Tím</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="inStock"
                  checked={inStock}
                  onCheckedChange={setInStock}
                />
                <Label htmlFor="inStock">Còn hàng</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isFeatured"
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                />
                <Label htmlFor="isFeatured">Sản phẩm nổi bật</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hình ảnh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.url}
                    alt={`Product ${index + 1}`}
                    className={`w-full h-32 object-cover rounded-lg border-2 ${
                      img.is_primary ? "border-blue-500" : "border-gray-200"
                    }`}
                  />
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!img.is_primary && (
                      <button
                        type="button"
                        onClick={() => setPrimaryImage(index)}
                        className="p-1 bg-blue-500 text-white rounded text-xs"
                        title="Đặt làm ảnh chính"
                      >
                        ★
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1 bg-red-500 text-white rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  {img.is_primary && (
                    <span className="absolute bottom-1 left-1 text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                      Ảnh chính
                    </span>
                  )}
                </div>
              ))}
              <ImageUploader
                bucket="product-images"
                folder="products"
                onChange={addImage}
                className="min-h-[128px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tính năng nổi bật</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="flex-1 text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Nhập tính năng mới..."
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" variant="outline" onClick={addFeature}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Variants — tùy chọn dung lượng / phiên bản */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Phiên bản / Dung lượng (tùy chọn)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Ví dụ: thẻ nhớ 32GB / 64GB / 128GB, RAM 8GB / 16GB / 32GB. Để
              trống nếu sản phẩm không có phiên bản.
            </p>
            <div className="space-y-2 mb-4">
              {variants.map((v, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-medium text-sm w-32 flex-shrink-0">
                    {v.label}
                  </span>
                  <span className="text-sm text-red-600 w-32 flex-shrink-0">
                    {v.price}₫
                  </span>
                  <span className="text-sm text-muted-foreground line-through flex-1">
                    {v.original_price ? `${v.original_price}₫` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newVariantLabel}
                onChange={(e) => setNewVariantLabel(e.target.value)}
                placeholder="Tên (32GB)"
                className="w-32"
              />
              <Input
                value={newVariantPrice}
                onChange={(e) => setNewVariantPrice(e.target.value)}
                placeholder="Giá bán (250.000)"
                className="w-40"
              />
              <Input
                value={newVariantOriginal}
                onChange={(e) => setNewVariantOriginal(e.target.value)}
                placeholder="Giá gốc (tùy chọn)"
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVariant())}
              />
              <Button type="button" variant="outline" onClick={addVariant}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Specs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông số kỹ thuật</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-medium text-sm w-40 flex-shrink-0">
                    {spec.key}
                  </span>
                  <span className="flex-1 text-sm text-gray-600">{spec.value}</span>
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                placeholder="Tên thông số"
                className="w-40"
              />
              <Input
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                placeholder="Giá trị"
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpec())}
              />
              <Button type="button" variant="outline" onClick={addSpec}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
};

export default ProductEditPage;
