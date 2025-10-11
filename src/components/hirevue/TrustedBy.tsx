import { Building2 } from 'lucide-react';

const companies = [
  'Microsoft',
  'Amazon',
  'Google',
  'Meta',
  'Apple',
  'Netflix',
  'Tesla',
  'Salesforce',
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
            Trusted by leading companies worldwide
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all group cursor-pointer"
              >
                <Building2 className="w-6 h-6 text-slate-400 group-hover:text-pink-600 transition-colors" />
                <span className="text-lg font-semibold text-slate-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 transition-all whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600">
            Join <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">10,000+</span> companies using TalentVue
          </p>
        </div>
      </div>
    </section>
  );
}
