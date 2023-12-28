const withNextIntl = require("next-intl/plugin")(
   // specify i18n.ts config file path
   "./lib/i18n.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "bilgi24.net",
         },
      ],
   },
}; // other configs

module.exports = withNextIntl(nextConfig);
