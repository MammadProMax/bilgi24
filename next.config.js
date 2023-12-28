const withNextIntl = require("next-intl/plugin")(
   // specify i18n.ts config file path
   "./lib/i18n.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {}; // other configs

module.exports = withNextIntl(nextConfig);
