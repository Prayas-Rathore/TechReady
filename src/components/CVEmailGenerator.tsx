import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Mail, Linkedin, RefreshCw, Sparkles, Copy, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/SupabaseClient';
import toast from 'react-hot-toast';

interface GenerateEmailRequest {
  cvText: string;
  outputType: 'role_fit_summary' | 'application_email' | 'linkedin_message' | 'follow_up_email';
  roleTitle?: string;
  companyName?: string;
  recruiterName?: string;
  candidateName?: string;
}

interface GenerateEmailResponse {
  success: boolean;
  content: string;
  outputType: string;
  tokensUsed: number;
  confidence: number;
  error?: string;
}

const OUTPUT_TYPE_OPTIONS = [
  {
    value: 'role_fit_summary',
    label: 'Role-Fit Summary',
    icon: FileText,
    description: 'A recruiter-facing summary of your profile alignment',
    requiresInput: false
  },
  {
    value: 'application_email',
    label: 'Application Email',
    icon: Mail,
    description: 'Professional job application email with CV highlights',
    requiresInput: true
  },
  {
    value: 'linkedin_message',
    label: 'LinkedIn Message',
    icon: Linkedin,
    description: 'Short recruiter connection message',
    requiresInput: true
  },
  {
    value: 'follow_up_email',
    label: 'Follow-Up Email',
    icon: RefreshCw,
    description: 'Polite application follow-up',
    requiresInput: true
  }
];

export const CVEmailGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [cvText, setCVText] = useState<string>('');
  const [outputType, setOutputType] = useState<string>('role_fit_summary');
  const [roleTitle, setRoleTitle] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [recruiterName, setRecruiterName] = useState<string>('');
  const [candidateName, setCandidateName] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number>(0);

  // Extract text from PDF (same as CVAnalyzerPage)
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

  // Extract text from different file formats
  const extractTextFromFile = async (file: File): Promise<string> => {
    try {
      if (file.type === 'text/plain') {
        return await file.text();
      } 
      else if (file.type === 'application/pdf') {
        const extractedText = await extractTextFromPDF(file);
        
        if (!extractedText || extractedText.length < 50) {
          throw new Error('Could not extract enough text from PDF');
        }
        
        return extractedText;
      } 
      else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        toast.error('DOCX extraction coming soon. Please use PDF or TXT for now.');
        throw new Error('DOCX parsing not yet implemented');
      }
      else if (file.type === 'application/msword') {
        toast.error('DOC format not supported. Please save as PDF or TXT.');
        throw new Error('DOC format not supported');
      }
      else {
        throw new Error('Unsupported file format');
      }
    } catch (error: any) {
      console.error('File extraction error:', error);
      throw error;
    }
  };

  // Handle file upload
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
      toast.error('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setCVFile(file);
    setGeneratedContent('');

    const loadingToast = toast.loading('Extracting text from file...');

    try {
      const text = await extractTextFromFile(file);
      setCVText(text);
      
      toast.dismiss(loadingToast);
      toast.success(`CV uploaded successfully! (${text.length} characters extracted)`);
      
      console.log('✅ Extracted text length:', text.length);
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.message || 'Failed to read file content');
      console.error('File processing error:', error);
      
      setCVFile(null);
      setCVText('');
    }
  };

  // Generate content
  const handleGenerate = async () => {
    if (!cvText) {
      toast.error('Please upload your CV first');
      return;
    }

    const selectedOption = OUTPUT_TYPE_OPTIONS.find(opt => opt.value === outputType);
    
    if (selectedOption?.requiresInput) {
      if (!roleTitle || !companyName) {
        toast.error('Please fill in Role Title and Company Name');
        return;
      }
    }

    setIsLoading(true);
    setGeneratedContent('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please sign in to use this feature');
        return;
      }

      const requestData: GenerateEmailRequest = {
        cvText,
        outputType: outputType as any,
        roleTitle: roleTitle || undefined,
        companyName: companyName || undefined,
        recruiterName: recruiterName || undefined,
        candidateName: candidateName || undefined
      };

      const response = await supabase.functions.invoke<GenerateEmailResponse>(
        'generate-cv-email',
        {
          body: requestData,
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        }
      );

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

      if (response.data?.success && response.data?.content) {
        setGeneratedContent(response.data.content);
        setConfidence(response.data.confidence);
        toast.success('Content generated successfully! ✨');
      } else {
        throw new Error('Invalid response from server');
      }

    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success('Copied to clipboard! 📋');
  };

  const selectedOption = OUTPUT_TYPE_OPTIONS.find(opt => opt.value === outputType);
  const showInputFields = selectedOption?.requiresInput;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">CV-Based Email & Message Generator</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Upload your CV and generate professional emails, messages, and summaries powered by AI
            </p>
          </div>

          {/* CV Upload Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Upload Your CV</h2>
                <p className="text-sm text-slate-600">Upload your CV to get started</p>
              </div>
            </div>

            <label
              htmlFor="cv-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-slate-400 mb-4" />
                <p className="mb-2 text-sm text-slate-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">PDF, DOC, DOCX, or TXT (MAX. 5MB)</p>
              </div>
              <input
                id="cv-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
              />
            </label>

            {cvFile && (
              <div className="mt-4 flex items-center justify-between p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-sky-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{cvFile.name}</p>
                    <p className="text-xs text-slate-600">
                      {(cvFile.size / 1024).toFixed(2)} KB • {cvText.length} characters extracted
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCVFile(null);
                    setCVText('');
                    setGeneratedContent('');
                  }}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Output Type Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Choose Output Type</h2>
                <p className="text-sm text-slate-600">Select the type of content you want to generate</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OUTPUT_TYPE_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      outputType === option.value
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="outputType"
                      value={option.value}
                      checked={outputType === option.value}
                      onChange={(e) => {
                        setOutputType(e.target.value);
                        setGeneratedContent('');
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-sky-600" />
                        <div className="font-semibold text-slate-900">{option.label}</div>
                      </div>
                      <div className="text-sm text-slate-600">{option.description}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Additional Details (conditional) */}
          {showInputFields && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Additional Details</h2>
                  <p className="text-sm text-slate-600">Provide context for better content generation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Role Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Google"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Recruiter Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    placeholder="e.g., Sarah Johnson"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleGenerate}
              disabled={!cvFile || isLoading}
              className={`px-8 py-4 rounded-xl font-semibold text-white transition-all flex items-center gap-3 shadow-lg ${
                !cvFile || isLoading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-teal-700 shadow-sky-500/30'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Content Display */}
          {generatedContent && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Generated Content</h2>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 text-sm font-medium text-sky-600 hover:text-sky-700 border border-sky-600 rounded-lg hover:bg-sky-50 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>

              {confidence > 0 && (
                <div className="flex items-center gap-3 mb-4 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-sky-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">CV Confidence Score</span>
                      <span className="text-sm font-bold text-slate-900">{(confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          confidence > 0.7 ? 'bg-sky-500' : confidence > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed text-sm">
                  {generatedContent}
                </pre>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600 bg-sky-50 p-3 rounded-lg border border-sky-200">
                <AlertCircle className="w-4 h-4 text-sky-600" />
                <span>Tip: Review and personalize the content before sending</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};