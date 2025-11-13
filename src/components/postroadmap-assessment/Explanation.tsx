import React from 'react'
export default function Explanation({ points }: { points?: string[] }) {
  if (!points || points.length === 0) return null
  return (
    <div className="explain">
      <ul>
        {points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  )
}
