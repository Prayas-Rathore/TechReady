import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  {
    name: 'David Kim',
    role: 'Full Stack Developer at Stripe',
    image: 'DK',
    content: 'The resume review service was worth every penny. They helped me highlight my achievements in a way that got me 5x more interview calls. Best investment in my career!',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'UX Designer at Airbnb',
    image: 'EW',
    content: 'As a career changer, I was nervous about interviews. The soft skills training and mock interviews gave me the confidence I needed. Now I am working at my dream company!',
    rating: 5,
  },
  {
    name: 'Alex Johnson',
    role: 'DevOps Engineer at Netflix',
    image: 'AJ',
    content: 'The detailed analytics helped me track my progress and focus on areas that needed improvement. The platform is professional, easy to use, and incredibly effective.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const visibleTestimonials = testimonials.slice(
    currentIndex * 3,
    currentIndex * 3 + 3
  );

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-slate-600">
            Hear from candidates who transformed their careers with InterviewPro
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={currentIndex * 3 + index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-slate-100 animate-fadeIn"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <Quote className="w-10 h-10 text-sky-200 mb-4" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex ? 'bg-sky-600 w-8' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
