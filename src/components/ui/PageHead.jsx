import { Link } from 'react-router-dom'

// Page title block with optional breadcrumb and right-side content
export default function PageHead({ title, desc, crumb, children }) {
  const head = (
    <div className="head">
      <div>
        <h2 style={{ fontSize: 22 }}>{title}</h2>
        {desc && <p>{desc}</p>}
      </div>
      {children}
    </div>
  )
  if (!crumb) return head
  return (
    <div>
      <div className="crumb">
        <Link to="/tools">Tool library</Link> / {title}
      </div>
      {head}
    </div>
  )
}
