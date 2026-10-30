"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LandingData,
  OrderData
} from "@/lib/types";
import {
  saveLanding,
  getAllLandings,
  deleteLanding,
  getAllOrders,
  DEFAULT_LANDING
} from "@/lib/supabase";
import { DynamicLandingView } from "@/components/landing/dynamic-landing-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wand2,
  Plus,
  Trash2,
  ExternalLink,
  Smartphone,
  Monitor,
  Copy,
  Check,
  Package,
  ShoppingBag,
  Sparkles,
  Phone,
  Globe,
  Upload,
  RefreshCw
} from "lucide-react";

export default function CreatorPage() {
  const [activeTab, setActiveTab] = useState<"editor" | "landings" | "orders">("editor");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // AI Assistant form
  const [aiProductName, setAiProductName] = useState("");
  const [aiMainBenefit, setAiMainBenefit] = useState("");
  const [aiTargetAudience, setAiTargetAudience] = useState("");
  const [aiPrice, setAiPrice] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Form State
  const [formData, setFormData] = useState<LandingData>(DEFAULT_LANDING);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Lists
  const [allLandings, setAllLandings] = useState<LandingData[]>([]);
  const [allOrders, setAllOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    loadLandings();
    loadOrders();
  }, []);

  const loadLandings = async () => {
    const list = await getAllLandings();
    setAllLandings(list);
  };

  const loadOrders = async () => {
    const list = await getAllOrders();
    setAllOrders(list);
  };

  // AI Copy Generation
  const handleGenerateAiCopy = async () => {
    if (!aiProductName.trim()) {
      alert("Por favor escribe al menos el nombre del producto para generar el contenido.");
      return;
    }

    setIsGeneratingAi(true);

    try {
      const res = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: aiProductName,
          mainBenefit: aiMainBenefit,
          targetAudience: aiTargetAudience,
          price: aiPrice
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        const newSlug = aiProductName
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

        setFormData((prev) => ({
          ...prev,
          id: `landing-${Date.now()}`,
          slug: newSlug || prev.slug,
          product_name: d.product_name,
          headline: d.headline,
          subheadline: d.subheadline,
          badge_text: d.badge_text,
          urgency_bar_text: d.urgency_bar_text,
          price_regular: d.price_regular,
          price_promo: d.price_promo,
          features: d.features,
          combos: d.combos,
          testimonials: d.testimonials,
          faqs: d.faqs,
          whatsapp_message_prefix: `¡Hola! Quiero confirmar mi pedido del producto ${d.product_name}:`
        }));
      }
    } catch (err) {
      console.error("Error generando textos:", err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Image handlers
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()]
    }));
    setImageUrlInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Save Landing
  const handleSaveLanding = async () => {
    if (!formData.product_name.trim() || !formData.slug.trim()) {
      alert("El nombre del producto y el slug de la página son obligatorios.");
      return;
    }

    setIsSaving(true);
    setSavedSuccess(false);

    const res = await saveLanding(formData);

    setIsSaving(false);
    if (res.success) {
      setSavedSuccess(true);
      await loadLandings();
      setTimeout(() => setSavedSuccess(false), 5000);
    }
  };

  const handleEditLanding = (landing: LandingData) => {
    setFormData(landing);
    setActiveTab("editor");
  };

  const handleDeleteLanding = async (slug: string) => {
    if (confirm("¿Estás seguro de eliminar esta landing page?")) {
      await deleteLanding(slug);
      await loadLandings();
    }
  };

  const copyToClipboard = (text: string, slug: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black flex items-center justify-center text-xl shadow-md">
              ⚡
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                Creador de Landing Pages Persuasivas
              </h1>
              <p className="text-xs text-slate-500">
                Optimizado para Ventas Directas, Pago Contra Entrega y Meta Ads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("editor")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "editor"
                    ? "bg-white text-orange-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🛠️ Creador / Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("landings")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "landings"
                    ? "bg-white text-orange-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📂 Mis Landings ({allLandings.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-white text-orange-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📦 Pedidos ({allOrders.length})
              </button>
            </div>

            {activeTab === "editor" && (
              <Button
                onClick={() => setShowLivePreview(!showLivePreview)}
                variant="outline"
                size="sm"
                className="text-xs font-bold gap-1 border-slate-300 cursor-pointer hidden md:flex"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{showLivePreview ? "Ocultar Vista Previa" : "Ver Vista Previa"}</span>
              </Button>
            )}
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* ========================================================== */}
        {/* TAB 1: CREATOR / EDITOR                                    */}
        {/* ========================================================== */}
        {activeTab === "editor" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className={`${showLivePreview ? "lg:col-span-6" : "lg:col-span-8 lg:col-start-3"} space-y-6`}>
              
              {savedSuccess && (
                <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg flex items-center justify-between gap-3 animate-in zoom-in-95">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-yellow-300" />
                    <div>
                      <strong className="block text-sm">¡Landing Guardada y Publicada con Éxito!</strong>
                      <span className="text-xs text-white/90">
                        Puedes verla en <Link href={`/p/${formData.slug}`} target="_blank" className="underline font-bold">/p/{formData.slug}</Link>
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/p/${formData.slug}`}
                    target="_blank"
                    className="bg-white text-emerald-800 text-xs font-extrabold px-3 py-1.5 rounded-lg"
                  >
                    Abrir Página
                  </Link>
                </div>
              )}

              {/* 1. AI Assistant Card */}
              <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/10 border-2 border-orange-200 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-orange-600" />
                  <h2 className="font-black text-lg text-slate-900">
                    Asistente Inteligente de Redacción Persuasiva
                  </h2>
                </div>
                <p className="text-xs text-slate-600">
                  Ingresa los datos básicos y la IA generará titulares ganchos, dolor vs. solución, combos y testimonios estructurados para ventas directas:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nombre del Producto *
                    </label>
                    <Input
                      placeholder="Ej. Mini Proyector Portátil 4K"
                      value={aiProductName}
                      onChange={(e) => setAiProductName(e.target.value)}
                      className="bg-white rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Precio de Venta Sugerido
                    </label>
                    <Input
                      type="number"
                      placeholder="Ej. 149900"
                      value={aiPrice}
                      onChange={(e) => setAiPrice(e.target.value)}
                      className="bg-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Beneficio Principal o Dolor que Resuelve
                    </label>
                    <Input
                      placeholder="Ej. Cine en el techo de tu cuarto sin cables"
                      value={aiMainBenefit}
                      onChange={(e) => setAiMainBenefit(e.target.value)}
                      className="bg-white rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Público Objetivo
                    </label>
                    <Input
                      placeholder="Ej. Familias, jóvenes y gamers"
                      value={aiTargetAudience}
                      onChange={(e) => setAiTargetAudience(e.target.value)}
                      className="bg-white rounded-xl"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleGenerateAiCopy}
                  disabled={isGeneratingAi}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold py-5 rounded-xl shadow-md cursor-pointer"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  <span>{isGeneratingAi ? "Generando textos persuasivos..." : "🪄 Autocompletar Landing con IA"}</span>
                </Button>
              </div>

              {/* 2. Main Details & Domains */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Globe className="w-5 h-5 text-orange-600" />
                  <h3 className="font-extrabold text-base text-slate-900">
                    1. Enlace, Dominio Propio y WhatsApp
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Slug de la URL (Ruta) *
                    </label>
                    <div className="flex items-center">
                      <span className="text-xs text-slate-400 bg-slate-50 border border-r-0 border-slate-200 px-2.5 py-2 rounded-l-xl">
                        /p/
                      </span>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="rounded-l-none rounded-r-xl"
                        placeholder="mini-proyector-4k"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Dominio Personalizado (Opcional)
                    </label>
                    <Input
                      placeholder="Ej. misuperoferta.com"
                      value={formData.custom_domain || ""}
                      onChange={(e) => setFormData({ ...formData, custom_domain: e.target.value })}
                      className="rounded-xl"
                    />
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Para usar tu propio dominio en Meta Ads (apunta el CNAME a tu host).
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      WhatsApp para recibir pedidos (con código país) *
                    </label>
                    <Input
                      placeholder="Ej. 573001234567"
                      value={formData.whatsapp_number}
                      onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nombre de la Tienda / Marca
                    </label>
                    <Input
                      placeholder="Ej. Tienda Oficial Express"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Meta Pixel ID (Facebook Ads)
                    </label>
                    <Input
                      placeholder="Ej. 123456789012345"
                      value={formData.meta_pixel_id || ""}
                      onChange={(e) => setFormData({ ...formData, meta_pixel_id: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Meta Domain Verification Code
                    </label>
                    <Input
                      placeholder="Ej. abcdef123456789"
                      value={formData.meta_domain_verification || ""}
                      onChange={(e) => setFormData({ ...formData, meta_domain_verification: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Images Management */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-orange-600" />
                    <h3 className="font-extrabold text-base text-slate-900">
                      2. Fotos del Producto ({formData.images.length})
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-orange-400 transition-colors bg-slate-50">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <label className="cursor-pointer text-xs font-bold text-orange-600 block">
                      Subir fotos desde tu computador
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-slate-400 block mt-1">PNG, JPG, WebP</span>
                  </div>

                  <div className="flex flex-col justify-center space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      O pegar enlace directo de imagen:
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://...imagen.jpg"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        className="rounded-xl text-xs"
                      />
                      <Button
                        type="button"
                        onClick={handleAddImageUrl}
                        size="sm"
                        className="bg-slate-900 text-white font-bold text-xs rounded-xl"
                      >
                        Añadir
                      </Button>
                    </div>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <Image src={img} alt="" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 hover:opacity-100 cursor-pointer shadow-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Sales Copy & Headlines */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                  <h3 className="font-extrabold text-base text-slate-900">
                    3. Titulares y Precios de Oferta
                  </h3>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Titular Gancho Principal (Headline) *
                  </label>
                  <Input
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Subtítulo Persuasivo
                  </label>
                  <textarea
                    rows={2}
                    value={formData.subheadline}
                    onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Precio Regular Tachado
                    </label>
                    <Input
                      type="number"
                      value={formData.price_regular}
                      onChange={(e) => setFormData({ ...formData, price_regular: Number(e.target.value) })}
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Precio de Oferta Hoy *
                    </label>
                    <Input
                      type="number"
                      value={formData.price_promo}
                      onChange={(e) => setFormData({ ...formData, price_promo: Number(e.target.value) })}
                      className="rounded-xl font-bold text-orange-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Minutos Cuenta Regresiva
                    </label>
                    <Input
                      type="number"
                      value={formData.countdown_minutes}
                      onChange={(e) => setFormData({ ...formData, countdown_minutes: Number(e.target.value) })}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Combos & Packs */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-600" />
                    <h3 className="font-extrabold text-base text-slate-900">
                      4. Ofertas Multi-pack (Combos)
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.combos.map((combo, idx) => (
                    <div key={combo.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Nombre</label>
                          <Input
                            value={combo.title}
                            onChange={(e) => {
                              const updated = [...formData.combos];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, combos: updated });
                            }}
                            className="bg-white rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Precio</label>
                          <Input
                            type="number"
                            value={combo.price}
                            onChange={(e) => {
                              const updated = [...formData.combos];
                              updated[idx].price = Number(e.target.value);
                              setFormData({ ...formData, combos: updated });
                            }}
                            className="bg-white rounded-xl text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Etiqueta de Ahorro</label>
                          <Input
                            value={combo.saveText || ""}
                            onChange={(e) => {
                              const updated = [...formData.combos];
                              updated[idx].saveText = e.target.value;
                              setFormData({ ...formData, combos: updated });
                            }}
                            className="bg-white rounded-xl text-xs text-emerald-700"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button Bar */}
              <div className="sticky bottom-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between gap-4 z-40">
                <div>
                  <span className="text-xs text-slate-500 block">Estado de la página:</span>
                  <span className="text-sm font-extrabold text-emerald-600">
                    Lista para publicar
                  </span>
                </div>

                <Button
                  onClick={handleSaveLanding}
                  disabled={isSaving}
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black px-8 py-6 rounded-xl shadow-lg cursor-pointer transform active:scale-98 transition-all"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span>{isSaving ? "Guardando..." : "🚀 PUBLICAR / GUARDAR LANDING"}</span>
                </Button>
              </div>

            </div>

            {/* Live Interactive Preview */}
            {showLivePreview && (
              <div className="lg:col-span-6 sticky top-20 bg-slate-900 rounded-3xl p-4 shadow-2xl border-4 border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-white text-xs px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                    <span className="font-mono text-slate-400 ml-2">/p/{formData.slug}</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("desktop")}
                      className={`p-1 rounded cursor-pointer ${
                        previewMode === "desktop" ? "bg-orange-600 text-white" : "text-slate-400"
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("mobile")}
                      className={`p-1 rounded cursor-pointer ${
                        previewMode === "mobile" ? "bg-orange-600 text-white" : "text-slate-400"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl overflow-y-auto max-h-[80vh] border border-slate-700">
                  <div className={previewMode === "mobile" ? "max-w-sm mx-auto shadow-2xl border-x" : "w-full"}>
                    <DynamicLandingView landing={formData} />
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: MIS LANDINGS                                        */}
        {/* ========================================================== */}
        {activeTab === "landings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Tus Landing Pages Creadas</h2>
                <p className="text-xs text-slate-500">
                  Administra, edita o copia los enlaces listos para tus campañas de Meta Ads.
                </p>
              </div>
              <Button
                onClick={() => {
                  setFormData(DEFAULT_LANDING);
                  setActiveTab("editor");
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl"
              >
                <Plus className="w-4 h-4 mr-1" />
                Nueva Landing
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allLandings.map((landing) => {
                const landingUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${landing.slug}`;
                return (
                  <div
                    key={landing.id || landing.slug}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-slate-100">
                      {landing.images && landing.images[0] ? (
                        <Image
                          src={landing.images[0]}
                          alt={landing.product_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                          Sin imagen
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {landing.currency_symbol}{landing.price_promo?.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                          /p/{landing.slug}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900 line-clamp-1">
                          {landing.product_name}
                        </h3>
                        {landing.custom_domain && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-1">
                            <Globe className="w-3 h-3" />
                            {landing.custom_domain}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(landingUrl, landing.slug)}
                            className="flex-1 text-xs font-bold border-slate-300"
                          >
                            {copiedSlug === landing.slug ? (
                              <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 mr-1" />
                            )}
                            <span>{copiedSlug === landing.slug ? "¡Copiado!" : "Copiar Link"}</span>
                          </Button>

                          <Link
                            href={`/p/${landing.slug}`}
                            target="_blank"
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-lg text-xs font-bold"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button"
                            onClick={() => handleEditLanding(landing)}
                            className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                          >
                            ✏️ Editar Contenido
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteLanding(landing.slug)}
                            className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 3: PEDIDOS RECIBIDOS                                   */}
        {/* ========================================================== */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Historial de Pedidos y Leads</h2>
                <p className="text-xs text-slate-500">
                  Todos los clientes que han completado el formulario de compra con Pago Contra Entrega.
                </p>
              </div>
              <Button
                onClick={loadOrders}
                variant="outline"
                size="sm"
                className="text-xs font-bold gap-1 border-slate-300"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Actualizar
              </Button>
            </div>

            {allOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-base text-slate-800">Aún no hay pedidos registrados</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Cuando los clientes completen el formulario en cualquiera de tus landings, aparecerán aquí con sus datos y botón directo a WhatsApp.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Fecha</th>
                        <th className="p-3.5">Cliente</th>
                        <th className="p-3.5">Teléfono / WhatsApp</th>
                        <th className="p-3.5">Ciudad & Dirección</th>
                        <th className="p-3.5">Producto & Oferta</th>
                        <th className="p-3.5">Total</th>
                        <th className="p-3.5 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allOrders.map((order, i) => {
                        const cleanPhone = (order.customer_phone || "").replace(/\D/g, "");
                        return (
                          <tr key={order.id || i} className="hover:bg-slate-50">
                            <td className="p-3.5 text-slate-500">
                              {order.created_at ? new Date(order.created_at).toLocaleDateString() : "Hoy"}
                            </td>
                            <td className="p-3.5 font-bold text-slate-900">
                              {order.customer_name}
                            </td>
                            <td className="p-3.5 font-mono text-slate-700">
                              {order.customer_phone}
                            </td>
                            <td className="p-3.5 text-slate-700">
                              <span className="font-semibold block">{order.customer_city}</span>
                              <span className="text-slate-400 text-[11px] block">{order.customer_address}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-bold text-slate-900 block">{order.product_name}</span>
                              <span className="text-orange-600 text-[11px] block">{order.combo_selected}</span>
                            </td>
                            <td className="p-3.5 font-black text-slate-900">
                              ${Number(order.total_price).toLocaleString()}
                            </td>
                            <td className="p-3.5 text-right">
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-xs"
                              >
                                <Phone className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
