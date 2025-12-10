import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">

          {/* HEADING — unchanged */}
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Why DIY Isn’t Enough?
            </span>
          </h2>

          {/* DIY BOX */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-7 mb-4 max-w-5xl mx-auto">


            {/* ✅ Single line on desktop, wrap on mobile */}
            <div className="
              flex flex-wrap sm:flex-nowrap 
              justify-center items-center 
              gap-x-2 gap-y-1 
              text-slate-300 text-lg mb-3
            ">
              <span className="font-medium text-slate-200 whitespace-nowrap">
                Sure, you could:
              </span>
              <span className="whitespace-nowrap">
                • Copy random CV templates
            
              </span>
              <span className="whitespace-nowrap">
                • practice interviews alone
              </span>
              <span className="whitespace-nowrap">
               • watch YouTube tutorials
              </span>
            </div>

            <p className="text-slate-400 text-lg mb-2">
              But that’s like studying from unverified notes. In today’s market:
            </p>

            <p className="text-lg italic font-semibold text-pink-400">
              Unpolished CV + anxious interview + no feedback = rejection.
            </p>
          </div>

        

          {/* CTA button — unchanged */}
           <p className="text-white text-2xl font-bold mb-3">
           See How It Works (Demo) &nbsp; &nbsp;
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all"
          >
            <span>Try Free for 3 Days</span>
            <ArrowRight className="w-5 h-5" />
          </Link></p>

        </div>
      </div>
    </section>
  );
}
