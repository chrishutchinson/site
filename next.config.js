/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      // The Pal page is a standalone static page in public/pal/.
      { source: "/pal", destination: "/pal/index.html" },
      { source: "/pal/", destination: "/pal/index.html" },
    ];
  },
};
