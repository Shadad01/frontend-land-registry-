// src/pages/UploadLand.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiMapPin, FiHash, FiSquare, FiFile, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const UploadLand = () => {
  const [formData, setFormData] = useState({
    title_number: '',
    location: '',
    area: '',
    document: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [documentName, setDocumentName] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setDocumentName(files[0].name);
    }
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Land record uploaded successfully! It will be verified soon.');
      setFormData({
        title_number: '',
        location: '',
        area: '',
        document: null
      });
      setDocumentName('');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Failed to upload land record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 mx-auto transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiUpload className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Register New Land</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Fill in the land details to register a new property record in the Rwanda Land Registry
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="w-16 h-1 bg-blue-600 mx-2"></div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">2</span>
                </div>
                <div className="w-16 h-1 bg-gray-300 mx-2"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-semibold">3</span>
                </div>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center space-x-3 animate-fade-in">
                <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">{success}</p>
                  <p className="text-green-600 text-sm mt-1">Redirecting to dashboard...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3 animate-fade-in">
                <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">!</span>
                </div>
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Number Field */}
              <div className="group">
                <label htmlFor="title_number" className="block text-sm font-semibold text-gray-700 mb-3">
                  Title Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiHash className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="title_number"
                    name="title_number"
                    value={formData.title_number}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400"
                    placeholder="e.g., TL001234"
                  />
                </div>
              </div>

              {/* Location Field */}
              <div className="group">
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400"
                    placeholder="e.g., Kigali, Nyarugenge District"
                  />
                </div>
              </div>

              {/* Area Field */}
              <div className="group">
                <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-3">
                  Land Area (m²) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSquare className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    min="1"
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400"
                    placeholder="Enter area in square meters"
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div className="group">
                <label htmlFor="document" className="block text-sm font-semibold text-gray-700 mb-3">
                  Land Document *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="document"
                    name="document"
                    onChange={handleChange}
                    required
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                  />
                  <label
                    htmlFor="document"
                    className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <FiFile className="w-8 h-8 text-gray-400 mb-3 group-hover:text-blue-600 transition-colors" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        {documentName ? documentName : 'Click to upload document'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, JPG, PNG, DOC (Max 10MB)
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  disabled={loading}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload className="w-4 h-4" />
                      <span>Register Land</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">Important Information</p>
                  <p className="text-sm text-blue-700">
                    All land records undergo verification by Rwanda Land Authority. 
                    You will be notified once your registration is approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadLand;