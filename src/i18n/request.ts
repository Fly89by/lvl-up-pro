import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => ({
  locale: locale || routing.defaultLocale,
  messages: (await import(`../../messages/${locale || routing.defaultLocale}.json`)).default,
  timeZone: "Asia/Riyadh",
}));
