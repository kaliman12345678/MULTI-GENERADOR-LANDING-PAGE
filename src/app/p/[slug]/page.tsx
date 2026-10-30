import { notFound } from "next/navigation";
import { getLandingBySlug, DEFAULT_LANDING } from "@/lib/supabase";
import { DynamicLandingView } from "@/components/landing/dynamic-landing-view";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getLandingBySlug(slug);

  if (!landing) {
    return {
      title: "Página no encontrada",
    };
  }

  return {
    title: `${landing.product_name} | Oferta Exclusiva`,
    description: landing.subheadline,
    other: landing.meta_domain_verification
      ? {
          "facebook-domain-verification": landing.meta_domain_verification,
        }
      : {},
  };
}

export default async function ProductLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const landing = await getLandingBySlug(slug);

  if (!landing && slug !== DEFAULT_LANDING.slug) {
    notFound();
  }

  return <DynamicLandingView landing={landing || DEFAULT_LANDING} />;
}
