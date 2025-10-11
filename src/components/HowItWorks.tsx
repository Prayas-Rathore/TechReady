import { Search, Calendar, MessageSquare, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Choose Your Domain',
    description: 'Select from technical interviews, HR rounds, behavioral questions, or specific tech stacks.',
    color: 'from-sky-500 to-blue-500',
  },
  {
    icon: Calendar,
    title: 'Schedule Interview',
    description: 'Pick a convenient time slot with an industry expert matched to your needs.',
    color: 'from-blue-500 to-violet-500',
  },
  {
    icon: MessageSquare,
    title: 'Get Real-Time Feedback',
    description: 'Receive detailed insights on your performance, communication, and technical skills.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Trophy,
    title: 'Land Your Dream Job',
    description: 'Apply your learnings and ace your actual interviews with confidence.',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600">
            Get started in four simple steps and transform your interview skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-sky-200 transition-all hover:shadow-xl h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <div className="absolute -top-4 -right-4 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
