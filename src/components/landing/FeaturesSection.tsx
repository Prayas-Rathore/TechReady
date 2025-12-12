import { Zap, Users, FileText, Sparkles, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'JD Scanner & CV Optimiser',
    tagline: 'Transform your CV from “meh” to “hire me now.',
    description: 'Upload a job description or your CV. Our AI cleans up structure, adds keywords, and highlights what recruiters actually care about.',
    benefit: 'Benefit: First impressions that get you interviews—not rejections.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Users,
    title: 'AI-Powered Interview Prep',
    tagline: 'Practice interviews—on your schedule, zero pressure.',
    description: 'MockITHub generates real questions from real job descriptions. Record yourself (text, audio, or video), get instant AI feedback, and sharpen until you’re confident',
    benefit: 'Benefit: No more freezing up. Nervousness → confidence.',
   gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: FileText,
    title: 'Portfolio Branding & Identity;',
     tagline: 'Your career, your brand: stand out everywhere with a cover letter',
     description: 'Your portfolio isn’t just projects—it’s your personal brand. Align your CV, portfolio, and online presence under one identity recruiters remember.',
     benefit: 'Benefit: Professional, confident, hire-ready.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Sparkles,
    
    title: 'Mindset & Confidence Training',
    tagline: 'Success starts in your head',
    description: 'Build mental strength, clarity, and confidence so you walk into interviews calm, focused, and ready to sell yourself.',
    benefit: 'Benefit: The most underrated advantage in job search: self-belief.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Clock,
    title: ' Buddy Model',
    tagline: 'You’re not alone',
    description: 'Connect with peers, share blogs, discover job opportunities, and access interview preparation tips — all in one hub.',
    benefit: 'Benefit: Stay motivated, build confidence, and support each other’s growth',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    icon: Award,
    title: ' Post-Job Growth Roadmap',
    tagline: 'We don’t stop at “you’re hired."',
    description: 'From first-day jitters to the first few months, we guide your early career journey.',
    benefit: 'Benifit: Long-term success, not just a job.',

    gradient: 'from-cyan-400 to-teal-500',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-slate-300">Powered by Advanced AI</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Succeed</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive tools and expert guidance to help you ace any interview
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white ">{feature.title}</h3>
               <p className="italic text-white mb-2     ">
      {feature.tagline}
</p>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>

      

      <p className="underline underline-offset-4 text-pink-400 ">
       {feature.benefit}
      </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
