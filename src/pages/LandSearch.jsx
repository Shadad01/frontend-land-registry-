// src/pages/LandSearch.js
import React, { useState } from 'react';
import LandCard from '../components/LandCard';
import { 
  FiSearch, 
  FiFilter, 
  FiX, 
  FiMapPin, 
  FiUser, 
  FiFileText,
  FiHome,
  FiCheckCircle,
  FiClock,
  FiBarChart2,
  FiNavigation
} from 'react-icons/fi';

const LandSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearchPerformed(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          id: 1,
          title_number: 'TL001234',
          location: 'Kigali, Nyarugenge',
          area: '250',
          owner_name: 'John Doe',
          verified: true,
          created_at: '2024-01-10',
          last_updated: '2024-01-15',
          estimated_value: '75,000,000 RWF',
          land_use: 'Residential'
        },
        {
          id: 2,
          title_number: 'TL001235',
          location: 'Kigali, Gasabo',
          area: '180',
          owner_name: 'Jane Smith',
          verified: false,
          created_at: '2024-01-15',
          last_updated: '2024-01-15',
          estimated_value: '45,000,000 RWF',
          land_use: 'Commercial'
        },
        {
          id: 3,
          title_number: 'TL001236',
          location: searchTerm,
          area: '300',
          owner_name: 'Robert Brown',
          verified: true,
          created_at: '2024-01-12',
          last_updated: '2024-01-14',
          estimated_value: '95,000,000 RWF',
          land_use: 'Agricultural'
        },
        {
          id: 4,
          title_number: 'TL001237',
          location: 'Kigali, Kicukiro',
          area: '450',
          owner_name: 'Alice Johnson',
          verified: false,
          created_at: '2024-01-08',
          last_updated: '2024-01-08',
          estimated_value: '120,000,000 RWF',
          land_use: 'Residential'
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setSearchPerformed(false);
  };

  const handleViewDetails = (land) => {
    // Handle view details - could open modal or navigate to detail page
    console.log('View details:', land);
  };

  const handleRequestVerification = (land) => {
    // Handle verification request
    console.log('Request verification:', land);
  };

  const filteredResults = results.filter(land => {
    if (filter === 'verified') return land.verified;
    if (filter === 'unverified') return !land.verified;
    return true;
  });

  const getStats = () => {
    const total = results.length;
    const verified = results.filter(land => land.verified).length;
    const unverified = total - verified;
    return { total, verified, unverified };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <FiSearch className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                Land Records Search
              </h1>
              <p className="text-slate-600 text-lg mt-1">
                Search and verify land records in the Rwanda Land Registry database
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Search Criteria</h2>
            <p className="text-slate-600">
              Enter title number, location, or owner name to search land records
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter title number, location, or owner name..."
                    className="w-full pl-10 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-slate-400 text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Filter Dropdown */}
              <div className="w-full lg:w-48">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFilter className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-800 font-medium appearance-none"
                  >
                    <option value="all">All Records</option>
                    <option value="verified">Verified Only</option>
                    <option value="unverified">Unverified Only</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !searchTerm.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed min-w-32 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <FiSearch className="w-4 h-4" />
                      <span>Search</span>
                    </div>
                  )}
                </button>
                
                {(searchPerformed || searchTerm) && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="bg-slate-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <FiX className="w-4 h-4" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {searchPerformed && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Search Results</h2>
                  <p className="text-slate-300">
                    {filteredResults.length} record{filteredResults.length !== 1 ? 's' : ''} found
                    {filter !== 'all' && ` (${stats.total} total)`}
                  </p>
                </div>
                
                {/* Stats */}
                {results.length > 0 && (
                  <div className="flex gap-6 mt-4 lg:mt-0">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-300">{stats.total}</div>
                      <div className="text-sm text-slate-400">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">{stats.verified}</div>
                      <div className="text-sm text-slate-400">Verified</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-300">{stats.unverified}</div>
                      <div className="text-sm text-slate-400">Pending</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl mb-6">
                  <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-600 border-t-transparent"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Searching Database</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  We're searching through the Rwanda Land Registry database for matching records...
                </p>
              </div>
            )}

            {/* Results Grid */}
            {!loading && filteredResults.length > 0 && (
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredResults.map(land => (
                    <LandCard 
                      key={land.id} 
                      land={land} 
                      onViewDetails={handleViewDetails}
                      onRequestVerification={handleRequestVerification}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Results State */}
            {!loading && searchPerformed && filteredResults.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">No Records Found</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
                  No land records match your search criteria. Try adjusting your search terms or filters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleClearSearch}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => setFilter('all')}
                    className="bg-slate-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Show All Records
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Initial State - Before Search */}
        {!searchPerformed && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FiHome className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent mb-4">
                Rwanda Land Registry Search
              </h2>
              <p className="text-slate-600 mb-12 text-lg max-w-2xl mx-auto">
                Access comprehensive land records information. Search by title number, location, 
                or owner name to verify property details and ownership history with complete transparency.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 group hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <FiFileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-lg">Title Search</h3>
                  <p className="text-slate-600 text-sm">Search by official title number for precise results</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 group hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <FiMapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-lg">Location Search</h3>
                  <p className="text-slate-600 text-sm">Find records by district, sector, or property location</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 group hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <FiUser className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-lg">Owner Search</h3>
                  <p className="text-slate-600 text-sm">Search by property owner name or ID number</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">50,000+</div>
                    <div className="text-sm text-slate-600">Registered Properties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-slate-600">Verified Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-slate-600">Access Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandSearch;