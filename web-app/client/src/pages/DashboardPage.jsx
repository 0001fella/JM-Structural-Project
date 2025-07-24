// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed
import { ProjectContext } from '../context/ProjectContext'; // Adjust path as needed
import { motion } from 'framer-motion';
import {
  Building, HardHat, Bot, TrendingUp, Lightbulb, Settings, Search, Menu,
  Moon, Sun, X, Plus, Users, ClipboardList, Bell, MessageCircle, Calendar,
  FileText, Ruler, Home, ChevronDown, DraftingCompass, Calculator, FileText as FilePdf,
  Upload, FileSpreadsheet, Pencil, Trash2, Copy, Download, Globe, Shield, MapPin,
  Wallet, Loader2, User, LogOut, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Skeleton } from '../components/ui/skeleton';
import BlueprintUploader from '../components/upload/BlueprintUploader'; // Adjust path as needed
import DimensionVisualizer from '../components/ai/DimensionVisualizer'; // Adjust path as needed
import EditableBOQ from "../components/quotation/EditableBOQ"; // Adjust path as needed
import QuotationPreview from '../components/dashboard/QuotationPreview'; // Adjust path as needed
import StatsWidget from '../components/dashboard/StatsWidget'; // Adjust path as needed
import ProfitCalculator from '../components/dashboard/ProfitCalculator'; // Adjust path as needed
import MaterialTable from '../components/dashboard/MaterialTable'; // Adjust path as needed
import { generatePDF, generateExcel } from '../utils/exportUtils'; // Adjust path as needed

// --- Mock Data (Kept from original large file) ---
const mockActivityFeed = [
  { id: 1, user: "Kamau Mwangi", action: "uploaded updated blueprints", project: "Nairobi Business Hub", time: "10 min ago" },
  { id: 2, user: "Aisha Hassan", action: "approved budget changes", project: "Mombasa Waterfront", time: "45 min ago" },
  { id: 3, user: "Juma Otieno", action: "added Kenyan material specifications", project: "Kisumu Mall", time: "2 hours ago" },
  { id: 4, user: "Wanjiku Kimani", action: "completed NCA compliance review", project: "Nakuru Housing", time: "5 hours ago" }
];

const kenyanMaterialPrices = {
  'Concrete': 15000, // per cubic meter
  'Steel': 350, // per kg
  'Glass': 4500, // per sq meter
  'Timber': 1200, // per meter
  'Bricks': 25, // per piece
  'Sand': 2500, // per ton
  'Cement': 850, // per bag
  'Stone': 1800 // per ton
};

const kenyanLaborRates = {
  'Mason': 2500,
  'Carpenter': 2200,
  'Electrician': 2800,
  'Plumber': 2600,
  'Steel Fixer': 2300,
  'Painter': 2000,
  'Tiler': 2400,
  'Roofer': 2100
};

const kenyanLocations = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
// --- End Mock Data ---

const DashboardPage = () => {
  const { currentUser, logout, loading } = useAuth();
  const { currentProject, setCurrentProject, projects, updateProject } = useContext(ProjectContext);
  const navigate = useNavigate();

  // State management (kept from original)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches);
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

  // Enhanced theme-based styling (simplified for new style)
  const themeClasses = useMemo(() => ({
    bgColor: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    textColor: darkMode ? 'text-gray-100' : 'text-gray-800',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    borderColor: darkMode ? 'border-gray-700' : 'border-gray-200',
    headerBg: darkMode ? 'bg-gray-800' : 'bg-white',
    sidebarBg: darkMode ? 'bg-gray-900' : 'bg-white',
    heroBg: darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-600 to-cyan-500',
    darkMode: darkMode,
    shadow: darkMode ? 'shadow-lg' : 'shadow-md'
  }), [darkMode]);

  // Callbacks (kept from original, simplified where possible)
  const processBlueprint = useCallback((files) => {
    setProcessingStatus('processing');
    // Simulate AI processing delay
    const processingTimeout = setTimeout(() => {
      const mockAIResults = {
        dimensions: {
          area: 1200,
          volume: 3600,
          materials: [
            { id: 'm1', code: 'MAT-001', name: 'Concrete', quantity: 100, unit: 'cubic meters' },
            { id: 'm2', code: 'MAT-002', name: 'Steel', quantity: 5000, unit: 'kg' },
            { id: 'm3', code: 'MAT-003', name: 'Bricks', quantity: 10000, unit: 'pieces' },
          ],
          labor: [
            { id: 'l1', name: 'Masons', quantity: 10, unit: 'persons', duration: '30 days' },
            { id: 'l2', name: 'Carpenters', quantity: 5, unit: 'persons', duration: '20 days' },
          ]
        }
      };
      setAiResults(mockAIResults);
      setProcessingStatus('completed');

      // Update project with AI results
      if (currentProject) {
        const updatedProject = { ...currentProject, aiResults: mockAIResults };
        setCurrentProject(updatedProject);
        updateProject(updatedProject);
      }
    }, 3000);

    return () => clearTimeout(processingTimeout);
  }, [currentProject, setCurrentProject, updateProject]);

  const calculateUnitPrice = useCallback((material) => {
    return kenyanMaterialPrices[material] || 0;
  }, []);

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
      vatRate: 0.16,
      items: aiResults.dimensions.materials.map(material => ({
        id: `ITEM-${Math.random().toString(36).substr(2, 9)}`,
        itemCode: material.code,
        item: material.name,
        description: `Construction ${material.name}`,
        quantity: material.quantity,
        unit: material.unit,
        unitPrice: calculateUnitPrice(material.name),
        total: material.quantity * calculateUnitPrice(material.name)
      })),
      labor: aiResults.dimensions.labor.map(labor => ({
        id: `LAB-${Math.random().toString(36).substr(2, 9)}`,
        role: labor.name,
        quantity: labor.quantity,
        unit: labor.unit,
        rate: kenyanLaborRates[labor.name] || 0,
        total: labor.quantity * (kenyanLaborRates[labor.name] || 0)
      })),
      status: 'draft',
      notes: 'Generated by AI'
    };
    setQuotation(newQuotation);
    setQuotationHistory(prev => [newQuotation, ...prev]);
    setSelectedQuotationId(newQuotation.id);
    setActiveTab('quotation-editor');
  }, [aiResults, currentProject, calculateUnitPrice]);

  const saveQuotation = useCallback((updatedQuotation) => {
    setQuotation(updatedQuotation);
    setQuotationHistory(prev => prev.map(q => q.id === updatedQuotation.id ? updatedQuotation : q));
  }, []);

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
    setActiveTab('quotation-editor');
  }, [quotationHistory]);

  const deleteQuotation = useCallback((quotationId) => {
    setQuotationHistory(prev => prev.filter(q => q.id !== quotationId));
    if (quotation?.id === quotationId) {
      const remainingQuotes = quotationHistory.filter(q => q.id !== quotationId);
      if (remainingQuotes.length > 0) {
        setQuotation(remainingQuotes[0]);
        setSelectedQuotationId(remainingQuotes[0].id);
      } else {
        setQuotation(null);
        setSelectedQuotationId(null);
      }
    }
  }, [quotation, quotationHistory]);

  const exportQuotation = useCallback((format, quotationData) => {
    const data = quotationData || quotation;
    if (!data) return;
    if (format === 'pdf') {
      generatePDF(data);
    } else if (format === 'excel') {
      generateExcel(data);
    }
  }, [quotation]);

  // useEffects (kept from original)
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

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

    return () => window.removeEventListener('resize', handleResize);
  }, [darkMode, currentProject?.id]);

  useEffect(() => {
    // Persist quotations to localStorage
    if (currentProject?.id) {
      localStorage.setItem(`quotations-${currentProject.id}`, JSON.stringify(quotationHistory));
    }
  }, [quotationHistory, currentProject?.id]);

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
          <Loader2 className="animate-spin text-4xl text-green-500 mb-4" />
          <p className="text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // --- Redesigned Components Integration ---

  // Hero Section (Redesigned)
  const DashboardHero = ({ themeClasses, currentUser, setActiveTab, setCurrentProject }) => {
    return (
        <CardContent className="p-6 md:p-8 relative">
          {/* Floating AI Elements */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse animation-delay-2000"></div>

          <div className="relative z-10 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold mb-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Welcome back, <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{currentUser?.name || "Engineer"}</span>
            </motion.h1>
            <p className="text-gray-700 dark:text-white mb-5 text-sm md:text-base max-w-xl">
              Optimize project costs, timelines, and resources with real-time AI analysis and predictive modeling
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-2 px-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center"
                onClick={() => {
                  setCurrentProject({
                    id: 'new',
                    name: 'New Project',
                    status: 'draft'
                  });
                  setActiveTab('quotation-generator');
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
              <Button
                variant="outline"
                className=" border-2 hover:text-white hover:bg-blue-700 dark:hover:bg-white dark:hover:text-blue-700 dark:border-white border-blue-700 text-blue-700 dark:text-white bg-transparent font-bold py-2 px-4 rounded-lg flex items-center"
                onClick={() => setActiveTab('quotation-generator')}
              >
                <Bot className="mr-2 h-4 w-4" />
                Generate Quotation
              </Button>
            </div>
          </div>
        </CardContent>
    );
  };

  // Stats Section (using redesigned StatsWidget)
  const statsData = [
    { title: 'Active Projects', value: 8, change: '+1.4%', icon: Building, color: 'bg-gradient-to-r from-green-500 to-yellow-400' },
    { title: 'Cost Savings', value: 'KES 1.8M', change: '+12.6%', icon: TrendingUp, color: 'bg-gradient-to-r from-red-500 to-black' },
    { title: 'AI Recommendations', value: 42, change: '+8.7%', icon: Lightbulb, color: 'bg-gradient-to-r from-yellow-500 to-amber-400' },
    { title: 'NCA Compliance', value: '96%', change: '+3.2%', icon: Shield, color: 'bg-gradient-to-r from-blue-500 to-cyan-400' },
  ];

  // Activity Feed Component
  const ActivityFeed = () => (
    <Card className={`${'gradient-card'} ${themeClasses.borderColor} shadow-sm`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center">
          <MessageCircle className="mr-2 h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockActivityFeed.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-xs text-muted-foreground">{activity.action} in <span className="font-medium">{activity.project}</span></p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  // Team Members Component
  const TeamMembers = () => (
    <Card className={`${'gradient-card'} ${themeClasses.borderColor} shadow-sm`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Your Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex -space-x-2">
          {teamMembers.map((member) => (
            <TooltipProvider key={member.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="border-2 border-background cursor-pointer">
                    <AvatarFallback className={`${member.avatarColor} text-white text-xs`}>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{member.name} - {member.role}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Projects List Component (Simplified)
  const ProjectsList = () => (
    <Card className={`${'gradient-card'} ${themeClasses.borderColor} shadow-sm`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span className="flex items-center">
            <HardHat className="mr-2 h-4 w-4" />
            Recent Projects
          </span>
          <Button variant="ghost" size="sm" className="text-xs">
            View All <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {projects.slice(0, 3).map((project) => (
            <li key={project.id} className="flex items-center justify-between p-2 rounded hover:bg-accent cursor-pointer"
              onClick={() => {
                setCurrentProject(project);
                setActiveTab('project-details');
              }}>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <Building className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{project.name}</p>
                  <p className="text-xs text-muted-foreground">{project.location}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">{project.status}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  // Quotation Manager Component (Simplified Placeholder)
  const QuotationManager = () => (
    <Card className={`${'gradient-card'} ${themeClasses.borderColor} shadow-sm`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Recent Quotations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quotationHistory.slice(0, 2).map((q) => (
            <div key={q.id} className="flex items-center justify-between p-2 rounded border">
              <div>
                <p className="text-sm font-medium">{q.project}</p>
                <p className="text-xs text-muted-foreground">{q.date}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Badge variant="outline" className="text-xs">{q.status}</Badge>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          {quotationHistory.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No quotations generated yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`flex min-h-screen ${'min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950'} ${themeClasses.textColor}`}>
      {/* Sidebar (Simplified for example) */}
      <aside className={`w-64 ${'bg-transparent'} ${themeClasses.borderColor} border-r fixed inset-y-0 left-0 z-30 hidden lg:block`}>
        <div className="p-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">JTech AI</h2>
        </div>
        <nav className="px-2 py-4 space-y-1">
          <Button variant={activeTab === 'dashboard' ? "secondary" : "ghost"} className={activeTab == 'dashboard' ? 'w-full justify-start text-white ' : 'w-full justify-start dark:hover:bg-blue-50 dark:hover:text-gray-700'} onClick={() => setActiveTab('dashboard')}>
            <Home className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button variant={activeTab === 'projects' ? "secondary" : "ghost"} className={activeTab == 'projects' ? 'w-full justify-start text-white' : 'w-full justify-start  dark:hover:bg-blue-50 dark:hover:text-gray-700' } onClick={() => setActiveTab('projects')}>
            <HardHat className="mr-2 h-4 w-4" /> Projects
          </Button> 
          <Button variant={activeTab === 'quotation-generator' ? "secondary" : "ghost"} className={activeTab == 'quotation-generator' ? 'w-full justify-start text-white' : 'w-full justify-start dark:hover:bg-blue-50 dark:hover:text-gray-700' } onClick={() => setActiveTab('quotation-generator')}>
            <Calculator className="mr-2 h-4 w-4" /> Quotation Generator
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Navigation */}
        <header className={`sticky top-0 z-20 ${'sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-white/20 dark:border-slate-700/20 shadow-sm'} ${themeClasses.borderColor} border-b px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                {/* Mobile Sidebar Content - Simplified */}
                <div className="p-4">
                  <h2 className="text-xl font-bold">KQS AI</h2>
                </div>
                <nav className="px-2 py-4 space-y-1">
                  <Button variant={activeTab === 'dashboard' ? "secondary" : "ghost"} className={activeTab == 'dashboard' ? 'w-full justify-start text-white' : 'w-full justify-start' } onClick={() => { setActiveTab('dashboard'); }}>
                    <Home className="mr-2 h-4 w-4" /> Dashboard
                  </Button>
                  <Button variant={activeTab === 'projects' ? "secondary" : "ghost"} className={activeTab == 'projects' ? 'w-full justify-start text-white' : 'w-full justify-start' } onClick={() => { setActiveTab('projects'); }}>
                    <HardHat className="mr-2 h-4 w-4" /> Projects
                  </Button>
                  <Button variant={activeTab === 'quotation-generator' ? "secondary" : "ghost"} className={activeTab == 'quotation-generator' ? 'w-full justify-start text-white' : 'w-full justify-start' } onClick={() => { setActiveTab('quotation-generator'); }}>
                    <Calculator className="mr-2 h-4 w-4" /> Quotation Generator
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects, quotes..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className='dark:hover:bg-blue-500' onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative dark:hover:bg-blue-500">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser?.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser?.email || 'user@example.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <>
              <DashboardHero themeClasses={themeClasses} currentUser={currentUser} setActiveTab={setActiveTab} setCurrentProject={setCurrentProject} />

              {/* Stats Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statsData.map((stat, index) => (
                  <StatsWidget key={stat.title} stat={stat}  index={index} />
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* AI Insights / Recommendations Carousel (Placeholder) */}
                  <Card className={`${'gradient-card'} ${themeClasses.borderColor} shadow-sm`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
                        AI Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">AI-powered recommendations will appear here to optimize your projects.</p>
                    </CardContent>
                  </Card>

                  {/* Blueprint Uploader / AI Results */}
                  <Card className={`${'gradient-card'} ${themeClasses.borderColor} shadow-sm`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold flex items-center">
                        <DraftingCompass className="mr-2 h-4 w-4" />
                        Blueprint Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {processingStatus === 'idle' && (
                        <BlueprintUploader onUpload={processBlueprint} />
                      )}
                      {processingStatus === 'processing' && (
                        <div className="flex flex-col items-center justify-center py-10">
                          <Loader2 className="animate-spin h-8 w-8 text-blue-500 mb-3" />
                          <p className="text-sm">AI is analyzing your blueprints...</p>
                        </div>
                      )}
                      {processingStatus === 'completed' && aiResults && (
                        <DimensionVisualizer aiResults={aiResults} />
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <ActivityFeed />
                  <TeamMembers />
                  <ProjectsList />
                  <QuotationManager />
                </div>
              </div>
            </>
          )}

          {activeTab === 'quotation-generator' && (
            <div className="space-y-6">
              <Card className={`${'gradient-card'} ${themeClasses.borderColor} shadow-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Quotation Generator
                  </CardTitle>
                  <CardDescription>Generate and manage your construction quotations.</CardDescription>
                </CardHeader>
                <CardContent>
                  {aiResults ? (
                    <Tabs defaultValue="editor">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="profit">Profit Calculator</TabsTrigger>
                      </TabsList>
                      <TabsContent value="editor">
                        <EditableBOQ aiResults={aiResults} onSave={saveQuotation} />
                      </TabsContent>
                      <TabsContent value="preview">
                        <QuotationPreview />
                      </TabsContent>
                      <TabsContent value="profit">
                        <ProfitCalculator baseCost={1000000} /> {/* Example base cost */}
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="text-center py-10">
                      <DraftingCompass className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Blueprint Data</h3>
                      <p className="text-muted-foreground mb-4">Upload a blueprint to start editing your quotation</p>
                      <Button onClick={() => setActiveTab('dashboard')}>Upload Blueprint</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Add other tabs like 'projects', 'settings' here as needed */}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;