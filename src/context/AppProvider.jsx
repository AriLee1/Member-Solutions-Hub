import { useCallback, useMemo, useRef, useState } from 'react'
import { AppContext } from './appContext'
import { MEMBERS, INITIAL_REQUESTS } from '../data/members'
import { DEFAULT_LIQ, DEFAULT_MCF } from '../data/assumptions'

const EMPTY_USAGE = { views: {}, changes: {}, scenarios: { Base: 0, Moderate: 0, Severe: 0 }, requests: 0 }

export function AppProvider({ children }) {
  // Who is looking
  const [memberIndex, setMemberIndex] = useState(0)
  const [staff, setStaff] = useState(false)

  // UI state kept across pages
  const [chartRange, setChartRange] = useState('Year')
  const [toolFilter, setToolFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sideOpen, setSideOpen] = useState(false)

  // Data
  const [requests, setRequests] = useState(INITIAL_REQUESTS)
  const [pendingTool, setPendingTool] = useState(null) // pre-selects a tool on the Requests page

  // Tool inputs (kept when you leave and come back to a tool)
  const [liq, setLiq] = useState(DEFAULT_LIQ)
  const [mcf, setMcf] = useState(DEFAULT_MCF)

  // Usage tracking for the Business Partner "Usage insights" page
  const [usage, setUsage] = useState(EMPTY_USAGE)
  const track = useCallback((kind, key) => {
    setUsage((u) => ({ ...u, [kind]: { ...u[kind], [key]: (u[kind][key] || 0) + 1 } }))
  }, [])
  const countScenario = useCallback((s) => {
    setUsage((u) => ({ ...u, scenarios: { ...u.scenarios, [s]: u.scenarios[s] + 1 } }))
  }, [])

  // Toast + modal
  const [toastMsg, setToastMsg] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const toastTimer = useRef(null)
  const toast = useCallback((msg) => {
    setToastMsg(msg)
    setToastShow(true)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastShow(false), 2200)
  }, [])

  const [modal, setModal] = useState(null) // { title, body }
  const openModal = useCallback((title, body) => setModal({ title, body }), [])
  const closeModal = useCallback(() => setModal(null), [])

  // Adds a request and returns its new ID
  const addRequest = useCallback(
    (tool) => {
      const id = 'MS-' + (1058 + requests.length)
      setRequests((rs) => [{ id, tool, date: new Date().toISOString().slice(0, 10), status: 'Received' }, ...rs])
      setUsage((u) => ({ ...u, requests: u.requests + 1 }))
      return id
    },
    [requests.length],
  )

  const value = useMemo(
    () => ({
      members: MEMBERS,
      member: MEMBERS[memberIndex],
      memberIndex, setMemberIndex,
      staff, setStaff,
      chartRange, setChartRange,
      toolFilter, setToolFilter,
      search, setSearch,
      sideOpen, setSideOpen,
      requests, addRequest,
      pendingTool, setPendingTool,
      liq, setLiq,
      mcf, setMcf,
      usage, track, countScenario,
      toast, toastMsg, toastShow,
      modal, openModal, closeModal,
    }),
    [memberIndex, staff, chartRange, toolFilter, search, sideOpen, requests, addRequest, pendingTool,
      liq, mcf, usage, track, countScenario, toast, toastMsg, toastShow, modal, openModal, closeModal],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
