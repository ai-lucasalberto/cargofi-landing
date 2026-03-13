import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CargoFi — Documentación inteligente para cross-border México–USA",
  description:
    "Plataforma AI que captura, valida y organiza toda tu documentación aduanal antes de llegar a la frontera. Elimina errores, reduce tiempos, cruza con confianza.",
  openGraph: {
    title: "CargoFi — Documentación inteligente para cross-border México–USA",
    description:
      "Elimina el cuello de botella documental en tus operaciones de frontera. AI que trabaja para ti.",
    url: "https://cargofi.io",
    siteName: "CargoFi",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
