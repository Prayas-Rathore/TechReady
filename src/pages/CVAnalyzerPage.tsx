import { useState } from 'react';
import { Upload, FileText, Briefcase, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../services/SupabaseClient';

interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywords: {
    matched: string[];
    missing: string[];
  };
  sections: {
    name: string;
    score: number;
    feedback: string;
  }[];
}

export default function CVAnalyzerPage() {
  const [activeTab, setActiveTab] = useState<'cv' | 'jd'>('cv');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract text from PDF
  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n\n';
    }
    
    return fullText.trim();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid file format (PDF, DOC, DOCX, or TXT)');
      return;
    }

    setCvFile(file);
    setError(null);
    setIsExtracting(true);

    try {
      let extractedText = '';

      if (file.type === 'text/plain') {
        extractedText = await file.text();
      } else if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPDF(file);
      } else {
        // For DOC/DOCX - you'll need mammoth library
        setError('DOC/DOCX extraction coming soon. Please use PDF or TXT for now.');
        setIsExtracting(false);
        return;
      }

      if (!extractedText || extractedText.trim().length < 50) {
        throw new Error('Could not extract enough text from file');
      }

      setCvText(extractedText);
      console.log('Extracted text length:', extractedText.length);
      // Automatically analyze after successful extraction
      // pass the extracted text directly to avoid waiting for setState
      await handleAnalyze(extractedText);
    } catch (err: any) {
      console.error('Extraction error:', err);
      setError('Failed to extract text from file. Please try paste text option.');
      setCvFile(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAnalyze = async (overrideCvText?: string) => {
    // Require at least a CV or Job Description
    if (!cvFile && !cvText && !jdText && !overrideCvText) {
      setError('Please provide at least a CV or Job Description.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      let textContent = overrideCvText ?? cvText;

      // If file was uploaded but text not extracted yet and no override provided
      if (cvFile && !textContent) {
        setError('Please wait for file extraction to complete');
        setIsAnalyzing(false);
        return;
      }

      console.log('=== DEBUG START ===');
      console.log('textContent length:', textContent?.length);
      console.log('jdText length:', jdText?.length);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Please sign in to analyze CVs');
        setIsAnalyzing(false);
        return;
      }

      const payload = {
        cvText: textContent || '',
        jobDescription: jdText || '',
      };

      console.log('Sending payload with lengths:', {
        cvText: payload.cvText.length,
        jobDescription: payload.jobDescription.length,
      });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-cv`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);
      console.log('=== DEBUG END ===');

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysisResult(data.analysis);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCvFile(null);
    setCvText('');
    setJdText('');
    setAnalysisResult(null);
    setError(null);
  };

  const handleGenerateCV = async () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">CV </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Upload your CV and job description to get AI-powered insights and suggestions for improvement
            </p>
          </div>

          {!analysisResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Your CV</h2>
                    <p className="text-sm text-slate-600">Upload or paste your CV</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setActiveTab('cv')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        activeTab === 'cv'
                          ? 'bg-sky-100 text-sky-600'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      onClick={() => setActiveTab('jd')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        activeTab === 'jd'
                          ? 'bg-sky-100 text-sky-600'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Paste Text
                    </button>
                  </div>

                  {activeTab === 'cv' ? (
                    <div>
                      <label
                        htmlFor="cv-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-12 h-12 text-slate-400 mb-4" />
                          <p className="mb-2 text-sm text-slate-600">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-slate-500">PDF or TXT (MAX. 10MB)</p>
                        </div>
                        <input
                          id="cv-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.txt"
                          onChange={handleFileUpload}
                          disabled={isExtracting}
                        />
                      </label>
                      {cvFile && (
                        <div className="mt-4 flex items-center gap-3 p-4 bg-sky-50 border border-sky-200 rounded-lg">
                          <FileText className="w-5 h-5 text-sky-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{cvFile.name}</p>
                            <p className="text-xs text-slate-600">{(cvFile.size / 1024).toFixed(2)} KB</p>
                            {isExtracting && <p className="text-xs text-sky-600 mt-1">Extracting text...</p>}
                            {!isExtracting && cvText && (
                              <p className="text-xs text-emerald-600 mt-1">✓ {cvText.length} characters extracted</p>
                            )}
                          </div>
                          {!isExtracting && cvText && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                          {isExtracting && (
                            <div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <textarea
                      value={cvText}
                      onChange={(e) => setCvText(e.target.value)}
                      placeholder="Paste your CV content here..."
                      className="w-full h-64 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none resize-none"
                    />
                  )}
                </div>
              </div>

              
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg font-medium transition-all"
                  >
                    Analyze Another CV
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                    <div className="text-4xl font-bold text-sky-600 mb-2">{analysisResult.score}%</div>
                    <div className="text-sm font-medium text-slate-600">Overall Match Score</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">{analysisResult.keywords.matched.length}</div>
                    <div className="text-sm font-medium text-slate-600">Matched Keywords</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                    <div className="text-4xl font-bold text-orange-600 mb-2">{analysisResult.keywords.missing.length}</div>
                    <div className="text-sm font-medium text-slate-600">Missing Keywords</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-lg font-bold text-slate-900">Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                      {analysisResult.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-emerald-600 mt-1">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <h3 className="text-lg font-bold text-slate-900">Areas to Improve</h3>
                    </div>
                    <ul className="space-y-2">
                      {analysisResult.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-sky-50 rounded-xl border border-sky-200 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-sky-600" />
                    <h3 className="text-lg font-bold text-slate-900">Suggestions for Improvement</h3>
                  </div>
                  <ul className="space-y-3">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Section-by-Section Analysis</h3>
                  {analysisResult.sections.map((section, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{section.name}</h4>
                        <span className={`text-sm font-bold ${
                          section.score >= 80 ? 'text-emerald-600' :
                          section.score >= 60 ? 'text-sky-600' :
                          'text-orange-600'
                        }`}>
                          {section.score}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full ${
                            section.score >= 80 ? 'bg-emerald-500' :
                            section.score >= 60 ? 'bg-sky-500' :
                            'bg-orange-500'
                          }`}
                          style={{ width: `${section.score}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-600">{section.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {!analysisResult && (
              <div className="mt-6 flex justify-center">
              <button
                onClick={() => handleAnalyze()}
                disabled={isAnalyzing || isExtracting}
                className="px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-sky-500/30"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : isExtracting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Extracting text...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze CV
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}