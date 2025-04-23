import Navbar from "@/components/pages/Navbar";
import Footer from "@/components/pages/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}