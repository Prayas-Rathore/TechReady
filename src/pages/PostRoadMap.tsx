import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, Loader2, ArrowRight } from 'lucide-react';
import { QUIZ_SECTIONS } from '../data/postroadmapquestion';

interface SelectedAnswers {
  [questionId: string]: string;
}

interface Explanations {
  [questionId: string]: string[];
}

// OpenAI API configuration
const OPENAI_API_KEY = '';
const OPENAI_MODEL = 'gpt-4o-mini';

export default function AssessmentQuizPage() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [selected, setSelected] = useState<SelectedAnswers>({});
  const [explanations, setExplanations] = useState<Explanations>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentSection = QUIZ_SECTIONS[sectionIndex];
  const totalQuestions = QUIZ_SECTIONS.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredCount = Object.keys(selected).length;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  // Helper function to get question by ID
  function getQuestionById(id: string) {
    for (const sec of QUIZ_SECTIONS) {
      const q = sec.questions.find(x => x.id === id);
      if (q) return q;
    }
    return undefined;
  }

  // Helper function to build options block for the prompt
  function buildOptionsBlock(questionId: string): string {
    const q = getQuestionById(questionId);
    if (!q) return '';
    
    const order: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C'];
    return order
      .filter(k => q.options[k])
      .map(k => `${k}) ${q.options[k]}`)
      .join('\n');
  }

  // AI-powered explanation function
  async function explain(
    questionId: string,
    questionText: string,
    userPick: string,
    userPickText: string
  ) {
    setError(null);
    setLoadingId(questionId);

    try {
      if (!OPENAI_API_KEY) {
        throw new Error('Please set your OpenAI API key.');
      }

      const optionsBlock = buildOptionsBlock(questionId);

      const prompt = `
You are an objective career coach. Do not praise or flatter. Do not say "right" or "wrong".
Given the question and options, decide which option is the strongest approach, first carefully understand all the options.

Question: "${questionText}"
Options:
${optionsBlock}
User selected: ${userPick} — "${userPickText}"

Write a short, neutral response:
1) First line:
  - If the user's choice is strongest, write:
    "You chose the stronger approach: <LETTER> — <4–8 words rationale>."
  - Otherwise, write:
    "Stronger approach: <LETTER> — <4–8 words rationale>."
2) Then 2–3 bullets (each ≤ 10 words) explaining why that approach works better.
3) End with one line:
  "Try: <one specific action, ≤ 8 words>"

Rules:
- No compliments, no encouragement words (e.g., great, nice, good).
- Be specific and practical. Keep it brief.
- No extra sections or paragraphs.
      `.trim();

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`OpenAI API error (${res.status}): ${txt}`);
      }

      const data = await res.json();
      const text: string = data?.choices?.[0]?.message?.content || '';

      // Normalize into lines we can render
      const lines = text
        .split(/\r?\n/)
        .map(s => s.replace(/^[-*•\d\.\s]+/, '').trim())
        .filter(Boolean);

      setExplanations(prev => ({ ...prev, [questionId]: lines }));
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch explanation');
    } finally {
      setLoadingId(null);
    }
  }

  const handleSelectAnswer = async (
    questionId: string,
    questionText: string,
    optionKey: string,
    optionText: string
  ) => {
    // Check if question is already answered - if yes, do nothing
    if (selected[questionId]) {
      return;
    }

    setSelected(prev => ({ ...prev, [questionId]: optionKey }));
    
    // Call the AI explanation function
    await explain(questionId, questionText, optionKey, optionText);
  };

  const handleNextSection = () => {
    if (sectionIndex < QUIZ_SECTIONS.length - 1) {
      setSectionIndex(prev => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (sectionIndex > 0) {
      setSectionIndex(prev => prev - 1);
    }
  };

  const goToSection = (index: number) => {
    setSectionIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Job Readiness Assessment</h1>
              <p className="text-slate-600">Section-wise evaluation with personalized guidance</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-sky-600">{progressPercentage}%</div>
              <div className="text-sm text-slate-600">{answeredCount} of {totalQuestions}</div>
            </div>
          </div>

          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevSection}
              disabled={sectionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-center flex-1">
              <h2 className="text-xl font-bold text-slate-900">{currentSection.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{currentSection.description}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-semibold">
                {currentSection.questions.length} Questions
              </span>
            </div>

            <button
              onClick={handleNextSection}
              disabled={sectionIndex === QUIZ_SECTIONS.length - 1}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {QUIZ_SECTIONS.map((section, index) => (
              <button
                key={section.id}
                onClick={() => goToSection(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === sectionIndex
                    ? 'bg-sky-600 w-8'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to ${section.title}`}
              />
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {currentSection.questions.map((question, qIndex) => {
              const isLoading = loadingId === question.id;
              const explanation = explanations[question.id];
              const isAnswered = !!selected[question.id]; // Check if question is already answered

              return (
                <div key={question.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      {qIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">{question.text}</h3>

                      <div className="space-y-2">
                        {Object.entries(question.options).map(([key, text]) => {
                          const isSelected = selected[question.id] === key;

                          return (
                            <button
                              key={key}
                              onClick={() => handleSelectAnswer(question.id, question.text, key, text)}
                              disabled={isLoading || isAnswered} // Disable if loading or already answered
                              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                isSelected
                                  ? 'border-sky-500 bg-sky-50'
                                  : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50'
                              } ${(isLoading || isAnswered) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                                  isSelected
                                    ? 'border-sky-500 bg-sky-500 text-white'
                                    : 'border-slate-300 text-slate-600'
                                }`}>
                                  {isSelected ? <CheckCircle className="w-5 h-5" /> : key}
                                </div>
                                <span className={`flex-1 ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-700'}`}>
                                  {text}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {isLoading && (
                        <div className="mt-4 flex items-center gap-2 text-sky-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Analyzing your response...</span>
                        </div>
                      )}

                      {!isLoading && explanation && explanation.length > 0 && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-sky-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-amber-500" />
                            <h4 className="font-semibold text-slate-900">Insight</h4>
                          </div>
                          <ul className="space-y-2">
                            {explanation.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                <ArrowRight className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevSection}
            disabled={sectionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous Section
          </button>

          <button
            onClick={handleNextSection}
            disabled={sectionIndex === QUIZ_SECTIONS.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next Section
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}