import { Video, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Womenwithvideo from '../assets/images/woman-with-headset.jpg';


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-8 h-8 text-sky-600" />
            <span className="text-2xl font-bold text-slate-900">MockIthub</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
            <Link to="/talentvue" className="text-slate-600 hover:text-slate-900 transition-colors">TalentVue</Link>
          </div>
          <button className="px-6 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all hover:shadow-lg hover:scale-105 font-medium">
            Sign In
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 fill-sky-600" />
              Trusted by 10,000+ job seekers
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Crack Your Next Interview with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                Confidence
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              1-on-1 mock interviews with industry experts. Get real-time feedback, improve your skills, and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link  to="/assessment" className="px-8 py-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all hover:shadow-xl hover:scale-105 font-semibold text-lg group">
                Take A Quiz
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <button className="px-8 py-4 bg-white text-slate-700 rounded-lg border-2 border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all font-semibold text-lg">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" />
                <div>
                  <div className="font-bold text-slate-900">10,000+</div>
                  <div className="text-sm text-slate-600">Success Stories</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <div>
                  <div className="font-bold text-slate-900">4.9/5</div>
                  <div className="text-sm text-slate-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-blue-500 rounded-3xl transform rotate-3 opacity-10" />
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mb-6">
                {/* <Video className="w-20 h-20 text-slate-400" /> */}
                <img src={Womenwithvideo} alt="John Doe" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden">
                      <img  alt="John Doe" className="w-full h-full object-cover" />
                    </div>
                  <div>
                    <div className="font-semibold text-slate-900">John Doe</div>
                    <div className="text-sm text-slate-600">Senior Software Engineer at Google</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 italic">
                  "The mock interviews helped me identify my weak points and improve drastically. Got my dream job in just 3 weeks!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
