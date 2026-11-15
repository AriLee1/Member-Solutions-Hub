import { Link } from 'react-router-dom'
import PageHead from '../components/ui/PageHead'
import Slider from '../components/ui/Slider'
import Segmented from '../components/ui/Segmented'
import LiquidityChart from '../components/charts/LiquidityChart'
import { useApp } from '../hooks/useApp'
import { SCENARIOS, DEFAULT_LIQ } from '../data/assumptions'
import { calcLiquidity } from '../utils/calculations'
import { fmt } from '../utils/format'

const SLIDERS = [
  { k: 'runoff', label: 'Deposit runoff over 12 months', min: 0, max: 40, step: 1, hint: 'Share of deposits that leave the institution' },
  { k: 'haircut', label: 'Securities market-value haircut', min: 0, max: 30, step: 1, hint: 'Discount applied when selling or pledging securities' },
  { k: 'fhlbUse', label: 'Usable remaining FHLBank capacity', min: 40, max: 100, step: 5, hint: 'Capacity you expect to draw under stress' },
  { k: 'draw', label: 'Unfunded commitment draws', min: 0, max: 100, step: 5, hint: 'Share of unfunded loan commitments drawn' },
]
const COVERAGE = { good: 'Well covered', warn: 'Thin coverage', bad: 'Shortfall' }

export default function Liquidity() {
  const { member, liq, setLiq, track, countScenario, toast, setPendingTool } = useApp()
  const r = calcLiquidity(member, liq)
  const cls = r.coverage >= 1.5 ? 'good' : r.coverage >= 1 ? 'warn' : 'bad'

  const pickScenario = (s) => {
    setLiq({ scenario: s, ...SCENARIOS[s] })
    countScenario(s)
  }
  const changeInput = (k, v) => {
    setLiq((l) => ({ ...l, [k]: v, scenario: 'Custom' }))
    track('changes', k)
  }
  const reset = () => {
    setLiq(DEFAULT_LIQ)
    toast('Assumptions reset to Moderate')
  }

  return (
    <>
      <PageHead
        crumb
        title="Liquidity Stress Analysis"
        desc="Starting balances come from your 9/30/2026 call report. Adjust the assumptions to see whether your liquidity sources cover stressed outflows over the next 12 months."
      >
        <button className="btn ghost" onClick={reset}>Reset assumptions</button>
      </PageHead>

      <div className="split">
        {/* Inputs */}
        <div className="card">
          <h3>Scenario</h3>
          <div style={{ height: 10 }} />
          <Segmented options={Object.keys(SCENARIOS)} active={liq.scenario} onSelect={pickScenario} />
          {SLIDERS.map((s) => (
            <Slider key={s.k} id={`l-${s.k}`} {...s} unit="%" value={liq[s.k]} onChange={(v) => changeInput(s.k, v)} />
          ))}
          <div className="note">Scenario: <b>{liq.scenario}</b>. Moving a slider switches to a custom scenario.</div>
        </div>

        {/* Results */}
        <div className="col">
          <div className="result">
            <div className={`card stat stripe ${cls}`}>
              <span className="k">Coverage ratio</span>
              <span className="v num">{r.coverage.toFixed(2)}x</span>
              <span className={`chip ${cls}`} style={{ alignSelf: 'flex-start' }}>{COVERAGE[cls]}</span>
            </div>
            <div className="card stat">
              <span className="k">Available liquidity sources</span>
              <span className="v num">{fmt(r.sources)}</span>
              <span className="s">After haircuts</span>
            </div>
            <div className="card stat">
              <span className="k">Stressed outflows (12 mo)</span>
              <span className="v num">{fmt(r.totalUses)}</span>
              <span className="s">{r.breach < 0 ? 'Sources last all 12 months' : 'Sources run out in month ' + (r.breach + 1)}</span>
            </div>
          </div>

          <div className="card">
            <div className="head" style={{ marginBottom: 10 }}>
              <h3>Cumulative outflows vs. available sources</h3>
              <div className="legend">
                <span><i style={{ background: '#003359' }} />Cumulative outflows</span>
                <span><i style={{ background: '#057A94' }} />Available sources</span>
              </div>
            </div>
            <LiquidityChart path={r.path} sources={r.sources} />
          </div>

          <div className="card">
            <h3>Sources and uses</h3>
            <div className="tablewrap">
              <table>
                <tbody>
                  <tr><th>Liquidity sources</th><th className="r">Amount</th></tr>
                  <tr><td>Cash and equivalents</td><td className="r num">{fmt(r.src.cash)}</td></tr>
                  <tr><td>Unencumbered securities, after {liq.haircut}% haircut</td><td className="r num">{fmt(r.src.secs)}</td></tr>
                  <tr><td>FHLBank remaining capacity, {liq.fhlbUse}% usable</td><td className="r num">{fmt(r.src.fhlb)}</td></tr>
                  <tr><td>Other lines (Fed discount window, correspondent)</td><td className="r num">{fmt(r.src.other)}</td></tr>
                  <tr className="total"><td>Total sources</td><td className="r num">{fmt(r.sources)}</td></tr>
                  <tr className="sec"><th>Stressed uses</th><th className="r">Amount</th></tr>
                  <tr><td>Runoff of {liq.runoff}% of {r.baseLabel}</td><td className="r num">{fmt(r.uses.runoff)}</td></tr>
                  <tr><td>Unfunded commitment draws at {liq.draw}%</td><td className="r num">{fmt(r.uses.draws)}</td></tr>
                  <tr className="total"><td>Total uses</td><td className="r num">{fmt(r.totalUses)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="callout">
            <p>Want Member Solutions to review these results or run a custom scenario?</p>
            <Link className="btn" to="/requests" onClick={() => setPendingTool('Liquidity Stress Analysis')}>Request deeper analysis</Link>
          </div>
        </div>
      </div>
    </>
  )
}
