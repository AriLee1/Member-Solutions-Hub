// Line icons used across the app. Add new ones to PATHS.
const PATHS = {
  home: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  tools: <path d="M4 6h16M4 12h16M4 18h10" />,
  req: <path d="M4 5h16v11H8l-4 4z" />,
  res: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1.1-1.5 2.5M12 17h.01" />
    </>
  ),
  ins: (
    <>
      <path d="M12 3v9h9A9 9 0 1112 3z" />
      <path d="M15 3.5A9 9 0 0120.5 9H15z" />
    </>
  ),
  cap: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  adv: <path d="M5 20V10M12 20V4M19 20v-7" />,
  col: <path d="M12 3l8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4" />,
  stock: <path d="M12 4v16M5 11l7-7 7 7" />,
  doc: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
    </>
  ),
  drop: <path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z" />,
}

export default function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name]}
    </svg>
  )
}

// Rounded colored tile with an icon inside (class "ico teal|blue|green|olive")
export function IconTile({ name, color }) {
  return (
    <div className={`ico ${color}`}>
      <Icon name={name} />
    </div>
  )
}
