import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ["about", "projects", "skills", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          const matchedLink = navLinks.find(
            (l) => l.href === `#${sectionIds[i]}`
          );
          if (matchedLink) {
            setActive(matchedLink.label);
            break;
          }
        }
      }
      if (window.scrollY < 120) {
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo & Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center group-hover:border-sky-400/60 transition-colors">
            <span className="font-display font-extrabold text-sm gradient-text">NR</span>
          </div>
          <span className="font-display font-bold text-slate-200 group-hover:text-white text-base transition-colors hidden sm:block">
            niranjan.dev
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-full border border-slate-800/60">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full ${
                active === link.label
                  ? "bg-sky-500/15 text-sky-400 border border-sky-400/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Resume Button */}
        <div className="hidden md:flex items-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-1.5"
          >
            <span>Resume</span>
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-current transition-all transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`h-0.5 w-full bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-current transition-all transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Nav Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#090d16] border-b border-slate-800 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActive(link.label);
                setMenuOpen(false);
              }}
              className={`text-sm py-2 px-3 rounded-lg font-medium transition-colors ${
                active === link.label
                  ? "bg-sky-500/15 text-sky-400 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-outline text-sm py-2 text-center mt-2"
          >
            Resume ↗
          </a>
        </div>
      )}
    </header>
  );
}
