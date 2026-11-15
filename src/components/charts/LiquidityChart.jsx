import { smoothPath } from '../../utils/format'

// Cumulative stressed outflows (line) vs. available sources (dashed) over 12 months
export default function LiquidityChart({ path, sources }) {
  const W = 640, H = 240
  const p = { l: 52, r: 18, t: 16, b: 28 }
  const max = Math.max(sources, path[11]) * 1.15
  const x = (i) => p.l + ((W - p.l - p.r) * i) / 11
  const y = (v) => H - p.b - ((H - p.t - p.b) * v) / max
  const line = smoothPath(path.map((v, i) => [x(i), y(v)]))
  const last = path[11]

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Cumulative outflows against available sources by month">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#93B1CC" stopOpacity=".28" />
          <stop offset="1" stopColor="#93B1CC" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => {
        const v = max * f
        return (
          <g key={f}>
            <line x1={p.l} x2={W - p.r} y1={y(v)} y2={y(v)} stroke="#e6edf3" />
            <text x={p.l - 8} y={y(v) + 4} textAnchor="end">${v.toFixed(0)}M</text>
          </g>
        )
      })}
      {[0, 2, 5, 8, 11].map((i) => (
        <text key={i} x={x(i)} y={H - 8} textAnchor="middle">Month {i + 1}</text>
      ))}
      <path d={`${line} L${x(11)},${y(0)} L${x(0)},${y(0)}Z`} fill="url(#lg)" />
      <path d={line} fill="none" stroke="#003359" strokeWidth="2.5" />
      <line x1={p.l} x2={W - p.r} y1={y(sources)} y2={y(sources)} stroke="#057A94" strokeWidth="2" strokeDasharray="6 5" />
      <circle cx={x(11)} cy={y(last)} r="6" fill="#93B1CC" stroke="#fff" strokeWidth="3" />
      <text x={x(11) - 10} y={y(last) - 12} textAnchor="end" style={{ fill: '#003359', fontWeight: 800 }}>${last.toFixed(0)}M</text>
    </svg>
  )
}
