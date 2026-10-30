import { createClient } from "@supabase/supabase-js";
import { LandingData, OrderData } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hwoxqewxvjodslgaedxs.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_XYW10MOE6Ik_WEpw3ZBRpA_x4GNnAEM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const DEFAULT_LANDING: LandingData = {
  id: "demo-hero-landing",
  slug: "demo-producto",
  custom_domain: "",
  product_name: "Proyector Ultra Portátil 4K UltraView",
  headline: "Lleva el Cine en tu Bolsillo con Imagen 4K y Sonido Envolvente",
  subheadline: "Disfruta tus series, películas y videojuegos en pantallas de hasta 130 pulgadas en cualquier pared o techo. Conéctalo a tu celular o Wi-Fi al instante.",
  badge_text: "OFERTA RELÁMPAGO - 50% DE DESCUENTO SOLO HOY",
  urgency_bar_text: "⚡ ¡OFERTA POR TIEMPO LIMITADO! PAGO CONTRA ENTREGA Y ENVÍO GRATIS A TODO EL PAÍS ⚡",
  countdown_minutes: 15,
  price_regular: 299900,
  price_promo: 149900,
  currency_symbol: "$",
  whatsapp_number: "573001234567",
  whatsapp_message_prefix: "¡Hola! Quiero confirmar mi pedido del Proyector 4K:",
  meta_pixel_id: "",
  meta_domain_verification: "",
  primary_color: "#f97316",
  accent_color: "#ea580c",
  images: [
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&w=800&q=80"
  ],
  features: [
    {
      id: "f1",
      title: "Resolución 4K Ultra HD",
      description: "Colores vivos y contraste dinámico sin importar la iluminación ambiental.",
      icon: "Tv"
    },
    {
      id: "f2",
      title: "Conexión Inalámbrica Universal",
      description: "Compatible con iPhone, Android, computadores, PlayStation y consolas.",
      icon: "Wifi"
    },
    {
      id: "f3",
      title: "Audio Hi-Fi Incorporado",
      description: "Altavoz envolvente integrado con opción de conectar tus propios audífonos Bluetooth.",
      icon: "Volume2"
    },
    {
      id: "f4",
      title: "Proyección Giratoria 180°",
      description: "Proyecta fácilmente en la pared o directamente en el techo de tu habitación.",
      icon: "Maximize"
    }
  ],
  combos: [
    {
      id: "combo-1",
      title: "1 Unidad (Básico)",
      quantity: 1,
      price: 149900,
      originalPrice: 299900,
      discountBadge: "50% DTO",
      popular: false,
      saveText: "Ahorras $150.000"
    },
    {
      id: "combo-2",
      title: "2 Unidades (Pack Pareja / Regalo)",
      quantity: 2,
      price: 259900,
      originalPrice: 599800,
      discountBadge: "MÁS POPULAR - 60% DTO",
      popular: true,
      saveText: "Ahorras $339.900 + Regalo Soporte Trípode"
    },
    {
      id: "combo-3",
      title: "3 Unidades (Pack Familiar)",
      quantity: 3,
      price: 349900,
      originalPrice: 899700,
      discountBadge: "MEJOR VALOR - 65% DTO",
      popular: false,
      saveText: "Ahorras $549.800 + Envío Prioritario"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Carlos Mario Méndez",
      location: "Medellín, Colombia",
      rating: 5,
      comment: "Llegó en 2 días a mi casa y pagué cuando me lo entregaron. La imagen en el techo de la habitación se ve espectacular, mis hijos están felices.",
      verified: true,
      date: "Hace 2 días"
    },
    {
      id: "t2",
      name: "Valeria Gómez",
      location: "Bogotá, Colombia",
      rating: 5,
      comment: "Tenía dudas por comprar por internet pero el pago contra entrega me dio mucha seguridad. La calidad del proyector supera con creces el precio.",
      verified: true,
      date: "Hace 4 días"
    },
    {
      id: "t3",
      name: "Andrés Felipe Ríos",
      location: "Cali, Colombia",
      rating: 5,
      comment: "Excelente sonido y se conecta súper rápido con mi iPhone. Recomendadísimo para ver partidos con amigos.",
      verified: true,
      date: "Hace 1 semana"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "¿Cómo funciona el Pago Contra Entrega?",
      answer: "Pides tu producto hoy a través de nuestra web y NO pagas nada por adelantado. Lo recibes en la puerta de tu casa o trabajo y le pagas en efectivo al transportador de confianza."
    },
    {
      id: "faq-2",
      question: "¿Cuánto tarda en llegar mi pedido?",
      answer: "Los envíos en ciudades principales tardan de 24 a 48 horas hábiles. Para otros municipios y regiones el tiempo estimado es de 2 a 4 días hábiles."
    },
    {
      id: "faq-3",
      question: "¿El producto tiene garantía?",
      answer: "Sí, todos nuestros productos cuentan con 30 días de garantía por defectos de fábrica y soporte directo con nuestro equipo por WhatsApp."
    },
    {
      id: "faq-4",
      question: "¿Es compatible con cualquier celular?",
      answer: "Sí, es totalmente compatible con sistemas iOS (iPhone) y Android mediante duplicación de pantalla inalámbrica (Screen Mirroring / AirPlay)."
    }
  ],
  guarantee_days: 30,
  shipping_badge_text: "Envío Gratis Asegurado a Nivel Nacional",
  payment_method_text: "Pago Contra Entrega (Pagas al Recibir)",
  company_name: "Tienda Oficial Express",
  support_email: "soporte@mitiendaecommerce.com",
  business_address: "Centro de Distribución Logística, Calle 100 #15-20"
};

export async function getLandingBySlug(slug: string): Promise<LandingData | null> {
  try {
    const { data, error } = await supabase
      .from("landings")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      if (typeof window !== "undefined") {
        const local = localStorage.getItem(`landing_${slug}`);
        if (local) return JSON.parse(local);
      }
      return slug === DEFAULT_LANDING.slug ? DEFAULT_LANDING : null;
    }
    return data as LandingData;
  } catch {
    return slug === DEFAULT_LANDING.slug ? DEFAULT_LANDING : null;
  }
}

export async function getLandingByDomain(domain: string): Promise<LandingData | null> {
  try {
    const cleanDomain = domain.replace(/^www\./, "").toLowerCase();
    const { data, error } = await supabase
      .from("landings")
      .select("*")
      .eq("custom_domain", cleanDomain)
      .single();

    if (error || !data) return null;
    return data as LandingData;
  } catch {
    return null;
  }
}

export async function getAllLandings(): Promise<LandingData[]> {
  try {
    const { data, error } = await supabase
      .from("landings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (typeof window !== "undefined") {
        const localItems = Object.keys(localStorage)
          .filter((k) => k.startsWith("landing_"))
          .map((k) => JSON.parse(localStorage.getItem(k) || "{}"));
        if (localItems.length > 0) return localItems;
      }
      return [DEFAULT_LANDING];
    }
    return data as LandingData[];
  } catch {
    return [DEFAULT_LANDING];
  }
}

export async function saveLanding(landing: LandingData): Promise<{ success: boolean; error?: string }> {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(`landing_${landing.slug}`, JSON.stringify(landing));
    }

    const { error } = await supabase
      .from("landings")
      .upsert(landing, { onConflict: "slug" });

    if (error) {
      console.warn("Supabase upsert warning:", error.message);
      return { success: true };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Error saving landing:", msg);
    return { success: true };
  }
}

export async function deleteLanding(slug: string): Promise<boolean> {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`landing_${slug}`);
    }
    await supabase.from("landings").delete().eq("slug", slug);
    return true;
  } catch {
    return false;
  }
}

export async function saveOrder(order: OrderData): Promise<{ success: boolean; id?: string }> {
  try {
    if (typeof window !== "undefined") {
      const orders = JSON.parse(localStorage.getItem("orders_history") || "[]");
      orders.unshift({ ...order, created_at: new Date().toISOString() });
      localStorage.setItem("orders_history", JSON.stringify(orders));
    }

    const { data } = await supabase
      .from("orders")
      .insert([order])
      .select("id")
      .single();

    return { success: true, id: data?.id };
  } catch {
    return { success: true };
  }
}

export async function getAllOrders(): Promise<OrderData[]> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("orders_history") || "[]");
      }
      return [];
    }
    return data as OrderData[];
  } catch {
    return [];
  }
}
