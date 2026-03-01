import * as z from "zod";

export const getShippingSchema = (t: any) =>
  z.object({
    name: z.string().min(2, { message: t("errors.required") }),
    email: z.string().email({ message: t("errors.invalidEmail") }),
    address: z.string().min(5, { message: t("errors.required") }),
    city: z.string().min(2, { message: t("errors.required") }),
    zipCode: z.string().min(3, { message: t("errors.required") }),
  });

export type ShippingFormData = z.infer<ReturnType<typeof getShippingSchema>>;
