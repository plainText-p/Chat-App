import type { NextConfig } from "next";

const nextConfig = {
  // Configuración básica sin opciones experimentales
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}
export default nextConfig;
