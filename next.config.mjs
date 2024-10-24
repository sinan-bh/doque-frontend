/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: '"th.bing.com"',
        port: "",
      },
      {
        protocol: "https",
        hostname: "imgv3.fotor.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
