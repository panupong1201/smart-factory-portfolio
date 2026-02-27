import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";       // ย้ายมาต่อจาก Hero เพื่อแนะนำตัวก่อน
import Skills from "@/components/Skills";     // โชว์สกิลต่อจาก About
import Timeline from "@/components/Timeline"; // เล่าเส้นทางอาชีพ
import Projects from "@/components/Projects"; // โชว์ผลงาน (Highlights)
import Certificates from "@/components/Certificates"; // โชว์ใบเซอร์ปิดท้ายความน่าเชื่อถือ
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      
      {/* ส่วนแนะนำตัวตน */}
      <About />
      <Skills />
      
      {/* ส่วนเส้นทางและผลงาน */}
      <Timeline />
      <Projects />
      
      {/* ส่วนความสำเร็จและการติดต่อ */}
      <Certificates />
      <Contact />
      
      <Footer />
    </main>
  );
}