import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg glass-strong flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-all">
            <span className="font-display font-black text-sm gradient-text">NR</span>
          </div>
          <span className="font-display font-bold text-white/80 group-hover:text-white transition-colors hidden sm:block">
            niranjan.dev
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`relative px-4 py-2 font-mono text-sm transition-all duration-200 rounded-md group ${
                active === link.label
                  ? "text-cyan-400"
                  : "text-white/50 hover:text-white/90"
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 rounded-md bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {active === link.label && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* TODO: Add your resume PDF to frontend/public/resume.pdf */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-outline text-sm py-2 px-5"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden glass-strong p-2 rounded-lg border border-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className={`w-5 flex flex-col gap-1 transition-all ${menuOpen ? "gap-0" : ""}`}>
            <span className={`h-px bg-white/70 transition-all ${menuOpen ? "rotate-45 translate-y-px" : ""}`} />
            <span className={`h-px bg-white/70 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-white/70 transition-all ${menuOpen ? "-rotate-45 -translate-y-px" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => { setActive(link.label); setMenuOpen(false); }}
              className="font-mono text-sm text-white/60 hover:text-white py-2 border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a href="/resume.pdf" className="btn-outline text-sm py-2 text-center mt-2">Resume ↗</a>
        </div>
      )}
    </header>
  );
}
