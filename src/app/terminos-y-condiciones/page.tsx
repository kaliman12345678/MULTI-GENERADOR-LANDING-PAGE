import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Términos y Condiciones | Tienda Oficial",
  description: "Términos del servicio y condiciones de compra.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        
        <Link href="/" className="inline-flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver al Inicio
        </Link>

        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <FileText className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-black text-slate-900">Términos y Condiciones de Compra</h1>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Condiciones del Pago Contra Entrega</h2>
          <p>
            Al diligenciar el formulario de pedido en nuestra página web, el cliente adquiere el compromiso de recibir el paquete en la dirección indicada y abonar el valor total pactado en efectivo al personal de la empresa de mensajería al momento de la entrega.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Disponibilidad y Despacho</h2>
          <p>
            Todos los pedidos están sujetos a confirmación y disponibilidad de inventario. Una vez validada la dirección y el número telefónico, se genera la guía de despacho en un plazo de 24 a 48 horas hábiles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Declaración de No Afiliación</h2>
          <p>
            Este sitio web es operado de forma independiente y comercializa productos de consumo. No forma parte de Meta Platforms, Inc., Facebook o Instagram, ni cuenta con patrocinio o relación societaria directa con dichas marcas.
          </p>
        </section>

      </div>
    </div>
  );
}
