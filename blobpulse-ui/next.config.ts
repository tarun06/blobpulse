import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Required for your static Docker builds
  output: isDevelopment ? undefined : "export", 
  
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
};

// Only add rewrites during local npm run dev execution
if (isDevelopment) {
  nextConfig.rewrites = async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // Points to local .NET API
      },
    ];
  };
}

export default nextConfig;