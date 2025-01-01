import { withContentCollections } from "@content-collections/next";
 
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components/marquee",
        permanent: true,
      },
      {
        source: "/components/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/marquee",
        permanent: true,
      },
    ]
  }
};

export default withContentCollections(nextConfig);