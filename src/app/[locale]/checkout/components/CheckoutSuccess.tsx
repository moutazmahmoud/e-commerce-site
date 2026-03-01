"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/Button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccess() {
  const t = useTranslations("Checkout");

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
      <h2 className="text-2xl font-bold mb-2">{t("successTitle")}</h2>
      <p className="text-gray-600 mb-8 max-w-md">{t("successMessage")}</p>

      <Link href="/">
        <Button>{t("continueShopping")}</Button>
      </Link>
    </div>
  );
}
