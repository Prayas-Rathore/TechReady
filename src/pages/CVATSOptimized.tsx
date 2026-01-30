// src/components/ATSCVGenerator.tsx
import { useState } from 'react';
import { supabase } from '../services/SupabaseClient';
import { Download, Sparkles, FileText, Briefcase, Loader2 ,Upload} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface OptimizedCVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    location?: string;
  };
  profile: string;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    location?: string;
    achievements: string[];
  }>;
  skills: {
    technical: string[];
    frameworks: string[];
    tools: string[];
    methodologies: string[];
  };
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
    location?: string;
  }>;
  projects: Array<{
    title: string;
    technologies: string;
    description: string[];
  }>;
  certifications: string[];
  atsScore: number;
  optimizationNotes: string[];
}

export default function ATSCVGenerator() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState('');
  const [jdText, setJdText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<OptimizedCVData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // ✅ Extract text from PDF (reuse from previous code)
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

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB');
      return;
    }

    setCvFile(file);
    setError(null);
    setProgress(20);

    try {
      let text = '';
      if (file.type === 'text/plain') {
        text = await file.text();
      } else if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      }

      setCvText(text);
      setProgress(40);
    } catch (err: any) {
      setError(err.message);
      setCvFile(null);
    }
  };

  // ✅ Generate optimized CV
  const handleGenerateCV = async () => {
    if (!cvText || !jdText) {
      setError('Please provide both CV and Job Description');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(60);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Please sign in');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ats-cv`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ cvText, jobDescription: jdText }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      setGeneratedCV(data.cvData);
      setProgress(100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // ✅ Generate PDF with optimized template
  const generatePDF = () => {
    if (!generatedCV) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(generatedCV.personalInfo.name, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(generatedCV.personalInfo.title, pageWidth / 2, yPos, { align: 'center' });

    // Contact Info
    yPos += 10;
    doc.setFontSize(9);
    const contact = `${generatedCV.personalInfo.location || ''} | ${generatedCV.personalInfo.phone} | ${generatedCV.personalInfo.email}`;
    doc.text(contact, pageWidth / 2, yPos, { align: 'center' });

    if (generatedCV.personalInfo.linkedin || generatedCV.personalInfo.github) {
      yPos += 4;
      const links = [generatedCV.personalInfo.linkedin, generatedCV.personalInfo.github]
        .filter(Boolean)
        .join(' | ');
      doc.text(links, pageWidth / 2, yPos, { align: 'center' });
    }

    // Profile
    yPos += 12;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PROFILE', 15, yPos);
    yPos += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const profileLines = doc.splitTextToSize(generatedCV.profile, pageWidth - 30);
    doc.text(profileLines, 15, yPos);
    yPos += profileLines.length * 5 + 8;

    // Experience
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('EXPERIENCE', 15, yPos);
    yPos += 8;

    generatedCV.experience.forEach((exp) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${exp.company} (${exp.role})`, 15, yPos);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      yPos += 5;
      doc.text(`${exp.duration}${exp.location ? ' - ' + exp.location : ''}`, 15, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      exp.achievements.forEach((achievement) => {
        const lines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 35);
        doc.text(lines, 20, yPos);
        yPos += lines.length * 4.5;
      });
      yPos += 6;
    });

    // Skills
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SKILLS', 15, yPos);
    yPos += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    const skillCategories = [
      { name: 'Technical', skills: generatedCV.skills.technical },
      { name: 'Frameworks', skills: generatedCV.skills.frameworks },
      { name: 'Tools', skills: generatedCV.skills.tools },
      { name: 'Methodologies', skills: generatedCV.skills.methodologies }
    ];

    skillCategories.forEach(category => {
      if (category.skills.length > 0) {
        doc.text(`• ${category.name}: ${category.skills.join(', ')}`, 20, yPos);
        yPos += 5;
      }
    });

    // Add remaining sections (Education, Projects, Certifications)
    // ... (similar pattern)

    // Save
    doc.save(`${generatedCV.personalInfo.name.replace(/\s+/g, '_')}_ATS_Optimized_CV.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">ATS CV Generator</h1>
          <p className="text-lg text-slate-600">
            AI-powered CV optimization for 90%+ ATS score
          </p>
        </div>

        {!generatedCV ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CV Upload */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-bold text-slate-900">Your Current CV</h2>
              </div>
              
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100">
                <Upload className="w-10 h-10 text-slate-400 mb-3" />
                <p className="text-sm text-slate-600 font-medium">Upload your CV</p>
                <p className="text-xs text-slate-500">PDF or TXT (MAX 10MB)</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.txt"
                  onChange={handleFileUpload}
                />
              </label>

              {cvFile && (
                <div className="mt-4 p-3 bg-sky-50 border border-sky-200 rounded-lg">
                  <p className="text-sm font-medium text-slate-900">{cvFile.name}</p>
                  <p className="text-xs text-sky-600">✓ Text extracted</p>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-bold text-slate-900">Job Description</h2>
              </div>
              
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-48 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                {jdText.length} characters
              </p>
            </div>
          </div>
        ) : (
          /* Generated CV Preview */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Generated ATS-Optimized CV</h2>
                <p className="text-sky-600 font-medium">
                  ATS Score: {generatedCV.atsScore}% {generatedCV.atsScore >= 90 && '🎯'}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={generatePDF}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    setGeneratedCV(null);
                    setCvFile(null);
                    setCvText('');
                    setJdText('');
                  }}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50"
                >
                  Generate New
                </button>
              </div>
            </div>

            {/* CV Preview */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center pb-4 border-b-2 border-slate-200">
                <h3 className="text-3xl font-bold text-slate-900">{generatedCV.personalInfo.name}</h3>
                <p className="text-lg text-slate-600 mt-1">{generatedCV.personalInfo.title}</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-sm text-slate-600">
                  <span>{generatedCV.personalInfo.location}</span>
                  <span>•</span>
                  <span>{generatedCV.personalInfo.phone}</span>
                  <span>•</span>
                  <span>{generatedCV.personalInfo.email}</span>
                </div>
              </div>

              {/* Profile */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">PROFILE</h4>
                <p className="text-slate-700">{generatedCV.profile}</p>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">EXPERIENCE</h4>
                <div className="space-y-4">
                  {generatedCV.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-slate-900">{exp.company} ({exp.role})</p>
                          <p className="text-sm text-slate-600">{exp.duration}</p>
                        </div>
                      </div>
                      <ul className="space-y-1 ml-4">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-slate-700">• {achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">SKILLS</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Technical:</p>
                    <p className="text-sm text-slate-600">{generatedCV.skills.technical.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Frameworks:</p>
                    <p className="text-sm text-slate-600">{generatedCV.skills.frameworks.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Optimization Notes */}
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <h4 className="font-bold text-emerald-900 mb-2">✨ Optimizations Applied:</h4>
                <ul className="space-y-1">
                  {generatedCV.optimizationNotes.map((note, idx) => (
                    <li key={idx} className="text-sm text-emerald-700">• {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
            {error}
          </div>
        )}

        {!generatedCV && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGenerateCV}
              disabled={!cvText || !jdText || isGenerating}
              className="px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700 disabled:opacity-50 flex items-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating... {progress}%
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate ATS-Optimized CV
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}