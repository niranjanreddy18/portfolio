import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-[#090d16] text-slate-100 min-h-screen overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
