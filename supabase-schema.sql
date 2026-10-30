-- =======================================================
-- SCHEMA SQL PARA CREADOR DE LANDINGS & PEDIDOS E-COMMERCE
-- Ejecuta este script en el editor SQL de tu panel de Supabase
-- =======================================================

-- 1. Tabla de Landings
CREATE TABLE IF NOT EXISTS public.landings (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    slug TEXT UNIQUE NOT NULL,
    custom_domain TEXT,
    product_name TEXT NOT NULL,
    headline TEXT NOT NULL,
    subheadline TEXT,
    badge_text TEXT,
    urgency_bar_text TEXT,
    countdown_minutes INTEGER DEFAULT 15,
    price_regular NUMERIC DEFAULT 0,
    price_promo NUMERIC DEFAULT 0,
    currency_symbol TEXT DEFAULT '$',
    whatsapp_number TEXT NOT NULL,
    whatsapp_message_prefix TEXT,
    meta_pixel_id TEXT,
    meta_domain_verification TEXT,
    primary_color TEXT DEFAULT '#f97316',
    accent_color TEXT DEFAULT '#ea580c',
    images JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    combos JSONB DEFAULT '[]'::jsonb,
    testimonials JSONB DEFAULT '[]'::jsonb,
    faqs JSONB DEFAULT '[]'::jsonb,
    guarantee_days INTEGER DEFAULT 30,
    shipping_badge_text TEXT DEFAULT 'Envío Gratis Asegurado',
    payment_method_text TEXT DEFAULT 'Pago Contra Entrega',
    company_name TEXT DEFAULT 'Tienda Oficial',
    support_email TEXT,
    business_address TEXT
);

-- 2. Tabla de Pedidos / Leads
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    landing_id TEXT,
    landing_slug TEXT,
    product_name TEXT NOT NULL,
    combo_selected TEXT NOT NULL,
    total_price NUMERIC NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_department TEXT,
    customer_city TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    customer_notes TEXT,
    status TEXT DEFAULT 'nuevo'
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.landings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de acceso (Lectura y Escritura permitidas con la clave pública/anon)
DROP POLICY IF EXISTS "Permitir lectura publica de landings" ON public.landings;
CREATE POLICY "Permitir lectura publica de landings" ON public.landings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir guardar landings" ON public.landings;
CREATE POLICY "Permitir guardar landings" ON public.landings
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Permitir insertar pedidos" ON public.orders;
CREATE POLICY "Permitir insertar pedidos" ON public.orders
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir consultar pedidos" ON public.orders;
CREATE POLICY "Permitir consultar pedidos" ON public.orders
    FOR SELECT USING (true);
