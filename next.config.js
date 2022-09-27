/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true, 
  rewrites: async() => {
    return [
      {
        source: "/search/:path*",
        destination: "http://wn28.pythonanywhere.com/search/:path*",
      },
      {
        source: "/auth",
        destination: "http://wn28.pythonanywhere.com/auth",
      },
      {
        source: "/user",
        destination: "http://wn28.pythonanywhere.com/user",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};