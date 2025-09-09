/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"], // ✅ allow images from Cloudinary
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb"
        }
    }
};

export default nextConfig;
