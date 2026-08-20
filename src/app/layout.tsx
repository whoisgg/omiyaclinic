import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Loader } from "@/components/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// Serif japonesa del verso del hero. Va sin preload a propósito: el subset
// japonés pesa mucho más que una latina y precargarlo competiría con el LCP.
// Con `swap` el verso se compone primero con la mincho del sistema.
const shippori = Shippori_Mincho({
  variable: "--font-jp",
  // El subset japonés es imprescindible: con solo "latin" la webfont no trae
  // los kanji y el verso caía al mincho del sistema sin avisar. Google sirve
  // el subset partido por unicode-range, así que el navegador baja únicamente
  // el trozo con los caracteres del verso (4 de 245 @font-face), no la fuente
  // japonesa completa.
  //
  // El cast es necesario porque next/font tipa esta familia solo con
  // "latin" | "latin-ext", pero en runtime acepta "japanese" y emite las
  // declaraciones correctas. Es un tipo más estrecho que la API real.
  subsets: ["latin", "japanese"] as unknown as ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
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
      className={`${geistSans.variable} ${cormorant.variable} ${shippori.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* The loader overlay is server-rendered, so without this it would
            flash black on every reload before React unmounts it. Runs before
            first paint; the CSS rule lives in globals.css. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("omiya-loader-shown")){document.documentElement.setAttribute("data-loader-done","");document.documentElement.setAttribute("data-hero-reveal","")}}catch(e){}`,
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
