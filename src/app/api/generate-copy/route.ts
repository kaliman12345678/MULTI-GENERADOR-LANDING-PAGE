import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productName, mainBenefit, targetAudience, price } = await request.json();

    const name = productName || "Producto Estrella";
    const benefit = mainBenefit || "resultados garantizados en tiempo récord";
    const audience = targetAudience || "personas que buscan calidad y conveniencia";
    const regularPrice = Number(price) > 0 ? Number(price) * 2 : 199900;
    const promoPrice = Number(price) > 0 ? Number(price) : 99900;

    const generatedData = {
      product_name: name,
      headline: `Dile Adiós a los Dolores de Cabeza: Descubre el Nuevo ${name} con ${benefit}`,
      subheadline: `La solución recomendada para ${audience}. Máxima calidad, durabilidad superior y garantía total de satisfacción.`,
      badge_text: "OFERTA EXCLUSIVA - PAGO CONTRA ENTREGA DISPONIBLE",
      urgency_bar_text: "⚡ ¡OFERTA POR TIEMPO LIMITADO! PAGO CONTRA ENTREGA Y ENVÍO GRATIS A TODO EL PAÍS ⚡",
      price_regular: regularPrice,
      price_promo: promoPrice,
      features: [
        {
          id: "f1",
          title: "Calidad y Rendimiento Superior",
          description: `Diseñado con materiales premium para ofrecer ${benefit} desde el primer día de uso.`,
          icon: "ShieldCheck"
        },
        {
          id: "f2",
          title: "Uso Fácil e Intuitivo",
          description: "Sin instalaciones complicadas. Listo para usar en menos de 2 minutos sin experiencia previa.",
          icon: "Zap"
        },
        {
          id: "f3",
          title: "Ahorro de Tiempo y Dinero",
          description: `Evita gastos innecesarios y soluciones temporales. El ${name} está construido para durar.`,
          icon: "TrendingUp"
        },
        {
          id: "f4",
          title: "Respaldado con Garantía Total",
          description: "Si no cumple con tus expectativas al 100%, te devolvemos tu dinero sin preguntas.",
          icon: "Award"
        }
      ],
      combos: [
        {
          id: "combo-1",
          title: "1 Unidad (Individual)",
          quantity: 1,
          price: promoPrice,
          originalPrice: regularPrice,
          discountBadge: "50% DTO",
          popular: false,
          saveText: `Ahorras $${(regularPrice - promoPrice).toLocaleString()}`
        },
        {
          id: "combo-2",
          title: "2 Unidades (Pack Dúo Recomendado)",
          quantity: 2,
          price: Math.round(promoPrice * 1.7),
          originalPrice: regularPrice * 2,
          discountBadge: "MÁS POPULAR - 60% DTO",
          popular: true,
          saveText: `Ahorras $${((regularPrice * 2) - Math.round(promoPrice * 1.7)).toLocaleString()} + Envío Prioritario`
        },
        {
          id: "combo-3",
          title: "3 Unidades (Pack Familiar / Máximo Ahorro)",
          quantity: 3,
          price: Math.round(promoPrice * 2.3),
          originalPrice: regularPrice * 3,
          discountBadge: "MEJOR VALOR - 65% DTO",
          popular: false,
          saveText: `Ahorras $${((regularPrice * 3) - Math.round(promoPrice * 2.3)).toLocaleString()} + Regalo Exclusivo`
        }
      ],
      testimonials: [
        {
          id: "t1",
          name: "Alejandro Ramírez",
          location: "Bogotá",
          rating: 5,
          comment: `¡Totalmente recomendado! Me llegó en 2 días y pagué al recibirlo en mi casa. El ${name} superó todas mis expectativas.`,
          verified: true,
          date: "Hace 1 día"
        },
        {
          id: "t2",
          name: "María Camila Restrepo",
          location: "Medellín",
          rating: 5,
          comment: `Tenía desconfianza al inicio, pero la atención por WhatsApp y la rapidez del envío me encantaron. 10 de 10.`,
          verified: true,
          date: "Hace 3 días"
        },
        {
          id: "t3",
          name: "Diego Fernando Castro",
          location: "Cali",
          rating: 5,
          comment: `Compré el pack de 2 para regalarle uno a mi hermano y ambos quedamos fascinados. La calidad se siente premium.`,
          verified: true,
          date: "Hace 5 días"
        }
      ],
      faqs: [
        {
          id: "faq-1",
          question: "¿Cómo funciona el pago contra entrega?",
          answer: "Pides tu producto hoy a través del formulario web sin pagar nada por adelantado. Cuando la transportadora llegue a tu casa u oficina, inspeccionas el paquete y pagas en efectivo."
        },
        {
          id: "faq-2",
          question: "¿Cuánto tiempo demora la entrega?",
          answer: "Despachamos el mismo día hábil. En ciudades principales el paquete tarda entre 24 y 48 horas. En municipios intermedios de 2 a 4 días."
        },
        {
          id: "faq-3",
          question: "¿Qué garantía tengo al comprar?",
          answer: "Cuentas con 30 días de garantía total por cualquier defecto de fabricación. Si tienes cualquier inconveniente, nos escribes al WhatsApp y te brindamos solución inmediata."
        },
        {
          id: "faq-4",
          question: "¿El envío realmente es gratis?",
          answer: "Sí, el costo de envío es 100% gratuito a nivel nacional para todas las compras realizadas durante la promoción actual."
        }
      ]
    };

    return NextResponse.json({ success: true, data: generatedData });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
