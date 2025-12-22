import { useState } from 'react';
import { Database, Box, Layers, Code, Users, FileText, Briefcase, Map } from 'lucide-react';

const companies = [
  'Amazon', 'Google', 'Meta',
  'Rivian', 'OpenAI', 'Jane Street',
  'Stripe', 'Uber', 'Microsoft'
];

const topics = [
  { id: 'backend', name: 'Backend Developer', icon: Code },
  { id: 'system', name: 'DevOps Engineer', icon: Box },
  { id: 'lowlevel', name: 'Cloud Engineer', icon: Layers },
  { id: 'fullstack', name: 'Data Analyst', icon: Code },
  { id: 'behavioral', name: 'Cybersecurity Analyst', icon: Users },
  { id: 'company', name: 'Technical Support Engineer', icon: FileText },
  { id: 'projects', name: 'UX/UI Designer', icon: Briefcase },
  { id: 'roadmaps', name: 'AI Prompt Engineer', icon: Map },
];

export default function CompaniesSection() {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need to land offers from{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              top tech companies
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mb-12">
          {companies.map((company, index) => (
            <div
              key={company}
              onMouseEnter={() => setHoveredCompany(company)}
              onMouseLeave={() => setHoveredCompany(null)}
              className={`group relative h-24 bg-white/5 backdrop-blur-xl rounded-2xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                hoveredCompany === company
                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/30 scale-105 bg-white/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.5s ease-out forwards'
              }}
            >
              <span className={`text-lg font-bold transition-all duration-300 ${
                hoveredCompany === company
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 scale-110'
                  : 'text-slate-300'
              }`}>
                {company}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all group"
            >
              <topic.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {topic.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
