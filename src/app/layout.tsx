import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creador de Landing Pages de Alta Conversión",
  description: "Plataforma para generar landing pages de venta directa con pago contra entrega y Meta Ads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
