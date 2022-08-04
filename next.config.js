/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true, 
  rewrites: async() => {
    return [
      {
        source: "/search/:path*",
        destination: "http://127.0.0.1:5000/search/:path*",
      },
      {
        source: "/auth",
        destination: "http://127.0.0.1:5000/auth",
      },
      {
        source: "/user",
        destination: "http://127.0.0.1:5000/user",
      },
    ];
  }
};