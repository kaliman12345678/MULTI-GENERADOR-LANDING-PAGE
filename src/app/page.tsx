import Link from "next/link";
import { headers } from "next/headers";
import { DynamicLandingView } from "@/components/landing/dynamic-landing-view";
import { DEFAULT_LANDING, getLandingByDomain } from "@/lib/supabase";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const headerList = await headers();
  const customDomain = headerList.get("x-custom-domain");

  if (customDomain) {
    const domainLanding = await getLandingByDomain(customDomain);
    if (domainLanding) {
      return <DynamicLandingView landing={domainLanding} />;
    }
  }

  return (
    <div>
      {/* Quick Access Bar to Creator */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-300">Modo Demo / Creador Activo</span>
        </div>
        <Link
          href="/creador"
          className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-3 py-1 rounded-lg text-xs transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Abrir Panel Creador de Landings (/creador)</span>
        </Link>
      </div>

      <DynamicLandingView landing={DEFAULT_LANDING} />
    </div>
  );
}
