import type { NextConfig } from "next";

// Static export so Apache (XAMPP) can serve the site as plain files — no Node
// server needed. `basePath` makes every asset URL start with /lane-4 so it
// works when served from htdocs/lane-4/  →  http://localhost/lane-4/
//
// For live development with hot-reload, use `npm run dev` instead
// (that serves at http://localhost:3000/lane-4 ).
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/lane-4",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
