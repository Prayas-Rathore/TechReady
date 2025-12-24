import { useState,useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, Loader2, ArrowRight } from 'lucide-react';
import { QUIZ_SECTIONS } from '../data/postroadmapquestion';
import { supabase } from '../services/SupabaseClient';
import { useNavigate } from "react-router-dom";

interface SelectedAnswers {
  [questionId: string]: string;
}

interface Explanations {
  [questionId: string]: string[];
}

interface Question {
  id: string;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
  };
}

export default function AssessmentQuizPage() {
  const navigate = useNavigate();

  const [sectionIndex, setSectionIndex] = useState(0);
  const [selected, setSelected] = useState<SelectedAnswers>({});
  const [explanations, setExplanations] = useState<Explanations>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingUserQuizStatus, setLoadingUserQuizStatus] = useState<boolean>(true);


  const currentSection = QUIZ_SECTIONS[sectionIndex];
  const totalQuestions = QUIZ_SECTIONS.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredCount = Object.keys(selected).length;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  function getQuestionById(id: string): Question | undefined {
    for (const sec of QUIZ_SECTIONS) {
      const q = sec.questions.find((x: any) => x.id === id);
      if (q) return q as Question;
    }
    return undefined;
  }

  function buildOptionsBlock(questionId: string): string {
    const q = getQuestionById(questionId);
    if (!q) return '';

    const order = ['A', 'B', 'C'] as const;

    return order
      .filter((k) => q.options[k])
      .map((k) => `${k}) ${q.options[k]}`)
      .join('\n');
  }

  // FINAL VERSION — Calls Supabase edge function "postroadmap"
  async function explain(
    questionId: string,
    questionText: string,
    userPick: string,
    userPickText: string
  ) {
    setError(null);
    setLoadingId(questionId);

    try {
      const optionsBlock = buildOptionsBlock(questionId);

      const { data, error } = await supabase.functions.invoke("postroadmap", {
        body: {
          questionId,
          questionText,
          userPick,
          userPickText,
          optionsBlock,
        },
      });

      if (error) throw error;
      if (!data?.text) throw new Error("AI returned empty response");

      const lines = data.text
        .split(/\r?\n/)
        .map((s: string) => s.trim())
        .filter(Boolean);

      setExplanations((prev) => ({ ...prev, [questionId]: lines }));
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
    if (selected[questionId]) return;

    setSelected((prev) => ({ ...prev, [questionId]: optionKey }));
    await explain(questionId, questionText, optionKey, optionText);
  };

  useEffect(() => {
  async function checkQuizStatus() {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Auth error:", userError.message);
        return;
      }

      if (!user) {
        console.warn("User not logged in");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("has_taken_roadmap_quiz")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("DB error:", error.message);
        return;
      }

      if (data?.has_taken_roadmap_quiz) {
        navigate("/user-dashboard", { replace: true });
        return;
      }

      setLoadingUserQuizStatus(false);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  checkQuizStatus();
}, [navigate]);


async function finishQuiz() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Save completed status
    await supabase
      .from("profiles")
      .update({ has_taken_roadmap_quiz: true })
      .eq("id", user.id);

    // (OPTIONAL) Save user answers
    await supabase.from("quiz_results").insert({
      user_id: user.id,
      answers: selected,
      explanations
    });

    navigate("/user-dashboard");
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
}



if (loadingUserQuizStatus) {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-600">
      Checking your test access...
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
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

        {/* SECTION CONTAINER */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">

          {error && (
            <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              {error}
            </div>
          )}

          {currentSection.questions.map((question: Question, qIndex: number) => {
            const isLoading = loadingId === question.id;
            const explanation = explanations[question.id];
            const isAnswered = !!selected[question.id];

            return (
              <div key={question.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center font-bold text-sm">
                    {qIndex + 1}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">{question.text}</h3>

                    {/* OPTIONS */}
                    <div className="space-y-2">
                      {Object.entries(question.options).map(([key, text]) => {
                        const optionKey = key as "A" | "B" | "C";
                        const isSelected = selected[question.id] === optionKey;

                        return (
                          <button
                            key={optionKey}
                            onClick={() => handleSelectAnswer(question.id, question.text, optionKey, text)}
                            disabled={isLoading || isAnswered}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-sky-500 bg-sky-50'
                                : 'border-slate-200 bg-white hover:border-sky-300'
                            } ${isLoading || isAnswered ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                                  isSelected
                                    ? 'border-sky-500 bg-sky-500 text-white'
                                    : 'border-slate-300'
                                }`}
                              >
                                {isSelected ? <CheckCircle className="w-5 h-5" /> : optionKey}
                              </div>

                              <span className={isSelected ? 'font-medium text-slate-900' : 'text-slate-700'}>
                                {text}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* LOADING */}
                    {isLoading && (
                      <div className="mt-3 flex items-center gap-2 text-sky-600">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing your response...
                      </div>
                    )}

                    {/* EXPLANATION */}
                    {!isLoading && explanation && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-sky-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-5 h-5 text-amber-500" />
                          <span className="font-semibold text-slate-900">Insight</span>
                        </div>

                        <ul className="space-y-2">
                          {explanation.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <ArrowRight className="w-4 h-4 text-sky-600 mt-0.5" />
                              {point}
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

        {/* NAVIGATION */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSectionIndex((prev) => Math.max(prev - 1, 0))}
            disabled={sectionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous Section
          </button>

          {sectionIndex !== QUIZ_SECTIONS.length - 1 ? (
            <button
              onClick={() => setSectionIndex((prev) => Math.min(prev + 1, QUIZ_SECTIONS.length - 1))}
              className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700"
            >
              Next Section
              <ChevronRight className="w-5 h-5" />
            </button>
                ) : (
                  <button
                    onClick={finishQuiz}
                    className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
                  >
                    Finish & Go to Dashboard
                  </button>
                )}

          
        </div>

      </div>
    </div>
  );
}
