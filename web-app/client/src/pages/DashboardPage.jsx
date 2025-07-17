import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProjectContext } from '../context/ProjectContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBuilding, FaHardHat, FaRobot, FaChartLine,
  FaLightbulb, FaCog, FaSearch, FaBars,
  FaMoon, FaSun, FaTimes, FaPlus, FaUserFriends,
  FaClipboardList, FaBell, FaComments, FaCalendarAlt,
  FaFileInvoiceDollar, FaRulerCombined, FaHome, FaChevronDown,
  FaDraftingCompass, FaCalculator, FaFilePdf, FaCloudUploadAlt,
  FaFileExcel, FaEdit, FaTrashAlt, FaCopy, FaDownload,
  FaGlobeAfrica, FaShieldAlt, FaMapMarkerAlt, FaMoneyBillWave
} from 'react-icons/fa';
import BlueprintUploader from '../components/upload/BlueprintUploader';
import DimensionVisualizer from '../components/ai/DimensionVisualizer';
import EditableBOQ from "../components/quotation/EditableBOQ";
import QuotationPreview from '../components/dashboard/QuotationPreview';
import StatsWidget from '../components/dashboard/StatsWidget';
import ProjectCard from '../components/project/ProjectCard';
import AiAssistant from '../components/ai/aiAssistant';
import SidebarNavigation from '../components/navigation/SidebarNavigation';
import TopNavigation from '../components/navigation/TopNavigation';
import DashboardHero from '../components/dashboard/DashboardHero';
import InsightsCarousel from '../components/ai/InsightsCarousel';
import ActivityFeed from '../components/activity/ActivityFeed';
import QuotationWorkflow from '../components/quotation/QuotationWorkflow';
import QuotationManager from '../components/quotation/QuotationManager';
import { generatePDF, generateExcel } from '../utils/exportUtils';

const DashboardPage = () => {
  const { currentUser, logout, loading } = useAuth(); // Destructure loading from useAuth
  const { currentProject, setCurrentProject, projects, updateProject } = useContext(ProjectContext);
  const navigate = useNavigate();

  // State management
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiAssistantVisible, setAiAssistantVisible] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [teamMembers, setTeamMembers] = useState([]);
  const [aiResults, setAiResults] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [quotation, setQuotation] = useState(null);
  const [activeQuotationStep, setActiveQuotationStep] = useState(0);
  const [quotationHistory, setQuotationHistory] = useState([]);
  const [selectedQuotationId, setSelectedQuotationId] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [kenyanLocations] = useState(['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret']);

  // Enhanced theme-based styling with Kenyan colors
  const themeClasses = useMemo(() => ({
    bgColor: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    textColor: darkMode ? 'text-gray-100' : 'text-gray-800',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    borderColor: darkMode ? 'border-gray-700' : 'border-gray-200',
    headerBg: darkMode ? 'bg-gray-800' : 'bg-white',
    sidebarBg: darkMode ? 'bg-gray-800' : 'bg-white',
    inputBg: darkMode ? 'bg-gray-700' : 'bg-gray-100',
    hoverBg: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    secondaryText: darkMode ? 'text-gray-400' : 'text-gray-500',
    shadow: darkMode ? 'shadow-xl' : 'shadow-lg',
    heroBg: darkMode
      ? 'bg-gradient-to-r from-green-900 via-black to-red-800'
      : 'bg-gradient-to-r from-green-600 via-black to-red-500',
    buttonPrimary: 'bg-gradient-to-r from-green-600 to-red-500 hover:opacity-90',
    buttonSecondary: darkMode
      ? 'bg-gray-700 hover:bg-gray-600'
      : 'bg-gray-200 hover:bg-gray-300'
  }), [darkMode]);

  // Kenyan-specific AI insights
  const aiInsights = useMemo(() => [
    {
      id: 1,
      title: "Material Cost Reduction",
      description: "AI recommends locally sourced materials that could save 1.2M KES on your Nairobi Towers project",
      icon: <FaMoneyBillWave className="h-5 w-5" />,
      color: "bg-gradient-to-r from-green-500 to-yellow-400"
    },
    {
      id: 2,
      title: "KEBS Compliance",
      description: "Blueprint adjustments needed for 3 sections to meet Kenyan building standards",
      icon: <FaShieldAlt className="h-5 w-5" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      id: 3,
      title: "Local Labor Optimization",
      description: "Recommend hiring local artisans from Kisumu to reduce labor costs by 15%",
      icon: <FaUserFriends className="h-5 w-5" />,
      color: "bg-gradient-to-r from-purple-500 to-indigo-400"
    },
    {
      id: 4,
      title: "Climate Adaptation",
      description: "Add thermal insulation to reduce cooling costs in Mombasa climate",
      icon: <FaGlobeAfrica className="h-5 w-5" />,
      color: "bg-gradient-to-r from-yellow-500 to-amber-400"
    }
  ], []);

  // Kenyan activities
  const activities = useMemo(() => [
    { id: 1, user: "Kamau Mwangi", action: "uploaded updated blueprints", project: "Nairobi Business Hub", time: "10 min ago" },
    { id: 2, user: "Aisha Hassan", action: "approved budget changes", project: "Mombasa Waterfront", time: "45 min ago" },
    { id: 3, user: "Juma Otieno", action: "added Kenyan material specifications", project: "Kisumu Mall", time: "2 hours ago" },
    { id: 4, user: "Wanjiku Kimani", action: "completed NCA compliance review", project: "Nakuru Housing", time: "5 hours ago" }
  ], []);

  // Kenyan material prices (KES)
  const kenyanMaterialPrices = useMemo(() => ({
    'Concrete': 15000,    // per cubic meter
    'Steel': 350,          // per kg
    'Glass': 4500,         // per sq meter
    'Timber': 1200,        // per meter
    'Bricks': 25,          // per piece
    'Sand': 2500,          // per ton
    'Cement': 850,         // per bag
    'Stone': 1800          // per ton
  }), []);

  // Kenyan labor rates (KES)
  const kenyanLaborRates = useMemo(() => ({
    'Mason': 2500,
    'Carpenter': 2200,
    'Electrician': 2800,
    'Plumber': 2600,
    'Steel Fixer': 2300,
    'Painter': 2000,
    'Tiler': 2400,
    'Roofer': 2100
  }), []);

  // Process blueprint with AI - Enhanced for Kenyan context
  const processBlueprint = useCallback((files) => {
    setProcessingStatus('processing');
    setFilePreviews(files.map(file => URL.createObjectURL(file)));

    // Simulate AI processing with Kenyan data
    const processingTimeout = setTimeout(() => {
      const aiData = {
        costEstimate: 18500000, // KES
        dimensions: {
          area: 2450,
          rooms: 8,
          floors: 3,
          height: 9.2,
          materials: [
            { name: 'Concrete', quantity: 120, unit: 'cubic meters', code: 'CON-5000' },
            { name: 'Steel', quantity: 45, unit: 'tons', code: 'STL-7000' },
            { name: 'Glass', quantity: 1200, unit: 'sq meters', code: 'GLS-3000' },
            { name: 'Timber', quantity: 850, unit: 'meters', code: 'WD-4500' },
            { name: 'Bricks', quantity: 18000, unit: 'units', code: 'BRK-2000' }
          ],
          structuralElements: [
            { name: 'Foundation', type: 'Raft', area: 850 },
            { name: 'Columns', type: 'Reinforced Concrete', count: 24 },
            { name: 'Beams', type: 'Steel I-Beam', length: 320 }
          ]
        },
        costBreakdown: [
          { category: 'Materials', amount: 7500000, percentage: 60 },
          { category: 'Labor', amount: 3500000, percentage: 28 },
          { category: 'Equipment', amount: 800000, percentage: 6.4 },
          { category: 'Permits', amount: 250000, percentage: 2 },
          { category: 'Contingency', amount: 450000, percentage: 3.6 },
        ],
        recommendations: [
          "Use Bamburi cement for better durability in Nairobi's climate",
          "Consider precast concrete to reduce labor costs by 15%",
          "Source timber from Kakamega for cost savings"
        ],
        kenyanStandards: {
          ncaCompliant: true,
          kebsApproved: true,
          countyPermits: ['Nairobi', 'Kiambu']
        }
      };

      setAiResults(aiData);
      setProcessingStatus('complete');
      setActiveQuotationStep(1);

      // Update project context
      if (currentProject) {
        const updatedProject = {
          ...currentProject,
          dimensions: aiData.dimensions,
          costEstimate: aiData.costEstimate,
          blueprints: files.length,
          location: kenyanLocations[Math.floor(Math.random() * kenyanLocations.length)]
        };
        setCurrentProject(updatedProject);
        updateProject(updatedProject);
      }
    }, 3000);

    return () => clearTimeout(processingTimeout);
  }, [currentProject, setCurrentProject, updateProject, kenyanLocations]);

  // Enhanced quotation generation for Kenyan context
  const generateQuotation = useCallback(() => {
    if (!aiResults) return;

    const newQuotation = {
      id: `QT-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      projectId: currentProject?.id || 'new-project',
      project: currentProject?.name || 'New Project',
      client: currentProject?.client || 'Client Name',
      location: currentProject?.location || 'Nairobi',
      currency: 'KES',
      vatRate: 0.16, // Kenyan VAT rate
      items: aiResults.dimensions.materials.map(material => ({
        id: `ITEM-${Math.random().toString(36).substr(2, 9)}`,
        itemCode: material.code,
        item: material.name,
        description: `Construction ${material.name}`,
        quantity: material.quantity,
        unit: material.unit,
        unitPrice: kenyanMaterialPrices[material.name] || calculateUnitPrice(material.name),
        total: (kenyanMaterialPrices[material.name] || calculateUnitPrice(material.name)) * material.quantity
      })),
      laborItems: [
        {
          id: 'LAB-001',
          item: 'Foundation Work',
          description: 'Excavation and pouring',
          quantity: 1,
          unit: 'project',
          unitPrice: 85000,
          total: 85000
        },
        {
          id: 'LAB-002',
          item: 'Structural Framing',
          description: 'Steel and concrete work',
          quantity: 1,
          unit: 'project',
          unitPrice: 145000,
          total: 145000
        },
        {
          id: 'LAB-003',
          item: 'Exterior Finishing',
          description: 'Brickwork and cladding',
          quantity: 1,
          unit: 'project',
          unitPrice: 120000,
          total: 120000
        }
      ],
      summary: {
        subtotal: aiResults.costEstimate,
        tax: aiResults.costEstimate * 0.16,
        discount: 0,
        total: aiResults.costEstimate * 1.16
      },
      status: 'draft',
      notes: 'Generated from architectural design analysis - Kenyan Standards',
      createdBy: currentUser?.displayName || 'System',
      kenyanRequirements: {
        ncaCertificate: true,
        kebsApproval: true,
        countyPermit: currentProject?.location || 'Nairobi'
      }
    };

    setQuotation(newQuotation);
    setQuotationHistory(prev => [...prev, newQuotation]);
    setSelectedQuotationId(newQuotation.id);
    setActiveQuotationStep(2);
  }, [aiResults, currentProject, currentUser, kenyanMaterialPrices, calculateUnitPrice]); // Added calculateUnitPrice to dependencies

  // Enhanced material pricing for Kenya
  const calculateUnitPrice = useCallback((material) => {
    // Default Kenyan prices if not in kenyanMaterialPrices
    const prices = {
      'Concrete': 15000,
      'Steel': 350,
      'Glass': 4500,
      'Timber': 1200,
      'Bricks': 25,
      'Sand': 2500,
      'Cement': 850,
      'Stone': 1800
    };
    return prices[material] || 0;
  }, []);

  // Save quotation to history
  const saveQuotation = useCallback((updatedQuotation) => {
    setQuotation(updatedQuotation);
    setQuotationHistory(prev =>
      prev.map(q => q.id === updatedQuotation.id ? updatedQuotation : q)
    );
  }, []);

  // Duplicate quotation
  const duplicateQuotation = useCallback((quotationId) => {
    const original = quotationHistory.find(q => q.id === quotationId);
    if (!original) return;

    const duplicate = {
      ...original,
      id: `QT-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      notes: `Copy of ${original.id}`
    };

    setQuotation(duplicate);
    setQuotationHistory(prev => [...prev, duplicate]);
    setSelectedQuotationId(duplicate.id);
  }, [quotationHistory]);

  // Delete quotation
  const deleteQuotation = useCallback((quotationId) => {
    setQuotationHistory(prev => prev.filter(q => q.id !== quotationId));
    if (quotation?.id === quotationId) {
      setQuotation(quotationHistory.length > 1
        ? quotationHistory.find(q => q.id !== quotationId)
        : null
      );
    }
  }, [quotation, quotationHistory]);

  // Export quotation
  const exportQuotation = useCallback((format, quotationData) => {
    const data = quotationData || quotation;
    if (!data) return;

    if (format === 'pdf') {
      generatePDF(data);
    } else if (format === 'excel') {
      generateExcel(data);
    }
  }, [quotation]);

  // Effects
  useEffect(() => {
    // Redirect if not logged in
    // This effect runs when the component mounts or when currentUser/loading changes.
    // It ensures that the user is redirected to the login page if they are not authenticated
    // and the authentication status is no longer loading.
    if (!loading && !currentUser) {
      navigate('/login'); // Redirect to your login page
    }
  }, [currentUser, loading, navigate]); // Dependencies for this effect

  useEffect(() => {
    // Persist dark mode preference
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    // Simulate Kenyan team members
    setTeamMembers([
      { id: 1, name: 'Kamau Mwangi', role: 'Lead Architect', avatarColor: 'bg-green-500' },
      { id: 2, name: 'Aisha Hassan', role: 'Project Manager', avatarColor: 'bg-red-500' },
      { id: 3, name: 'Juma Otieno', role: 'QS Specialist', avatarColor: 'bg-black' },
      { id: 4, name: 'Wanjiku Kimani', role: 'Structural Engineer', avatarColor: 'bg-yellow-500' },
    ]);

    // Load existing quotations for current project
    if (currentProject?.id) {
      const projectQuotations = JSON.parse(localStorage.getItem(`quotations-${currentProject.id}`)) || [];
      setQuotationHistory(projectQuotations);
      if (projectQuotations.length > 0) {
        setQuotation(projectQuotations[0]);
        setSelectedQuotationId(projectQuotations[0].id);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode, currentProject]);

  // Save quotations to localStorage when they change
  useEffect(() => {
    if (currentProject?.id && quotationHistory.length > 0) {
      localStorage.setItem(`quotations-${currentProject.id}`, JSON.stringify(quotationHistory));
    }
  }, [quotationHistory, currentProject]);

  // Event handlers
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);
  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);
  const toggleNotifications = useCallback(() => setNotificationCount(0), []);
  const toggleUserMenu = useCallback(() => setIsUserMenuOpen(prev => !prev), []);

  // Show a loading indicator or null if authentication is still in progress
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-green-500 mb-4" />
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Render the dashboard only if currentUser exists
  if (!currentUser) {
    return null; // Or a simple message, as the useEffect will redirect
  }

  return (
    <div className={`min-h-screen ${themeClasses.bgColor} ${themeClasses.textColor} flex transition-colors duration-300`}>
      {/* Top Navigation */}
      <TopNavigation
        darkMode={darkMode}
        themeClasses={themeClasses}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleSidebar={toggleSidebar}
        toggleDarkMode={toggleDarkMode}
        toggleNotifications={toggleNotifications}
        toggleUserMenu={toggleUserMenu}
        isUserMenuOpen={isUserMenuOpen}
        notificationCount={notificationCount}
        currentUser={currentUser}
        logout={logout}
      />

      {/* Sidebar Navigation */}
      <SidebarNavigation
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        themeClasses={themeClasses}
        projects={projects}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setCurrentProject={setCurrentProject}
        currentProject={currentProject}
        kenyanLocations={kenyanLocations}
      />

      {/* Main Content */}
      <div className={`flex-1 min-h-screen pt-16 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <>
              {/* Hero Section */}
              <DashboardHero
                themeClasses={themeClasses}
                currentUser={currentUser}
                setActiveTab={setActiveTab}
                setCurrentProject={setCurrentProject}
                kenyanLocations={kenyanLocations}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Stats Section */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: 'Active Projects', value: 8, change: '+1.4%', icon: <FaBuilding className="h-6 w-6 text-white" />, color: 'from-green-500 to-yellow-400' },
                      { title: 'Cost Savings', value: 'KES 1.8M', change: '+12.6%', icon: <FaChartLine className="h-6 w-6 text-white" />, color: 'from-red-500 to-black' },
                      { title: 'AI Recommendations', value: 42, change: '+8.7%', icon: <FaLightbulb className="h-6 w-6 text-white" />, color: 'from-yellow-500 to-amber-400' },
                      { title: 'NCA Compliance', value: '96%', change: '+3.2%', icon: <FaShieldAlt className="h-6 w-6 text-white" />, color: 'from-blue-500 to-cyan-400' },
                    ].map((stat, index) => (
                      <StatsWidget
                        key={index}
                        stat={stat}
                        themeClasses={themeClasses}
                        index={index}
                      />
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className={`rounded-xl p-6 ${themeClasses.shadow} ${themeClasses.cardBg} relative overflow-hidden border ${themeClasses.borderColor}`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-yellow-400"></div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-xl font-bold ${themeClasses.textColor}`}>Kenyan AI Insights</h2>
                  </div>

                  <InsightsCarousel
                    aiInsights={aiInsights}
                    themeClasses={themeClasses}
                  />

                  <button
                    className="w-full py-2.5 bg-gradient-to-r from-green-600 to-red-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    aria-label="View AI insights details"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <QuotationPreview
                    themeClasses={themeClasses}
                    quotation={quotation}
                    exportQuotation={exportQuotation}
                  />
                </div>

                <div className="space-y-6">
                  {/* Activity Feed */}
                  <ActivityFeed
                    activities={activities}
                    themeClasses={themeClasses}
                  />

                  {/* Quick Actions */}
                  <div className={`rounded-2xl p-6 ${themeClasses.shadow} ${themeClasses.cardBg} border ${themeClasses.borderColor}`}>
                    <h3 className={`text-lg font-bold mb-4 ${themeClasses.textColor}`}>Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <ProjectCard
                        icon={<FaCloudUploadAlt className="text-green-500 text-xl mb-2" />}
                        label="Upload Blueprint"
                        onClick={() => {
                          setActiveTab('quotation-generator');
                          setActiveQuotationStep(0);
                        }}
                        themeClasses={themeClasses}
                      />
                      <ProjectCard
                        icon={<FaFilePdf className="text-red-500 text-xl mb-2" />}
                        label="Export Quotation"
                        onClick={() => exportQuotation('pdf')}
                        themeClasses={themeClasses}
                      />
                      <ProjectCard
                        icon={<FaMapMarkerAlt className="text-yellow-500 text-xl mb-2" />}
                        label="Site Analysis"
                        onClick={() => setActiveTab('site-analysis')}
                        themeClasses={themeClasses}
                      />
                      <ProjectCard
                        icon={<FaGlobeAfrica className="text-blue-500 text-xl mb-2" />}
                        label="Local Suppliers"
                        onClick={() => setActiveTab('suppliers')}
                        themeClasses={themeClasses}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'quotation-generator' && (
            <QuotationWorkflow
              activeQuotationStep={activeQuotationStep}
              setActiveQuotationStep={setActiveQuotationStep}
              themeClasses={themeClasses}
              projects={projects}
              processingStatus={processingStatus}
              processBlueprint={processBlueprint}
              aiResults={aiResults}
              generateQuotation={generateQuotation}
              quotation={quotation}
              setQuotation={setQuotation}
              saveQuotation={saveQuotation}
              exportQuotation={exportQuotation}
              setCurrentProject={setCurrentProject}
              filePreviews={filePreviews}
              kenyanMaterialPrices={kenyanMaterialPrices}
              kenyanLaborRates={kenyanLaborRates}
              kenyanLocations={kenyanLocations}
            />
          )}

          {activeTab === 'quotations' && (
            <QuotationManager
              themeClasses={themeClasses}
              quotations={quotationHistory}
              currentQuotation={quotation}
              setQuotation={setQuotation}
              duplicateQuotation={duplicateQuotation}
              deleteQuotation={deleteQuotation}
              exportQuotation={exportQuotation}
              selectedQuotationId={selectedQuotationId}
              setSelectedQuotationId={setSelectedQuotationId}
              kenyanLocations={kenyanLocations}
            />
          )}

          <AnimatePresence>
            {aiAssistantVisible && (
              <AiAssistant
                setAiAssistantVisible={setAiAssistantVisible}
                kenyanContext={true}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
