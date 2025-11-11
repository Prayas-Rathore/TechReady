import { useState } from 'react';
import { Briefcase, Building, MapPin, DollarSign, Users, Clock, Sparkles, Download, Loader2, CheckCircle, Printer } from 'lucide-react';
import { supabase } from '../services/SupabaseClient';

interface JDResult {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
}

export default function JDGeneratorPage() {
  const [jdText, setJdText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [jdResult, setJdResult] = useState<JDResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

 const handleGenerate = async () => {
     if (!jdText) {
       setError('Please provide a job description to generate a CV.');
       return;
     }
 
     setIsAnalyzing(true);
     setError(null);
 
     try {
       const { data: { session } } = await supabase.auth.getSession();
       if (!session) {
         setError('Please sign in to generate CVs');
         setIsAnalyzing(false);
         return;
       }
 
       const response = await fetch(
         `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-cv`,
         {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${session.access_token}`,
           },
           body: JSON.stringify({
             jobDescription: jdText,
             userProfile: { name: 'John Doe', email: 'john@example.com' }
           }),
         }
       );
 
       const data = await response.json();
       if (!response.ok || !data.success) {
         throw new Error(data.error || 'Generation failed');
       }
 
       if (data.htmlCV) {
         const blob = new Blob([data.htmlCV], { type: 'text/html' });
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = 'generated-cv.html';
         a.click();
       }
     } catch (err: any) {
       console.error('Generate CV error:', err);
       setError(err.message || 'Failed to generate CV.');
     } finally {
       setIsAnalyzing(false);
     }
   };
  // const handleGenerate = async () => {
  //   if (!jdText.trim()) {
  //     setError('Please provide job description details');
  //     return;
  //   }

  //   setIsGenerating(true);
  //   setError(null);

  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 2000));

  //     const mockResult: JDResult = {
  //       title: 'Senior Software Engineer',
  //       company: 'Tech Innovations Inc.',
  //       location: 'Remote',
  //       salary: '$100,000 - $140,000',
  //       type: 'Full-time',
  //       description: `We are seeking a talented Senior Software Engineer to join our technology team. This role offers an exciting opportunity to work on cutting-edge projects and contribute to our company's growth and success.`,
  //       responsibilities: [
  //         'Lead the development and implementation of technology solutions',
  //         'Collaborate with cross-functional teams to deliver high-quality products',
  //         'Mentor junior team members and contribute to technical documentation',
  //         'Participate in code reviews and ensure best practices are followed',
  //         'Stay current with industry trends and emerging technologies'
  //       ],
  //       requirements: [
  //         '5+ years of professional experience in software engineering',
  //         'Strong proficiency in React, TypeScript, and Node.js',
  //         'Bachelor\'s degree in Computer Science, Engineering, or related field',
  //         'Excellent problem-solving and communication skills',
  //         'Experience with Agile development methodologies'
  //       ],
  //       niceToHave: [
  //         'Master\'s degree in relevant field',
  //         'Experience with cloud platforms (AWS, Azure, GCP)',
  //         'Open source contributions',
  //         'Previous leadership or mentorship experience',
  //         'Certifications in relevant technologies'
  //       ],
  //       benefits: [
  //         'Competitive salary and equity package',
  //         'Comprehensive health, dental, and vision insurance',
  //         'Flexible work arrangements and remote options',
  //         'Professional development budget',
  //         '401(k) with company match',
  //         'Generous PTO and paid holidays',
  //         'Team building activities and company events'
  //       ]
  //     };

  //     setJdResult(mockResult);
  //   } catch (err) {
  //     setError('Failed to generate job description. Please try again.');
  //     console.error(err);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const handleReset = () => {
    setJdText('');
    setJdResult(null);
    setError(null);
  };

  const handleDownload = () => {
    if (!jdResult) return;

    const content = `
${jdResult.company.toUpperCase()}
${jdResult.title}

Location: ${jdResult.location}
Type: ${jdResult.type}
Salary: ${jdResult.salary}

ABOUT THE ROLE
${jdResult.description}

KEY RESPONSIBILITIES
${jdResult.responsibilities.map((r, i) => `${i + 1}. ${r}`).join('\n')}

REQUIREMENTS
${jdResult.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

NICE TO HAVE
${jdResult.niceToHave.map((n, i) => `${i + 1}. ${n}`).join('\n')}

BENEFITS
${jdResult.benefits.map((b, i) => `${i + 1}. ${b}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-description-${jdResult.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {!jdResult ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Job Description</h2>
                <p className="text-sm text-slate-600">Paste the job requirements</p>
              </div>
            </div>

            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the job description here...

Example:
- Required Skills: React, TypeScript, Node.js
- Experience: 3+ years
- Education: Bachelor's degree in CS
- Responsibilities: Build web applications..."
              className="w-full h-80 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-sm"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !jdText.trim()}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating CV...
                </>
              ) : (
                <>
                  Generate CV
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 print:shadow-none">
            <div className="flex items-center justify-between mb-6 print:mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Generated Job Description</h2>
              <div className="flex gap-2 print:hidden">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-purple-100 text-purple-600 hover:bg-purple-200 rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-pink-100 text-pink-600 hover:bg-pink-200 rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-all"
                >
                  Create New
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{jdResult.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{jdResult.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{jdResult.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{jdResult.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{jdResult.salary}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">About the Role</h3>
                <p className="text-slate-700 leading-relaxed">{jdResult.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {jdResult.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {jdResult.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Nice to Have</h3>
                <ul className="space-y-2">
                  {jdResult.niceToHave.map((nice, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>{nice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {jdResult.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <Sparkles className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
