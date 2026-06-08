import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Estetica Pro",
  description:
    "Painel operacional para clinicas de estetica com foco em agenda, clientes, pacotes e retornos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
