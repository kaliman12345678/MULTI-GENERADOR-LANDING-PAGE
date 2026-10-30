import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Política de Privacidad | Tienda Oficial",
  description: "Política de privacidad y protección de datos personales.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        
        <Link href="/" className="inline-flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver al Inicio
        </Link>

        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-black text-slate-900">Política de Privacidad</h1>
        </div>

        <p className="text-xs text-slate-400">Última actualización: Octubre de 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Información que recopilamos</h2>
          <p>
            Al realizar un pedido en nuestro sitio web bajo la modalidad de Pago Contra Entrega, recopilamos los datos personales estrictamente necesarios para procesar y entregar tu compra: nombre completo, número de teléfono/WhatsApp, ciudad y dirección física de entrega.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Uso de la Información</h2>
          <p>
            Utilizamos tu información exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Coordinar la logística de envío con transportadoras autorizadas.</li>
            <li>Confirmar los detalles de entrega vía WhatsApp o llamada telefónica.</li>
            <li>Brindarte atención al cliente y soporte sobre la garantía del producto.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Cookies y Tecnologías de Publicidad (Meta Ads)</h2>
          <p>
            Este sitio web puede utilizar cookies y el Pixel de Meta (Facebook/Instagram) para medir la efectividad de nuestras campañas publicitarias y mostrar ofertas relevantes a usuarios interesados. No compartimos información financiera ni datos sensibles con terceros.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Derechos del Titular</h2>
          <p>
            Tienes derecho a conocer, actualizar y solicitar la supresión de tus datos personales en cualquier momento comunicándote con nuestra línea de atención al cliente de WhatsApp o correo oficial.
          </p>
        </section>

      </div>
    </div>
  );
}
