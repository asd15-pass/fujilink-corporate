export function ReasonIcon({ index, color, size }: { index: number; color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="#1b3d5f" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {index === 0 && (
        <>
          <path d="M17 14C28 14 30 32 40 32M17 32H40M17 50C28 50 30 32 40 32" />
          <circle cx="12" cy="14" r="5" fill="#fff" />
          <circle cx="12" cy="32" r="5" fill="#fff" />
          <circle cx="12" cy="50" r="5" fill="#fff" />
          <circle cx="46" cy="32" r="12" fill={color} />
          <path d="M40.5 32.5l4 4 7-8" stroke="#fff" strokeWidth={3} />
        </>
      )}
      {index === 1 && (
        <>
          <path d="M5 55H59" />
          <rect x="9" y="38" width="17" height="17" fill="#fff" />
          <path d="M7 38l3-6h15l3 6z" fill={color} />
          <path d="M15 55v-8h5v8" />
          <rect x="34" y="10" width="22" height="45" fill={color} />
          <path d="M40 18h3M47 18h3M40 26h3M47 26h3M40 34h3M47 34h3M40 42h3M47 42h3" stroke="#fff" />
        </>
      )}
      {index === 2 && (
        <>
          <path d="M32 12a14 14 0 0 0-8.5 25.1c1.6 1.3 2.5 3 2.5 4.9V44h12v-2c0-1.9.9-3.6 2.5-4.9A14 14 0 0 0 32 12z" fill={color} />
          <path d="M26 50h12M28 56h8" />
          <path d="M32 2v4M12 12l3 3M52 12l-3 3M5 30h4M55 30h4" />
          <path d="M27 27l4 4 6-7" stroke="#fff" strokeWidth={3} />
        </>
      )}
    </svg>
  );
}
