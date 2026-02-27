import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="">
      <Hero />
    </div>
  );
}
