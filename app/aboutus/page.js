import Link from "next/link"
import { buildMetadata, getBreadcrumbSchema, siteSEO } from "@/utils/seoConfig";
import SeoWrapper from "@/components/seowrapper/SeoWrapper";



export const metadata = buildMetadata("about");
export const dynamic = "force-static";

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About Us", href: "/aboutus" },
  ]);

function Page() {
  return (
    <SeoWrapper pageUrl="/about" schemas={[breadcrumb]} >
        <main className="pt-20">
          Hello
        </main>
    </SeoWrapper>
  )
}

export default Page