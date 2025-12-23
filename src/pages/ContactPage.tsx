import { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { supabase } from '../services/SupabaseClient'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Store in database
      const { data, error } = await supabase
        .from('contact_queries')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          status: 'pending',
        })
        .select()
        .single()

      if (error) throw error

      // 2. Send email notification (non-blocking)
          supabase.functions.invoke('send-email-from-contact-us', {
            body: {
              name: formData.name.trim(),
              email: formData.email.trim(),
              subject: formData.subject.trim(),
              message: formData.message.trim(),
              queryId: data.id,
            },
          })
        .then(({ error: emailError }) => {
          if (emailError) {
            console.error('Email notification failed:', emailError)
            // Don't fail the whole submission if email fails
          }
        })

      toast.success('Your message has been sent successfully!')
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

 /* ---------------- Success Screen ---------------- */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Message Sent!
            </h2>

            <p className="text-slate-600 mb-8">
              Thank you for reaching out. We’ll get back to you as soon as
              possible.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ---------------- Main Page ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contact Us
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions or feedback? Send us a message and we’ll respond as
            soon as possible.
          </p>
        </div>

        {/* Email Card */}
        <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 text-blue-700 px-5 py-3 rounded-xl text-sm shadow-sm">
                <Mail className="w-4 h-4" />
                <span>
                Prefer email? Reach us at{' '}
                <strong>support@mockithub.ai.</strong>
                </span>
            </div>
            </div>


        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell us more about your question or feedback..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            By submitting this form, you agree to our{' '}
            <a href="/terms" className="text-sky-600 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-sky-600 font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}