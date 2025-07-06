/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! คำเตือน !!
    // เป็นการอนุญาตให้ Production Build ทำงานสำเร็จ
    // แม้ว่าโปรเจกต์ของคุณจะมี Type Error ก็ตาม
    ignoreBuildErrors: true,
  },
};

export default nextConfig;