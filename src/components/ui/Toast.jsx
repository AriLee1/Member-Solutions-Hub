import { useApp } from '../../hooks/useApp'

export default function Toast() {
  const { toastMsg, toastShow } = useApp()
  return (
    <div className={`toast${toastShow ? ' show' : ''}`} role="status" aria-live="polite">
      {toastMsg}
    </div>
  )
}
