"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getShippingSchema,
  type ShippingFormData,
} from "@/lib/validations/checkout";
import Button from "@/components/Button";

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  defaultValues?: Partial<ShippingFormData>;
}

export default function ShippingForm({
  onSubmit,
  defaultValues,
}: ShippingFormProps) {
  const t = useTranslations("Checkout");
  const schema = getShippingSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">{t("shippingAddress")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("name")}
          </label>
          <input
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("email")}
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("address")}
          </label>
          <input
            {...register("address")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("city")}
          </label>
          <input
            {...register("city")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("zipCode")}
          </label>
          <input
            {...register("zipCode")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.zipCode.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit">{t("continue")}</Button>
      </div>
    </form>
  );
}
