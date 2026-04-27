import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    providerImportSource: undefined,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fernandotazon.com.es",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "isspllab.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pharmsky.com.au",
        pathname: "/**",
      },
    ],
  },
};

export default withMDX(nextConfig);

