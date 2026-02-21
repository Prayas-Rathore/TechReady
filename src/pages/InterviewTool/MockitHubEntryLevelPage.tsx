import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export default function MockitHubSeniorLevelPage() {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const questions: Question[] = [
    {
      id: 1,
      question: 'Tell Me About Yourself',
      situation: 'I recently completed my degree in technology, where I built a strong foundation in programming, data structures, and collaborative project work. Throughout my studies, I looked for opportunities to apply what I was learning in real-world contexts.',
      task: 'My goal was to take the theory I learned in class and translate it into practical experience through team projects and internships, so I could prepare myself for a professional role in tech.',
      action: 'In my final year, I worked with a small team to build a task-management app. I organised weekly check-ins, created shared documentation, and made sure tasks were clearly assigned and completed on time. During my internship at a startup, I focused on improving their website\'s performance. I analysed load times, compressed images, minified scripts, and tested the site across different devices to ensure consistency.',
      result: 'Our task-management app was presented to faculty and received top marks for usability and teamwork. At the startup, my optimisation work reduced page load speed by about 20%, which helped improve customer retention. These experiences taught me how to balance technical problem-solving with communication, collaboration, and delivering work that has real impact.'
    },
    {
      id: 2,
      question: 'Why are you interested in this role?',
      situation: 'During my studies and internship experiences, I realised that I\'m most motivated when I\'m working on real products that solve meaningful problems and when I\'m part of a team where I can learn from more experienced engineers. I\'ve been actively looking for a role where I can grow technically while contributing to something impactful.',
      task: 'My goal has been to find a position where I can apply the skills I\'ve built — like frontend development, debugging, and performance optimisation — while continuing to develop professionally in a structured, supportive environment.',
      action: 'I researched your company and this role specifically, and a few things stood out to me: The tech stack aligns closely with what I\'ve been working with in my projects and internship. The team culture emphasises collaboration, mentorship, and continuous learning, which is exactly the environment where I do my best work. The projects you\'re working on — especially around improving user experience and building scalable features — match the kind of challenges I\'m excited to take on. I also reviewed your recent product updates and engineering blog posts, which gave me a clear sense of how your team approaches problem-solving and innovation.',
      result: 'Because of this alignment, I\'m genuinely excited about the opportunity. I feel confident that I can contribute from day one while also growing into a stronger engineer. This role feels like the right next step for me — a place where I can build real-world experience, learn from talented teammates, and add value to meaningful projects.'
    },
    {
      id: 3,
      question: 'What motivates you to succeed in a new role?',
      situation: 'During my studies and internship experiences, I noticed that I\'m most motivated when I\'m learning new skills and contributing to projects that have a real impact on users or the team.',
      task: 'My goal in any new role is to grow quickly, take on meaningful responsibilities, and add value by improving processes, solving problems, or supporting the team.',
      action: 'In my internship, for example, I proactively looked for areas where I could contribute beyond my assigned tasks. I analysed the website\'s performance, identified bottlenecks, and suggested improvements. I also asked for feedback regularly and took on tasks that pushed me outside my comfort zone, like debugging issues or presenting updates to the team.',
      result: 'Those actions helped me reduce page load speed by 20% and become a reliable contributor on the team. What motivates me most is seeing that my work makes a difference — whether that\'s improving a user experience, supporting teammates, or learning something new that helps me grow. That sense of progress and impact is what drives me in a new role.'
    },
    {
      id: 4,
      question: 'Where do you see yourself in 2–3 years?',
      situation: 'As someone early in my career, I\'m focused on building strong technical foundations and understanding how real engineering teams operate.',
      task: 'My goal over the next 2–3 years is to grow from a beginner into a more confident, independent engineer who can take ownership of features and contribute to larger projects.',
      action: 'To get there, I plan to: Learn from senior engineers through mentorship and code reviews, Take on increasingly challenging tasks, Strengthen my skills in areas like debugging, testing, and system design, Contribute to team processes, documentation, or internal tools, Stay curious and keep improving through courses, side projects, and hands-on experience.',
      result: 'In 2–3 years, I see myself as a dependable mid-level engineer who can deliver features end-to-end, support newer teammates, and contribute to the team\'s technical direction. I want to be someone the team can trust with important work and someone who continues to grow every year.'
    },
    {
      id: 5,
      question: 'What makes you stand out from other candidates?',
      situation: 'Throughout my degree and internship, I consistently found myself stepping into roles where I helped bring structure, clarity, or improvements to the team — even when I wasn\'t the most experienced person.',
      task: 'I\'ve always aimed to combine technical learning with strong communication and teamwork, because I\'ve seen how much smoother projects run when those skills come together.',
      action: 'For example: In my final-year project, I organised weekly check-ins, created shared documentation, and helped keep the team aligned. In my internship, I proactively improved website performance even though it wasn\'t originally assigned to me. I regularly ask for feedback, take initiative, and look for ways to make the team\'s work easier — whether that\'s writing documentation, automating tasks, or helping a teammate debug an issue.',
      result: 'These actions helped my university team deliver a top-graded project and helped the startup improve customer retention through faster load times. What sets me apart is that I\'m not just focused on writing code — I\'m focused on contributing to the team, improving processes, and continuously learning. I bring initiative, reliability, and a strong willingness to grow.'
    },
    {
      id: 6,
      question: 'Describe a time you worked in a team',
      situation: 'During my final-year project, I worked in a team of four to build a task-management web app. Everyone had different strengths and levels of experience.',
      task: 'We needed to collaborate effectively, divide responsibilities, and deliver a working product within six weeks.',
      action: 'I helped organise the team by setting up weekly check-ins, creating shared documentation, and breaking the project into manageable tasks. I also made sure everyone understood their responsibilities and encouraged open communication when someone was stuck.',
      result: 'We delivered the app on time, presented it to faculty, and received top marks for usability and teamwork. The experience taught me how much smoother projects run when communication and structure are in place.'
    },
    {
      id: 7,
      question: 'How do you handle conflicts with teammates?',
      situation: 'In a group project, two teammates disagreed about which framework to use. The disagreement slowed progress and created tension.',
      task: 'I wanted to help resolve the conflict so we could move forward productively.',
      action: 'I suggested we compare both options objectively. We listed pros and cons, looked at documentation, and considered the learning curve for the whole team. I facilitated the discussion so everyone felt heard.',
      result: 'We agreed on the framework that best fit our timeline and skill set. The conflict eased, and the team worked more smoothly afterwards. I learned that structured discussions help prevent disagreements from becoming personal.'
    },
    {
      id: 8,
      question: 'Tell me about a time you supported a peer',
      situation: 'A classmate struggled with Git and kept losing work during our group project. They felt frustrated and worried about slowing the team down.',
      task: 'I wanted to help them feel more confident and ensure the team could collaborate effectively.',
      action: 'I sat with them after class and walked through branching, merging, and resolving conflicts using simple examples. We practised together, and I shared a cheat sheet I had created for myself.',
      result: 'They became much more confident with Git and started contributing more consistently. Our group workflow improved, and they later helped another teammate with the same issue.'
    },
    {
      id: 9,
      question: 'How do you build relationships with new teammates?',
      situation: 'During my internship, I joined a small engineering team where everyone already knew each other well.',
      task: 'I wanted to integrate smoothly, build trust, and understand how the team worked.',
      action: 'I introduced myself individually to teammates, asked about their roles, and showed genuine interest in their work. I also volunteered to help with small tasks, joined team standups, and asked thoughtful questions during onboarding.',
      result: 'I built strong working relationships quickly. Teammates felt comfortable giving me feedback and involving me in discussions. This helped me learn faster and contribute more effectively.'
    },
    {
      id: 10,
      question: 'What role do you usually take in group work?',
      situation: 'Across university projects and my internship, I noticed I often stepped into a role that balanced organisation and collaboration.',
      task: 'My natural role tends to be helping the team stay aligned and making sure tasks are clear and manageable.',
      action: 'I usually set up shared documentation, break tasks into smaller pieces, and encourage open communication. I\'m not the loudest person in the room, but I\'m proactive about keeping things moving and supporting teammates when they\'re stuck.',
      result: 'Teams I\'ve worked with often deliver projects smoothly and on time. Instructors and teammates have told me they appreciate my reliability and the structure I bring to group work.'
    },
    {
      id: 11,
      question: 'Tell me about a time you faced a challenge',
      situation: 'During a hackathon, our app stopped working an hour before the judging session. The login page kept failing, and the team was stressed.',
      task: 'I needed to identify and fix the issue quickly so we could still present.',
      action: 'I checked the console logs, traced the error to a missing environment variable, and patched the configuration. I tested the fix across devices and communicated updates to the team so they could continue preparing the demo.',
      result: 'The app worked during the judging session, and we ended up winning second place. The experience taught me how to stay calm under pressure and troubleshoot efficiently.'
    },
    {
      id: 12,
      question: 'How do you handle unexpected changes?',
      situation: 'During my internship, the team decided to change the design of a feature halfway through development because of new customer feedback. The update required reworking parts of the UI I had already built.',
      task: 'I needed to adapt quickly, understand the new requirements, and update my work without delaying the team.',
      action: 'I reviewed the new design, clarified the changes with the product manager, and broke the updated tasks into smaller steps. I communicated openly with my teammates about what needed to shift and asked for feedback early to avoid rework. I also reused components where possible to save time.',
      result: 'I completed the updated feature on time, and the new design tested better with users. The experience taught me to stay flexible, communicate clearly, and treat unexpected changes as part of the normal development process.'
    },
    {
      id: 13,
      question: 'Describe a situation where you had to learn quickly',
      situation: 'In a group project, we decided to use a JavaScript library I had never worked with before. I was responsible for implementing a key part of the UI using it.',
      task: 'Learn the library quickly enough to contribute effectively and meet the project deadline.',
      action: 'I spent a weekend going through documentation, tutorials, and example projects. I built small practice components to understand the basics, then applied what I learned to our project. I also asked a teammate with more experience for guidance when I got stuck.',
      result: 'I was able to implement the UI section successfully, and the team delivered the project on time. The experience boosted my confidence in learning new tools quickly and independently.'
    },
    {
      id: 14,
      question: 'How do you approach problems you don\'t know how to solve?',
      situation: 'During my internship, I was assigned a bug that caused inconsistent behaviour across different devices. I had never dealt with cross-device debugging before.',
      task: 'Figure out the root cause and fix the issue, even though the problem was unfamiliar.',
      action: 'I broke the problem down into smaller parts and reproduced the issue on multiple devices. I searched documentation, read similar issues on forums, and used debugging tools to isolate the cause. When I hit a wall, I asked a senior engineer for guidance — not for the answer, but for how they would approach it.',
      result: 'I discovered that a CSS property behaved differently on older browsers. After adjusting the styling and testing again, the issue was resolved. The experience taught me that structured investigation, research, and asking smart questions are key to solving unfamiliar problems.'
    },
    {
      id: 15,
      question: 'Give an example of persistence',
      situation: 'In my final-year project, we had a bug that caused our task-management app to crash randomly. We couldn\'t reproduce it consistently, which made it difficult to fix.',
      task: 'Identify and resolve the bug before the final presentation.',
      action: 'I spent several days adding detailed logs, testing different user flows, and reviewing the code line by line. Even when I couldn\'t reproduce the issue, I kept narrowing down possible causes. Eventually, I found that a missing null check in one function caused the crash under specific conditions.',
      result: 'After fixing the issue, the app ran smoothly during the final demo and received top marks. The experience taught me the value of persistence, patience, and methodical debugging — especially when the solution isn\'t obvious.'
    },
    {
      id: 16,
      question: 'How do you handle feedback?',
      situation: 'Throughout university and during my internship, I regularly received feedback on my code, communication, and project approach.',
      task: 'My goal was to use feedback to improve quickly, especially since I was still building my technical foundations.',
      action: 'Whenever I received feedback, I made sure to listen fully, ask clarifying questions, and take notes. I treated it as guidance rather than criticism. Afterward, I reviewed the feedback, applied it to my next task, and followed up with the person who gave it to confirm I was improving in the right direction.',
      result: 'This approach helped me grow faster, write cleaner code, and communicate more clearly with teammates. It also built trust — people felt comfortable giving me feedback because they knew I acted on it.'
    },
    {
      id: 17,
      question: 'Tell me about a time you improved after feedback',
      situation: 'During my internship, my mentor pointed out that my pull requests were difficult to review because I submitted large chunks of code at once.',
      task: 'I needed to improve how I structured my work so reviews were easier and the team could move faster.',
      action: 'I started breaking tasks into smaller pieces and submitting smaller, more focused pull requests. I also added clearer descriptions and comments explaining my decisions. I asked my mentor to review the next few PRs to confirm I was improving.',
      result: 'My PRs became much easier to review, and the team approved them faster. My mentor told me the improvement was noticeable, and I felt more confident in my workflow.'
    },
    {
      id: 18,
      question: 'How do you stay organized? How do you prioritize tasks?',
      situation: 'In university and during my internship, I often had multiple assignments, deadlines, and tasks happening at the same time.',
      task: 'I needed a system to stay organised and ensure I focused on the most important work first.',
      action: 'I use a combination of digital tools and simple prioritisation methods. I break tasks into smaller steps, estimate how long each will take, and rank them by urgency and impact. I also review my task list at the start and end of each day to stay on track. When working in teams, I align my priorities with the group so we stay coordinated.',
      result: 'This approach helped me meet deadlines consistently, avoid last-minute stress, and stay reliable in group projects. Teammates often commented that I was organised and easy to work with.'
    },
    {
      id: 19,
      question: 'How do you stay focused during long projects?',
      situation: 'In my final-year project, we worked on a multi-week app development assignment that required consistent effort and attention to detail.',
      task: 'I needed to stay focused and motivated over several weeks, even when the work became repetitive or challenging.',
      action: 'I broke the project into weekly goals and smaller milestones so progress felt manageable. I also set up regular check-ins with my team to stay accountable. When I felt stuck or unmotivated, I switched to a different task temporarily or asked for feedback to get unstuck.',
      result: 'I stayed productive throughout the project, avoided burnout, and delivered my part on time. The final product was polished, and our team received top marks for consistency and execution.'
    },
    {
      id: 20,
      question: 'Describe a time you had to explain something technical to someone non-technical',
      situation: 'During my internship, the marketing team asked why the website redesign was taking longer than expected. They weren\'t familiar with technical concepts like refactoring or responsive layout issues.',
      task: 'Explain the delays clearly without overwhelming them with technical jargon.',
      action: 'I broke the explanation into simple concepts, using analogies like "renovating a house while people still live in it." I explained that we were fixing underlying issues to prevent future problems, not just changing the appearance. I also showed before-and-after examples to make the improvements more tangible.',
      result: 'The marketing team understood the situation and appreciated the transparency. Communication improved between teams, and they invited me to future planning meetings because they felt I could bridge the technical gap effectively.'
    },
    {
      id: 21,
      question: 'How do you identify areas to grow?',
      situation: 'During my internship and university projects, I often worked on tasks that pushed me outside my comfort zone, which helped me notice where I needed more confidence or skill.',
      task: 'I wanted a clear way to understand my strengths and identify areas where I could improve technically and professionally.',
      action: 'I regularly reviewed my work and asked for feedback from mentors, teammates, and instructors. I paid attention to patterns — for example, if I struggled with debugging or needed help structuring my code. I also reflected after each project on what felt challenging or slow and turned those into learning goals.',
      result: 'This helped me identify specific growth areas like writing cleaner code, improving testing skills, and communicating more clearly in team settings. Over time, I became more intentional about my development and more confident in tackling new challenges.'
    },
    {
      id: 22,
      question: 'What steps do you take to learn continuously?',
      situation: 'Technology changes quickly, and during my studies and internship, I realised that staying up-to-date is essential.',
      task: 'I wanted to build habits that would help me keep learning even outside formal education.',
      action: 'I follow online tutorials, read documentation, and take short courses on topics I want to improve in. I also build small side projects to practise new concepts, and I ask more experienced engineers for recommendations on tools or resources. When I learn something new, I try to apply it immediately so it sticks.',
      result: 'This approach helped me learn new libraries quickly, improve my debugging skills, and stay confident when facing unfamiliar tasks. Continuous learning has become part of my routine rather than something I only do when required.'
    },
    {
      id: 23,
      question: 'How do you measure progress?',
      situation: 'In long projects or learning new skills, it can be hard to see improvement day-to-day.',
      task: 'I needed a way to track my growth so I could stay motivated and adjust my approach when needed.',
      action: 'I break goals into smaller milestones and track them weekly. For technical skills, I measure progress by how independently I can solve problems, how quickly I complete tasks, and how much feedback I need. For projects, I track completed tasks, blockers, and improvements in code quality or performance.',
      result: 'This helps me stay focused and see clear evidence of improvement. It also makes it easier to communicate progress to teammates or mentors and adjust my learning plan when necessary.'
    },
    {
      id: 24,
      question: 'Tell me about a time you handled unexpected changes',
      situation: 'During my internship, the product team changed the design of a feature halfway through development based on new customer feedback.',
      task: 'I needed to adapt quickly and update my work without delaying the team.',
      action: 'I reviewed the new requirements, clarified details with the product manager, and broke the updated tasks into smaller steps. I reused components where possible and communicated regularly with the team to keep everyone aligned.',
      result: 'I completed the updated feature on time, and the new design performed better in user testing. The experience taught me to stay flexible, communicate clearly, and treat unexpected changes as part of the development process.'
    },
    {
      id: 25,
      question: 'Describe a time you improved documentation',
      situation: 'Our project had no setup instructions, so every teammate had to figure things out individually.',
      task: 'Create clear documentation to help the team.',
      action: 'I wrote a detailed README with setup steps, environment variables, screenshots, and troubleshooting tips. I also added a section explaining the project structure.',
      result: 'Teammates onboarded faster and thanked me for the clarity. The documentation became part of our final submission.'
    },
    {
      id: 26,
      question: 'Describe a challenging technical problem you solved',
      situation: 'In a university project, our web app kept crashing when multiple users logged in at once.',
      task: 'Identify the root cause before the final demo.',
      action: 'I used browser dev tools, added console logs, and simulated multiple users. I found a missing async handler causing race conditions.',
      result: 'After fixing it, the app ran smoothly during the demo and our team received one of the highest grades.'
    },
    {
      id: 27,
      question: 'Tell me about a time you solved a problem creatively',
      situation: 'In a group project, we needed to display real-time updates in our app, but we didn\'t have access to a real backend or live data source.',
      task: 'Find a way to simulate real-time behaviour so we could demonstrate the feature during our presentation.',
      action: 'I created a lightweight mock API using JSON files and a small script that updated the data at intervals. I integrated it with our frontend so it looked and behaved like a real live feed. I also documented the setup so the team could understand and modify it.',
      result: 'The demo ran smoothly, and the instructors were impressed with how realistic the feature felt. It helped our team stand out, and we received high marks for creativity and problem-solving.'
    },
    {
      id: 28,
      question: 'Describe a time you built something from scratch',
      situation: 'I wanted to learn APIs, so I built a weather app.',
      task: 'Build an end-to-end project independently.',
      action: 'Designed the UI, fetched data from an API, and deployed it online.',
      result: 'The project helped me learn async programming and became part of my portfolio.'
    },
    {
      id: 29,
      question: 'Do you have any questions for us?',
      situation: 'At the end of interviews, I like to ask questions that help me understand the team, the role, and how I can contribute effectively.',
      task: 'My goal is to learn more about expectations, growth opportunities, and team culture.',
      action: 'Here are the types of questions I usually ask: Team & Culture: "How does the team collaborate day-to-day, and what does a typical week look like?" Growth: "What skills or qualities help someone succeed in this role during the first 6 months?" Impact: "What are the most important projects the team is focusing on right now?" Support: "How do you support entry-level engineers in learning and development?"',
      result: 'These questions help me understand whether the role is a good fit and show the interviewer that I\'m thoughtful, curious, and serious about contributing to the team.'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Entry-Level STAR Interview Questions and Answers</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Master behavioural interview questions with structured STAR framework responses designed for entry-level candidates
            </p>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use This Pack</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span><strong>Study the STAR structure</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span><strong>Replace the scenario details</strong> with your own experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span><strong>Practice aloud</strong> until your delivery feels natural</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
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
                <h2 className="text-2xl font-bold text-slate-900">Entry-Level Interview Questions</h2>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
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
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 font-bold text-sm rounded-lg">
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
