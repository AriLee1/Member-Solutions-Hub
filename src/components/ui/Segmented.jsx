// Pill-style option switcher (class "seg"). `active` can be null for "none selected".
export default function Segmented({ options, active, onSelect, style, renderLabel = (o) => o }) {
  return (
    <div className="seg" style={style}>
      {options.map((o) => (
        <button key={o} type="button" className={o === active ? 'on' : ''} onClick={() => onSelect(o)}>
          {renderLabel(o)}
        </button>
      ))}
    </div>
  )
}
