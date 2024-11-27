"use client";
import SecurityPage from "@/components/SecurityPage";
import Nav from "@/components/MarketingPage/Nav";
import Footer from "@/components/MarketingPage/Footer";
export default function Page() {
  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <Nav />
      <SecurityPage />
      <Footer />
    </div>
  );
}
