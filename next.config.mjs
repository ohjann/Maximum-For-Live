/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maxforlive.com",
        port: "",
        pathname: "/images/**"
      }
    ]
  }
};

export default nextConfig;
