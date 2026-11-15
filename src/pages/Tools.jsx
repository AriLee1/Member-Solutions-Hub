import { Link } from 'react-router-dom'
import PageHead from '../components/ui/PageHead'
import { useApp } from '../hooks/useApp'
import { TOOLS, STATUS } from '../data/tools'

const CATEGORIES = ['All', ...new Set(TOOLS.map((t) => t.cat))]

function ToolCard({ tool, onRequest }) {
  const [label, chipClass] = STATUS[tool.status]
  return (
    <div className={`card toolcard${tool.status === 'live' ? ' live' : ''}`}>
      <div className="row">
        <span className={`chip ${chipClass}`}>{label}</span>
        <span className="prio">{tool.prio ? 'PRIORITY ' + tool.prio : 'REPORT'}</span>
      </div>
      <h3>{tool.name}</h3>
      <p>{tool.desc}</p>
      <div className="row">
        <span className="prio" style={{ fontWeight: 600 }}>{tool.cat}</span>
        {tool.status === 'live' ? (
          <Link className="btn small" to={`/tools/${tool.id}`}>Open tool</Link>
        ) : tool.status === 'report' ? (
          <Link className="btn small ghost" to="/requests" onClick={() => onRequest(tool.name)}>Request report</Link>
        ) : (
          <Link className="btn small ghost" to={`/tools/${tool.id}`}>Preview</Link>
        )}
      </div>
    </div>
  )
}

export default function Tools() {
  const { search, setSearch, toolFilter, setToolFilter, setPendingTool } = useApp()
  const q = search.toLowerCase()
  const list = TOOLS.filter(
    (t) =>
      (toolFilter === 'All' || t.cat === toolFilter) &&
      (!q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)),
  )

  return (
    <>
      <PageHead title="Tool library" desc="Self-service tools you can run any time, plus analyses Member Solutions prepares for you on request.">
        {q && (
          <span className="chip info">
            Search: “{search}” ·{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setSearch('') }}>clear</a>
          </span>
        )}
      </PageHead>

      <div className="filters">
        {CATEGORIES.map((c) => (
          <button key={c} className={c === toolFilter ? 'on' : ''} onClick={() => setToolFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="grid g3">
        {list.length ? (
          list.map((t) => <ToolCard key={t.id} tool={t} onRequest={setPendingTool} />)
        ) : (
          <div className="note">No tools match your search. Try “liquidity” or “funding”.</div>
        )}
      </div>
    </>
  )
}
