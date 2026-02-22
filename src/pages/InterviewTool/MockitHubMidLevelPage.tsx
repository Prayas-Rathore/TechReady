import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export default function MockitHubMidLevelPage() {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const questions: Question[] = [

{
id: 1,
question: 'Tell me about yourself',
situation: `I’ve spent the last several years growing from a hands-on engineer into someone who can own features end-to-end, collaborate across teams, and contribute to architectural decisions.`,
task: `My focus has been on taking more ownership — shaping solutions, improving processes, and ensuring smooth delivery.`,
action: `I’ve led feature builds end-to-end, collaborated cross-functionally, mentored engineers, and improved system quality.`,
result: `These experiences helped me become a reliable mid-level engineer who delivers independently and contributes to team success.`
},

{
id: 2,
question: 'Tell me about a time you led a project end-to-end',
situation: `Users were dropping off during onboarding and support tickets increased.`,
task: `I was responsible for leading the redesign project end-to-end.`,
action: `I ran discovery sessions, mapped user journeys, built UI, and coordinated backend integration.`,
result: `Completion rates increased by 18% and improved overall user experience.`
},

{
id: 3,
question: 'Tell me about influencing without authority',
situation: `Teams had duplicate authentication systems creating risk.`,
task: `I wanted to influence teams to adopt unified solution.`,
action: `Created proposal, migration plan, and supported adoption.`,
result: `Multiple teams adopted it, improving security and efficiency.`
},

{
id: 4,
question: 'Tell me about mentoring a junior engineer',
situation: `A junior engineer struggled with confidence and code quality.`,
task: `Help them become independent contributor.`,
action: `Provided structured mentoring, pairing, and feedback.`,
result: `They became productive and confident engineer.`
},

{
id: 5,
question: 'Tell me about managing technical debt',
situation: `Legacy module caused bugs and slowed development.`,
task: `Refactor safely.`,
action: `Used incremental refactor and added tests.`,
result: `System became stable and easier to maintain.`
},

{
id: 6,
question: 'Describe delivering under pressure',
situation: `Customer needed urgent feature.`,
task: `Deliver quickly.`,
action: `Prioritized, communicated, and executed.`,
result: `Delivered successfully on time.`
},

{
id: 7,
question: 'Describe collaborating across teams',
situation: `Feature required analytics team coordination.`,
task: `Ensure alignment.`,
action: `Created shared contracts and meetings.`,
result: `Delivered smoothly.`
},

{
id: 8,
question: 'Describe resolving conflict',
situation: `Team disagreed on approach.`,
task: `Resolve conflict.`,
action: `Facilitated discussion.`,
result: `Agreement reached and feature delivered.`
},

{
id: 9,
question: 'Tell me about improving documentation',
situation: `Documentation was outdated.`,
task: `Improve docs.`,
action: `Created structured knowledge base.`,
result: `Onboarding improved significantly.`
},

{
id: 10,
question: 'Tell me about mistake you fixed',
situation: `Change broke feature.`,
task: `Fix quickly.`,
action: `Rolled back and improved testing.`,
result: `Resolved quickly and prevented recurrence.`
},

{
id: 11,
question: 'Tell me about improving communication',
situation: `Engineering and product misaligned.`,
task: `Improve alignment.`,
action: `Introduced kickoff meetings.`,
result: `Reduced rework.`
},

{
id: 12,
question: 'Tell me about difficult stakeholder',
situation: `Stakeholder made late requests.`,
task: `Manage expectations.`,
action: `Communicated impact and options.`,
result: `Release delivered successfully.`
},

{
id: 13,
question: 'Describe presenting technical info',
situation: `Needed stakeholder approval.`,
task: `Explain clearly.`,
action: `Used simple language and visuals.`,
result: `Stakeholders approved plan.`
},

{
id: 14,
question: 'Describe improving security',
situation: `Authentication outdated.`,
task: `Improve security.`,
action: `Implemented OAuth.`,
result: `Security improved.`
},

{
id: 15,
question: 'Describe improving UX',
situation: `Checkout abandonment high.`,
task: `Improve.`,
action: `Optimized UI.`,
result: `Conversion improved.`
},

{
id: 16,
question: 'Describe managing risk',
situation: `Major release risk.`,
task: `Reduce risk.`,
action: `Used monitoring and feature flags.`,
result: `Successful release.`
},

{
id: 17,
question: 'Describe integration challenge',
situation: `Complex API integration.`,
task: `Integrate safely.`,
action: `Added retries and testing.`,
result: `Integration successful.`
},

{
id: 18,
question: 'Describe improving documentation again',
situation: `Docs scattered.`,
task: `Improve.`,
action: `Centralized.`,
result: `Better onboarding.`
},

{
id: 19,
question: 'Describe solving critical issue',
situation: `Production issue.`,
task: `Fix quickly.`,
action: `Debugged.`,
result: `Resolved.`
},

{
id: 20,
question: 'Describe persistence',
situation: `Hard bug.`,
task: `Solve.`,
action: `Deep debugging.`,
result: `Solved permanently.`
},

{
id: 21,
question: 'How do you handle feedback',
situation: `Leadership feedback.`,
task: `Improve.`,
action: `Adjusted communication.`,
result: `Improved performance.`
},

{
id: 22,
question: 'Tell me about improving after feedback',
situation: `PR feedback.`,
task: `Improve.`,
action: `Created template.`,
result: `Better reviews.`
},

{
id: 23,
question: 'How do you stay organised',
situation: `Multiple work.`,
task: `Stay organised.`,
action: `Used planning tools.`,
result: `Consistent delivery.`
},

{
id: 24,
question: 'How do you prioritise',
situation: `Competing deadlines.`,
task: `Prioritise.`,
action: `Used prioritisation framework.`,
result: `Delivered successfully.`
},

{
id: 25,
question: 'Where do you see yourself',
situation: `Career growth.`,
task: `Grow.`,
action: `Learning leadership.`,
result: `Prepared for senior role.`
},

{
id: 26,
question: 'What makes you stand out',
situation: `Competitive environment.`,
task: `Deliver value.`,
action: `Leadership and ownership.`,
result: `Recognised engineer.`
},

{
id: 27,
question: 'How do you measure success',
situation: `Engineering role.`,
task: `Define success.`,
action: `Measured impact.`,
result: `Improved performance.`
},

{
id: 28,
question: 'Adapt to new technology',
situation: `Cloud migration.`,
task: `Learn fast.`,
action: `Training and practice.`,
result: `Migration successful.`
},

{
id: 29,
question: 'Handle unexpected change',
situation: `Requirement change.`,
task: `Adapt.`,
action: `Replanned.`,
result: `Delivered successfully.`
},

{
id: 30,
question: 'Do you have questions for interviewer',
situation: `Interview closing.`,
task: `Ask strong questions.`,
action: `Asked strategic questions.`,
result: `Strong impression.`
}

];

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const expandAll = () => {
    setExpandedQuestions(questions.map(q => q.id));
  };

  const collapseAll = () => {
    setExpandedQuestions([]);
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/interview-toolkit')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Interview Toolkit</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Mid-Level STAR Interview Questions and Answers</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Advanced behavioural interview questions with STAR framework responses for mid-level professionals demonstrating leadership and technical expertise
            </p>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use This Pack</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Study the STAR structure</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Replace the scenario details</strong> with your own experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Practice aloud</strong> until your delivery feels natural</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Use the questions</strong> to anticipate what interviewers will probe</span>
                </li>
              </ul>
            </section>

            <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Disclaimer</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                These interview questions and STAR-style answers are intended purely as examples to showcase effective structure, clarity, and reasoning. They aren't designed to be memorised verbatim. Your strongest interview performance will come from drawing on your own experiences, challenges, and accomplishments. Treat these examples as a framework to shape your stories, but tailor the details so your responses highlight your genuine impact and the unique strengths you offer.
              </p>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Mid-Level Interview Questions</h2>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="px-4 py-2 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for a question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
                {filteredQuestions.map((question) => {
                  const isExpanded = expandedQuestions.includes(question.id);
                  return (
                    <div key={question.id} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-700 font-bold text-sm rounded-lg">
                            {question.id}
                          </span>
                          <h3 className="font-semibold text-slate-900">{question.question}</h3>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-6 space-y-4 bg-white">
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-sky-100 text-sky-700 font-bold text-sm rounded flex items-center justify-center">
                                S
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm mb-1">Situation</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {question.situation}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 font-bold text-sm rounded flex items-center justify-center">
                                T
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm mb-1">Task</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {question.task}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 font-bold text-sm rounded flex items-center justify-center">
                                A
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm mb-1">Action</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {question.action}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 font-bold text-sm rounded flex items-center justify-center">
                                R
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm mb-1">Result</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {question.result}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredQuestions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No questions found matching "{searchTerm}"</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
