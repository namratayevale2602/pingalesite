export default function LogoGlyph({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect x="2" y="34" width="10" height="22" rx="1.5" fill="var(--brand-2)" />
      <rect x="16" y="22" width="10" height="34" rx="1.5" fill="var(--brand)" />
      <rect x="30" y="6" width="14" height="50" rx="1.5" fill="var(--brand)" />
      <circle cx="44" cy="18" r="6.5" fill="var(--bg)" />
      <circle cx="44" cy="18" r="6.5" fill="none" stroke="var(--brand)" strokeWidth="3" />
    </svg>
  );
}
