import { useEffect, useState } from 'react'
import PageHead from '../components/ui/PageHead'
import { useApp } from '../hooks/useApp'
import { TOOLS } from '../data/tools'
import { requestChip } from '../utils/format'

export default function Requests() {
  const { requests, addRequest, pendingTool, setPendingTool, openModal } = useApp()
  const [tool, setTool] = useState(pendingTool || '') // pre-filled when you arrive from a tool
  const [neededBy, setNeededBy] = useState('')
  const [notes, setNotes] = useState('')
  const [contact, setContact] = useState('')
  const [error, setError] = useState(false)

  // The pre-selection is used once, then cleared
  useEffect(() => {
    setPendingTool(null)
  }, [setPendingTool])

  const submit = (e) => {
    e.preventDefault()
    if (!tool) {
      setError(true)
      document.getElementById('rq-tool')?.focus()
      return
    }
    const id = addRequest(tool)
    openModal(
      'Request received',
      <>
        <p>Your request <b>{id}</b> for <b>{tool}</b> has been logged. Your account manager will confirm scope within 1 business day.</p>
        <p className="note" style={{ marginTop: 12 }}>Prototype: nothing was sent. In production this would create a ticket in the Member Solutions queue.</p>
      </>,
    )
    setTool(''); setNeededBy(''); setNotes(''); setContact(''); setError(false)
  }

  return (
    <>
      <PageHead title="My requests" desc="Ask Member Solutions for a custom analysis or a review of your self-service results. Typical turnaround is 3 to 5 business days." />

      <div className="split">
        <form className="card" noValidate onSubmit={submit}>
          <h3>New request</h3>
          <div style={{ height: 12 }} />
          <div className="field">
            <label htmlFor="rq-tool">Analysis</label>
            <select className="inp" id="rq-tool" value={tool} onChange={(e) => { setTool(e.target.value); setError(false) }}>
              <option value="">Choose an analysis</option>
              {TOOLS.map((t) => <option key={t.id}>{t.name}</option>)}
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="rq-date">Needed by</label>
            <input type="date" id="rq-date" value={neededBy} onChange={(e) => setNeededBy(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="rq-notes">What would you like us to look at?</label>
            <textarea id="rq-notes" rows="4" placeholder="Example: rerun the severe scenario with 30% runoff on public funds" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="rq-contact">Contact email</label>
            <input type="email" id="rq-contact" placeholder="name@yourbank.com" value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          {error && (
            <p style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12 }}>Choose an analysis so we can route your request.</p>
          )}
          <button className="btn" type="submit">Submit request</button>
        </form>

        <div className="card">
          <h3>Request history</h3>
          <div className="tablewrap">
            <table>
              <tbody>
                <tr><th>ID</th><th>Analysis</th><th>Submitted</th><th>Status</th></tr>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td className="num"><b>{r.id}</b></td>
                    <td>{r.tool}</td>
                    <td className="num">{r.date}</td>
                    <td><span className={`chip ${requestChip(r.status)}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
