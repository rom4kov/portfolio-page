import { useState, useEffect } from "react";

const GlowCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: mousePosition.y - 550, // Adjust for center alignment
        left: mousePosition.x - 550, // Adjust for center alignment
        width: "70rem", // Width of the glow effect
        height: "70rem", // Height of the glow effect
        pointerEvents: "none", // Ensure it doesn't block interactions
        // mask: `radial-gradient(55rem 55rem at ${mousePosition.x - 450}px ${mousePosition.y - 450}px, var(--glow-color) 1%, transparent 70%)`,
        background: "radial-gradient(circle, var(--glow-color) 20%, rgba(255, 255, 255, 0.05) 40%, rgba(255, 255, 255, 0) 60%",
        // transition: "200ms top, 200ms left",
        opacity: 0.4,
        borderRadius: "50%", // Make it circular
        zIndex: 9999, // Ensure it stays on top
      }}
    />
  );
};

export default GlowCursor;

