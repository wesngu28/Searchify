/** @type {import('next').NextConfig} */
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/search/:path*",
        destination: "http://127.0.0.1:5000/search/:path*",
      },
    ];
  };
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  };
  return {
    rewrites
  };
};