import { useMagnetic } from "../../hooks/useMagnetic";

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  ...props
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(8);

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref}
      className={`magnetic-btn ${className}`}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
