/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./base.scss";`,
  },
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_URI:process.env.MONGODB_URI,
    MONGODB_DB:process.env.MONGODB_DB,
    CLOUDINARY_URL:process.env.CLOUDINARY_URL
  }
  
};
module.exports = nextConfig
