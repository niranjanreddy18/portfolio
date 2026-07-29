import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    let raf;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => { if (ringRef.current) ringRef.current.style.scale = "2"; };
    const onLeave = () => { if (ringRef.current) ringRef.current.style.scale = "1"; };
    const links = document.querySelectorAll("a, button");
    links.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999 }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99998, transition: 'scale 0.2s ease' }} />
    </>
  );
}
