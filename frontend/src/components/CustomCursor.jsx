import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    // Only enable custom cursor for precision pointer devices (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasPointer(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    let raf;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handlePointerOver = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        if (ringRef.current) ringRef.current.style.transform += " scale(1.6)";
        if (ringRef.current) ringRef.current.style.borderColor = "rgba(110, 231, 247, 0.8)";
      } else {
        if (ringRef.current) ringRef.current.style.borderColor = "rgba(110, 231, 247, 0.4)";
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", handlePointerOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", handlePointerOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!hasPointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          transition: "border-color 0.2s ease",
        }}
      />
    </>
  );
}
