import { Link, NavLink } from 'react-router-dom'
import Icon from '../ui/Icon'
import logo from '../../assets/logo.png'
import { useApp } from '../../hooks/useApp'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: 'home', end: true },
  { to: '/tools', label: 'Tool library', icon: 'tools' },
  { to: '/requests', label: 'My requests', icon: 'req' },
  { to: '/resources', label: 'Guides & FAQ', icon: 'res' },
]

export default function Sidebar() {
  const { staff, sideOpen } = useApp()
  const cls = ({ isActive }) => (isActive ? 'active' : '')

  return (
    <nav className={`side${sideOpen ? ' open' : ''}`} aria-label="Main">
      <div className="sidecard">
        <div className="side-top">
          <div className="brand">
            <img src={logo} alt="FHLBank Topeka" className="logo" />
          </div>
        </div>
        <div className="side-body">
          <div className="navlist">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={cls}>
                <Icon name={item.icon} />
                {item.label}
              </NavLink>
            ))}
            {staff && (
              <>
                <div className="label">Business Partners</div>
                <NavLink to="/insights" className={cls}>
                  <Icon name="ins" />
                  Usage insights
                </NavLink>
              </>
            )}
          </div>
          <div className="promo">
            <b>Need a deeper look at your balance sheet?</b>
            <Link to="/requests">Request analysis</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
