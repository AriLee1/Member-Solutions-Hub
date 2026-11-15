import { Link } from 'react-router-dom'
import PageHead from '../components/ui/PageHead'
import { useApp } from '../hooks/useApp'

const PROGRESS = [0, 0, 40, 25, 15, 10] // indexed by priority

// Placeholder page for tools that are still in development
export default function ToolPreview({ tool }) {
  const { toast, setPendingTool } = useApp()
  return (
    <>
      <PageHead title={tool.name} desc={tool.desc} crumb>
        <span className="chip warn">In development</span>
      </PageHead>

      <div className="card feature">
        <div>
          <h2>Coming in a future release</h2>
          <p>This analysis is being converted from a Member Solutions report into a self-service tool. Until then, use the offline Excel template or ask us to prepare it for you.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => toast('Prototype: the Excel template download would start here')}>Download Excel template</button>
            <Link className="btn ghost" to="/requests" onClick={() => setPendingTool(tool.name)}>Request this analysis</Link>
          </div>
        </div>
        <div className="capcard" style={{ transform: 'none' }}>
          <div className="top"><span>Priority {tool.prio}</span><span>{tool.cat}</span></div>
          <div className="big">In development</div>
          <div className="meter"><span style={{ width: `${PROGRESS[tool.prio] || 10}%` }} /></div>
          <div className="bot"><span>Self-service conversion</span><span>Phase 2</span></div>
        </div>
      </div>

      <div className="note">Prototype placeholder. The live version uses the same layout as Liquidity Stress Analysis: inputs on the left, results on the right.</div>
    </>
  )
}
