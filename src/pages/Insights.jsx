import PageHead from '../components/ui/PageHead'
import { IconTile } from '../components/ui/Icon'
import { useApp } from '../hooks/useApp'
import { findTool } from '../data/tools'

// Sample 30-day baseline; live session activity is added on top
const BASE_SESSIONS = { liquidity: 186, 'funding-cost': 94, 'tool-letter-of-credit': 41, 'tool-funding-strategy': 33, 'tool-leverage': 22, 'tool-dividend': 18 }

const INPUT_LABELS = {
  runoff: 'Deposit runoff', haircut: 'Securities haircut', fhlbUse: 'Usable FHLBank capacity', draw: 'Commitment draws',
  dividend: 'Stock dividend', oppCost: 'Opportunity cost', promo: 'Promo rate', oldRate: 'Existing deposit rate',
  cannibal: 'Cannibalization', term: 'Term',
}

const OUTREACH = [
  { member: 'Prairie State Bank', signal: 'Ran the Severe liquidity scenario 6 times this week', action: 'Call about contingency funding', chip: 'warn' },
  { member: 'Flint Hills Credit Union', signal: 'Compared a deposit special to an advance 4 times', action: 'Share term advance pricing', chip: 'info' },
  { member: 'Heartland Mutual Insurance', signal: 'No logins in 45 days', action: 'Send re-engagement email', chip: 'muted' },
]

function Stat({ icon, color, k, v, s, stripe }) {
  return (
    <div className={`card stat${stripe ? ' stripe ' + stripe : ''}`}>
      <IconTile name={icon} color={color} />
      <span className="k">{k}</span>
      <span className="v num">{v}</span>
      <span className="s">{s}</span>
    </div>
  )
}

export default function Insights() {
  const { usage } = useApp()
  const rows = Object.entries(BASE_SESSIONS)
    .map(([id, v]) => ({ name: findTool(id).name, v: v + (usage.views[id] || 0) }))
    .sort((a, b) => b.v - a.v)
  const max = rows[0].v
  const changes = Object.entries(usage.changes).sort((a, b) => b[1] - a[1])
  const totalViews = Object.values(usage.views).reduce((a, b) => a + b, 0)

  return (
    <>
      <PageHead title="Usage insights" desc="What members use, which assumptions they explore and where they get stuck. Visible to Member Solutions business partners only.">
        <span className="chip info">Last 30 days · sample</span>
      </PageHead>

      <div className="grid g4">
        <Stat icon="home" color="teal" k="Active member institutions" v="47" s="of 112 invited" />
        <Stat icon="adv" color="blue" k="Tool sessions" v={394 + totalViews} s="+18% vs. prior 30 days" />
        <Stat icon="req" color="green" k="Analysis requests" v={23 + usage.requests} s="Median turnaround 3.5 days" />
        <Stat icon="drop" color="olive" k="Sessions abandoned" v="22%" s="Most at the haircut input" stripe="warn" />
      </div>

      <div className="grid g2">
        <div className="card">
          <h3>Sessions by tool</h3>
          <div className="list">
            {rows.map((r) => (
              <div key={r.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span>{r.name}</span><b className="num">{r.v}</b>
                </div>
                <div className="bar" style={{ marginTop: 6 }}><span style={{ width: `${(r.v / max) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Assumptions changed in this session</h3>
          {changes.length ? (
            <div className="tablewrap">
              <table>
                <tbody>
                  <tr><th>Input</th><th className="r">Changes</th></tr>
                  {changes.map(([k, v]) => (
                    <tr key={k}><td>{INPUT_LABELS[k] || k}</td><td className="r num"><b>{v}</b></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="note">Switch to Member view, open a tool and move a slider. Each change is counted here live, showing how the Future State platform would capture member behavior.</p>
          )}
          <h3 style={{ margin: '18px 0 8px' }}>Scenario choices (this session)</h3>
          <div className="legend">
            {Object.entries(usage.scenarios).map(([k, v]) => (
              <span key={k}>{k}: <b className="num" style={{ color: 'var(--ink)' }}>{v}</b></span>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Outreach signals</h3>
        <div className="tablewrap">
          <table>
            <tbody>
              <tr><th>Member</th><th>Signal</th><th>Suggested action</th></tr>
              {OUTREACH.map((o) => (
                <tr key={o.member}>
                  <td><b>{o.member}</b></td>
                  <td>{o.signal}</td>
                  <td><span className={`chip ${o.chip}`}>{o.action}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
