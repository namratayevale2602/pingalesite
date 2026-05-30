import { buildMetadata, getBreadcrumbSchema, siteSEO } from "@/utils/seoConfig";
import SeoWrapper from "@/components/seowrapper/SeoWrapper";
import BlogDetail from "@/components/blog/BlogDetail";
import blogData from "@/data/blog.json";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.slug === slug) ?? blogData.posts[0];
  return {
    title:       `${post.t} | Pingale Wealth`,
    description: post.excerpt || post.d,
    keywords:    `${post.c}, financial planning, insurance, mutual fund, SIP, Pingale Wealth`,
    alternates:  { canonical: `${siteSEO.baseUrl}/blog/${post.slug}` },
    openGraph: {
      title:       `${post.t} | Pingale Wealth`,
      description: post.excerpt || post.d,
      url:         `${siteSEO.baseUrl}/blog/${post.slug}`,
      siteName:    siteSEO.siteName,
      type:        "article",
      images: post.img
        ? [{ url: `${siteSEO.baseUrl}${post.img}`, width: 1200, height: 630, alt: post.t }]
        : [],
    },
    twitter: {
      card:        "summary_large_image",
      title:       `${post.t} | Pingale Wealth`,
      description: post.excerpt || post.d,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.slug === slug) ?? blogData.posts[0];

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Insights", href: "/blog" },
    { name: post.t, href: `/blog/${slug}` },
  ]);

  return (
    <SeoWrapper pageUrl={`/blog/${slug}`} schemas={[breadcrumb]}>
      <BlogDetail />
    </SeoWrapper>
  );
}
