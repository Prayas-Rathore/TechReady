import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Target } from 'lucide-react';
import { Testimonial } from '../../data/pricingData';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
        What Our Students Say
      </h2>
      <p className="text-slate-600 text-center mb-8">
        Join thousands of successful developers
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="flex items-center justify-center mb-4">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <blockquote className="text-lg md:text-xl text-slate-700 text-center mb-8 italic leading-relaxed">
            "{currentTestimonial.text}"
          </blockquote>

          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 text-lg">
                  {currentTestimonial.name}
                </div>
                <div className="text-slate-600">
                  {currentTestimonial.role} @ {currentTestimonial.company}
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
              <Target className="w-5 h-5" />
              <span className="font-semibold">{currentTestimonial.outcome}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-600 w-8' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
