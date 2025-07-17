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

// Reusable SVG Icons (assuming these are in a separate file or component in a real app)
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


const FeaturesGrid = () => {
    const [activeFeature, setActiveFeature] = useState(null);
    const [aiAssistantVisible, setAiAssistantVisible] = useState(false);
    const [aiMessages, setAiMessages] = useState([]);
    const [currentAiQuestion, setCurrentAiQuestion] = useState('');
    const aiChatboxRef = useRef(null); // Ref for scrolling AI chat
    const heroRef = useRef(null); // Ref for hero section parallax

    // For parallax effect on hero section
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    // Architectural images from public folder
    const architecturalImages = [
        "/fetch.jpg",
        "/rob.jpg", // New image
        "/rob2.jpg", // New image
        "/feature.jpg", // New image
        "/fetch.jpg", // Reusing fetch.jpg for the 5th feature as requested
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
            image: architecturalImages[4], // New image for this feature
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

    // Scroll to the bottom of the AI chatbox whenever messages change
    useEffect(() => {
        if (aiChatboxRef.current) {
            aiChatboxRef.current.scrollTop = aiChatboxRef.current.scrollHeight;
        }
    }, [aiMessages]);


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

    const askAI = (question) => {
        if (!question.trim()) return; // Prevent sending empty messages
        setAiMessages(prev => [...prev, { text: question, sender: 'user' }]);
        setCurrentAiQuestion(''); // Clear input after sending
        setAiAssistantVisible(true); // Ensure AI chat is visible

        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            setAiMessages(prev => [...prev, { text: response, sender: 'ai' }]);
        }, 1500); // Increased delay for more realistic typing feel
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
                className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden" // Reduced height
                style={{ background: darkBlueBackground }}
            >
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/fetch.jpg)', // Updated hero image to fetch.jpg
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        y: yParallax
                    }}
                >
                    {/* Darker overlay for better text contrast */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </motion.div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wider drop-shadow-lg"
                        style={{ color: lightBlueHighlight }}
                    >
                        QuantumTakeoff AI
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto font-light"
                        style={{ color: lightTextOnDark }}
                    >
                        Revolutionizing construction with **AI-powered precision** and **localized insights** for the Kenyan market.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="mt-12 px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        style={{ backgroundColor: primaryGreen, color: whiteContainer }}
                    >
                        Discover Solutions <FaArrowRight className="inline ml-3 text-xl" />
                    </motion.button>
                </div>
            </motion.section>

            {/* Main Features Section */}
            <section className="py-24 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
                <motion.h2
                    className="text-4xl lg:text-5xl font-extrabold text-center mb-16 relative"
                    style={{ color: darkTextOnWhite }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                >
                    <span className="relative z-10">Core Innovations</span>
                    <motion.span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full"
                        style={{ backgroundColor: primaryGreen, opacity: 0.2 }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px', transition: { duration: 0.8, delay: 0.2 } }}
                        viewport={{ once: true, amount: 0.3 }}
                    ></motion.span>
                </motion.h2>
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="rounded-3xl shadow-xl overflow-hidden cursor-pointer flex flex-col group transition-all duration-300"
                            style={{ backgroundColor: whiteContainer, border: `1px solid ${lightBorder}` }}
                            onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                            variants={itemVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <div className="relative h-60 bg-gray-200" style={getImageStyle(feature.image)}>
                                {/* Animated Overlay on Hover */}
                                <motion.div
                                    className="absolute inset-0 bg-black opacity-40 group-hover:opacity-10 transition-opacity duration-300"
                                    variants={cardHoverVariants}
                                />
                                {/* Feature Icon with Animation */}
                                <motion.div
                                    className="absolute top-6 left-6 p-4 rounded-full shadow-lg"
                                    style={{ backgroundColor: whiteContainer, color: primaryGreen }}
                                    variants={iconHoverVariants}
                                >
                                    {feature.icon}
                                </motion.div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-3" style={{ color: darkTextOnWhite }}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mb-4 flex-grow font-medium" style={{ color: subtleBlack }}>
                                    {feature.description}
                                </p>
                                <AnimatePresence initial={false}>
                                    {activeFeature === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-base mt-2 text-gray-700 leading-relaxed" style={{ color: darkTextOnWhite }}>
                                                {feature.detailed}
                                                {feature.kenyaSpecific && (
                                                    <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: verySubtleGreen, color: primaryGreen }}>
                                                        Kenya Specific
                                                    </span>
                                                )}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <motion.button
                                    className="mt-6 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 self-start"
                                    style={{ backgroundColor: primaryGreen, color: whiteContainer }}
                                    whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 109, 126, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => { e.stopPropagation(); setActiveFeature(activeFeature === index ? null : index); }}
                                >
                                    {activeFeature === index ? 'Show Less' : 'Learn More'}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Secondary Features Section */}
            <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: darkBlueBackground }}>
                <motion.h2
                    className="text-4xl lg:text-5xl font-extrabold text-center mb-16 relative"
                    style={{ color: lightBlueHighlight }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                >
                    <span className="relative z-10">Advanced Capabilities</span>
                    <motion.span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full"
                        style={{ backgroundColor: mediumBlueAccent, opacity: 0.2 }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px', transition: { duration: 0.8, delay: 0.2 } }}
                        viewport={{ once: true, amount: 0.3 }}
                    ></motion.span>
                </motion.h2>
                <motion.div
                    className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {advancedFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-start transition-all duration-300"
                            style={{ border: `1px solid ${lightBorder}` }}
                            variants={itemVariants}
                            whileHover={cardHoverVariants.hover}
                            whileTap={cardHoverVariants.tap}
                        >
                            <motion.div
                                className="mb-4 p-3 rounded-lg"
                                style={{ backgroundColor: feature.icon.props.style.color + '1A' }} // Using a subtle tint of icon color
                                variants={iconHoverVariants}
                            >
                                {React.cloneElement(feature.icon, { style: { color: feature.icon.props.style.color } })}
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: darkTextOnWhite }}>
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 mb-4 flex-grow font-medium" style={{ color: subtleBlack }}>
                                {feature.description}
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed" style={{ color: darkTextOnWhite }}>
                                {feature.detailed}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Additional Features Section (compact list) */}
            <section className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-white to-gray-100">
                <motion.h2
                    className="text-4xl lg:text-5xl font-extrabold text-center mb-16 relative"
                    style={{ color: darkTextOnWhite }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                >
                    <span className="relative z-10">More Powerful Features</span>
                    <motion.span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full"
                        style={{ backgroundColor: primaryGreen, opacity: 0.2 }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px', transition: { duration: 0.8, delay: 0.2 } }}
                        viewport={{ once: true, amount: 0.3 }}
                    ></motion.span>
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {additionalFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4 transition-all duration-300"
                            style={{ border: `1px solid ${lightBorder}` }}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex-shrink-0 mt-1">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1" style={{ color: darkTextOnWhite }}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600" style={{ color: subtleBlack }}>
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Integrations Section */}
            <section className="py-24 px-4 md:px-8 lg:px-16" style={{ backgroundColor: darkBackground }}>
                <motion.h2
                    className="text-4xl lg:text-5xl font-extrabold text-center mb-16 relative"
                    style={{ color: lightTextOnDark }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                >
                    <span className="relative z-10">Seamless Integrations</span>
                    <motion.span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full"
                        style={{ backgroundColor: mediumBlueAccent, opacity: 0.2 }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px', transition: { duration: 0.8, delay: 0.2 } }}
                        viewport={{ once: true, amount: 0.3 }}
                    ></motion.span>
                </motion.h2>
                <motion.div
                    className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {integrationPlatforms.map((platform, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 p-7 rounded-xl shadow-lg text-center flex flex-col items-center justify-center min-w-[160px] transform hover:scale-105 transition-all duration-300"
                            style={{ backgroundColor: subtleBlack }}
                            variants={itemVariants}
                            whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                variants={iconHoverVariants}
                            >
                                {platform.icon}
                            </motion.div>
                            <h3 className="mt-4 text-xl font-semibold" style={{ color: lightTextOnDark }}>{platform.name}</h3>
                            <p className="text-sm text-gray-400" style={{ color: lightTextOnDark }}>{platform.category}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Call to Action at the bottom */}
            <section className="py-24 px-4 md:px-8 lg:px-16 text-center bg-gradient-to-r from-[#005a67] to={primaryGreen} relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/abstract-pattern.png)', backgroundSize: 'cover' }}></div>
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                    className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10"
                    style={{ color: whiteContainer }}
                >
                    Ready to Transform Your Construction Workflow?
                </motion.h2>
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light relative z-10"
                    style={{ color: lightBlueHighlight }}
                >
                    Experience **unparalleled accuracy**, **speed**, and **efficiency** with QuantumTakeoff AI.
                </motion.p>
                <motion.button
                    className="px-12 py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative z-10"
                    style={{ backgroundColor: whiteContainer, color: primaryGreen }}
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get a Live Demo <FaPlay className="inline ml-3 text-2xl" />
                </motion.button>
            </section>

            {/* Fixed AI Assistant Chat Widget */}
            <AnimatePresence>
                {aiAssistantVisible ? (
                    <motion.div
                        initial={{ opacity: 0, x: 200, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 200, scale: 0.8 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed bottom-8 right-8 z-50 w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[500px]"
                        style={{ borderColor: lightBorder }}
                    >
                        <div className="p-4 flex justify-between items-center flex-shrink-0" style={{ backgroundColor: darkBlueBackground, color: whiteContainer }}>
                            <h3 className="font-bold text-xl">AI Assistant <FaRobot className="inline ml-2" /></h3>
                            <button onClick={() => setAiAssistantVisible(false)} className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-700">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <div ref={aiChatboxRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar">
                            {aiMessages.length === 0 && (
                                <div className="text-center text-gray-500 italic py-10">
                                    Start a conversation! Click a suggestion or type your question below.
                                </div>
                            )}
                            {aiMessages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-xl shadow-md ${msg.sender === 'user' ? 'bg-blue-100 text-blue-800 rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                                        style={{
                                            backgroundColor: msg.sender === 'user' ? lightBlueHighlight : lightBorder,
                                            color: msg.sender === 'user' ? darkBlueBackground : darkTextOnWhite
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="p-4 border-t flex-shrink-0" style={{ borderColor: lightBorder }}>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                {userQuestions.slice(0, 4).map((q, index) => (
                                    <motion.button
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-left hover:bg-gray-200 transition-colors text-xs leading-tight"
                                        style={{ backgroundColor: lightBorder, color: subtleBlack }}
                                        onClick={() => askAI(q)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {q.length > 40 ? q.substring(0, 37) + '...' : q}
                                    </motion.button>
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Type your question..."
                                    className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    style={{ borderColor: lightBorder, color: darkTextOnWhite, backgroundColor: whiteContainer }}
                                    value={currentAiQuestion}
                                    onChange={(e) => setCurrentAiQuestion(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            askAI(currentAiQuestion);
                                        }
                                    }}
                                />
                                <motion.button
                                    className="px-4 rounded-r-lg"
                                    style={{ backgroundColor: primaryGreen, color: whiteContainer }}
                                    onClick={() => askAI(currentAiQuestion)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaArrowRight className="text-xl" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, type: "spring", damping: 20, stiffness: 300 }}
                        onClick={() => setAiAssistantVisible(true)}
                        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg text-white text-2xl flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: mediumBlueAccent }}
                        aria-label="Open AI Assistant"
                    >
                        <FaCommentDots />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FeaturesGrid;