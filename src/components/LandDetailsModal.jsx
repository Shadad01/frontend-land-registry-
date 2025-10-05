// src/components/LandDetailsModal.js
import React from 'react';
import { 
  FiX, 
  FiMapPin, 
  FiUser, 
  FiCalendar, 
  FiFileText, 
  FiCheckCircle, 
  FiClock,
  FiDollarSign,
  FiNavigation,
  FiLayers,
  FiShield,
  FiDownload,
  FiPrinter
} from 'react-icons/fi';

const LandDetailsModal = ({ land, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = () => {
    // Simulate download
    console.log('Downloading document:', land.document_url);
    alert('Document download started!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Land Record Details</h2>
              <p className="text-slate-300">Complete property information</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors duration-200"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FiFileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{land.title_number}</h3>
                <p className="text-slate-300 flex items-center space-x-1">
                  <FiMapPin className="w-4 h-4" />
                  <span>{land.location}</span>
                </p>
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              land.verified 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {land.verified ? (
                <div className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FiClock className="w-4 h-4" />
                  <span>Pending Verification</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <FiUser className="w-5 h-5 text-blue-600" />
                  <span>Basic Information</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Owner Name</span>
                    <span className="text-slate-800 font-semibold">{land.owner_name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Land Area</span>
                    <span className="text-slate-800 font-semibold">{land.area} m²</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Land Use</span>
                    <span className="text-slate-800 font-semibold">{land.land_use}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600 font-medium">Soil Type</span>
                    <span className="text-slate-800 font-semibold">{land.soil_type}</span>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <FiNavigation className="w-5 h-5 text-green-600" />
                  <span>Location Details</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Coordinates</span>
                    <span className="text-slate-800 font-semibold text-sm">{land.coordinates}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-slate-600 font-medium">Boundaries</span>
                    <span className="text-slate-800 text-sm text-right max-w-xs">{land.boundaries}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-6">
              {/* Financial Information */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <FiDollarSign className="w-5 h-5 text-emerald-600" />
                  <span>Financial Information</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Estimated Value</span>
                    <span className="text-emerald-600 font-bold text-lg">{land.estimated_value} RWF</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Zoning</span>
                    <span className="text-slate-800 font-semibold">{land.zoning}</span>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <FiShield className="w-5 h-5 text-purple-600" />
                  <span>Registration Details</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Registered On</span>
                    <span className="text-slate-800 font-semibold">{formatDate(land.created_at)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600 font-medium">Last Updated</span>
                    <span className="text-slate-800 font-semibold">{formatDate(land.last_updated)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600 font-medium">Registered By</span>
                    <span className="text-slate-800 font-semibold">{land.registered_by}</span>
                  </div>
                </div>
              </div>

              {/* Document Actions */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center space-x-2">
                  <FiFileText className="w-5 h-5 text-blue-600" />
                  <span>Documents</span>
                </h4>
                <div className="flex space-x-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                  >
                    <FiDownload className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex-1 bg-slate-600 text-white py-3 px-4 rounded-xl hover:bg-slate-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
                  >
                    <FiPrinter className="w-4 h-4" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors duration-200 font-semibold"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Download Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandDetailsModal;