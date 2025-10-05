// src/components/LandCard.js
import React from 'react';
import { FiMapPin, FiUser, FiCalendar, FiCheckCircle, FiClock } from 'react-icons/fi';

const LandCard = ({ land, onViewDetails }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {land.title_number}
            </h3>
            <p className="text-slate-600 text-sm flex items-center space-x-1 mt-1">
              <FiMapPin className="w-4 h-4" />
              <span>{land.location}</span>
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            land.verified 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {land.verified ? (
              <div className="flex items-center space-x-1">
                <FiCheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <FiClock className="w-3 h-3" />
                <span>Pending</span>
              </div>
            )}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600 flex items-center space-x-2">
              <FiUser className="w-4 h-4" />
              <span>Owner</span>
            </span>
            <span className="font-semibold text-slate-800">{land.owner_name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-slate-600">Area</span>
            <span className="font-semibold text-slate-800">{land.area} m²</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600 flex items-center space-x-2">
              <FiCalendar className="w-4 h-4" />
              <span>Registered</span>
            </span>
            <span className="font-semibold text-slate-800">{formatDate(land.created_at)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(land)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105 group"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default LandCard;