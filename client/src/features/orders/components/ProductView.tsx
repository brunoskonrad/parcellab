import type { OrderProduct } from "../lib/ordersApi";

export type ProductViewProps = {
  className?: string;
  product: OrderProduct;
};

export function ProductView({ className, product }: ProductViewProps) {
  return (
    <div className={className}>
      <p className="text-gray-500 mr-4">×{product.quantity}</p>

      <img
        src={product.imageUrl}
        title={product.name}
        className="w-24 h-24 mr-4 rounded"
      />

      <div>
        <p className="font-semibold mb-1">{product.name}</p>
        <p className="text-gray-500">{product.articleNumber}</p>
      </div>
    </div>
  );
}
