import { useState } from 'react';
import { Briefcase, Download, Loader2, CheckCircle, Printer } from 'lucide-react';
import { supabase } from '../services/SupabaseClient';

export default function JDGeneratorPage() {
  const [jdText, setJdText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<string | null>(null);

  const generateHTMLFromCVData = (cvData: any): string => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated CV</title>
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            line-height: 1.6;
            color: #333;
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 0 auto;
            background: white;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 20mm;
            }
          }
          
          h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #3498db; 
            padding-bottom: 8px; 
            margin-bottom: 12px;
            font-size: 28px;
          }
          
          h2 { 
            color: #34495e; 
            margin-top: 20px;
            margin-bottom: 12px;
            border-bottom: 2px solid #ecf0f1; 
            padding-bottom: 4px; 
            font-size: 18px;
          }
          
          .contact-info {
            margin-bottom: 20px;
            font-size: 14px;
          }
          
          .contact-info p {
            margin: 4px 0;
          }
          
          .section { 
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          
          .item { 
            margin-bottom: 16px;
            page-break-inside: avoid;
          }
          
          .item-title { 
            font-weight: bold; 
            color: #2980b9; 
            font-size: 16px;
            margin-bottom: 4px;
          }
          
          .item-subtitle { 
            color: #7f8c8d; 
            font-style: italic; 
            margin-bottom: 6px;
            font-size: 14px;
          }
          
          ul { 
            list-style-type: none; 
            padding-left: 0;
            margin-top: 8px;
          }
          
          li { 
            margin-bottom: 6px;
            padding-left: 20px;
            position: relative;
            font-size: 14px;
          }
          
          li:before { 
            content: "•"; 
            color: #3498db; 
            font-weight: bold;
            position: absolute;
            left: 0;
          }
          
          p {
            margin: 6px 0;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <h1>${cvData.personalInfo?.name || 'John Doe'}</h1>
        <div class="contact-info">
          <p><strong>Email:</strong> ${cvData.personalInfo?.email || 'john@example.com'}</p>
          ${cvData.personalInfo?.phone ? `<p><strong>Phone:</strong> ${cvData.personalInfo.phone}</p>` : ''}
          ${cvData.personalInfo?.location ? `<p><strong>Location:</strong> ${cvData.personalInfo.location}</p>` : ''}
        </div>
        
        ${cvData.summary ? `
          <div class="section">
            <h2>Professional Summary</h2>
            <p>${cvData.summary}</p>
          </div>
        ` : ''}
        
        ${cvData.skills && cvData.skills.length > 0 ? `
          <div class="section">
            <h2>Skills</h2>
            <ul>
              ${cvData.skills.map((skill: string) => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${cvData.experience && cvData.experience.length > 0 ? `
          <div class="section">
            <h2>Experience</h2>
            ${cvData.experience.map((exp: any) => `
              <div class="item">
                <div class="item-title">${exp.title || exp.position || 'Position'}</div>
                <div class="item-subtitle">${exp.company || 'Company'} | ${exp.location || ''}</div>
                <p>${exp.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${cvData.education && cvData.education.length > 0 ? `
          <div class="section">
            <h2>Education</h2>
            ${cvData.education.map((edu: any) => `
              <div class="item">
                <div class="item-title">${edu.degree || 'Degree'}</div>
                <div class="item-subtitle">${edu.institution || 'Institution'}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${cvData.certifications && cvData.certifications.length > 0 ? `
          <div class="section">
            <h2>Certifications</h2>
            <ul>
              ${cvData.certifications.map((cert: string) => `<li>${cert}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${cvData.projects && cvData.projects.length > 0 ? `
          <div class="section">
            <h2>Projects</h2>
            ${cvData.projects.map((proj: any) => `
              <div class="item">
                <div class="item-title">${proj.name || 'Project'}</div>
                <p>${proj.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </body>
      </html>
    `;
  };

  const handleGenerate = async () => {
    if (!jdText) {
      setError('Please provide a job description to generate a CV.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setGeneratedCV(null);

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
        setGeneratedCV(data.htmlCV);
      } else if (data.cvData) {
        const htmlCV = generateHTMLFromCVData(data.cvData);
        setGeneratedCV(htmlCV);
      } else {
        throw new Error('No CV content received from API');
      }
    } catch (err: any) {
      console.error('Generate CV error:', err);
      setError(err.message || 'Failed to generate CV.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setJdText('');
    setError(null);
    setGeneratedCV(null);
  };

  const handleDownloadCV = () => {
    if (!generatedCV) return;
    
    const blob = new Blob([generatedCV], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-a4-format.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!generatedCV) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generatedCV);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {!generatedCV ? (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">JD to CV Generator</h2>
                <p className="text-sm text-slate-600">Paste the job description</p>
              </div>
            </div>

            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the job description here..."
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
              disabled={isAnalyzing || !jdText.trim()}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating CV...
                </>
              ) : (
                'Generate CV'
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 lg:p-8 flex flex-col items-center space-y-6">
          {/* Action Buttons */}
          <div className="w-full max-w-[210mm] flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">AI Generated CV</h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleDownloadCV}
                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download HTML
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-all"
              >
                Generate New
              </button>
            </div>
          </div>

          {/* A4 CV Preview - Centered */}
          <div 
            className="bg-white shadow-2xl"
            style={{
              width: '210mm',
              minHeight: '297mm',
              margin: '0 auto'
            }}
          >
            <iframe
              srcDoc={generatedCV}
              className="w-full border-0"
              style={{ 
                height: '297mm',
                display: 'block'
              }}
              title="CV Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}