import "./globals.css";
import type { Metadata } from "next";
import { AwakenProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "VRIDDHI — Growth beyond marks",
  description: "Making student growth visible beyond marks. Inspired by Swami Vivekananda's philosophy of education.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AwakenProvider>{children}</AwakenProvider>
      </body>
    </html>
  );
}
