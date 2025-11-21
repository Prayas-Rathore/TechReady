import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
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

interface ValidationResult {
  isCV: boolean;
  confidence: number;
  reason: string;
  documentType: string;
}

export default function CVAnalyzerPage() {
  const [activeTab, setActiveTab] = useState<'cv' | 'jd'>('cv');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
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

  // Validate CV using AI
  const validateCV = async (text: string): Promise<ValidationResult> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Please sign in to validate CVs');
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-cv`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ cvText: text }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Validation failed');
    }

    return {
      isCV: data.isCV,
      confidence: data.confidence,
      reason: data.reason,
      documentType: data.documentType
    };
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

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB. Please upload a smaller file.');
      return;
    }

    setCvFile(file);
    setError(null);
    setValidationResult(null);
    setIsExtracting(true);

    try {
      let extractedText = '';

      if (file.type === 'text/plain') {
        extractedText = await file.text();
      } else if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPDF(file);
      } else {
        setError('DOC/DOCX extraction coming soon. Please use PDF or TXT for now.');
        setIsExtracting(false);
        setCvFile(null);
        return;
      }

      if (!extractedText || extractedText.trim().length < 50) {
        throw new Error('Could not extract enough text from file');
      }

      setCvText(extractedText);
      console.log('✅ Extracted text length:', extractedText.length);
      
      // ✨ ONLY VALIDATE - Don't analyze yet
      setIsExtracting(false);
      setIsValidating(true);

      const validation = await validateCV(extractedText);
      setValidationResult(validation);

      if (!validation.isCV) {
        setError(
          `⚠️ This appears to be a ${validation.documentType.toUpperCase()}, not a CV/Resume. ${validation.reason}`
        );
        setCvFile(null);
        setCvText('');
      } else {
        console.log('✅ CV validated successfully - Confidence:', validation.confidence);
        // ✅ Don't auto-analyze - user must click button
      }

    } catch (err: any) {
      console.error('Processing error:', err);
      setError(err.message || 'Failed to process file. Please try again.');
      setCvFile(null);
      setCvText('');
    } finally {
      setIsExtracting(false);
      setIsValidating(false);
    }
  };

  // Manual validation for pasted text
  const handleValidatePastedText = async () => {
    if (!cvText || cvText.trim().length < 100) {
      setError('Please paste at least 100 characters of CV content.');
      return;
    }

    setIsValidating(true);
    setError(null);
    setValidationResult(null);

    try {
      const validation = await validateCV(cvText);
      setValidationResult(validation);

      if (!validation.isCV) {
        setError(
          `⚠️ This appears to be a ${validation.documentType.toUpperCase()}, not a CV/Resume. ${validation.reason}`
        );
      } else {
        console.log('✅ CV validated successfully - Confidence:', validation.confidence);
      }
    } catch (err: any) {
      console.error('Validation error:', err);
      setError(err.message || 'Failed to validate content. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleAnalyze = async () => {
    if (!cvText) {
      setError('Please provide a CV to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      console.log('=== ANALYSIS START ===');
      console.log('CV text length:', cvText.length);
      console.log('JD text length:', jdText?.length);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Please sign in to analyze CVs');
        setIsAnalyzing(false);
        return;
      }

      const payload = {
        cvText: cvText,
        jobDescription: jdText || '',
      };

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

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysisResult(data.analysis);
      console.log('=== ANALYSIS COMPLETE ===');
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
    setValidationResult(null);
    setError(null);
  };

  // Check if analyze button should be enabled
  const canAnalyze = validationResult?.isCV === true && cvText.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">CV Analyzer</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Upload your CV and job description to get AI-powered insights and suggestions for improvement
            </p>
            
            {/* Security Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-700 font-medium">
                AI-Protected: Only valid CV/Resume documents accepted
              </span>
            </div>
          </div>

          {!analysisResult ? (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Your CV</h2>
                    <p className="text-sm text-slate-600">Upload or paste your CV/Resume</p>
                  </div>
                </div>

                {/* Requirements Notice */}
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium mb-2">✓ Your CV must include:</p>
                  <ul className="text-xs text-blue-800 space-y-1 ml-4">
                    <li>• Contact information (email or phone)</li>
                    <li>• Work experience or education with dates</li>
                    <li>• Skills or professional qualifications</li>
                    <li>• Proper CV/Resume formatting</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => {
                        setActiveTab('cv');
                        setValidationResult(null);
                        setError(null);
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        activeTab === 'cv'
                          ? 'bg-sky-100 text-sky-600'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('jd');
                        setValidationResult(null);
                        setError(null);
                      }}
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
                          <p className="text-xs text-orange-500 mt-2 font-medium">⚠️ CV/Resume documents only</p>
                        </div>
                        <input
                          id="cv-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.txt"
                          onChange={handleFileUpload}
                          disabled={isExtracting || isValidating}
                        />
                      </label>
                      
                      {cvFile && (
                        <div className="mt-4 flex items-center gap-3 p-4 bg-sky-50 border border-sky-200 rounded-lg">
                          <FileText className="w-5 h-5 text-sky-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{cvFile.name}</p>
                            <p className="text-xs text-slate-600">{(cvFile.size / 1024).toFixed(2)} KB</p>
                            {isExtracting && <p className="text-xs text-sky-600 mt-1">Extracting text...</p>}
                            {isValidating && <p className="text-xs text-sky-600 mt-1">Validating with AI...</p>}
                            {validationResult?.isCV && (
                              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Valid CV - Confidence: {validationResult.confidence}%
                              </p>
                            )}
                          </div>
                          {validationResult?.isCV && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                          {(isExtracting || isValidating) && (
                            <div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <textarea
                        value={cvText}
                        onChange={(e) => {
                          setCvText(e.target.value);
                          setValidationResult(null);
                          setError(null);
                        }}
                        placeholder="Paste your CV content here...&#10;&#10;Include:&#10;• Contact Info (Email/Phone)&#10;• Work Experience with dates&#10;• Education&#10;• Skills&#10;• Professional Summary"
                        className="w-full h-64 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none resize-none"
                      />
                      {cvText.length > 0 && (
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-slate-500">
                            {cvText.length} characters • {cvText.split(/\s+/).length} words
                          </p>
                          {!validationResult && (
                            <button
                              onClick={handleValidatePastedText}
                              disabled={isValidating || cvText.length < 100}
                              className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isValidating ? (
                                <>
                                  <Loader2 className="w-4 h-4 inline animate-spin mr-2" />
                                  Validating...
                                </>
                              ) : (
                                'Validate CV'
                              )}
                            </button>
                          )}
                        </div>
                      )}
                      {validationResult?.isCV && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Valid CV - Confidence: {validationResult.confidence}%</span>
                        </div>
                      )}
                    </div>
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
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-800 font-medium">{error}</p>
                <p className="text-xs text-red-600 mt-1">
                  Make sure your document is a properly formatted CV/Resume with required sections.
                </p>
              </div>
            </div>
          )}

          {!analysisResult && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing || isExtracting || isValidating}
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
                ) : isValidating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Validating CV...
                  </>
                ) : !canAnalyze ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Upload & Validate CV First
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze CV
                  </>
                )}
              </button>

              {/* Validation Status Info */}
              {validationResult && (
                <p className="text-sm text-slate-600">
                  {validationResult.isCV ? (
                    <span className="text-emerald-600 font-medium">
                      ✓ CV validated successfully! Click "Analyze CV" to continue.
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      ✗ Document validation failed. Please upload a valid CV.
                    </span>
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      tse
    </div>
  );
}
