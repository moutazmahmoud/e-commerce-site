"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {Input} from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const tErrors = useTranslations("Checkout.errors");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(1, tErrors("required")),
    email: z.string().email(tErrors("invalidEmail")),
    subject: z.string().min(1, tErrors("required")),
    message: z.string().min(10, tErrors("minLength", { min: 10 })),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    console.log("Contact form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <section className="bg-zinc-50 py-20 dark:bg-zinc-900/50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-7xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-zinc-500 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <div className="container mx-auto mt-16 px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Info Side */}
          <div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">
              {t("info")}
            </h2>
            <div className="mt-10 space-y-8">
              {[
                { icon: MapPin, text: t("address"), label: "Location" },
                { icon: Phone, text: t("phone"), label: "Phone" },
                { icon: Mail, text: t("email"), label: "Email" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-600/20">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Placeholder for map or image */}
            <div className="mt-12 aspect-[16/9] w-full rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
              <div className="text-zinc-400 font-bold uppercase tracking-widest italic opacity-20 text-4xl">
                NextShop Map
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="rounded-[3rem] bg-white p-8 shadow-2xl shadow-zinc-200/50 dark:bg-zinc-900 dark:shadow-none border border-zinc-100 dark:border-zinc-800 lg:p-12">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">
              {t("form.title")}
            </h2>

            {isSubmitted ? (
              <div className="mt-10 animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center justify-center gap-6 rounded-[2rem] bg-green-50 p-12 text-center dark:bg-green-900/10">
                  <CheckCircle2 className="h-20 w-20 text-green-500" />
                  <div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                      {t("form.success")}
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-10 space-y-6"
              >
                <Input
                  label={t("form.name")}
                  error={errors.name?.message}
                  {...register("name")}
                />
                <Input
                  label={t("form.email")}
                  type="email"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <Input
                  label={t("form.subject")}
                  error={errors.subject?.message}
                  {...register("subject")}
                />
                <div>
                  <label className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    {t("form.message")}
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`block w-full rounded-2xl border-2 bg-zinc-50 px-5 py-4 font-medium outline-none transition-all focus:bg-white dark:bg-zinc-800 ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-transparent focus:border-blue-600"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm font-bold text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-16 w-full text-xl shadow-xl shadow-blue-600/20"
                >
                  {isSubmitting ? "..." : t("form.submit")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
