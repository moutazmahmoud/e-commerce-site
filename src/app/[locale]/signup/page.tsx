"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  const t = useTranslations("Auth.signup");
  const tFields = useTranslations("Auth.fields");
  const tValidation = useTranslations("Checkout.errors");
  const tAuthVal = useTranslations("Auth.validation");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);

  const signupSchema = z
    .object({
      name: z
        .string()
        .min(2, { message: tValidation("minLength", { min: 2 }) }),
      email: z.string().email({ message: tValidation("invalidEmail") }),
      password: z.string().min(6, { message: tAuthVal("passwordLength") }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tAuthVal("passwordMatch"),
      path: ["confirmPassword"],
    });

  type SignupFormValues = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login(data.email, data.name);
    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
            {t("subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div className="space-y-4">
            <Input
              {...register("name")}
              label={tFields("name")}
              type="text"
              error={errors.name?.message}
            />

            <Input
              {...register("email")}
              label={tFields("email")}
              type="email"
              error={errors.email?.message}
            />

            <Input
              {...register("password")}
              label={tFields("password")}
              type="password"
              error={errors.password?.message}
            />

            <Input
              {...register("confirmPassword")}
              label={tFields("confirmPassword")}
              type="password"
              error={errors.confirmPassword?.message}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              t("submit")
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-zinc-400">
          {t("haveAccount")}{" "}
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:text-blue-500"
          >
            {t("loginLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
