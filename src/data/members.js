// Sample member institutions (amounts in $M). Replace with API data later.
export const MEMBERS = [
  {
    name: 'Prairie State Bank', short: 'PS', type: 'Commercial bank', id: '40217',
    assets: 1240, deposits: 850, cash: 45, secs: 180, fhlbCap: 210, otherLines: 60,
    unfunded: 40, advances: 145, collateral: 395, stock: 8.1,
    hist: [38, 42, 47, 44, 52, 58, 55, 61, 66, 63, 69, 69],
  },
  {
    name: 'Flint Hills Credit Union', short: 'FH', type: 'Credit union', id: '51883',
    assets: 620, deposits: 540, cash: 28, secs: 95, fhlbCap: 120, otherLines: 25,
    unfunded: 18, advances: 60, collateral: 185, stock: 3.4,
    hist: [22, 25, 31, 28, 35, 39, 42, 40, 46, 49, 48, 50],
  },
  {
    name: 'Heartland Mutual Insurance', short: 'HM', type: 'Insurance company', id: '60412',
    assets: 2900, deposits: 0, cash: 120, secs: 1650, fhlbCap: 480, otherLines: 150,
    unfunded: 0, advances: 300, collateral: 780, stock: 16.2,
    hist: [55, 52, 58, 61, 57, 60, 64, 62, 59, 63, 61, 63],
  },
]

export const MONTHS = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']

export const INITIAL_REQUESTS = [
  { id: 'MS-1042', tool: 'Peer Comparison Analysis', date: '2026-11-03', status: 'Delivered' },
  { id: 'MS-1057', tool: 'ROAE Analysis', date: '2026-11-10', status: 'In progress' },
]
