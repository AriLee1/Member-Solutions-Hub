import { useEffect, useRef } from 'react'
import { useApp } from '../../hooks/useApp'

export default function Modal() {
  const { modal, closeModal } = useApp()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!modal) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && closeModal()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal, closeModal])

  return (
    <div className={`modal-bg${modal ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <h2 id="modalTitle">{modal?.title}</h2>
        <div>{modal?.body}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn ghost" ref={closeRef} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
