/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'optpejjohzsoddwnphmh.supabase.co',
          },
        ],
      },
};

export default nextConfig;
