/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export', // Ensures static export to `out` directory
//   images: {
//     unoptimized: true, // Required for `next export`
//   },
//   eslint: {
//     ignoreDuringBuilds: true, // Ignore linting errors during build
//   },
//   typescript: {
//     ignoreBuildErrors: true, // Ignore TypeScript errors during build
//   },
// };

// module.exports = nextConfig;
