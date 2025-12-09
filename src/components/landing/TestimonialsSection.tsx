import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Amazon',
    image: 'SC',
    content: 'InterviewPro was a game-changer for me. The mock interviews were incredibly realistic, and the feedback I received helped me improve my coding speed and communication. Landed my dream job at Amazon!',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager at Microsoft',
    image: 'MR',
    content: 'The behavioral interview prep was outstanding. My interviewer helped me craft compelling stories and frame my experiences perfectly. Got three offers after just two weeks of practice!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist at Meta',
    image: 'PS',
    content: 'I was struggling with technical interviews until I found InterviewPro. The industry experts provided insights I could never get from books or videos. Highly recommend!',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Hear from candidates who transformed their careers with InterviewPro
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all animate-fadeIn"
            >
              <Quote className="w-10 h-10 text-purple-400 mb-4 opacity-50" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>

              <p className="text-slate-300 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
