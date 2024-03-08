/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ko", "en", "ru"],
    defaultLocale: "ko",
    localeDetection: false,
  },
};

module.exports = nextConfig;
