import { RATES } from '../data/assumptions'

// Liquidity stress: sources vs. stressed uses over 12 months
export function calcLiquidity(m, liq) {
  const src = {
    cash: m.cash,
    secs: m.secs * (1 - liq.haircut / 100),
    fhlb: ((m.fhlbCap - m.advances) * liq.fhlbUse) / 100,
    other: m.otherLines,
  }
  const sources = src.cash + src.secs + src.fhlb + src.other
  const base = m.deposits > 0 ? m.deposits : m.assets * 0.35
  const uses = { runoff: (base * liq.runoff) / 100, draws: (m.unfunded * liq.draw) / 100 }
  const totalUses = uses.runoff + uses.draws
  const w = [...Array(12)].map((_, i) => Math.pow(0.82, i))
  const ws = w.reduce((a, b) => a + b, 0)
  let cum = 0
  const path = w.map((v) => (cum += (totalUses * v) / ws))
  return {
    src, sources, uses, totalUses, path,
    coverage: sources / totalUses,
    breach: path.findIndex((v) => v > sources),
    baseLabel: m.deposits > 0 ? 'deposits' : 'policy liabilities',
  }
}

// Marginal cost of funds: all-in cost per source
export function calcFunding(mcf) {
  const R = RATES[mcf.term]
  const stockCost = (mcf.stockPct / 100) * (mcf.oppCost - mcf.dividend)
  const rows = [
    { name: `FHLBank fixed-rate advance, ${mcf.term}-yr`, base: R.adv, adj: stockCost, note: 'Net of capital stock dividend' },
    { name: `Brokered CD, ${mcf.term}-yr`, base: R.cd, adj: mcf.cdFee / mcf.term, note: 'Placement fee amortized over term' },
    { name: 'Deposit special (promo rate)', base: mcf.promo, adj: mcf.cannibal * (mcf.promo - mcf.oldRate), note: 'Includes repricing of existing balances' },
  ].map((r) => ({ ...r, all: r.base + r.adj }))
  return {
    rows,
    best: rows.reduce((a, b) => (a.all < b.all ? a : b)),
    worst: rows.reduce((a, b) => (a.all > b.all ? a : b)),
  }
}
