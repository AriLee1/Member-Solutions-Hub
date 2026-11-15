import { useLocation, useNavigate } from 'react-router-dom'
import { IconTile } from '../ui/Icon'
import { useApp } from '../../hooks/useApp'

function Notifications() {
  return (
    <div className="list">
      <div className="li">
        <IconTile name="doc" color="green" />
        <div className="t"><b>Peer Comparison delivered</b><small>MS-1042 · Nov 3</small></div>
      </div>
      <div className="li">
        <IconTile name="drop" color="teal" />
        <div className="t"><b>Q3 call report data loaded</b><small>Tool starting values updated · Nov 4</small></div>
      </div>
      <div className="li">
        <IconTile name="tools" color="olive" />
        <div className="t"><b>Letter of Credit tool coming soon</b><small>Next release</small></div>
      </div>
    </div>
  )
}

export default function Topbar() {
  const app = useApp()
  const { member, members, memberIndex, staff } = app
  const navigate = useNavigate()
  const location = useLocation()

  const onSearch = (e) => {
    if (e.key !== 'Enter') return
    app.setSearch(e.target.value.trim())
    app.setToolFilter('All')
    navigate('/tools')
  }

  const changeMember = (e) => {
    const i = +e.target.value
    app.setMemberIndex(i)
    app.toast('Showing ' + members[i].name)
  }

  const showMemberView = () => {
    app.setStaff(false)
    if (location.pathname === '/insights') navigate('/')
  }

  const showStaffView = () => {
    app.setStaff(true)
    app.toast('Business Partner view: Usage insights added to the menu')
  }

  return (
    <>
      <div className="topbar">
        <button className="iconbtn menu-btn" aria-label="Open menu" onClick={() => app.setSideOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
        <div className="greet">
          <small>{staff ? 'Hi, Member Solutions team' : 'Hi, ' + member.name}</small>
          <h1>Welcome to Member Solutions Hub</h1>
        </div>
        <span className="spacer" />
        <button className="iconbtn" aria-label="Notifications" onClick={() => app.openModal('Notifications', <Notifications />)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15zM10 20a2 2 0 004 0" /></svg>
          <span className="dot" />
        </button>
        <div className="avatar">{staff ? 'MS' : member.short}</div>
        <label className="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          {/* key resets the box when the search is cleared elsewhere */}
          <input key={app.search === '' ? 'empty' : 'filled'} type="text" placeholder="Search tools" aria-label="Search tools" defaultValue={app.search} onKeyDown={onSearch} />
        </label>
      </div>

      <div className="subbar">
        {/* <span className="proto">PROTOTYPE · SAMPLE DATA</span> */}
        <span className="spacer" style={{ flex: 1 }} />
        <select className="pill-select" aria-label="Member institution" value={memberIndex} onChange={changeMember}>
          {members.map((m, i) => (
            <option key={m.id} value={i}>{m.name} (sample)</option>
          ))}
        </select>
        <div className="toggle" role="group" aria-label="View as">
          <button className={staff ? '' : 'on'} onClick={showMemberView}>Member view</button>
          <button className={staff ? 'on' : ''} onClick={showStaffView}>Business Partner view</button>
        </div>
      </div>
    </>
  )
}
