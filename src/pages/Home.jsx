import { Link } from 'react-router-dom'
import { IconTile } from '../components/ui/Icon'
import CapacityChart from '../components/charts/CapacityChart'
import Donut from '../components/charts/Donut'
import { useApp } from '../hooks/useApp'
import { MONTHS } from '../data/members'
import { fmt, requestChip } from '../utils/format'

const RANGES = { Quarter: 3, Half: 6, Year: 12 }

const RECENT_ACTIVITY = [
  { icon: 'adv', color: 'teal', title: 'Fixed-rate advance, 3-yr', date: 'Nov 6, 2026', amt: '+$10.0M', dir: 'up' },
  { icon: 'adv', color: 'blue', title: 'Advance maturity', date: 'Oct 28, 2026', amt: '−$5.0M', dir: 'down' },
  { icon: 'col', color: 'green', title: 'Collateral update', date: 'Oct 15, 2026', amt: '+$12.4M', dir: 'neutral' },
]

function Stat({ icon, color, k, v, s }) {
  return (
    <div className="card stat">
      <IconTile name={icon} color={color} />
      <span className="k">{k}</span>
      <span className="v num">{v}</span>
      <span className="s">{s}</span>
    </div>
  )
}

export default function Home() {
  const { member: m, requests, chartRange, setChartRange } = useApp()
  const avail = m.fhlbCap - m.advances
  const used = (m.advances / m.fhlbCap) * 100
  const colUse = Math.round((m.advances / m.collateral) * 100)

  const n = RANGES[chartRange]
  const chartData = m.hist.slice(-n)
  const chartLabels = MONTHS.slice(-n)

  return (
    <div className="home">
      <div className="col">
        <div className="grid g3">
          <Stat icon="cap" color="teal" k="Remaining borrowing capacity" v={fmt(avail)} s={`of ${fmt(m.fhlbCap)} total`} />
          <Stat icon="adv" color="blue" k="Outstanding advances" v={fmt(m.advances)} s="Wtd. avg. rate 4.21%" />
          <Stat icon="stock" color="green" k="Capital stock held" v={fmt(m.stock)} s="Last dividend 7.50%" />
        </div>

        <div className="card feature">
          <div>
            <h2>Make liquidity decisions faster</h2>
            <p>Run a stress test on your own balance sheet in minutes, using data from your latest call report. No report request needed.</p>
            <Link className="btn" to="/tools/liquidity">Run stress test</Link>
          </div>
          <div className="capcard">
            <div className="top"><span>FHLBank borrowing capacity</span><span>Q3 2026</span></div>
            <div className="big num">{fmt(avail)} available</div>
            <div className="meter"><span style={{ width: `${used.toFixed(0)}%` }} /></div>
            <div className="bot"><span>{m.name}</span><span>{used.toFixed(0)}% used · ID {m.id}</span></div>
          </div>
        </div>

        <div className="grid g2">
          <div className="card">
            <h3>Recent activity</h3>
            <div className="list">
              {RECENT_ACTIVITY.map((a) => (
                <div className="li" key={a.title}>
                  <IconTile name={a.icon} color={a.color} />
                  <div className="t"><b>{a.title}</b><small>{a.date}</small></div>
                  <span className={`amt ${a.dir} num`}>{a.amt}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>My requests</h3>
            <div className="list">
              {requests.slice(0, 3).map((r) => (
                <div className="li" key={r.id}>
                  <IconTile name="doc" color="olive" />
                  <div className="t"><b>{r.tool}</b><small>{r.id} · {r.date}</small></div>
                  <span className={`chip ${requestChip(r.status)}`}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col right">
        <div className="card chartcard">
          <div className="lbl">Borrowing capacity used</div>
          <div className="big num">{chartData[chartData.length - 1]}%</div>
          <div className="tabs">
            {Object.keys(RANGES).map((t) => (
              <button key={t} className={chartRange === t ? 'on' : ''} onClick={() => setChartRange(t)}>{t}</button>
            ))}
          </div>
          <CapacityChart data={chartData} labels={chartLabels} />
        </div>
        <div className="donutcard">
          <div>
            <small>Collateral utilization</small>
            <b>{fmt(m.advances, 0)} borrowed<br />against {fmt(m.collateral, 0)}</b>
            <p>Lendable collateral value</p>
          </div>
          <Donut value={colUse} />
        </div>
      </div>
    </div>
  )
}
