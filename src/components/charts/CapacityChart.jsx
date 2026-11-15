import { smoothPath } from '../../utils/format'

// Line chart of borrowing capacity used (%) by month, last point highlighted
export default function CapacityChart({ data, labels }) {
  const n = data.length
  const W = 300, H = 170
  const p = { l: 8, r: 8, t: 16, b: 30 }
  const min = Math.min(...data) - 8
  const max = Math.max(...data) + 8
  const x = (i) => p.l + (W - p.l - p.r) * (n === 1 ? 0.5 : i / (n - 1))
  const y = (v) => p.t + (H - p.t - p.b) * (1 - (v - min) / (max - min))
  const pts = data.map((v, i) => [x(i), y(v)])
  const line = smoothPath(pts)
  const hi = n - 1
  const step = n > 6 ? 2 : 1

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Capacity used by month">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#93B1CC" stopOpacity=".25" />
          <stop offset="1" stopColor="#93B1CC" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${x(n - 1)},${H - p.b} L${x(0)},${H - p.b}Z`} fill="url(#cg)" />
      <path d={line} fill="none" stroke="#003359" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={pts[hi][0]} x2={pts[hi][0]} y1={pts[hi][1]} y2={H - p.b + 2} stroke="#003359" strokeWidth="1.5" />
      <circle cx={pts[hi][0]} cy={pts[hi][1]} r="6" fill="#93B1CC" stroke="#fff" strokeWidth="3" />
      {labels.map((l, i) =>
        i === hi ? (
          <g key={l}>
            <rect x={x(i) - 18} y={H - 22} width="36" height="20" rx="10" fill="#057A94" />
            <text x={x(i)} y={H - 8} textAnchor="middle" style={{ fill: '#fff', fontWeight: 700 }}>{l}</text>
          </g>
        ) : i % step === hi % step ? (
          <text key={l} x={x(i)} y={H - 8} textAnchor="middle">{l}</text>
        ) : null,
      )}
    </svg>
  )
}
