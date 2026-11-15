import PageHead from '../components/ui/PageHead'
import { IconTile } from '../components/ui/Icon'
import { useApp } from '../hooks/useApp'

const FAQ = [
  ['Where does the starting data come from?', 'Starting balances use your most recent quarterly call report. In this first-generation release Member Solutions refreshes the data each quarter.'],
  ['Can I save my scenarios?', 'Not yet. Saved scenarios are planned for the Future State platform. For now, request an analysis and we will keep a record of your assumptions.'],
  ['Are the rates shown live quotes?', 'No. Rates in self-service tools are illustrative. Contact your account manager for executable pricing.'],
  ['Who can see my results?', 'Only users at your institution. Member Solutions may see aggregated usage to improve the tools.'],
  ['What if a tool I need is not here?', 'Use My requests to ask for any analysis. ROAE and Peer Comparison remain available as prepared reports.'],
]

const GUIDES = [
  { color: 'teal', icon: 'drop', title: 'Getting started', desc: 'A 3-minute walkthrough of the Hub and its tools.' },
  { color: 'blue', icon: 'adv', title: 'Liquidity stress testing', desc: 'Choosing runoff and haircut assumptions that fit your risk profile.' },
  { color: 'green', icon: 'cap', title: 'Marginal cost of funds', desc: 'Why a deposit special can cost more than its posted rate.' },
]

export default function Resources() {
  const { openModal } = useApp()
  const openGuide = () =>
    openModal('Guide', <p>Guide content goes here. This is where the step-by-step instructions and examples from the Phase 2 documentation will live.</p>)

  return (
    <>
      <PageHead title="Guides & FAQ" desc="How to use the self-service tools and when to ask Member Solutions for help." />

      <div className="grid g3">
        {GUIDES.map((g) => (
          <div className="card stat" key={g.title}>
            <IconTile name={g.icon} color={g.color} />
            <h3>{g.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 10 }}>{g.desc}</p>
            <button className="btn small ghost" style={{ alignSelf: 'flex-start' }} onClick={openGuide}>Open guide</button>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Frequently asked questions</h3>
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </>
  )
}
