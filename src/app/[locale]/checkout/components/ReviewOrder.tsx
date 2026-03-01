"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCartStore } from "@/store/cartStore";
import { type ShippingFormData } from "@/lib/validations/checkout";
import Button from "@/components/Button";
import Image from "next/image";

interface ReviewOrderProps {
  shippingData: ShippingFormData;
  onConfirm: () => void;
  onBack: () => void;
}

export default function ReviewOrder({
  shippingData,
  onConfirm,
  onBack,
}: ReviewOrderProps) {
  const tCart = useTranslations("Cart");
  const tCheckout = useTranslations("Checkout");
  const locale = useLocale();
  const { items, totalPrice } = useCartStore();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {tCheckout("reviewOrder")}
        </h2>

        <div className="space-y-4 mb-6">
          {items.map((item) => {
            const name = locale === "ar" ? item.name_ar : item.name_en;
            return (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b pb-4"
              >
                <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900">{name}</h3>
                  <p className="text-sm text-gray-500">
                    {tCart("quantity")}: {item.quantity}
                  </p>
                </div>
                <div className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center py-4 border-t border-b mb-6">
          <span className="text-lg font-semibold">{tCart("total")}</span>
          <span className="text-xl font-bold">${totalPrice().toFixed(2)}</span>
        </div>

        <h3 className="text-lg font-semibold mb-2">
          {tCheckout("shippingDetails")}
        </h3>
        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
          <p>{shippingData.name}</p>
          <p>{shippingData.email}</p>
          <p>{shippingData.address}</p>
          <p>
            {shippingData.city}, {shippingData.zipCode}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Back
        </button>
        <Button onClick={onConfirm} variant="primary">
          {tCheckout("placeOrder")}
        </Button>
      </div>
    </div>
  );
}
