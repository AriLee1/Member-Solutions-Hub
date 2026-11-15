import { useState } from 'react'
import PageHead from '../components/ui/PageHead'
import Slider from '../components/ui/Slider'
import Segmented from '../components/ui/Segmented'
import { useApp } from '../hooks/useApp'
import { calcFunding } from '../utils/calculations'
import { fmt, pct } from '../utils/format'

const ADVANCE_SLIDERS = [
  { k: 'dividend', label: 'Capital stock dividend', min: 0, max: 10, step: 0.25, unit: '%' },
  { k: 'oppCost', label: 'Your opportunity cost on stock', min: 0, max: 8, step: 0.25, unit: '%', hint: 'What the stock dollars would earn elsewhere' },
]
const DEPOSIT_SLIDERS = [
  { k: 'promo', label: 'Promo rate offered', min: 2, max: 5.5, step: 0.05, unit: '%' },
  { k: 'oldRate', label: 'Current rate on existing deposits', min: 0, max: 4, step: 0.05, unit: '%' },
  { k: 'cannibal', label: 'Existing balances repriced per $1 new', min: 0, max: 2, step: 0.1, unit: 'x', hint: 'Existing customers moving into the special' },
]

export default function Funding() {
  const { mcf, setMcf, track } = useApp()
  const [amountText, setAmountText] = useState(String(mcf.amount)) // lets the box be empty while typing
  const { rows, best, worst } = calcFunding(mcf)
  const max = worst.all * 1.1
  const annual = (r) => (mcf.amount * r.all) / 100

  const change = (k, v) => {
    setMcf((m) => ({ ...m, [k]: v }))
    track('changes', k)
  }
  const sliders = (list) =>
    list.map((s) => <Slider key={s.k} id={`m-${s.k}`} {...s} value={mcf[s.k]} onChange={(v) => change(s.k, v)} />)

  return (
    <>
      <PageHead
        crumb
        title="Marginal Cost of Funds Analysis"
        desc="Compare what each funding source really costs per dollar of new money, including stock dividends, fees and the cost of repricing deposits you already have."
      />

      <div className="split">
        {/* Inputs */}
        <div className="card">
          <div className="field">
            <label htmlFor="m-amount">New funding needed ($M)</label>
            <input
              type="number" id="m-amount" min="1" step="1" value={amountText}
              onChange={(e) => {
                setAmountText(e.target.value)
                setMcf((m) => ({ ...m, amount: Math.max(1, +e.target.value || 1) }))
              }}
            />
          </div>
          <div className="field">
            <label>Term</label>
            <Segmented options={[1, 2, 3, 5]} active={mcf.term} onSelect={(t) => change('term', t)} renderLabel={(t) => `${t} yr`} style={{ margin: 0 }} />
          </div>
          <h3 style={{ margin: '8px 0 12px' }}>Advance assumptions</h3>
          {sliders(ADVANCE_SLIDERS)}
          <h3 style={{ margin: '8px 0 12px' }}>Deposit special assumptions</h3>
          {sliders(DEPOSIT_SLIDERS)}
        </div>

        {/* Results */}
        <div className="col">
          <div className="result">
            <div className="card stat stripe good">
              <span className="k">Lowest all-in cost</span>
              <span className="v num">{pct(best.all, 2)}</span>
              <span className="s">{best.name}</span>
            </div>
            <div className="card stat">
              <span className="k">Annual interest on {fmt(mcf.amount, 0)}</span>
              <span className="v num">${(annual(best) * 1000).toFixed(0)}K</span>
              <span className="s">At the lowest-cost option</span>
            </div>
            <div className="card stat">
              <span className="k">Savings vs. highest cost</span>
              <span className="v num">${((annual(worst) - annual(best)) * 1000).toFixed(0)}K/yr</span>
              <span className="s">Over a {mcf.term}-year term</span>
            </div>
          </div>

          <div className="card">
            <h3>All-in marginal cost by source</h3>
            <div className="list">
              {rows.map((r) => (
                <div key={r.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <b>{r.name}</b><b className="num">{pct(r.all, 2)}</b>
                  </div>
                  <div className="bar" style={{ margin: '8px 0 4px' }}>
                    <span style={{ width: `${(r.all / max) * 100}%`, ...(r === best ? {} : { background: '#d3dee8' }) }} />
                  </div>
                  <small style={{ color: 'var(--muted)' }}>{r.note}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Cost build-up</h3>
            <div className="tablewrap">
              <table>
                <tbody>
                  <tr><th>Source</th><th className="r">Quoted rate</th><th className="r">Adjustment</th><th className="r">All-in</th></tr>
                  {rows.map((r) => (
                    <tr key={r.name}>
                      <td>{r.name}</td>
                      <td className="r num">{pct(r.base, 2)}</td>
                      <td className="r num">{r.adj >= 0 ? '+' : '−'}{Math.abs(r.adj).toFixed(2)}%</td>
                      <td className="r num"><b>{pct(r.all, 2)}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="note">Illustrative rates for the prototype only, not a quote. Live rates would load from the daily rate sheet in the Future State.</div>
        </div>
      </div>
    </>
  )
}
