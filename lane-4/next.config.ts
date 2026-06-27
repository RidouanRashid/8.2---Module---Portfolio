import type { NextConfig } from "next";

// Static export so Apache (XAMPP) can serve the site as plain files — no Node
// server needed. `basePath` makes every asset URL start with /8.2 so it
// works when served from htdocs/8.2/  →  http://localhost/8.2/
//
// For live development with hot-reload, use `npm run dev` instead
// (that serves at http://localhost:3000/8.2 ).
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/8.2 - Module - Portfolio",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
