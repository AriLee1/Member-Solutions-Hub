// Labeled range input with live value readout
export default function Slider({ id, label, value, min, max, step, unit, hint, onChange }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        <output htmlFor={id}>
          {value}
          {unit}
        </output>
      </label>
      <input type="range" id={id} min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
      {hint && <span className="hint">{hint}</span>}
    </div>
  )
}
