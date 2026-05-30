import Link from "next/link"
import { buildMetadata, getBreadcrumbSchema, siteSEO } from "@/utils/seoConfig";
import SeoWrapper from "@/components/seowrapper/SeoWrapper";
import ContactPage from "@/components/contact/ContactPage";



export const metadata = buildMetadata("contact");
export const dynamic = "force-static";

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact Us", href: "/contact" },
  ]);

function Contact() {
  return (
    <SeoWrapper pageUrl="/contact" schemas={[breadcrumb]} >
        <main className="pt-20">
          <ContactPage />
        </main>
    </SeoWrapper>
  )
}

export default Contact