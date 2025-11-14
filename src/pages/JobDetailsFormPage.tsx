import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, DollarSign, Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { supabase } from '../services/SupabaseClient';

export default function JobDetailsFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    packageAmount: '',
    joiningDate: '',
    offerLetterUrl: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndExistingData();
  }, []);

  const checkAuthAndExistingData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      setUserId(user.id);

      const { data: existingData, error: fetchError } = await supabase
        .from('job_details')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching existing data:', fetchError);
        return;
      }

      if (existingData) {
        setApprovalStatus(existingData.approval_status);
      }
    } catch (err) {
      console.error('Error checking auth:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or image file (JPG, PNG)');
      return;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setError(null);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    if (!userId) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `offer-letters/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!userId) {
        throw new Error('User not authenticated');
      }

      if (!formData.companyName || !formData.packageAmount || !formData.joiningDate) {
        throw new Error('Please fill in all required fields');
      }

      if (!selectedFile) {
        throw new Error('Please upload your offer or joining letter');
      }

      setUploadingFile(true);
      const fileUrl = await uploadFile(selectedFile);
      setUploadingFile(false);

      const { error: insertError } = await supabase
        .from('job_details')
        .insert({
          user_id: userId,
          company_name: formData.companyName,
          package_amount: parseFloat(formData.packageAmount),
          joining_date: formData.joiningDate,
          offer_letter_url: fileUrl,
          approval_status: 'pending'
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setApprovalStatus('pending');

    } catch (err: any) {
      setError(err.message || 'Failed to submit form. Please try again.');
      setUploadingFile(false);
    } finally {
      setLoading(false);
    }
  };

  if (approvalStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-6">
        <div className="max-w-md bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Submission Under Review</h2>
          <p className="text-slate-600 mb-4">
            Your job details have been submitted successfully and are currently under review by our admin team.
          </p>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
            <p className="text-sm text-amber-800">
              You will be able to access the assessment quiz once your submission is approved.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (approvalStatus === 'approved') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-6">
        <div className="max-w-md bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Approved!</h2>
          <p className="text-slate-600 mb-6">
            Your job details have been approved. You can now access the assessment quiz.
          </p>
          <button
            onClick={() => navigate('/assessment-quiz')}
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all"
          >
            Start Assessment Quiz
          </button>
        </div>
      </div>
    );
  }

  if (approvalStatus === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-6">
        <div className="max-w-md bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Submission Rejected</h2>
          <p className="text-slate-600 mb-6">
            Unfortunately, your job details submission was not approved. Please contact support for more information.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Congratulations on Your New Job!</h1>
          <p className="text-slate-600">Please share your job details to access the assessment quiz</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-900">Submitted Successfully!</p>
              <p className="text-sm text-amber-700">Your submission is now pending admin approval.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="companyName" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                <Building2 className="w-4 h-4 text-slate-600" />
                Company Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Google, Microsoft, Amazon"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="packageAmount" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                <DollarSign className="w-4 h-4 text-slate-600" />
                Package Amount (Annual)
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
                <input
                  type="number"
                  id="packageAmount"
                  name="packageAmount"
                  value={formData.packageAmount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 1200000"
                  className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">Enter your annual CTC in INR</p>
            </div>

            <div>
              <label htmlFor="joiningDate" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                <Calendar className="w-4 h-4 text-slate-600" />
                Date of Joining
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="offerLetter" className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                <Upload className="w-4 h-4 text-slate-600" />
                Offer Letter / Joining Letter
                <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-sky-400 transition-colors">
                <input
                  type="file"
                  id="offerLetter"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label htmlFor="offerLetter" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-3">
                      <Upload className="w-6 h-6 text-sky-600" />
                    </div>
                    {selectedFile ? (
                      <>
                        <p className="font-semibold text-slate-900 mb-1">{selectedFile.name}</p>
                        <p className="text-sm text-slate-600">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {filePreview && (
                          <img src={filePreview} alt="Preview" className="mt-4 max-h-40 rounded-lg border border-slate-200" />
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setFilePreview(null);
                          }}
                          className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove file
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-slate-900 mb-1">Click to upload</p>
                        <p className="text-sm text-slate-600">PDF, JPG, PNG (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || uploadingFile || success}
                className="w-full py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-xl hover:from-sky-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading || uploadingFile ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {uploadingFile ? 'Uploading file...' : 'Submitting...'}
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submitted Successfully
                  </>
                ) : (
                  'Submit & Continue to Assessment'
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Your information is secure and will only be used for assessment purposes
          </p>
        </div>
      </div>
    </div>
  );
}
