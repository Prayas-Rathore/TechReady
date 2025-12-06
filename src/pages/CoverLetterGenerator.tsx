import React, { useState } from 'react'
import { CoverLetterService } from '../services/cv-analysis/coverLetterService'
import { CoverLetterRequest } from '../types/coverLetter'

export const CoverLetterGenerator: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [maximumWords, setMaximumWords] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [tone, setTone] = useState<'professional' | 'enthusiastic' | 'formal'>('professional')
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [savedCoverLetterId, setSavedCoverLetterId] = useState<string | null>(null)

  // Validation for button enable/disable
  const isFormValid = () => {
    return jobTitle.trim() !== '' && companyName.trim() !== '' && jobDescription.trim() !== ''
  }

  // Validate word limit
  const validateWordLimit = (value: string): string | null => {
    if (!value) return null // Optional field
    
    const num = parseInt(value)
    
    if (isNaN(num)) {
      return 'Please enter a valid number'
    }
    if (num < 100) {
      return 'Minimum 100 words required'
    }
    if (num > 500) {
      return 'Maximum 500 words allowed'
    }
    return null
  }

  const handleWordLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaximumWords(value)
    
    // Clear error if field is empty (since it's optional)
    if (!value) {
      setError('')
      return
    }
    
    const validationError = validateWordLimit(value)
    if (validationError) {
      setError(validationError)
    } else {
      setError('')
    }
  }

  const handleGenerate = async () => {
    setError('')
    setGeneratedLetter('')
    setSavedCoverLetterId(null)

    // Validate required fields
    if (!jobTitle.trim()) {
      setError('Job Title is required. Example: "Senior Software Engineer"')
      return
    }
    if (!companyName.trim()) {
      setError('Company Name is required. Example: "Google"')
      return
    }
    if (!jobDescription.trim()) {
      setError('Job Description is required. Please paste the full job posting.')
      return
    }

    // Validate job description length
    if (jobDescription.trim().length < 50) {
      setError('Job Description is too short. Please provide more details about the role and requirements.')
      return
    }

    // Validate word limit if provided
    if (maximumWords) {
      const validationError = validateWordLimit(maximumWords)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    setIsGenerating(true)

    try {
      const request: CoverLetterRequest = {
        jobTitle,
        companyName,
        maximumWords: maximumWords || '100', // Default to 100
        jobDescription,
        tone
      }

      const result = await CoverLetterService.generateCoverLetter(request)

      if (result.success && result.generatedText) {
        setGeneratedLetter(result.generatedText)
        setSavedCoverLetterId(result.coverLetter?.id || null)
      } else {
        // Handle API errors with suggestions
        if (result.error?.includes('word limit')) {
          setError(result.error + '. ' + (result as any).suggestion)
        } else {
          setError(result.error || 'Failed to generate cover letter. Please try again.')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please check your inputs and try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
    alert('Cover letter copied to clipboard!')
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([generatedLetter], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `cover-letter-${companyName.replace(/\s+/g, '-').toLowerCase()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Cover Letter Generator</h1>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., Google"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Maximum Words (Optional)
          </label>
          <input
            type="number"
            value={maximumWords}
            onChange={handleWordLimitChange}
            placeholder="Default: 100 words (Min: 100, Max: 500)"
            min="100"
            max="500"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              maximumWords && validateWordLimit(maximumWords) 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            }`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty for 100 words. Range: 100-500 words
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            {jobDescription.length} characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="professional">Professional (Balanced)</option>
            <option value="enthusiastic">Enthusiastic (Energetic)</option>
            <option value="formal">Formal (Traditional)</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">⚠️ {error}</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!isFormValid() || isGenerating || (maximumWords !== '' && validateWordLimit(maximumWords) !== null)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </>
          ) : (
            '✨ Generate Cover Letter'
          )}
        </button>
      </div>

      {generatedLetter && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cover Letter</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                📋 Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                ⬇️ Download
              </button>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <textarea
              value={generatedLetter}
              onChange={(e) => setGeneratedLetter(e.target.value)}
              className="w-full min-h-[400px] font-serif text-base leading-relaxed focus:outline-none resize-none"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            💡 You can edit the cover letter above before copying or downloading
          </p>
        </div>
      )}
    </div>
  )
}
