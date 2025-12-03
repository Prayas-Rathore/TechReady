import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    /*<section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">*/
    <section className="py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">

      <div className="absolute inset-0 bg-grid-slate-700 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))] opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-10 leading-tight">
            Why DIY Isn’t Enough?
          </h2>

          {/* ⭐ PREMIUM CTA BOX (reduced height) */}
          <div className="max-w-3xl mx-auto px-8 py-8 rounded-2xl bg-slate-800/40 border border-slate-700 shadow-xl backdrop-blur-xl space-y-6">

            {/* Section 1 */}
            <div className="space-y-2">
              <p className="text-xl italic text-white font-semibold">
                Sure, you could:
              </p>

              <p className="
  text-center text-lg text-white font-medium 
  whitespace-normal 
  sm:whitespace-nowrap
  leading-relaxed
">
  <span className="block sm:inline">
    ⬤ Copy random CV templates
  </span>

  <span className="block sm:inline sm:ml-6">
    ⬤ Practice interviews alone
  </span>

  <span className="block sm:inline sm:ml-6">
    ⬤ Watch YouTube tutorials
  </span>
</p>

            </div>

            {/* Section 2 */}
            <p className="text-white text-lg opacity-90">
              But that’s like studying from unverified notes. In today’s market:
            </p>

            {/* Section 3 — gradient, not italic */}
            <p className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">
              Unpolished CV + anxious interview + no feedback = REJECTION.
            </p>

          </div>

          {/* ⭐ OUTSIDE TEXT — aligned, white, italic */}
          <p
  className="
    text-white italic text-lg mx-auto mt-5 
    whitespace-normal 
    sm:whitespace-nowrap
    leading-relaxed
    max-w-3xl
  "
>
  MockITHub blends recruiter logic, interview psychology & AI precision so you don’t get lost in the crowd.
</p>


          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <p className="text-sky-500 font-semibold italic text-center text-lg">
              See How It Works (Demo)
            </p>

            <Link
            to="/signup"
           className="group px-8 py-3 bg-sky-500 text-white rounded-lg transition-all font-semibold text-base flex items-center gap-2 animate-buttonPulse hover:scale-110 hover:bg-sky-600"
>
             Try Free for 3 Days
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Link>

          </div>

          {/* Bottom Features */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <span>Zero-risk sign up</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <span>Cancel instantly anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <span>Guaranteed results or your money back</span>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </section>
  );
}
