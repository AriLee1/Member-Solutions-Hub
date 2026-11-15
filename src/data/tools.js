// Tool catalogue shown in the Tool library.
// status: "live" = self-service tool, "soon" = in development, "report" = prepared on request
export const TOOLS = [
  { id: 'liquidity', prio: 1, name: 'Liquidity Stress Analysis', cat: 'Liquidity', status: 'live', desc: 'Test how deposit outflows and market haircuts affect your liquidity sources over 12 months.' },
  { id: 'tool-letter-of-credit', prio: 2, name: 'Letter of Credit Utilization Strategies', cat: 'Funding', status: 'soon', desc: 'Compare letters of credit to pledging securities for public-unit deposit collateral.' },
  { id: 'tool-funding-strategy', prio: 3, name: 'Funding Strategy Illustrations', cat: 'Funding', status: 'soon', desc: 'Illustrate ladders, amortizing and callable structures against your balance sheet.' },
  { id: 'tool-leverage', prio: 4, name: 'Leverage / Pre-funding Strategy', cat: 'Strategy', status: 'soon', desc: 'Model the earnings impact of pre-funding maturities or leveraging capital.' },
  { id: 'tool-dividend', prio: 5, name: 'Dividend Analysis', cat: 'Earnings', status: 'soon', desc: 'Estimate the net cost of borrowing after FHLBank capital stock dividends.' },
  { id: 'funding-cost', prio: 6, name: 'Marginal Cost of Funds Analysis', cat: 'Funding', status: 'live', desc: 'Compare the true all-in cost of new money across advances, brokered CDs and deposit specials.' },
  { id: 'tool-roae', prio: null, name: 'ROAE Analysis', cat: 'Earnings', status: 'report', desc: 'Return on average equity decomposition, prepared by Member Solutions on request.' },
  { id: 'tool-peer', prio: null, name: 'Peer Comparison Analysis', cat: 'Strategy', status: 'report', desc: 'Benchmark against a peer group from call report data, prepared on request.' },
]

export const STATUS = {
  live: ['Available', 'good'],
  soon: ['In development', 'warn'],
  report: ['Report on request', 'muted'],
}

export const isTool = (id) => TOOLS.some((t) => t.id === id)
export const findTool = (id) => TOOLS.find((t) => t.id === id)
