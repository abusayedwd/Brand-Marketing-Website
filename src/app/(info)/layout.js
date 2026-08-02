import Navbar from "@/components/pages/Navbar";
import Footer from "@/components/pages/Footer";

export default function InfoLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4f8f6]">{children}</main>
      <Footer />
    </>
  );
}
