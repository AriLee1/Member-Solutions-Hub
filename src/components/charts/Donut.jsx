// Ring chart showing a single percentage
export default function Donut({ value }) {
  const r = 38
  const c = 2 * Math.PI * r
  return (
    <svg className="donut" width="100" height="100" viewBox="0 0 100 100" role="img" aria-label={`${value}% collateral used`}>
      <defs>
        <linearGradient id="dg" x1="0" x2="1">
          <stop offset="0" stopColor="#93B1CC" />
          <stop offset="1" stopColor="#d6e3ef" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="12" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="url(#dg)" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={`${(c * value) / 100} ${c}`} transform="rotate(-90 50 50)" />
      <text x="50" y="56" textAnchor="middle">{value}%</text>
    </svg>
  )
}
