import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

const ProductItem = ({ product }) => {
  return (
    <div
      className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg
    hover:scale-110 hover:shadow-lg
    transition-all ease-in-out cursor-pointer
    "
    >
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        width={500}
        height={200}
        alt={product.attributes.Name}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg">{product?.attributes?.Name}</h2>
      {product.attributes.sellingPrice && (
        <h2 className="font-semibold">
          Rs. {product?.attributes?.sellingPrice}
        </h2>
      )}
      <h2 className="line-through text-gray-500 font-semibold">
        Rs. {product?.attributes?.mrp}
      </h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:bg-primary hover:text-white"
          >
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
