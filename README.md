# ⚡ CREA TU LANDING — Plataforma Creadora de Landing Pages Persuasivas

Plataforma completa de venta directa, diseñada para crear landing pages de alta conversión en minutos con Pago Contra Entrega, envío automático de pedidos a WhatsApp, dominios propios y aprobación para Meta Ads (Facebook & Instagram).

---

## 🚀 Inicio Rápido

1. Abre tu terminal en esta carpeta:
   ```bash
   cd "C:\Users\h\OneDrive - logigho.com\Documentos\APPS\CREA TU LANDING"
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre en tu navegador:
   * **Panel Creador Web**: [http://localhost:3000/creador](http://localhost:3000/creador)
   * **Página Demo en Vivo**: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Configuración de Supabase (SQL)

Tu proyecto ya tiene configuradas tus credenciales de Supabase en `.env.local`.

Para crear las tablas de almacenamiento de **Landings** y **Pedidos**, copia el contenido del archivo [`supabase-schema.sql`](./supabase-schema.sql) y pégalo en el **SQL Editor** de tu consola de Supabase ([https://supabase.com/dashboard](https://supabase.com/dashboard)):

1. Ve a tu proyecto Supabase -> **SQL Editor**.
2. Haz clic en **New Query**.
3. Pega el contenido de `supabase-schema.sql` y pulsa **Run**.

*(Nota: Aunque no hayas corrido el SQL todavía, el sistema cuenta con guardado local automático para que nunca pierdas datos).*

---

## ✨ Características Incluidas

1. **Panel Creador Visual Autónomo (`/creador`)**:
   * No necesitas tocar código ni consolas: todo se edita directamente desde la web.
   * **Asistente IA**: Botón *"🪄 Autocompletar Landing con IA"* que genera titulares persuasivos, dolores, beneficios, combos y preguntas frecuentes con solo ingresar el nombre de tu producto.
   * **Carga Dual de Fotos**: Sube fotos arrastrándolas desde tu computador o pega enlaces directos de internet.
   * **Vista Previa en Vivo**: Previsualizador interactivo para alternar entre vista Móvil y Escritorio en tiempo real.

2. **Secciones de Alta Conversión Probadas para E-Commerce**:
   * Barra de urgencia superior con cuenta regresiva.
   * Hero de impacto con galería, precios de oferta y ahorro visible.
   * Ofertas Multi-pack (1 unidad, 2 unidades con descuento, 3 unidades).
   * Prueba social con testimonios y reseñas de clientes reales verificadas.
   * Preguntas frecuentes interactivas para derribar objeciones.
   * Botón de compra flotante en móviles (*Sticky CTA*).

3. **Checkout Rápido + WhatsApp Directo**:
   * Formulario directo para **Pago Contra Entrega** (Nombre, Celular, Ciudad, Dirección).
   * Al pulsar *"Confirmar Pedido"*, registra el lead en Supabase y abre inmediatamente el WhatsApp del vendedor con el pedido listo para despachar.
   * Pestaña de **Historial de Pedidos** en el panel para gestionar todos los clientes recibidos.

4. **Multi-Dominio y Meta Ads Ready**:
   * Campo para asignar dominios independientes a cada producto (ej. `misuperoferta.com`).
   * Campo para el código de **Verificación de Dominio de Meta**.
   * Campo para el **Pixel ID de Facebook/Instagram** (con eventos de PageView y Compra).
   * Páginas legales obligatorias para aprobación de anuncios:
     * `/politica-de-privacidad`
     * `/terminos-y-condiciones`
     * `/politicas-de-envio-y-devolucion`
     * Descargo de responsabilidad oficial de Meta en el pie de página.
