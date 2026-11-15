import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import { useApp } from './hooks/useApp'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Tools from './pages/Tools'
import ToolPage from './pages/ToolPage'
import Requests from './pages/Requests'
import Resources from './pages/Resources'
import Insights from './pages/Insights'

// Business Partner-only pages
function StaffOnly({ children }) {
  const { staff } = useApp()
  return staff ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <AppProvider>
      {/* HashRouter keeps URLs like /#/tools, which also works on GitHub Pages */}
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tools" element={<Tools />} />
            <Route path="tools/:toolId" element={<ToolPage />} />
            <Route path="requests" element={<Requests />} />
            <Route path="resources" element={<Resources />} />
            <Route path="insights" element={<StaffOnly><Insights /></StaffOnly>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
