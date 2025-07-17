import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

// --- Define the comprehensive color palette ---
const primaryGreen = '#006d7e'; // Your specific green
const darkBlueBackground = '#0D1C44';
const mediumBlueAccent = '#254CBA';
const lightBlueHighlight = '#CADBFB';
const iconDark = '#1a1a1a'; // A darker, almost black, for icons and dark text
const textLight = '#f0f0f0'; // Light text for dark backgrounds
const textDark = '#333333'; // Dark text for light backgrounds

// --- Reusable SVG Icons (using currentColor for Tailwind integration) ---
const FiCheck = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>);
const FiBarChart2 = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>);
const FiShield = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const FiArrowRight = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const FiPlay = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>);
const FiCpu = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>);
const FiLayers = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);
const FiTrendingUp = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>);
const FiZap = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const AiBrain = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M7 13.7V17a5 5 0 0 0 10 0v-3.3"></path><path d="M12 22v-4"></path><path d="M12 6V2"></path><path d="M9 18h6"></path><path d="M6 10H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"></path><path d="M18 10h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"></path></svg>);

const ProcessStep = ({ icon, title, description, imageSrc, imageAlt, reverseOrder }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-12 ${reverseOrder ? 'md:grid-flow-col-dense' : ''}`}
        >
            <div className={`flex flex-col items-center text-center md:items-start md:text-left ${reverseOrder ? 'md:order-2' : 'md:order-1'}`}>
                <div className="p-4 rounded-full mb-6" style={{ backgroundColor: `${primaryGreen}1A` }}>
                    {icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
                <p className="text-lg text-gray-700">{description}</p>
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className={`w-full relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 ${reverseOrder ? 'md:order-1' : 'md:order-2'}`}
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto max-h-96 object-cover object-center"
                />
            </motion.div>
        </motion.div>
    );
};

const UpgradedHeroSection = () => {
    const canvasRef = useRef(null);
    const spiralControls = useAnimation();
    const gridPulseControls = useAnimation();
    const highlightControls = useAnimation();
    const gradientControls = useAnimation();

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    }, []);

    // Function to redirect to login page
    const redirectToLogin = () => {
        window.location.href = '/login';
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 100; // Even more particles
        const connectionDistance = 150; // Increased connection distance

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            // Limit canvas height to the hero section, e.g., 100vh
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.8, // Larger particles
                speed: Math.random() * 0.5 + 0.2, // Faster particles
                opacity: Math.random() * 0.3 + 0.1, // Increased opacity range
                color: `rgba(${Math.floor(Math.random() * 50) + 10}, ${Math.floor(
                    Math.random() * 100
                ) + 150}, ${Math.floor(Math.random() * 50) + 200}, `, // More pronounced bluish tint
            });
        }

        let animationFrameId;
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p1, i) => {
                p1.y += p1.speed;
                if (p1.y > canvas.height) {
                    p1.y = 0;
                    p1.x = Math.random() * canvas.width;
                }
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
                ctx.fillStyle = p1.color + `${p1.opacity})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 200, 255, ${ // Even brighter line color
                            0.15 - distance / (connectionDistance * 10) // Fading more smoothly
                        })`;
                        ctx.lineWidth = 1; // Thicker lines
                        ctx.stroke();
                    }
                }
            });
            animationFrameId = requestAnimationFrame(animateParticles);
        };
        animateParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [handleMouseMove]);

    useEffect(() => {
        const runAnimations = async () => {
            spiralControls.start({
                rotate: 360,
                scale: [0.98, 1.02, 0.98],
                transition: { duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
            });

            gridPulseControls.start({
                scale: [1, 1.005, 1],
                opacity: [0.08, 0.15, 0.08],
                transition: { duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
            });

            highlightControls.start({
                opacity: [0, 0.15, 0], // More visible spotlight
                scale: [0.6, 1.4, 0.6], // Wider range
                transition: { duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
            });

            gradientControls.start({
                backgroundPosition: ['0% 0%', '100% 100%'],
                transition: { duration: 40, ease: 'linear', repeat: Infinity },
            });
        };
        runAnimations();
    }, [spiralControls, gridPulseControls, highlightControls, gradientControls]);

    // Combined capabilities and metrics into a single, more concise section
    const capabilitiesAndStats = [
        {
            icon: <FiCpu className="w-6 h-6" style={{ color: primaryGreen }} />, // Smaller icon
            title: 'Neural Cost Estimation',
            description: 'AI analyzes architectural plans for precise Bill of Quantities (BOQs).',
            metric: '98.5% Accuracy',
            statValue: '2.5M+',
            statLabel: 'Projects Analyzed',
        },
        {
            icon: <FiLayers className="w-6 h-6" style={{ color: primaryGreen }} />, // Smaller icon
            title: 'Integrated BIM Analysis',
            description: 'Seamlessly extracts quantities from major BIM software (Revit, AutoCAD, ArchiCAD).',
            metric: 'Real-time Sync',
            statValue: '47%',
            statLabel: 'Cost Reduction',
        },
        {
            icon: <FiTrendingUp className="w-6 h-6" style={{ color: primaryGreen }} />, // Smaller icon
            title: 'Dynamic Market Pricing',
            description: 'Access live material costs from 500+ Kenyan suppliers for accurate forecasting.',
            metric: '500+ Suppliers',
            statValue: '99.2%',
            statLabel: 'Accuracy Rate',
        },
        {
            icon: <FiZap className="w-6 h-6" style={{ color: primaryGreen }} />, // Smaller icon
            title: 'Rapid Quotation Generation',
            description: 'Generate detailed, editable, and downloadable quotations in seconds.',
            metric: 'Under 30s',
            statValue: '15 min',
            statLabel: 'Avg. Processing Time',
        },
    ];


    const benefits = [
        'Instantly transform architectural designs into precise quantity takeoffs.',
        'Drastically reduce estimation time with advanced AI automation.',
        'Ensure unparalleled accuracy in project cost forecasting.',
        'Integrate effortlessly with your existing civil engineering workflows.',
    ];

    const processStepsData = [
        {
            icon: <FiCpu className="w-12 h-12" style={{ color: primaryGreen }} />,
            title: 'Intelligent Data Ingestion',
            description: 'Our AI begins by processing your architectural sketches and BIM models, accurately identifying and extracting all necessary elements for quantity takeoffs.',
            imageSrc: '/land.jpg',
            imageAlt: 'AI processing architectural sketches',
        },
        {
            icon: <FiLayers className="w-12 h-12" style={{ color: primaryGreen }} />,
            title: 'Comprehensive Quantity Takeoff',
            description: 'Leveraging advanced algorithms, JTech AI performs a detailed quantity takeoff, calculating precise volumes, areas, and counts for every component.',
            imageSrc: '/landing.jpg',
            imageAlt: 'Detailed quantity takeoff analysis',
        },
        {
            icon: <FiTrendingUp className="w-12 h-12" style={{ color: primaryGreen }} />,
            title: 'Real-time Market Pricing Integration',
            description: 'We integrate with a vast network of Kenyan suppliers, fetching live material and labor costs to ensure your quotations are always based on the most current market data.',
            imageSrc: '/quontum.jpg',
            imageAlt: 'Real-time market pricing dashboard',
        },
        {
            icon: <FiZap className="w-12 h-12" style={{ color: primaryGreen }} />,
            title: 'Instant Quotation Generation & Export',
            description: 'Finally, JTech AI compiles all data into a fully editable and downloadable quotation, ready for client presentation or further customization in standard formats like Excel or PDF.',
            imageSrc: '/landing2.jpg',
            imageAlt: 'Instant quotation generation',
        },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-800 bg-white">
            {/* --- Top Section Background with feature.jpg --- */}
            <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden">
                {/* BACKGROUND IMAGE using feature.jpg */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/feature.jpg')",
                        zIndex: 1
                    }}
                    role="img"
                    aria-label="Abstract background image of land"
                ></div>

                <canvas ref={canvasRef} className="absolute inset-0 opacity-90" style={{ zIndex: 2 }}></canvas>

                {/* Dynamic Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(at 10% 20%, ${lightBlueHighlight}05, transparent 60%), radial-gradient(at 90% 80%, ${primaryGreen}05, transparent 60%), linear-gradient(135deg, ${darkBlueBackground}00, ${mediumBlueAccent}10)`, // Reduced opacity
                        backgroundSize: '250% 250%', // Larger for smoother movement
                        zIndex: 3
                    }}
                    animate={gradientControls}
                />

                {/* Radial Spotlight Effect (follows mousePosition) */}
                <motion.div
                    className="absolute rounded-full filter blur-3xl pointer-events-none"
                    style={{
                        width: '700px', // Larger spotlight
                        height: '700px',
                        top: mousePosition.y,
                        left: mousePosition.x,
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        background: `radial-gradient(circle at center, ${primaryGreen}10, transparent 65%)`, // Brighter, wider glow, reduced opacity
                        zIndex: 4
                    }}
                    animate={highlightControls}
                />

                {/* Circuit Board Overlay */}
                <div
                    className="absolute inset-0 opacity-05 pointer-events-none" // Greatly reduced opacity
                    style={{
                        backgroundImage:
                            `repeating-linear-gradient(0deg, ${mediumBlueAccent}05, ${mediumBlueAccent}05 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, ${mediumBlueAccent}05, ${mediumBlueAccent}05 1px, transparent 1px, transparent 30px)`, // Reduced opacity
                        backgroundSize: '30px 30px',
                        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 60%)',
                        zIndex: 5
                    }}
                ></div>

                {/* Spiral Animation */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    animate={spiralControls}
                    style={{
                        width: '80vw',
                        height: '80vw',
                        maxWidth: '800px',
                        maxHeight: '800px',
                        borderRadius: '50%',
                        border: `1px solid ${lightBlueHighlight}10`, // Reduced opacity
                        boxShadow: `0 0 100px ${lightBlueHighlight}05`, // Reduced opacity
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 6
                    }}
                >
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                width: `${100 - i * 15}%`,
                                height: `${100 - i * 15}%`,
                                borderRadius: '50%',
                                border: `1px dashed ${lightBlueHighlight}${10 + i * 5}`, // Reduced opacity
                            }}
                        />
                    ))}
                    <motion.div
                        className="absolute p-4 rounded-full shadow-2xl" // Larger, more prominent brain node
                        style={{ top: '10%', left: '90%', backgroundColor: mediumBlueAccent }}
                        animate={{
                            y: [0, -25, 0],
                            x: [0, 25, 0],
                            rotate: [0, 360, 0],
                        }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <AiBrain className="w-8 h-8" style={{ color: 'white' }} />
                    </motion.div>
                </motion.div>

                {/* Pulsating Grid Overlay */}
                <motion.div
                    className="absolute inset-0 opacity-05 pointer-events-none" // Greatly reduced opacity
                    style={{
                        backgroundImage:
                            `linear-gradient(to right, ${lightBlueHighlight}05 1px, transparent 1px), linear-gradient(to bottom, ${lightBlueHighlight}05 1px, transparent 1px)`, // Reduced opacity
                        backgroundSize: '35px 35px', // Larger grid squares
                        zIndex: 7
                    }}
                    animate={gridPulseControls}
                />
            </div>

            {/* --- Hero Section Content - Main Layout --- */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="max-w-screen-xl mx-auto px-4 lg:px-8 w-full py-16 lg:py-28">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left Content Area (Text, Buttons, Benefits) */}
                        {/* Added self-start to align content to the top within the flex container */}
                        <div className="flex flex-col justify-center lg:self-start">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="mb-10"
                            >
                                <div className={`inline-flex items-center text-sm font-semibold mb-6 shadow-inner rounded-full px-5 py-2`} style={{ backgroundColor: `${mediumBlueAccent}1A`, color: mediumBlueAccent, borderColor: `${mediumBlueAccent}44`, borderWidth: '1px' }}>
                                    <div className="w-3 h-3 rounded-full mr-2 animate-pulse" style={{ backgroundColor: mediumBlueAccent }} />
                                    Empowering Kenyan Civil Engineering
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight lg:leading-snug drop-shadow-lg">
                                    AI-Powered Precision for{' '}
                                    <span style={{ color: primaryGreen, textShadow: `0 0 10px ${primaryGreen}77` }}>
                                        Civil Engineering
                                    </span>{' '}
                                    Quotations.
                                </h1>

                                <p className="text-lg sm:text-xl text-white mb-8 leading-relaxed drop-shadow-lg">
                                    Upload an architectural sketch, and **JTech AI** instantly
                                    generates a full, detailed, editable, and downloadable quotation,
                                    integrated with industry-standard software.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="mb-12"
                            >
                                <div className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center text-white p-2 rounded-lg transition-colors duration-200 drop-shadow-lg"
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                                        >
                                            <FiCheck className="mr-4 w-7 h-7 flex-shrink-0" style={{ color: primaryGreen }} />
                                            <span className="text-base sm:text-lg">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <div className="flex flex-wrap gap-4 mb-16">
                                <motion.button
                                    className="text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl flex items-center space-x-3 group relative overflow-hidden text-lg"
                                    style={{ backgroundColor: primaryGreen }}
                                    whileHover={{ scale: 1.03, boxShadow: `0 12px 25px ${primaryGreen}44` }}
                                    whileTap={{ scale: 0.97, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2) inset' }}
                                    onClick={redirectToLogin}
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-white opacity-15 blur-xl"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                    />
                                    <span>Start Free Trial</span>
                                    <FiArrowRight className="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform" />
                                </motion.button>

                                {/* Watch Demo Button - Changed to blue background */}
                                <motion.button
                                    className="px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold hover:opacity-90 transition-all flex items-center space-x-3 group shadow-lg relative overflow-hidden text-lg"
                                    style={{ backgroundColor: mediumBlueAccent, color: 'white' }} /* Set background to blue */
                                    whileHover={{ scale: 1.03, boxShadow: `0 8px 20px ${mediumBlueAccent}40` }}
                                    whileTap={{ scale: 0.97, boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1) inset' }}
                                >
                                    <FiPlay className="w-6 h-6" style={{ color: 'white' }} /> {/* Icon color changed to white for contrast */}
                                    <span>Watch Demo</span>
                                </motion.button>

                                {/* Sign In Button - Changed to blue background */}
                                <motion.button
                                    className="px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg relative overflow-hidden text-lg"
                                    style={{ backgroundColor: darkBlueBackground, color: 'white' }} /* Set background to dark blue */
                                    whileHover={{ scale: 1.03, boxShadow: `0 8px 20px ${darkBlueBackground}40` }}
                                    whileTap={{ scale: 0.97, boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1) inset' }}
                                    onClick={redirectToLogin}
                                >
                                    Sign In
                                </motion.button>
                            </div>
                        </div>

                        {/* Right Content Area (Image with combined Capabilities and Stats) */}
                        <div className="relative mt-16 lg:mt-0 flex flex-col items-center lg:items-end justify-center">
                            {/* Image Showcase: const.jpg for AI application - Adjusted for centering */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                                className="w-full bg-transparent rounded-3xl shadow-none p-0 flex justify-center items-center" // Added flex, justify-center, items-center
                            >
                                <img
                                    src="/const.jpg"
                                    alt="AI analyzing architectural plans"
                                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 object-cover object-center max-h-80 md:max-h-96 lg:max-h-[500px]" // Adjusted max-height for better centering
                                />
                            </motion.div>

                            {/* Combined AI Capabilities & Stats Grid - Smaller, White/Glass-Morphism */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm lg:max-w-md mt-8" // Made max-width smaller, adjusted gap
                            >
                                {capabilitiesAndStats.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="rounded-xl p-4 shadow-lg border border-white/40 text-gray-800 flex flex-col items-start min-h-[180px]" // Smaller padding, rounded, added min-height
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(15px)' }} // White/Glass-morphism background
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, amount: 0.4 }}
                                        transition={{ duration: 0.7, delay: 1 + index * 0.15 }}
                                        whileHover={{ y: -5, boxShadow: `0 15px 30px ${primaryGreen}33` }}
                                    >
                                        <div className="p-2 rounded-full mb-3" style={{ backgroundColor: `${primaryGreen}1A` }}> {/* Smaller padding */}
                                            {item.icon}
                                        </div>
                                        <h4 className="text-lg font-bold mb-1">{item.title}</h4> {/* Smaller font size */}
                                        <p className="text-gray-700 text-sm mb-2 flex-grow"> {/* Smaller font size */}
                                            {item.description}
                                        </p>
                                        <div className="flex justify-between items-center w-full mt-auto pt-3 border-t border-gray-200"> {/* Smaller padding, lighter border */}
                                            <span className="font-semibold text-xs px-3 py-1 rounded-full" style={{ backgroundColor: `${primaryGreen}33`, color: primaryGreen }}> {/* Smaller font size, padding */}
                                                {item.metric}
                                            </span>
                                            <div className="text-right">
                                                <div className="text-md font-bold">{item.statValue}</div> {/* Smaller font size */}
                                                <div className="text-xs text-gray-600">{item.statLabel}</div> {/* Smaller font size */}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {/* The rest of your component (ProcessStep, etc.) would go here, outside the hero section, typically. */}
        </div>
    );
};

export default UpgradedHeroSection;