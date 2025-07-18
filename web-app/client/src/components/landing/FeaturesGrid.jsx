import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Define the comprehensive color palette
const primaryGreen = '#006d7e';
const darkBackground = '#121212';
const lightTextOnDark = '#e0e0e0';
const whiteContainer = '#FFFFFF';
const darkTextOnWhite = '#2b2b2b';
const lightBorder = '#e0e0e0';
const subtleBlack = '#333333';
const darkBlueBackground = '#1A2A44';
const mediumBlueAccent = '#254CBA';
const lightBlueHighlight = '#CADBFB';
const verySubtleGreen = '#006d7e1A'; // 10% opacity of primaryGreen

// Reusable SVG Icons
const FaChartBar = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>);
const FaBuilding = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="3" y="2" width="18" height="20" rx="2" ry="2"></rect><line x1="12" y1="6" x2="12" y2="18"></line></svg>);
const FaUsers = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const FaLightbulb = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 6c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 22v-4"></path></svg>);
const FaExchangeAlt = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polyline points="17 1 21 5 17 9"></polyline><path d="M21 5H3"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M3 19h18"></path></svg>);
const FaFileInvoice = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>);
const FaRobot = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 11V6"></path><path d="M18 14V9"></path><path d="M6 14V9"></path><path d="M12 18H8"></path><path d="M16 18h-4"></path><path d="M19 11h2"></path><path d="M17 13h4"></path><path d="M3 11h2"></path><path d="M3 13h4"></path><path d="M12 22a4 4 0 0 0 4-4v-1H8v1a4 4 0 0 0 4 4z"></path><rect x="9" y="3" width="6" height="6" rx="1"></rect></svg>);
const FaDatabase = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 12a9 3 0 0 0 18 0"></path><path d="M3 19a9 3 0 0 0 18 0"></path><path d="M3 5v14a9 9 0 0 0 18 0V5"></path></svg>);
const FaSyncAlt = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 1v4m0 14v4m-5-9H1m22 0h-4m-1-7.5l-2.8 2.8m-1.4 1.4l-2.8 2.8M18.5 16.5l-2.8-2.8m-1.4-1.4l-2.8-2.8M16.5 5.5l-2.8 2.8m-1.4 1.4l-2.8 2.8M5.5 18.5l2.8-2.8m1.4-1.4l2.8-2.8"></path></svg>);
const FaShieldAlt = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const FaCloudUploadAlt = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 17V3"></path><path d="M5 10l7-7 7 7"></path><path d="M19 18H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2z"></path></svg>);
const FaVectorSquare = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 12h.01"></path><path d="M16 12h.01"></path><path d="M8 12h.01"></path><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect></svg>);
const FaCube = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>);
const FaRulerCombined = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>);
const FaCubes = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line><path d="M12 2v10l7 4"></path><path d="M12 2v10L5 16"></path></svg>);
const FaGlobeAfrica = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);
const FaFilePdf = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M10 10.5a2.5 2.5 0 0 1 5 0v1a2.5 2.5 0 0 1-5 0z"></path><path d="M12 14.5v4"></path><path d="M10 16.5h4"></path></svg>);
const FaMobileAlt = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>);
const FaSatellite = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M18.5 14.5L22 18"></path><path d="M13.5 10.5L17 14"></path><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path><path d="M14 2c2.7 0 4.5 1.1 5.5 2.5s.5 3.5-1 5l-2 2c-1.5 1.5-3.5 1-5-1l-2-2c-1.5-1.5-1-3.5 1-5s2.8-2.5 5.5-2.5z"></path></svg>);
const FaArrowRight = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const FaPlay = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>);
const FaChartLine = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>);
const FaDraftingCompass = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg>);
const FaHandshake = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 11.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path><path d="M12 11.5V15"></path><path d="M12 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path><path d="M12 19v3"></path><path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path><path d="M12 6V9.5"></path></svg>);
const FaTrash = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);
const IoIosRocket = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3z"></path></svg>);
const FaCode = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>);
const FaPlug = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 22v-4"></path><path d="M12 14v-4"></path><path d="M18 10h-6"></path><path d="M6 10h6"></path><path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4z"></path></svg>);
const FaLink = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>);
const FaMicrophoneAlt = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>);
const FaCommentDots = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M21 11.5a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 5 0z"></path><path d="M12 11.5a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 5 0z"></path><path d="M3 11.5a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 5 0z"></path><circle cx="12" cy="12" r="10"></circle></svg>);
const FaBrain = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M9 13.5a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5a1.5 1.5 0 0 1-1.5 1.5H10.5a1.5 1.5 0 0 1-1.5-1.5z"></path><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path><path d="M12 6a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h0a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z"></path></svg>);
const FaGraduationCap = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M21.5 10.4l-9.5-5-9.5 5M2.5 14.4l9.5 5 9.5-5M2.5 19.4l9.5 5 9.5-5"></path><path d="M12 5L12 14"></path></svg>);
const FaTimes = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const FaPaperPlane = ({ className, style }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>);

const FeaturesGrid = () => {
    const [aiAssistantVisible, setAiAssistantVisible] = useState(false);
    const [aiMessages, setAiMessages] = useState([]);
    const [currentAiQuestion, setCurrentAiQuestion] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);
    const aiChatboxRef = useRef(null);
    const heroRef = useRef(null);
    
    // New state for the AI dashboard
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [aiDashboardMessages, setAiDashboardMessages] = useState([]);
    const [isDashboardAiTyping, setIsDashboardAiTyping] = useState(false);

    // For parallax effect on hero section
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    // Architectural images from public folder
    const architecturalImages = [
        "/fetch.jpg",
        "/rob.jpg",
        "/rob2.jpg",
        "/feature.jpg",
        "/fetch.jpg",
    ];

    const features = [
        {
            icon: <FaCloudUploadAlt className="text-4xl" style={{ color: primaryGreen }} />,
            title: "AI Sketch Recognition",
            description: "Transform sketches into precise digital models",
            detailed: "Upload hand-drawn architectural sketches or CAD files. Our AI instantly recognizes elements, extracts dimensions, and generates accurate 3D models with material specifications optimized for Kenyan construction standards. Integrates with your existing design tools for a seamless workflow.",
            aiFeature: true,
            kenyaSpecific: true,
            image: architecturalImages[0],
        },
        {
            icon: <FaCubes className="text-4xl" style={{ color: primaryGreen }} />,
            title: "Automated Quantity Takeoff",
            description: "Instant BOQ generation from digital models",
            detailed: "Our AI analyzes 3D models to automatically generate Bills of Quantities with Kenyan construction rates. Real-time material pricing from Nairobi, Mombasa, and Kisumu suppliers ensures accurate cost projections. Automatically updates BOQ with design changes, saving hours of manual work.",
            aiFeature: true,
            kenyaSpecific: true,
            image: architecturalImages[1],
        },
        {
            icon: <FaSatellite className="text-4xl" style={{ color: primaryGreen }} />,
            title: "Advanced Site Analysis AI",
            description: "Intelligent terrain & environmental scanning",
            detailed: "Upload site photos or drone footage for automated terrain analysis. Our AI detects elevation changes, soil conditions, and access challenges specific to Kenyan topography, generating optimal foundation recommendations and potential environmental impact reports. This helps prevent costly site-related issues.",
            aiFeature: true,
            image: architecturalImages[2],
        },
        {
            icon: <FaBuilding className="text-4xl" style={{ color: primaryGreen }} />,
            title: "Deep BIM Integration",
            description: "Seamless connection with Revit, ArchiCAD & more",
            detailed: "Direct plugin integration extracts comprehensive data from BIM platforms, eliminating manual measurement errors and ensuring data consistency. Supports all Kenyan building codes (KEBS) and local material databases with automatic NCA compliance checks, significantly speeding up approval processes.",
            kenyaSpecific: true,
            image: architecturalImages[3],
        },
        {
            icon: <FaMobileAlt className="text-4xl" style={{ color: primaryGreen }} />,
            title: "Mobile Site Data Capture",
            description: "Capture accurate measurements on the go",
            detailed: "Utilize your mobile device for precise site measurements and immediate upload to the platform. Our app uses augmented reality to verify dimensions, reducing human error and accelerating data collection directly from the construction site, even in remote areas of Kenya.",
            kenyaSpecific: true,
            image: architecturalImages[4],
        }
    ];

    const additionalFeatures = [
        {
            icon: <FaRobot className="text-3xl" style={{ color: mediumBlueAccent }} />,
            title: "Predictive Analytics",
            description: "Forecast project risks using Kenyan market data"
        },
        {
            icon: <FaDatabase className="text-3xl" style={{ color: primaryGreen }} />,
            title: "Material Intelligence",
            description: "Local supplier pricing database with dynamic updates"
        },
        {
            icon: <FaRulerCombined className="text-3xl" style={{ color: mediumBlueAccent }} />,
            title: "AI CAD Correction",
            description: "Automatically identify and fix measurement errors in CAD files"
        },
        {
            icon: <FaShieldAlt className="text-3xl" style={{ color: primaryGreen }} />,
            title: "Regulatory Compliance AI",
            description: "Automated KEBS/NCA approvals and alerts for changes"
        },
        {
            icon: <FaFilePdf className="text-3xl" style={{ color: mediumBlueAccent }} />,
            title: "Smart Documentation",
            description: "Auto-generate professional, customizable Kenyan BOQ templates"
        },
        {
            icon: <FaGlobeAfrica className="text-3xl" style={{ color: primaryGreen }} />,
            title: "Hyper-localization Engine",
            description: "Integrates county-specific building regulations and tax levies"
        },
        {
            icon: <FaSyncAlt className="text-3xl" style={{ color: mediumBlueAccent }} />,
            title: "Real-time Cost Optimization",
            description: "Dynamic adjustments to material & labor costs based on market shifts"
        },
        {
            icon: <FaVectorSquare className="text-3xl" style={{ color: primaryGreen }} />,
            title: "Geometric Anomaly Detection",
            description: "AI identifies structural inconsistencies in designs"
        },
        {
            icon: <IoIosRocket className="text-3xl" style={{ color: mediumBlueAccent }} />,
            title: "Rapid Iteration Engine",
            description: "Instantly evaluate cost and time impacts of design changes"
        }
    ];

    const advancedFeatures = [
        {
            icon: <FaChartLine className="text-4xl" style={{ color: primaryGreen }} />,
            title: "Advanced Project Analytics Dashboard",
            description: "Real-time project performance insights with drill-down capabilities.",
            detailed: "Monitor project health with granular KPIs for cost variance, schedule performance, and resource utilization. Predictive analytics forecast potential delays, budget overruns, and recommend corrective actions to keep your project on track and profitable.",
        },
        {
            icon: <FaDraftingCompass className="text-4xl" style={{ color: mediumBlueAccent }} />,
            title: "Integrated Collaborative Design Platform",
            description: "Real-time multi-user editing with version control.",
            detailed: "Our cloud-based platform enables architects, engineers, and contractors to collaborate simultaneously on designs. Features include live commenting, version control, change tracking, and secure sharing, fostering efficient teamwork and reducing design conflicts.",
        },
        {
            icon: <FaHandshake className="text-4xl" style={{ color: primaryGreen }} />,
            title: "Customizable Stakeholder Portal",
            description: "Secure, role-based access for all project participants.",
            detailed: "Provide a secure portal for clients, investors, and regulatory bodies to view project progress, approve changes, and access financial reports. Granular permission controls ensure data privacy and transparency, building trust and streamlining communication.",
        },
        {
            icon: <FaCommentDots className="text-4xl" style={{ color: mediumBlueAccent }} />,
            title: "AI-Powered Conversational Assistant",
            description: "Get instant answers and insights from your project data.",
            detailed: "Ask complex questions in natural language about your project's costs, timeline, materials, or compliance. The AI analyzes your data and provides immediate, accurate answers, acting as your personal construction consultant.",
            aiFeature: true,
        },
        {
            icon: <FaBrain className="text-4xl" style={{ color: primaryGreen }} />,
            title: "Machine Learning Optimization",
            description: "Continuous learning to improve future estimates.",
            detailed: "Our AI continuously learns from every project, refining its estimation models and material cost predictions. This ensures that with each new project, QuantumTakeoff AI becomes even more accurate and efficient, giving you a competitive edge.",
            aiFeature: true,
        },
        {
            icon: <FaGraduationCap className="text-4xl" style={{ color: mediumBlueAccent }} />,
            title: "Intelligent Knowledge Base",
            description: "Dynamic access to industry best practices and regulations.",
            detailed: "A constantly updated repository of Kenyan building codes, industry standards, and best practices. The AI can proactively flag potential non-compliance issues and suggest optimal solutions, making compliance effortless.",
            kenyaSpecific: true,
        }
    ];

    const integrationPlatforms = [
        { name: "AutoCAD", icon: <FaCode className="h-10 w-10" style={{ color: primaryGreen }} />, category: "Design" },
        { name: "Revit", icon: <FaPlug className="h-10 w-10" style={{ color: mediumBlueAccent }} />, category: "BIM" },
        { name: "ArchiCAD", icon: <FaLink className="h-10 w-10" style={{ color: primaryGreen }} />, category: "BIM" },
        { name: "Planswift", icon: <FaChartBar className="h-10 w-10" style={{ color: mediumBlueAccent }} />, category: "Estimation" },
        { name: "SAP", icon: <FaDatabase className="h-10 w-10" style={{ color: primaryGreen }} />, category: "ERP" },
        { name: "ArcGIS", icon: <FaGlobeAfrica className="h-10 w-10" style={{ color: mediumBlueAccent }} />, category: "Geospatial" },
        { name: "Procore", icon: <FaUsers className="h-10 w-10" style={{ color: primaryGreen }} />, category: "Project Management" },
        { name: "MS Project", icon: <FaFileInvoice className="h-10 w-10" style={{ color: mediumBlueAccent }} />, category: "Project Management" },
    ];

    // Framer Motion Variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const cardHoverVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.15)",
            transition: { type: "spring", stiffness: 300, damping: 15 }
        },
        tap: { scale: 0.98 }
    };

    const iconHoverVariants = {
        hover: {
            y: -8,
            rotate: 5,
            transition: { type: "spring", stiffness: 300, damping: 10 }
        }
    };

    // AI responses and questions
    const aiResponses = [
        "Based on your current design, the optimal material for the foundation, considering local Kenyan suppliers, is C30 concrete. This balances cost-effectiveness with structural integrity for Nairobi's soil conditions.",
        "For a project of this scale in Mombasa, your estimated labor cost, factoring in prevailing union rates and local availability, is approximately 7.5 million KES. Our AI has optimized this based on efficient crew sizing.",
        "Our site analysis indicates a high water table in your proposed location in Kisumu. I strongly recommend implementing a robust waterproofing system and potentially raising the foundation level to mitigate risks. Would you like a detailed report?",
        "Given the recent fluctuations in global steel prices, our predictive analytics suggest a 12% increase in the cost of steel reinforcement within the next three months. Consider bulk purchasing now or exploring alternative reinforced materials available locally.",
        "Your current architectural plan for the residential units in Eldoret meets 95% of the national building code (KEBS). The minor non-compliance is related to ventilation in the utility room; a minor adjustment to window sizing will resolve this. Shall I suggest a modification?",
        "Yes, our localization engine confirms that the county-specific levy for construction in Kiambu County has increased by 1.5% this quarter. This has been automatically updated in your BOQ.",
        "The current design iteration shows a 7% overspend on finishes. Our AI suggests alternative, locally sourced ceramic tiles that could reduce this by 4% without compromising quality. Would you like to see a comparison?",
        "I've detected a slight structural imbalance around column B7 in the CAD file. It might lead to uneven load distribution. I recommend reviewing the beam-column connection details in that area.",
        "Running a rapid iteration for a 15% increase in building height... Please wait. The new estimated project duration would be 18 months, with an additional cost of 25 million KES. This includes updated material quantities and labor hours.",
        "I can generate a detailed cost-benefit analysis for switching to pre-fabricated wall panels versus traditional bricklaying for your project. This will include local material costs and labor efficiencies specific to Kenya."
    ];

    const userQuestions = [
        "What's the most cost-effective foundation material for my project in Nairobi?",
        "What's the estimated labor cost for my project in Mombasa?",
        "Are there any soil stability issues at my site location in Kisumu?",
        "What's the current outlook on steel prices?",
        "Does my design comply with Kenyan building regulations?",
        "Has the county levy for construction in Kiambu changed recently?",
        "How can I optimize the cost of finishes in my design?",
        "Are there any structural inconsistencies in my CAD file?",
        "What would be the cost and time impact of increasing the building height by 15%?",
        "Can you provide a comparison of pre-fabricated vs. traditional building methods?"
    ];

    // Scroll to the bottom of the AI chatbox whenever messages change
    useEffect(() => {
        if (aiChatboxRef.current) {
            aiChatboxRef.current.scrollTop = aiChatboxRef.current.scrollHeight;
        }
    }, [aiMessages]);

    const askAI = (question) => {
        if (!question.trim()) return;
        setAiMessages(prev => [...prev, { text: question, sender: 'user' }]);
        setCurrentAiQuestion('');
        setAiAssistantVisible(true);
        setIsAiTyping(true);

        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            setAiMessages(prev => [...prev, { text: response, sender: 'ai' }]);
            setIsAiTyping(false);
        }, 1500);
    };

    // Function to handle question selection in the dashboard
    const selectDashboardQuestion = (index) => {
        setSelectedQuestion(index);
        setIsDashboardAiTyping(true);
        
        setTimeout(() => {
            setAiDashboardMessages([
                { text: userQuestions[index], sender: 'user' },
                { text: aiResponses[index], sender: 'ai' }
            ]);
            setIsDashboardAiTyping(false);
        }, 1000);
    };

    const getImageStyle = (image) => ({
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
            {/* Hero Section with Parallax */}
            <motion.section
                ref={heroRef}
                className="relative bg-cover bg-center text-white py-24 md:py-32 overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/fetch.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        y: yParallax,
                        backgroundImage: `url('/fetch.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: -1,
                    }}
                />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        QuantumTakeoff AI
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Revolutionizing Construction with AI-Powered Precision in Africa.
                    </motion.p>
                    <motion.button
                        className="bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Request a Demo <FaArrowRight className="inline-block ml-2" />
                    </motion.button>
                </div>
            </motion.section>

            {/* Core Innovations Section - Alternating Layout */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-16"
                        style={{ color: darkTextOnWhite }}
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        Our Core Innovations
                    </motion.h2>

                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <div className="md:w-1/2">
                                <motion.div
                                    className="relative w-full h-72 md:h-96 rounded-xl shadow-xl overflow-hidden group"
                                    style={getImageStyle(feature.image)}
                                    whileHover="hover"
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white text-lg font-semibold text-center px-4">
                                            {feature.title} in Action
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="md:w-1/2 text-center md:text-left">
                                <motion.div
                                    className="inline-block p-4 rounded-full mb-6"
                                    style={{ backgroundColor: verySubtleGreen }}
                                    variants={iconHoverVariants}
                                    whileHover="hover"
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-3xl font-semibold mb-4" style={{ color: darkTextOnWhite }}>
                                    {feature.title}
                                </h3>
                                <p className="text-lg leading-relaxed mb-6" style={{ color: subtleBlack }}>
                                    {feature.detailed}
                                </p>
                                {feature.aiFeature && (
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium mr-2 mb-2">AI-Powered</span>
                                )}
                                {feature.kenyaSpecific && (
                                    <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium mb-2">Kenya-Specific</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* AI Assistant Dashboard Section - DeepSeek Inspired */}
            <section className="py-20 md:py-24" style={{ backgroundColor: darkBlueBackground }}>
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold mb-8 text-center text-white"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        Interactive AI Assistant
                    </motion.h2>
                    <motion.p
                        className="text-xl mb-12 max-w-3xl mx-auto text-center opacity-90 text-white"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.2 }}
                    >
                        Get instant insights on your construction projects with JTech AI
                    </motion.p>

                    <motion.div 
                        className="bg-white rounded-xl shadow-2xl overflow-hidden"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex flex-col lg:flex-row h-[500px]">
                            {/* Sidebar - Question History */}
                            <div className="lg:w-1/3 border-r border-gray-200 bg-gray-50 overflow-y-auto">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <div className="bg-gradient-to-r from-blue-500 to-primaryGreen p-0.5 rounded-full mr-3">
                                            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                                <FaBrain className="text-xs" style={{ color: primaryGreen }} />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold">Project Questions</h3>
                                    </div>
                                </div>
                                
                                <div className="space-y-1 p-4">
                                    {userQuestions.map((question, index) => (
                                        <motion.div
                                            key={index}
                                            className={`p-3 rounded-lg cursor-pointer transition ${
                                                selectedQuestion === index 
                                                    ? 'bg-blue-50 border border-blue-200' 
                                                    : 'hover:bg-gray-100'
                                            }`}
                                            whileHover={{ backgroundColor: '#f3f4f6' }}
                                            onClick={() => selectDashboardQuestion(index)}
                                        >
                                            <div className="flex items-start">
                                                <span className={`w-6 h-6 flex items-center justify-center mr-2 mt-0.5 text-xs rounded-full ${
                                                    selectedQuestion === index 
                                                        ? 'bg-blue-500 text-white' 
                                                        : 'bg-gray-200 text-gray-700'
                                                }`}>
                                                    {index + 1}
                                                </span>
                                                <p className="text-gray-700 text-sm">{question}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Main Chat Area */}
                            <div className="lg:w-2/3 flex flex-col">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-gray-200 flex items-center">
                                    <div className="bg-gradient-to-r from-blue-500 to-primaryGreen p-1 rounded-full mr-3">
                                        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                                            <FaBrain className="text-lg" style={{ color: primaryGreen }} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">JTech AI Assistant</h3>
                                        <p className="text-xs text-gray-500">How can I help with your project today?</p>
                                    </div>
                                </div>
                                
                                {/* Chat Messages */}
                                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                                    {aiDashboardMessages.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                            <div className="mb-6">
                                                <div className="bg-gradient-to-r from-blue-500 to-primaryGreen p-1 rounded-full w-24 h-24 mx-auto mb-4">
                                                    <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                                                        <FaBrain className="text-3xl" style={{ color: primaryGreen }} />
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-semibold mb-2" style={{ color: darkTextOnWhite }}>
                                                    Welcome to QuantumTakeoff AI Assistant
                                                </h3>
                                                <p className="text-gray-600 max-w-md mx-auto">
                                                    Select a question from the sidebar to get instant insights about your construction project.
                                                </p>
                                            </div>
                                            <div className="bg-blue-50 rounded-xl p-4 max-w-md w-full">
                                                <p className="text-sm font-medium mb-2">Try asking:</p>
                                                <div className="space-y-2">
                                                    {userQuestions.slice(0, 3).map((q, i) => (
                                                        <div 
                                                            key={i}
                                                            className="text-left text-sm bg-white p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
                                                            onClick={() => selectDashboardQuestion(i)}
                                                        >
                                                            {q}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {aiDashboardMessages.map((msg, index) => (
                                                <motion.div
                                                    key={index}
                                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div
                                                        className={`max-w-[85%] rounded-xl p-4 ${
                                                            msg.sender === 'user'
                                                            ? 'bg-blue-100 text-gray-800 rounded-br-none'
                                                            : 'bg-white text-gray-700 rounded-bl-none shadow-sm border border-gray-100'
                                                        }`}
                                                    >
                                                        <div className="flex items-start">
                                                            {msg.sender === 'ai' && (
                                                                <div className="bg-gradient-to-r from-blue-500 to-primaryGreen p-0.5 rounded-full mr-3">
                                                                    <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                                                        <FaBrain className="text-xs" style={{ color: primaryGreen }} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div>
                                                                {msg.sender === 'ai' && (
                                                                    <div className="font-medium text-xs mb-1" style={{ color: primaryGreen }}>QuantumTakeoff AI</div>
                                                                )}
                                                                <p className="text-gray-800">{msg.text}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            
                                            {isDashboardAiTyping && (
                                                <motion.div
                                                    className="flex justify-start"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="bg-white text-gray-700 rounded-xl rounded-bl-none p-4 shadow-sm border border-gray-100 max-w-[85%]">
                                                        <div className="flex items-center">
                                                            <div className="bg-gradient-to-r from-blue-500 to-primaryGreen p-0.5 rounded-full mr-3">
                                                                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                                                    <FaBrain className="text-xs" style={{ color: primaryGreen }} />
                                                                </div>
                                                            </div>
                                                            <div className="flex space-x-1">
                                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Input Area */}
                                <div className="p-4 border-t bg-white">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                placeholder="Ask me anything about your project..."
                                                className="w-full p-3 pl-4 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryGreen focus:border-transparent"
                                                style={{ color: darkTextOnWhite }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                                        askAI(e.target.value);
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />
                                            <button 
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primaryGreen"
                                            >
                                                <FaMicrophoneAlt />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setAiAssistantVisible(true)}
                                            className="bg-gradient-to-r from-blue-500 to-primaryGreen text-white p-3 rounded-xl hover:opacity-90 transition duration-200 flex items-center justify-center w-12 h-12"
                                        >
                                            <FaArrowRight className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="mt-12 text-center"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.6 }}
                    >
                        <p className="text-white mb-4">Need more complex queries? Try our full assistant</p>
                        <motion.button
                            onClick={() => setAiAssistantVisible(true)}
                            className="bg-white text-blue-900 px-10 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Open Full AI Assistant
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Additional Features Section */}
            <section className="py-20 md:py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-14"
                        style={{ color: darkTextOnWhite }}
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        Beyond the Core: More Powerful Features
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {additionalFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex flex-col items-center text-center"
                                variants={itemVariants}
                                whileHover="hover"
                                animate="visible"
                            >
                                <motion.div variants={iconHoverVariants} className="mb-4">
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-2" style={{ color: darkTextOnWhite }}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Advanced Capabilities Section */}
            <section className="py-20 md:py-24" style={{ backgroundColor: darkBackground }}>
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-14"
                        style={{ color: lightTextOnDark }}
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        Advanced Capabilities
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {advancedFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 shadow-xl border border-gray-700 flex flex-col items-center text-center text-white"
                                variants={itemVariants}
                                whileHover="hover"
                                animate="visible"
                            >
                                <motion.div variants={iconHoverVariants} className="mb-4">
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 mb-4 text-sm">
                                    {feature.description}
                                </p>
                                <p className="text-gray-300 text-xs leading-relaxed">
                                    {feature.detailed}
                                </p>
                                {feature.aiFeature && (
                                    <span className="mt-4 inline-block bg-blue-700 text-blue-100 text-xs px-3 py-1 rounded-full font-medium mr-2">AI-Driven</span>
                                )}
                                {feature.kenyaSpecific && (
                                    <span className="mt-4 inline-block bg-green-700 text-green-100 text-xs px-3 py-1 rounded-full font-medium">Local Focus</span>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Seamless Integrations Section */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-14"
                        style={{ color: darkTextOnWhite }}
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        Seamless Integrations
                    </motion.h2>
                    <motion.p
                        className="text-lg text-center mb-12 max-w-2xl mx-auto"
                        style={{ color: subtleBlack }}
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.2 }}
                    >
                        Connect QuantumTakeoff AI effortlessly with your existing software ecosystem. Our platform is designed for interoperability, ensuring a smooth workflow.
                    </motion.p>
                    <motion.div
                        className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {integrationPlatforms.map((platform, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center text-center p-4 rounded-lg"
                                variants={itemVariants}
                                whileHover={{ scale: 1.1, color: primaryGreen }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {platform.icon}
                                <span className="mt-3 text-lg font-medium" style={{ color: darkTextOnWhite }}>
                                    {platform.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {platform.category}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* AI Assistant Chat Interface */}
            <AnimatePresence>
                {aiAssistantVisible && (
                    <motion.div
                        className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        style={{ height: '600px', maxHeight: '90vh' }}
                    >
                        <div className="flex justify-between items-center p-4" style={{ backgroundColor: primaryGreen }}>
                            <div className="flex items-center space-x-2">
                                <FaRobot className="text-xl text-white" />
                                <h3 className="text-lg font-semibold text-white">QuantumTakeoff AI Assistant</h3>
                            </div>
                            <button 
                                onClick={() => setAiAssistantVisible(false)} 
                                className="text-white hover:text-gray-200 transition"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        
                        <div 
                            ref={aiChatboxRef}
                            className="flex-1 p-4 overflow-y-auto bg-gray-50 custom-scrollbar"
                        >
                            {aiMessages.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="bg-gradient-to-r from-blue-500 to-primaryGreen p-1 rounded-full w-16 h-16 mx-auto mb-4">
                                        <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                                            <FaBrain className="text-3xl" style={{ color: primaryGreen }} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: darkTextOnWhite }}>How can I help with your project?</h3>
                                    <p className="text-gray-600 mb-6">Ask me anything about construction, costs, or regulations.</p>
                                    
                                    <div className="mt-6">
                                        <p className="font-medium mb-3 text-left text-gray-700">Popular questions:</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {userQuestions.slice(0, 4).map((q, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => askAI(q)}
                                                    className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition shadow-sm"
                                                >
                                                    <div className="flex items-start">
                                                        <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 text-xs">?</span>
                                                        <span className="text-gray-700">{q}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {aiMessages.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-xl p-4 ${
                                                    msg.sender === 'user'
                                                    ? 'bg-blue-100 text-gray-800 rounded-br-none'
                                                    : 'bg-white text-gray-700 rounded-bl-none shadow-sm border border-gray-100'
                                                }`}
                                            >
                                                <div className="flex items-start">
                                                    {msg.sender === 'ai' && (
                                                        <div className="bg-gradient-to-r from-blue-500 to-primaryGreen p-0.5 rounded-full mr-3">
                                                            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                                                <FaBrain className="text-xs" style={{ color: primaryGreen }} />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div>
                                                        {msg.sender === 'ai' && (
                                                            <div className="font-medium text-xs mb-1" style={{ color: primaryGreen }}>QuantumTakeoff AI</div>
                                                        )}
                                                        <p className="text-gray-800">{msg.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    
                                    {isAiTyping && (
                                        <motion.div
                                            className="flex justify-start"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="bg-white text-gray-700 rounded-xl rounded-bl-none p-4 shadow-sm border border-gray-100 max-w-[85%]">
                                                <div className="flex items-center">
                                                    <div className="bg-gradient-to-r from-blue-500 to-primaryGreen p-0.5 rounded-full mr-3">
                                                        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                                            <FaBrain className="text-xs" style={{ color: primaryGreen }} />
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 border-t bg-white">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    askAI(currentAiQuestion);
                                }}
                                className="flex items-center space-x-2"
                            >
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={currentAiQuestion}
                                        onChange={(e) => setCurrentAiQuestion(e.target.value)}
                                        placeholder="Ask me anything about your project..."
                                        className="w-full p-3 pl-4 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryGreen focus:border-transparent"
                                        style={{ color: darkTextOnWhite }}
                                    />
                                    <button 
                                        type="button" 
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primaryGreen"
                                    >
                                        <FaMicrophoneAlt />
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-primaryGreen text-white p-3 rounded-xl hover:opacity-90 transition duration-200 flex items-center justify-center w-12 h-12"
                                    disabled={!currentAiQuestion.trim()}
                                >
                                    <FaPaperPlane className="text-lg" />
                                </button>
                            </form>
                            
                            <div className="mt-3 flex overflow-x-auto pb-1 space-x-2 custom-scrollbar">
                                {userQuestions.slice(0, 6).map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => askAI(q)}
                                        className="flex-shrink-0 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs hover:bg-gray-200 transition whitespace-nowrap"
                                    >
                                        {q.length > 30 ? q.substring(0, 27) + '...' : q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FeaturesGrid;