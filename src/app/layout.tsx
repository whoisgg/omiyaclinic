import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Loader } from "@/components/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Omiya Clinic — Premium well-aging",
  description: "Tratamientos personalizados de well-aging en Machalí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* The loader overlay is server-rendered, so without this it would
            flash black on every reload before React unmounts it. Runs before
            first paint; the CSS rule lives in globals.css. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("omiya-loader-shown"))document.documentElement.setAttribute("data-loader-done","")}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans text-zinc-900">
        <Loader />
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
