// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LandCard from '../components/LandCard';
import LandDetailsModal from '../components/LandDetailsModal';
import { useAuth } from '../context/AuthContext';
import { 
  FiUpload, 
  FiSearch, 
  FiDollarSign, 
  FiPlus,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiArrowRight,
  FiTrendingUp,
  FiMapPin,
  FiUser,
  FiCalendar,
  FiBarChart2
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLand, setSelectedLand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalValue: 0,
    averageArea: 0,
    recentActivity: 0
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const landsData = [
        {
          id: 1,
          title_number: 'TL001234',
          location: 'Kigali, Nyarugenge',
          area: '250',
          owner_name: 'John Doe',
          verified: true,
          created_at: '2024-01-10',
          estimated_value: '75,000,000',
          status: 'verified',
          coordinates: '1.9500° S, 30.0586° E',
          land_use: 'Residential',
          soil_type: 'Clay Loam',
          zoning: 'R1',
          document_url: '/documents/tl001234.pdf',
          last_updated: '2024-01-15',
          registered_by: 'Rwanda Land Authority',
          boundaries: 'North: Road, South: River, East: School, West: Commercial'
        },
        {
          id: 2,
          title_number: 'TL001235',
          location: 'Kigali, Gasabo',
          area: '180',
          owner_name: 'John Doe',
          verified: false,
          created_at: '2024-01-15',
          estimated_value: '45,000,000',
          status: 'pending',
          coordinates: '1.9441° S, 30.0619° E',
          land_use: 'Commercial',
          soil_type: 'Sandy Loam',
          zoning: 'C2',
          document_url: '/documents/tl001235.pdf',
          last_updated: '2024-01-15',
          registered_by: 'Rwanda Land Authority',
          boundaries: 'North: Residential, South: Park, East: Road, West: Residential'
        },
        {
          id: 3,
          title_number: 'TL001236',
          location: 'Kigali, Kicukiro',
          area: '320',
          owner_name: 'John Doe',
          verified: true,
          created_at: '2024-01-08',
          estimated_value: '95,000,000',
          status: 'verified',
          coordinates: '1.9686° S, 30.1027° E',
          land_use: 'Agricultural',
          soil_type: 'Volcanic Soil',
          zoning: 'A1',
          document_url: '/documents/tl001236.pdf',
          last_updated: '2024-01-12',
          registered_by: 'Rwanda Land Authority',
          boundaries: 'North: Forest, South: Road, East: Farmland, West: River'
        }
      ];
      
      setLands(landsData);
      
      // Calculate additional stats
      const totalValue = landsData.reduce((sum, land) => {
        const value = parseInt(land.estimated_value.replace(/,/g, ''));
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      const averageArea = landsData.reduce((sum, land) => sum + parseInt(land.area), 0) / landsData.length;
      const recentActivity = landsData.filter(land => {
        const landDate = new Date(land.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return landDate > weekAgo;
      }).length;

      setStats({
        totalValue,
        averageArea: Math.round(averageArea),
        recentActivity
      });
      
      setLoading(false);
    }, 1500);
  }, []);

  const handleViewDetails = (land) => {
    setSelectedLand(land);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLand(null);
  };

  const verifiedCount = lands.filter(land => land.verified).length;
  const pendingCount = lands.filter(land => !land.verified).length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Enhanced Welcome */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiHome className="text-white w-7 h-7" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <FiCheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text text-transparent">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-slate-600 text-lg mt-1 flex items-center">
                  <span>Here's your property portfolio overview</span>
                  <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Account Status</p>
                <p className="font-semibold text-slate-800">Verified User</p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-blue-100 text-sm font-medium">Total Properties</p>
                <p className="text-3xl font-bold mt-2">{lands.length}</p>
                <div className="flex items-center space-x-1 mt-3">
                  <FiTrendingUp className="w-4 h-4 text-green-300" />
                  <span className="text-blue-100 text-sm">Active portfolio</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-emerald-100 text-sm font-medium">Verified</p>
                <p className="text-3xl font-bold mt-2">{verifiedCount}</p>
                <div className="flex items-center space-x-1 mt-3">
                  <FiCheckCircle className="w-4 h-4 text-white" />
                  <span className="text-emerald-100 text-sm">Officially certified</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-amber-100 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold mt-2">{pendingCount}</p>
                <div className="flex items-center space-x-1 mt-3">
                  <FiClock className="w-4 h-4 text-white" />
                  <span className="text-amber-100 text-sm">Under review</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FiClock className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-purple-100 text-sm font-medium">Portfolio Value</p>
                <p className="text-2xl font-bold mt-2">{formatCurrency(stats.totalValue)}</p>
                <div className="flex items-center space-x-1 mt-3">
                  <FiBarChart2 className="w-4 h-4 text-white" />
                  <span className="text-purple-100 text-sm">Total estimated value</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FiDollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions with Enhanced Design */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl p-8 mb-8 shadow-2xl border border-slate-700 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Quick Actions</h2>
              <p className="text-slate-300 text-lg">Manage your land portfolio with ease</p>
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <FiTrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
            <Link 
              to="/upload" 
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FiUpload className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">Register Land</h3>
                  <p className="text-slate-300 text-sm">Add new property to registry</p>
                </div>
                <FiArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </Link>
            
            <Link 
              to="/search" 
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FiSearch className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">Search Records</h3>
                  <p className="text-slate-300 text-sm">Find land information</p>
                </div>
                <FiArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </Link>
            
            <Link 
              to="/transactions" 
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FiDollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">Transactions</h3>
                  <p className="text-slate-300 text-sm">View all activities</p>
                </div>
                <FiArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Land Records with Enhanced Design */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent mb-3">
                Your Land Records
              </h2>
              <p className="text-slate-600 text-lg">Manage and monitor your property portfolio</p>
            </div>
            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              <div className="flex items-center space-x-2 bg-slate-100 rounded-xl px-4 py-2">
                <FiMapPin className="w-4 h-4 text-slate-600" />
                <span className="text-slate-700 font-medium">{lands.length} Properties</span>
              </div>
              <Link 
                to="/upload" 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add New Record</span>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl mb-6">
                <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-600 border-t-transparent"></div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Loading Your Portfolio</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                We're gathering your property information and portfolio details...
              </p>
            </div>
          ) : lands.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FiFileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No Land Records Yet</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
                Start building your property portfolio by registering your first land record in the Rwanda Land Registry system.
              </p>
              <Link 
                to="/upload" 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiUpload className="w-6 h-6" />
                <span className="text-lg">Register First Property</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {lands.map(land => (
                <LandCard 
                  key={land.id} 
                  land={land} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <FiCalendar className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-lg">Recent Activity</h3>
            </div>
            <p className="text-slate-300 mb-2">{stats.recentActivity} new records this week</p>
            <p className="text-slate-400 text-sm">Keep your portfolio updated regularly</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <FiBarChart2 className="w-5 h-5 text-white" />
              <h3 className="font-semibold text-lg">Average Area</h3>
            </div>
            <p className="text-blue-100 mb-2">{stats.averageArea} m² average property size</p>
            <p className="text-blue-200 text-sm">Across your entire portfolio</p>
          </div>
        </div>
      </div>

      {/* Land Details Modal */}
      {isModalOpen && selectedLand && (
        <LandDetailsModal 
          land={selectedLand} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default Dashboard;