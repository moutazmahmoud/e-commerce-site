"use client";

import { useState, useEffect, Suspense } from "react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cartStore";
import ShippingForm from "./components/ShippingForm";
import ReviewOrder from "./components/ReviewOrder";
import CheckoutSuccess from "./components/CheckoutSuccess";
import { type ShippingFormData } from "@/lib/validations/checkout";
import { Link } from "@/i18n/navigation";

export default function CheckoutPage() {
  const t = useTranslations("Checkout");
  const tCart = useTranslations("Cart");
  const { totalItems, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (totalItems() === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">{tCart("empty")}</h1>
        <p className="text-gray-600 mb-8">{tCart("emptyDescription")}</p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
        >
          {tCart("continueShopping")}
        </Link>
      </div>
    );
  }

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(2);
  };

  const handleConfirmOrder = () => {
    // In a real app, this is where you would process payment and send order to backend
    clearCart();
    setStep(3);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {step !== 3 && (
        <h1 className="text-3xl font-bold mb-8 text-center">{t("title")}</h1>
      )}

      <Suspense
        fallback={
          <div className="h-48 flex items-center justify-center">
            Loading...
          </div>
        }
      >
        {step === 1 && (
          <ShippingForm
            onSubmit={handleShippingSubmit}
            defaultValues={shippingData || undefined}
          />
        )}

        {step === 2 && shippingData && (
          <ReviewOrder
            shippingData={shippingData}
            onConfirm={handleConfirmOrder}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && <CheckoutSuccess />}
      </Suspense>
    </div>
  );
}
