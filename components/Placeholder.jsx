export default function Placeholder({ label, aspect = "16 / 9", style }) {
  return (
    <div className="placeholder" style={{ aspectRatio: aspect, ...style }}>
      <span>{label}</span>
    </div>
  );
}
