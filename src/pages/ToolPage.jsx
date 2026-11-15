import { Navigate, useParams } from 'react-router-dom'
import Liquidity from './Liquidity'
import Funding from './Funding'
import ToolPreview from './ToolPreview'
import { findTool } from '../data/tools'

// Live tools get their own page; everything else shows the preview placeholder.
// Add a new live tool here when it is built.
const LIVE_TOOLS = {
  liquidity: Liquidity,
  'funding-cost': Funding,
}

export default function ToolPage() {
  const { toolId } = useParams()
  const tool = findTool(toolId)
  if (!tool) return <Navigate to="/tools" replace />
  const Page = LIVE_TOOLS[toolId]
  return Page ? <Page /> : <ToolPreview tool={tool} />
}
