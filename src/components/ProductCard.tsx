import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border">
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 ${product.badgeColor} text-primary-foreground text-xs font-semibold rounded-full`}
          >
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
      </Link>

      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors h-12">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-primary">
            {product.price}₫
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {product.originalPrice}₫
          </span>
        </div>

        <Button className="w-full" size="sm" asChild>
          <Link to={`/product/${product.id}`}>
            <ShoppingCart className="w-4 h-4" />
            Xem chi tiết
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
