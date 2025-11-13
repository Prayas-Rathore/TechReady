import type { Question } from '../../types/assessment'

export default function QuestionCard({
  question, selected, onSelect
}: { question: Question; selected?: string; onSelect: (optKey: string, optText: string) => void }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontWeight: 700 }}>{question.text}</div>
      <div className="options" role="radiogroup" aria-label={question.text}>
        {Object.entries((question.options ?? {}) as { [k: string]: string }).map(([key, text]) => (
          <button
            key={key}
            className={`option ${selected === key ? 'selected' : ''}`}
            onClick={() => onSelect(key, text)}
            aria-pressed={selected === key}
          >
            <span className="optKey">{key}</span>{text}
          </button>
        ))}
      </div>
    </div>
  )
}
