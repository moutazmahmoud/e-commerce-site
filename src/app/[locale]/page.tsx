import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("HomePage")
  return (
    <div className="">
      <main className="">{t('title')}</main>
    </div>
  );
}
