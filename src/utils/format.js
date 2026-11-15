export const fmt = (n, d = 1) => '$' + n.toFixed(d) + 'M'
export const pct = (n, d = 1) => n.toFixed(d) + '%'

// CSS class for a request status chip
export const requestChip = (status) =>
  status === 'Delivered' ? 'good' : status === 'In progress' ? 'warn' : 'info'

// Smooth SVG line path through [x, y] points
export function smoothPath(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i]
    const [x1, y1] = pts[i + 1]
    const cx = (x0 + x1) / 2
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`
  }
  return d
}
