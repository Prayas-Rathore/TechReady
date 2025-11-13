import { useEffect, useRef } from 'react'
import type { Section } from '../../types/assessment'
import QuestionCard from '../postroadmap-assessment/QuestionCard'
import Explanation from '../postroadmap-assessment/Explanation'

type SelectedMap = { [k: string]: string }
type ExplainMap = { [k: string]: string[] }

export default function SectionCarousel({
  sections,
  sectionIndex,
  setSectionIndex,
  selected,
  loadingId,
  explanations,
  onSelect,
}: {
  sections: Section[]
  sectionIndex: number
  setSectionIndex: (i: number) => void
  selected: SelectedMap
  loadingId: string | null
  explanations: ExplainMap
  onSelect: (qid: string, qtext: string, optKey: string, optText: string) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setSectionIndex(Math.min(sectionIndex + 1, sections.length - 1))
      if (e.key === 'ArrowLeft') setSectionIndex(Math.max(sectionIndex - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sectionIndex, sections.length, setSectionIndex])

  // touch swipe
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let startX = 0, dx = 0
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; dx = 0 }
    const onMove = (e: TouchEvent) => { dx = e.touches[0].clientX - startX }
    const onEnd = () => {
      if (dx < -60) setSectionIndex(Math.min(sectionIndex + 1, sections.length - 1))
      if (dx > 60) setSectionIndex(Math.max(sectionIndex - 1, 0))
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: true })
    el.addEventListener('touchend', onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart as any)
      el.removeEventListener('touchmove', onMove as any)
      el.removeEventListener('touchend', onEnd as any)
    }
  }, [sectionIndex, sections.length, setSectionIndex])

  return (
    <div>
      <div className='carouselHead'>
        <button className='navBtn' disabled={sectionIndex===0} onClick={()=>setSectionIndex(sectionIndex-1)}>← Prev</button>
        <div className='carouselTitle'>{sections[sectionIndex].title}<span className='badge'>{sections[sectionIndex].questions.length} Qs</span></div>
        <button className='navBtn' disabled={sectionIndex===sections.length-1} onClick={()=>setSectionIndex(sectionIndex+1)}>Next →</button>
      </div>
      <div className='dotsWrap'>
        {sections.map((s,i)=>(
          <button key={s.id} className={`dot ${i===sectionIndex?'active':''}`} onClick={()=>setSectionIndex(i)} aria-label={`Go to ${s.title}`} />
        ))}
      </div>
      <div className='trackOuter'>
        <div ref={trackRef} className='track' style={{transform:`translateX(-${sectionIndex*100}%)`}}>
          {sections.map(sec=>(
            <section key={sec.id} className='slide card'>
              {sec.description && <p className='subtitle' style={{marginTop:0}}>{sec.description}</p>}
              {sec.questions.map(q=>(
                <div key={q.id}>
                  <QuestionCard question={q} selected={selected[q.id]} onSelect={(opt,txt)=>onSelect(q.id,q.text,opt,txt)} />
                  {loadingId===q.id ? <div className='subtitle'>Analyzing…</div> : <Explanation points={explanations[q.id]} />}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
