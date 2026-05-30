import { buildMetadata, getBreadcrumbSchema } from "@/utils/seoConfig";
import SeoWrapper from "@/components/seowrapper/SeoWrapper";
import BlogListing from "@/components/blog/BlogListing";

export const metadata = buildMetadata("blog");
export const dynamic = "force-static";

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Insights", href: "/blog" },
]);

export default function BlogPage() {
  return (
    <SeoWrapper pageUrl="/blog" schemas={[breadcrumb]}>
      <BlogListing />
    </SeoWrapper>
  );
}
