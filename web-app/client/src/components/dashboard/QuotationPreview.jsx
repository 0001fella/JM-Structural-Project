import React, { useState, useMemo } from 'react';
import { useQuotation } from '../../context/QuotationContext';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { 
  FaDownload, 
  FaExpand, 
  FaChartPie,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaRegClock,
  FaRegListAlt,
  FaRegBuilding,
  FaRegFileAlt,
  FaRegLightbulb
} from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const QuotationPreview = () => {
  const { quotationData, aiResults } = useQuotation();
  const [expandedView, setExpandedView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    { 
      id: '1', 
      name: 'Urban Tower Complex', 
      lastUpdated: '2 days ago', 
      status: 'design', 
      progress: 45, 
      aiRecommendations: 12,
      budget: '$12.8M',
      timeline: '18 months',
      team: 8
    },
    { 
      id: '2', 
      name: 'Residential High-Rise', 
      lastUpdated: '1 week ago', 
      status: 'estimation', 
      progress: 78, 
      aiRecommendations: 8,
      budget: '$8.5M',
      timeline: '12 months',
      team: 6
    },
    { 
      id: '3', 
      name: 'Commercial Plaza', 
      lastUpdated: '3 weeks ago', 
      status: 'completed', 
      progress: 100, 
      aiRecommendations: 0,
      budget: '$15.2M',
      timeline: '24 months',
      team: 12
    }
  ];

  // Memoize derived data for performance
  const costBreakdown = useMemo(() => {
    return aiResults?.costBreakdown || [
      { category: 'Materials', amount: 12500, color: '#3b82f6' },
      { category: 'Labor', amount: 8500, color: '#10b981' },
      { category: 'Equipment', amount: 4200, color: '#f59e0b' },
      { category: 'Permits', amount: 1800, color: '#8b5cf6' },
      { category: 'Contingency', amount: 3000, color: '#ec4899' },
    ];
  }, [aiResults]);

  const timeEstimate = useMemo(() => {
    return aiResults?.timeline || {
      weeks: 12,
      days: 3,
      phases: [
        { name: 'Planning', duration: '2 weeks', progress: 100 },
        { name: 'Foundation', duration: '3 weeks', progress: 0 },
        { name: 'Framing', duration: '2 weeks', progress: 0 },
        { name: 'Finishing', duration: '5 weeks', progress: 0 },
      ]
    };
  }, [aiResults]);

  const tabConfig = [
    { id: 'summary', label: 'Summary', icon: <FaRegListAlt /> },
    { id: 'breakdown', label: 'Breakdown', icon: <FaChartPie /> },
    { id: 'timeline', label: 'Timeline', icon: <FaRegClock /> },
    { id: 'materials', label: 'Materials', icon: <FaRegBuilding /> }
  ];

  if (!aiResults) {
    return (
      <div className="flex justify-center items-center min-h-96 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 ${
        expandedView ? 'fixed inset-0 z-50 m-0' : 'relative'
      }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-800/30 p-2 rounded-lg mr-3">
              <FaRegFileAlt className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Project Quotation</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setExpandedView(!expandedView)}
              className="p-2 text-white hover:bg-blue-700/30 rounded-full"
            >
              <FaExpand />
            </button>
            <button className="p-2 text-white hover:bg-blue-700/30 rounded-full">
              <FaDownload />
            </button>
            {expandedView && (
              <button 
                onClick={() => setExpandedView(false)}
                className="p-2 text-white hover:bg-blue-700/30 rounded-full"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
        
        {/* Project Navigation */}
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentProject(prev => Math.max(0, prev - 1))}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                disabled={currentProject === 0}
              >
                <FaChevronLeft />
              </button>
              <span className="mx-4 text-gray-700 font-medium">
                {projects[currentProject].name}
              </span>
              <button 
                onClick={() => setCurrentProject(prev => Math.min(projects.length - 1, prev + 1))}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                disabled={currentProject === projects.length - 1}
              >
                <FaChevronRight />
              </button>
            </div>
            <div className="flex">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentProject(idx)}
                  className={`w-2 h-2 rounded-full mx-1 ${idx === currentProject ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabConfig.map((tab, index) => (
              <button
                key={tab.id}
                className={`flex items-center px-5 py-3 font-medium relative ${
                  activeTab === index 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(index)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Summary Tab */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-3">Project Overview</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Project Name</p>
                    <p className="font-medium">{projects[currentProject].name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-medium text-blue-700">{projects[currentProject].budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="font-medium">{projects[currentProject].timeline}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-3">AI Analysis</h3>
                <div className="flex items-center mb-4">
                  <div className="bg-cyan-100 p-2 rounded-full mr-3">
                    <FaRegLightbulb className="text-cyan-600" />
                  </div>
                  <p className="text-cyan-700">
                    {projects[currentProject].aiRecommendations} recommendations available
                  </p>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90">
                  View Recommendations
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-3">Progress</h3>
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Overall Progress</span>
                    <span className="text-sm font-medium">{projects[currentProject].progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" 
                      style={{ width: `${projects[currentProject].progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Estimation Phase</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown Tab */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Cost Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="amount"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Cost Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costBreakdown}>
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                      <Legend />
                      <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 2 && (
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-6">Project Timeline</h3>
              
              <div className="space-y-6">
                {timeEstimate.phases.map((phase, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800">{phase.name}</h4>
                      <span className="text-sm text-gray-600">{phase.duration}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full" 
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <FaRegLightbulb className="text-blue-600 mr-3" />
                  <p className="text-blue-700">
                    AI recommends overlapping foundation and framing phases to save 2 weeks
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-gray-200 p-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Estimated Cost</p>
              <p className="text-2xl font-bold text-blue-700">
                ${(quotationData?.total || 0).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600">
                Export Quotation
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuotationPreview;