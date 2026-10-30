import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";

export const metadata = {
  title: "Políticas de Envío y Devolución | Tienda Oficial",
  description: "Tiempos de entrega, envíos nacionales y proceso de garantía.",
};

export default function ShippingAndReturnsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        
        <Link href="/" className="inline-flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver al Inicio
        </Link>

        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Truck className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-black text-slate-900">Políticas de Envío, Garantía y Devolución</h1>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Cobertura y Tiempos de Entrega</h2>
          <p>
            Contamos con cobertura a nivel nacional a través de las principales empresas de transporte logístico. Los tiempos estimados de entrega son:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Ciudades principales:</strong> 24 a 48 horas hábiles.</li>
            <li><strong>Municipios y zonas intermedias:</strong> 2 a 4 días hábiles.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Garantía de Satisfacción y Defectos</h2>
          <p>
            Ofrecemos 30 días de garantía directa contra cualquier defecto de fabricación. Si tu producto presenta alguna avería o daño de transporte:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Comunícate de inmediato con nuestra línea de WhatsApp adjuntando foto o video del producto.</li>
            <li>Se coordinará el reemplazo de la unidad sin costo adicional para el cliente.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Devoluciones</h2>
          <p>
            Para tramitar un cambio o devolución, el artículo debe encontrarse sin señales de mal uso, en su empaque original y con todos los accesorios completos.
          </p>
        </section>

      </div>
    </div>
  );
}
