import { createContext } from 'react'

// Shared app state (selected member, view mode, requests, tool inputs, usage tracking, modal, toast).
// The provider lives in AppProvider.jsx; read it with the useApp() hook.
export const AppContext = createContext(null)
