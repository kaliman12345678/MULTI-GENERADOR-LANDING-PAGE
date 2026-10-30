"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LandingData, OrderData } from "@/lib/types";
import { saveOrder } from "@/lib/supabase";
import {
  ShieldCheck,
  Truck,
  Flame,
  Star,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Lock,
  RotateCcw,
  Zap,
  TrendingUp,
  Award,
  Tv,
  Wifi,
  Volume2,
  Maximize
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import confetti from "canvas-confetti";

interface DynamicLandingViewProps {
  landing: LandingData;
}

export function DynamicLandingView({ landing }: DynamicLandingViewProps) {
  const [activeImage, setActiveImage] = useState<string>(
    landing.images && landing.images.length > 0 ? landing.images[0] : ""
  );

  const [selectedCombo, setSelectedCombo] = useState(
    landing.combos && landing.combos.length > 0
      ? landing.combos.find((c) => c.popular) || landing.combos[0]
      : {
          id: "default",
          title: "1 Unidad",
          quantity: 1,
          price: landing.price_promo,
          originalPrice: landing.price_regular,
          discountBadge: "50% DTO",
          popular: true
        }
  );

  const [timeLeft, setTimeLeft] = useState({ minutes: landing.countdown_minutes || 15, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 14, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    if (landing.meta_pixel_id) {
      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${landing.meta_pixel_id}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }
  }, [landing.meta_pixel_id]);

  const scrollToCheckout = () => {
    document.getElementById("pedido-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      alert("Por favor completa los campos requeridos para coordinar tu envío.");
      return;
    }

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const orderData: OrderData = {
      landing_id: landing.id,
      landing_slug: landing.slug,
      product_name: landing.product_name,
      combo_selected: selectedCombo.title,
      total_price: selectedCombo.price,
      customer_name: fullName.trim(),
      customer_phone: phone.trim(),
      customer_department: department.trim(),
      customer_city: city.trim(),
      customer_address: address.trim(),
      customer_notes: notes.trim(),
      status: "nuevo"
    };

    await saveOrder(orderData);

    if (typeof window !== "undefined" && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", "Purchase", {
        value: selectedCombo.price,
        currency: "COP",
        content_name: landing.product_name
      });
    }

    const cleanPhone = landing.whatsapp_number.replace(/\D/g, "");
    const message = [
      landing.whatsapp_message_prefix || "¡Hola! Quiero confirmar mi pedido con Pago Contra Entrega:",
      `📦 *Producto:* ${landing.product_name}`,
      `🎁 *Opción:* ${selectedCombo.title}`,
      `💰 *Total a Pagar:* ${landing.currency_symbol}${selectedCombo.price.toLocaleString()}`,
      `👤 *Cliente:* ${fullName}`,
      `📱 *Teléfono:* ${phone}`,
      `📍 *Ciudad / Dpto:* ${city} ${department ? `(${department})` : ""}`,
      `🏠 *Dirección de Entrega:* ${address}`,
      notes ? `📝 *Observaciones:* ${notes}` : "",
      "🚚 *Método:* Pago Contra Entrega (Pago al recibir)"
    ]
      .filter(Boolean)
      .join("\n");

    const targetUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(targetUrl);
    setSubmitted(true);
    setIsSubmitting(false);

    window.open(targetUrl, "_blank");
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Tv": return <Tv className="w-6 h-6 text-orange-600" />;
      case "Wifi": return <Wifi className="w-6 h-6 text-orange-600" />;
      case "Volume2": return <Volume2 className="w-6 h-6 text-orange-600" />;
      case "Maximize": return <Maximize className="w-6 h-6 text-orange-600" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-orange-600" />;
      case "Zap": return <Zap className="w-6 h-6 text-orange-600" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-orange-600" />;
      default: return <Award className="w-6 h-6 text-orange-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-200">
      
      {/* 1. Urgency announcement bar */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white py-2 px-3 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm sticky top-0 z-50">
        <Flame className="w-4 h-4 fill-yellow-300 text-yellow-300 animate-pulse" />
        <span>{landing.urgency_bar_text}</span>
        <span className="bg-black/30 px-2 py-0.5 rounded text-yellow-300 font-mono tracking-wider ml-1">
          {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>

      {/* 2. Brand Header */}
      <header className="bg-white border-b border-slate-200/80 py-3.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
              {landing.company_name.charAt(0) || "T"}
            </span>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
              {landing.company_name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Compra 100% Protegida</span>
            </div>
            <Button
              onClick={scrollToCheckout}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              Pedir Ahora
            </Button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-orange-50/70 via-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Product Images Gallery */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg">
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={landing.product_name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    Sin imagen cargada
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md">
                  PAGO AL RECIBIR
                </div>
              </div>

              {/* Thumbnails */}
              {landing.images && landing.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {landing.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        activeImage === img ? "border-orange-600 ring-2 ring-orange-200" : "border-slate-200 opacity-70"
                      }`}
                    >
                      <Image src={img} alt={`Vista ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
                  <Truck className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">Envío Gratis</span>
                  <span className="text-[10px] text-slate-500 block">A todo el país</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
                  <RotateCcw className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">{landing.guarantee_days} Días</span>
                  <span className="text-[10px] text-slate-500 block">Garantía total</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
                  <Lock className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 block">Contra Entrega</span>
                  <span className="text-[10px] text-slate-500 block">Cero riesgo</span>
                </div>
              </div>
            </div>

            {/* Right: Pitch & Offer */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="inline-flex items-center gap-1.5 bg-orange-100 border border-orange-200 text-orange-950 text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>{landing.badge_text}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {landing.headline}
              </h1>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">4.9 / 5</span>
                <span className="text-xs text-slate-500">
                  ({(landing.testimonials?.length || 0) + 148} clientes satisfechos)
                </span>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {landing.subheadline}
              </p>

              {/* Price Callout */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-orange-200 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Precio Regular
                    </span>
                    <span className="text-slate-400 line-through text-lg font-bold">
                      {landing.currency_symbol}{landing.price_regular?.toLocaleString()}
                    </span>
                  </div>
                  <Badge className="bg-red-600 text-white font-extrabold text-xs px-2.5 py-0.5">
                    OFERTA LIMITADA
                  </Badge>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block">
                      Precio Promoción Hoy
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      {landing.currency_symbol}{landing.price_promo?.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                    Ahorras {landing.currency_symbol}{(landing.price_regular - landing.price_promo).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA Action */}
              <div className="space-y-2.5 pt-2">
                <Button
                  onClick={scrollToCheckout}
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-base sm:text-lg py-6 rounded-xl shadow-lg shadow-orange-500/25 cursor-pointer transform active:scale-98 transition-all"
                >
                  <span>¡SÍ, QUIERO PEDIR CON PAGO CONTRA ENTREGA!</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Envío 100% gratis a tu puerta. Pagas al repartidor en efectivo.</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      {landing.features && landing.features.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <Badge className="bg-orange-100 text-orange-900 border-orange-200 font-bold text-xs uppercase">
                Beneficios Comprobados
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ¿Por qué miles de personas eligen {landing.product_name}?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {landing.features.map((feature) => (
                <div
                  key={feature.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    {getIcon(feature.icon)}
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Checkout & COD Form */}
      <section id="pedido-section" className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 via-orange-50/30 to-amber-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8">
            <Badge className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 uppercase">
              🔥 PASO FINAL: PIDE EN 1 MINUTO
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
              Formulario de Pedido con Pago Contra Entrega
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Diligencia tus datos de envío. Te despachamos gratis y solo le pagas al repartidor cuando lo recibas.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-400 shadow-xl text-center space-y-5 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                ¡Tu pedido se está enviando a WhatsApp!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Si no se abrió la ventana de WhatsApp automáticamente, haz clic en el botón de abajo para enviar los datos de entrega.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base px-6 py-3.5 rounded-xl shadow-lg cursor-pointer transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Abrir WhatsApp y Confirmar Pedido</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-200 shadow-xl space-y-6">
              
              {/* Step 1: Combo Selector */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-3">
                  1. Selecciona tu combo preferido:
                </label>
                <div className="space-y-2.5">
                  {landing.combos.map((combo) => {
                    const isSelected = selectedCombo.id === combo.id;
                    return (
                      <div
                        key={combo.id}
                        onClick={() => setSelectedCombo(combo)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "border-orange-600 bg-orange-50/80 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked={isSelected}
                            onChange={() => setSelectedCombo(combo)}
                            className="w-4 h-4 text-orange-600 accent-orange-600"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                                {combo.title}
                              </span>
                              {combo.discountBadge && (
                                <Badge className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5">
                                  {combo.discountBadge}
                                </Badge>
                              )}
                            </div>
                            {combo.saveText && (
                              <span className="text-xs text-emerald-700 font-semibold block">
                                {combo.saveText}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-base sm:text-lg font-black text-slate-900 block">
                            {landing.currency_symbol}{combo.price.toLocaleString()}
                          </span>
                          {combo.originalPrice > combo.price && (
                            <span className="text-xs text-slate-400 line-through">
                              {landing.currency_symbol}{combo.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Shipping details */}
              <form onSubmit={handleOrderSubmit} className="space-y-4 pt-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800 block">
                  2. Datos para el envío y facturación:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nombre y Apellido *
                    </label>
                    <Input
                      required
                      placeholder="Ej. Juan Pérez"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Número de WhatsApp / Celular *
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="Ej. 300 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Ciudad o Municipio *
                    </label>
                    <Input
                      required
                      placeholder="Ej. Medellín, Cali, Bogotá..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Departamento
                    </label>
                    <Input
                      placeholder="Ej. Antioquia, Valle..."
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Dirección Completa de Entrega *
                  </label>
                  <Input
                    required
                    placeholder="Ej. Calle 10 #20-30 Apto 402, Barrio..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Indicaciones adicionales (Opcional)
                  </label>
                  <Input
                    placeholder="Ej. Dejar en portería o tocar timbre blanco"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Total */}
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block uppercase">
                      Total a pagar al recibir
                    </span>
                    <span className="text-2xl font-black text-orange-600">
                      {landing.currency_symbol}{selectedCombo.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md block">
                      🚚 Envío Gratis
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg py-6 rounded-2xl shadow-xl shadow-emerald-600/20 cursor-pointer transform active:scale-98 transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>{isSubmitting ? "Procesando..." : "CONFIRMAR PEDIDO POR WHATSAPP"}</span>
                </Button>

                <p className="text-[11px] text-center text-slate-500">
                  🔒 Tus datos están protegidos. Solo los utilizaremos para coordinar la entrega de tu pedido.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 6. Testimonials */}
      {landing.testimonials && landing.testimonials.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 font-bold text-xs uppercase">
                Prueba Social Verificada
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Lo que dicen nuestros clientes satisfechos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {landing.testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(testi.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    {testi.verified && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ Compra Verificada
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{testi.comment}&rdquo;
                  </p>

                  <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-extrabold text-slate-800">{testi.name}</span>
                    <span>{testi.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FAQs */}
      {landing.faqs && landing.faqs.length > 0 && (
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 space-y-2">
              <Badge className="bg-orange-100 text-orange-900 border-orange-200 font-bold text-xs uppercase">
                Preguntas Frecuentes
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Resolvemos todas tus dudas
              </h2>
            </div>

            <div className="space-y-3">
              {landing.faqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full p-4 sm:p-5 text-left font-extrabold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform ${
                          isOpen ? "transform rotate-180 text-orange-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. Compliant Meta Ads Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 border-t border-slate-800 text-xs">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="text-center sm:text-left">
              <span className="font-extrabold text-white text-base block">{landing.company_name}</span>
              <span>{landing.business_address}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-slate-300 font-medium">
              <Link href="/politica-de-privacidad" className="hover:text-white underline">
                Política de Privacidad
              </Link>
              <Link href="/terminos-y-condiciones" className="hover:text-white underline">
                Términos y Condiciones
              </Link>
              <Link href="/politicas-de-envio-y-devolucion" className="hover:text-white underline">
                Políticas de Envío y Garantía
              </Link>
            </div>
          </div>

          <div className="text-center text-slate-400 space-y-2 max-w-3xl mx-auto text-[11px] leading-relaxed">
            <p>
              <strong>Descargo de Responsabilidad:</strong> Este sitio web no forma parte de la red de sitios web de Meta Platforms, Inc., Facebook o Instagram. Además, este sitio NO está respaldado por Meta de ninguna manera. FACEBOOK e INSTAGRAM son marcas comerciales registradas de Meta Platforms, Inc.
            </p>
            <p>
              Los resultados pueden variar según el uso del producto. Nos esforzamos por ofrecer productos y servicios de alta calidad respaldados por nuestra política de garantía de satisfacción.
            </p>
            <p className="pt-2 text-slate-400">
              © {new Date().getFullYear()} {landing.company_name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* 9. Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between gap-3 z-40 shadow-xl">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase block">
            Pago Contra Entrega
          </span>
          <span className="text-lg font-black text-orange-600">
            {landing.currency_symbol}{selectedCombo.price.toLocaleString()}
          </span>
        </div>
        <Button
          onClick={scrollToCheckout}
          className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm px-5 py-3 rounded-xl shadow-md cursor-pointer"
        >
          Pedir Ahora
        </Button>
      </div>

    </div>
  );
}
