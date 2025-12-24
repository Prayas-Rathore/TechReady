import { Search, Calendar, MessageSquare, Trophy ,Contact ,UserRoundCheck ,ArrowUpNarrowWide } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Sign UP & Set Your Goal'
  },
  {
    icon: Calendar,
    title: 'Follow a clear Preparation Roadmap',

  },
  {
    icon: MessageSquare,
    title: 'Practice with Mock Interviews',
  },
  {
    icon: Trophy,
    title: 'Built Confidence(Not Just Answers)',
  
  },
  {
    icon: Contact,
    title: 'Get Support from the Community',
  
  },
  {
    icon: UserRoundCheck,
    title: 'ShowUp Interview-Ready'
  },
  {
    icon: ArrowUpNarrowWide,
    title: 'Keep Growing(Even After you are Hired)',
  
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-32 bg-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Your Journey to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Interview Success</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get started in four simple steps and transform your interview skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                {/* <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
