// Liquidity stress scenarios (percentages)
export const SCENARIOS = {
  Base: { runoff: 5, haircut: 5, fhlbUse: 90, draw: 20 },
  Moderate: { runoff: 12, haircut: 10, fhlbUse: 80, draw: 40 },
  Severe: { runoff: 22, haircut: 18, fhlbUse: 70, draw: 60 },
}
export const DEFAULT_LIQ = { scenario: 'Moderate', ...SCENARIOS.Moderate }

// Illustrative rates by term (years). Not quotes.
export const RATES = {
  1: { adv: 4.35, cd: 4.45 },
  2: { adv: 4.2, cd: 4.3 },
  3: { adv: 4.15, cd: 4.25 },
  5: { adv: 4.25, cd: 4.35 },
}
export const DEFAULT_MCF = {
  amount: 25, term: 3, stockPct: 4.5, dividend: 7.5, oppCost: 4.0,
  promo: 4.0, oldRate: 2.25, cannibal: 0.6, cdFee: 0.25,
}
