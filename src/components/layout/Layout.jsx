import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Modal from '../ui/Modal'
import Toast from '../ui/Toast'
import { useApp } from '../../hooks/useApp'
import { isTool } from '../../data/tools'

export default function Layout() {
  const { setSideOpen, track } = useApp()
  const location = useLocation()
  const lastKey = useRef(null)

  // On every page change: scroll to top, close the mobile menu, count tool views
  useEffect(() => {
    if (lastKey.current === location.key) return // guard against double-run in dev StrictMode
    lastKey.current = location.key
    window.scrollTo(0, 0)
    setSideOpen(false)
    const toolId = location.pathname.match(/^\/tools\/(.+)/)?.[1]
    if (toolId && isTool(toolId)) track('views', toolId)
  }, [location, setSideOpen, track])

  return (
    <>
      <div className="app">
        <Sidebar />
        <main>
          <Topbar />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Outlet />
          </div>
        </main>
      </div>
      <Modal />
      <Toast />
    </>
  )
}
