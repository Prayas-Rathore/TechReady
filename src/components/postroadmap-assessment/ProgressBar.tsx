import React from 'react'
export default function ProgressBar({ value, total }: { value: number, total: number }) {
  const p = Math.min(100, Math.round((value / Math.max(1,total)) * 100))
  return (
    <div className="progressWrap">
      <div style={{fontSize:12, color:'var(--muted)'}}>{p}%</div>
      <div className="progressBar" style={{ ['--p' as any]: `${p}%` }} />
    </div>
  )
}
