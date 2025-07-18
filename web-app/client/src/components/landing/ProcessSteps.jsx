import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable SVG Icons (using currentColor for Tailwind integration) ---
// Kept existing icons, they are well-chosen and functional.
const FiCheck = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>);
const FiBarChart2 = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>);
const FiShield = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const FiArrowRight = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>);
const FiPlay = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>);
const FiCpu = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>);
const FiLayers = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);
const FiTrendingUp = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>);
const FiZap = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const AiBrain = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M7 13.7V17a5 5 0 0 0 10 0v-3.3"></path><path d="M12 22v-4"></path><path d="M12 6V2"></path><path d="M9 18h6"></path><path d="M6 10H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"></path><path d="M18 10h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"></path></svg>);

const FiFileUpload = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>);
const FiRobot = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 19V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"></path><path d="M8 19V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"></path><path d="M16 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"></path><path d="M8 17H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><circle cx="12" cy="12" r="2"></circle></svg>);
const FiMoneyBillWave = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 1V23"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);
const FiShareAlt = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>);
const FiGlobeAfrica = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);
const FiCalendarAlt = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>);
const FiLightbulb = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2z"></path><path d="M12 22v-4"></path><path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path></svg>);
const FiRocket = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5L2 22l5.5-2.5L22 2 16.5 7.5z"></path><path d="M15 9l-4 4"></path></svg>);
const FiBullseye = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
const FiSliders = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>); // New Icon for 'Customization'
const FiLifeBuoy = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.5" y2="9.5"></line><line x1="14.5" y1="14.5" x2="19.07" y2="19.07"></line><line x1="19.07" y1="4.93" x2="14.5" y2="9.5"></line><line x1="4.93" y1="19.07" x2="9.5" y2="14.5"></line></svg>); // New Icon for 'Support'


// --- Reusable Components ---

// A reusable Section component for consistent styling and scroll animations
const Section = ({ children, className = '', id, background = false }) => {
    // Adjusted variants for a more subtle and elegant entrance, suitable for a sleek design
    const sectionVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.99 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
    };

    return (
        <motion.section
            id={id}
            className={`relative py-28 md:py-36 px-4 overflow-hidden ${className}`}
            initial="hidden"
            whileInView="visible"
            // Adjust viewport amount to trigger earlier for a smoother flow
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            {/* Conditional background image with overlay - can be a subtle pattern or dynamic gradient */}
            {background && (
                <div className="absolute inset-0 w-full h-full z-0"
                    // Consider a subtle gradient or pattern instead of a fixed image for white background harmony
                    style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(240,247,255,0.8)), url('const4.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
                    <div className="absolute inset-0 bg-white opacity-40"></div> {/* Lighter overlay */}
                </div>
            )}
            <div className="container mx-auto max-w-7xl relative z-10">
                {children}
            </div>
        </motion.section>
    );
};

// Framer Motion variants for common animations
const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, rotateY: 10 }, // Subtle 3D rotation on enter
    visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.9, type: "spring", stiffness: 90, damping: 18 } }, // Spring for a lively feel
};

const listItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonHoverScale = {
    scale: 1.03, // Slightly less aggressive scale
    boxShadow: "0 8px 18px rgba(0,0,0,0.15)", // Softer, more refined shadow
    transition: { duration: 0.2 }
};
const buttonTapScale = {
    scale: 0.97 // Slightly less aggressive tap
};

// --- New ProcessStep Component for alternating layout ---
const ProcessStep = ({ stepData, reverseOrder, tagColors }) => {
    const { step, title, description, icon, visual, details, tags } = stepData;

    return (
        <div className={`flex flex-col items-center justify-between gap-12 md:gap-20 relative z-10
            ${reverseOrder ? 'lg:flex-row-reverse' : 'lg:flex-row'}
        `}>
            <motion.div
                className="lg:w-1/2 w-full flex-shrink-0 group relative" // Added relative for pseudo-elements/overlay
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }} // Stronger shadow on image hover
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <img src={visual} alt={title} className="rounded-3xl shadow-xl border border-gray-100 w-full object-cover transition-transform duration-500 ease-out" />
                {/* Subtle overlay on image for a modern touch */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            <motion.div
                className="lg:w-1/2 w-full text-center lg:text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ staggerChildren: 0.08 }} // Slightly faster stagger for snappier feel
            >
                <motion.h3
                    className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3 flex items-center justify-center lg:justify-start"
                    variants={textVariants}
                >
                    {/* Icon animation on hover of the parent group */}
                    <motion.span
                        className="text-2xl mr-2 text-blue-600"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {React.cloneElement(icon, { className: "w-6 h-6 inline-block" })}
                    </motion.span> STAGE {step}
                </motion.h3>
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight drop-shadow-sm"
                    variants={textVariants}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
                    variants={textVariants}
                >
                    {description}
                </motion.p>
                <motion.ul
                    className="space-y-3 text-gray-600 text-base mb-8"
                    variants={{ visible: { transition: { staggerChildren: 0.05 } } }} // Faster stagger
                >
                    {details.map((detail, i) => (
                        <motion.li
                            key={i}
                            className="flex items-start"
                            variants={listItemVariants}
                            whileHover={{ x: 5, color: '#3B82F6' }} // Subtle shift and color change on hover
                            transition={{ duration: 0.2 }}
                        >
                            <FiCheck className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                            <span>{detail}</span>
                        </motion.li>
                    ))}
                </motion.ul>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {tags.map(tag => (
                        <motion.span
                            key={tag}
                            className={`inline-flex items-center text-xs font-semibold px-4 py-2 rounded-full shadow-sm border ${tagColors[tag]}`}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.05, boxShadow: "0px 6px 15px rgba(0,0,0,0.15)", borderColor: 'currentColor', cursor: 'pointer' }} // Softer shadow and pointer cursor
                            aria-label={tag}
                        >
                            {/* Icons inside tags - ensuring they are styled correctly */}
                            {tag === "KENYA OPTIMIZED" && <FiGlobeAfrica className="mr-2 w-4 h-4" />}
                            {tag === "AI-POWERED" && <FiRobot className="mr-2 w-4 h-4" />}
                            {tag === "PRECISION" && <FiBullseye className="mr-2 w-4 h-4" />}
                            {tag === "TRANSPARENT PRICING" && <FiMoneyBillWave className="mr-2 w-4 h-4" />}
                            {tag === "COLLABORATION" && <FiShareAlt className="mr-2 w-4 h-4" />}
                            {tag === "EFFICIENT WORKFLOW" && <FiBarChart2 className="mr-2 w-4 h-4" />}
                            {tag === "CUSTOMIZABLE" && <FiSliders className="mr-2 w-4 h-4" />} {/* New Tag Icon */}
                            {tag === "DEDICATED SUPPORT" && <FiLifeBuoy className="mr-2 w-4 h-4" />} {/* New Tag Icon */}
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Component ---

const AdvancedProcessPage = () => {
    const steps = [
        {
            step: 1,
            title: "Effortless Design Upload",
            description: "Securely upload your architectural blueprints, CAD files, or even site photos. Our intelligent platform instantly recognizes diverse formats and precisely aligns with Kenyan construction standards.",
            icon: <FiFileUpload />,
            visual: "upload.jpg", // Placeholder - imagine a clean interface with a glowing upload button and document icons
            details: [
                "Supports all industry-standard formats: PDF, DWG, RVT, IFC, and more for universal compatibility.",
                "Intelligent recognition engine specifically trained on Kenyan building codes and regulatory standards.",
                "Seamless mobile photo capture with AI-enhanced measurement for accurate site context."
            ],
            tags: ["KENYA OPTIMIZED", "AI-POWERED", "EFFICIENT WORKFLOW"], // Added another relevant tag
        },
        {
            step: 2,
            title: "AI-Driven Precision Analysis",
            description: "Our proprietary AI meticulously analyzes every dimension, material specification, and current local market cost. This includes advanced material identification, automated quantity takeoff, and real-time KEBS compliance validation.",
            icon: <FiRobot />,
            visual: "analysis.jpg", // Placeholder - imagine a sleek dashboard with graphs and data points, subtle AI brain animation
            details: [
                "Pinpoint material identification integrated with real-time, dynamic Kenyan supplier data for unparalleled accuracy.",
                "Fully automated Quantity Takeoff (QTO) ensuring comprehensive and detailed Kenyan Bill of Quantities (BOQ) generation.",
                "Instantaneous KEBS compliance validation, proactively ensuring adherence to national building codes and regulations."
            ],
            tags: ["AI-POWERED", "PRECISION", "KENYA OPTIMIZED"], // Added another relevant tag
        },
        {
            step: 3,
            title: "Generate Actionable Estimates",
            description: "Receive detailed, transparent cost breakdowns and precise project timelines, all meticulously calculated in Kenyan Shillings. Our system provides dynamic local pricing updates and intelligently optimized labor calculations.",
            icon: <FiMoneyBillWave />,
            visual: "generate.jpg", // Placeholder - imagine a screen showing a clean, interactive BOQ with dynamic numbers changing
            details: [
                "Crystal-clear KES cost breakdowns empowered by dynamic, live local pricing updates to reflect market realities.",
                "Intelligently optimized labor calculations, specifically tailored for the Kenyan workforce market dynamics.",
                "Automatic inclusion of all county-specific taxes, levies, and statutory charges, eliminating hidden costs."
            ],
            tags: ["KENYA OPTIMIZED", "TRANSPARENT PRICING", "EFFICIENT WORKFLOW"], // Added another relevant tag
        },
        {
            step: 4,
            title: "Seamless Collaboration & Export",
            description: "Effortlessly share estimates with stakeholders, foster real-time team collaboration, and export your data in all essential, compliant formats. Generate professional, NCA-compliant bid proposals with unprecedented ease.",
            icon: <FiShareAlt />,
            visual: "quontum.jpg", // Placeholder - imagine multiple users collaborating on a document, sharing icons, and export options
            details: [
                "Robust team collaboration features with granular, role-based access controls for secure and efficient teamwork.",
                "Versatile export options including Excel, PDF, and standard Kenyan BOQ templates for maximum flexibility.",
                "Effortless generation of professional, National Construction Authority (NCA)-compliant bid proposals, saving valuable time."
            ],
            tags: ["COLLABORATION", "EFFICIENT WORKFLOW", "DEDICATED SUPPORT"], // Added a new tag
        },
    ];

    const differentiators = [
        {
            title: "Kenyan Market Intelligence",
            description: "Our AI is specifically trained on local pricing, labor, and regulatory data, giving you an unmatched edge in the Kenyan construction landscape.",
            icon: <FiGlobeAfrica className="text-blue-600" />,
        },
        {
            title: "Unrivaled Speed & Accuracy",
            description: "Leverage cutting-edge AI to generate comprehensive BOQs in minutes, not days, drastically reducing human error and project delays.",
            icon: <FiRocket className="text-blue-600" />,
        },
        {
            title: "Guaranteed Compliance",
            description: "Automated checks against KEBS and NCA standards ensure every estimate is fully compliant, mitigating risks and building trust.",
            icon: <FiShield className="text-blue-600" />,
        },
        {
            title: "Intuitive User Experience",
            description: "Designed with the professional in mind, our platform offers a streamlined, user-friendly interface that minimizes training and maximizes productivity.",
            icon: <FiLightbulb className="text-blue-600" />,
        },
        {
            title: "Customizable Workflows", // New Differentiator
            description: "Tailor the platform to fit your unique estimation processes, ensuring maximum flexibility and seamless integration with existing tools.",
            icon: <FiSliders className="text-blue-600" />,
        },
        {
            title: "Dedicated Local Support", // New Differentiator
            description: "Access a team of local experts ready to assist you, ensuring smooth operations and quick resolutions to any queries.",
            icon: <FiLifeBuoy className="text-blue-600" />,
        },
    ];

    // Tailwind classes for tag colors (refined palette for white background)
    const tagColors = {
        "KENYA OPTIMIZED": "bg-blue-100 text-blue-800 border-blue-200 hover:border-blue-500", // Adjusted hover border
        "AI-POWERED": "bg-indigo-100 text-indigo-800 border-indigo-200 hover:border-indigo-500",
        "PRECISION": "bg-cyan-100 text-cyan-800 border-cyan-200 hover:border-cyan-500",
        "TRANSPARENT PRICING": "bg-purple-100 text-purple-800 border-purple-200 hover:border-purple-500",
        "COLLABORATION": "bg-red-100 text-red-800 border-red-200 hover:border-red-500",
        "EFFICIENT WORKFLOW": "bg-emerald-100 text-emerald-800 border-emerald-200 hover:border-emerald-500",
        "CUSTOMIZABLE": "bg-yellow-100 text-yellow-800 border-yellow-200 hover:border-yellow-500", // New Tag Color
        "DEDICATED SUPPORT": "bg-green-100 text-green-800 border-green-200 hover:border-green-500", // New Tag Color
    };

    return (
        <div className="bg-white text-gray-800 font-sans antialiased">
            {/* Introduction to Process Section */}
            <Section id="process-intro" className="bg-gradient-to-br from-blue-50 to-white text-center py-20 md:py-32">
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight drop-shadow-lg"
                    variants={textVariants}
                >
                    Your Project's Journey, <span className="text-blue-600">Brilliantly Simplified.</span>
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
                    variants={textVariants} transition={{ delay: 0.2 }}
                >
                    From initial design upload to a fully compliant Kenyan Bill of Quantities, **QuantumTakeoff AI** guides you every step of the way with <strong className="text-blue-600">unparalleled precision</strong> and <strong className="text-blue-600">accelerated delivery</strong>.
                </motion.p>
                <motion.button
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out flex items-center justify-center group"
                    variants={textVariants} initial="hidden" animate="visible" transition={{ delay: 0.5, duration: 0.8 }}
                    whileHover={buttonHoverScale} whileTap={buttonTapScale}
                    aria-label="Discover how QuantumTakeoff AI works"
                >
                    Explore Our Process
                    <FiArrowRight className="ml-3 inline-block group-hover:translate-x-1 transition-transform duration-300" /> {/* Changed icon and animation */}
                </motion.button>
            </Section>

            {/* Subtle separator with animated dots */}
            <motion.div
                className="w-full flex justify-center py-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.span
                            key={i}
                            className="block w-3 h-3 bg-blue-300 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 150 }}
                        ></motion.span>
                    ))}
                </div>
            </motion.div>


            {/* Process Steps - Individual Sections with Alternating Layout */}
            <div className="relative">
                {steps.map((stepData, index) => (
                    <Section
                        key={stepData.step}
                        id={`step-${stepData.step}`}
                        className={`
                            ${index % 2 === 0 ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-gradient-to-tl from-gray-50 to-white'}
                            border-t border-gray-100
                        `}
                    >
                        <ProcessStep
                            stepData={stepData}
                            reverseOrder={index % 2 !== 0}
                            tagColors={tagColors}
                        />
                    </Section>
                ))}
            </div>

            {/* Subtle separator with animated line */}
            <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-16 md:my-24"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            ></motion.div>


            {/* Why Choose Us / Key Differentiators Section */}
            <Section id="differentiators" className="bg-blue-50 text-center py-20 md:py-32 border-t border-gray-100">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-900 leading-tight drop-shadow-sm"
                    variants={textVariants}
                >
                    Why Choose <span className="text-blue-600">QuantumTakeoff AI</span>?
                </motion.h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"> {/* Adjusted grid for new items */}
                    {differentiators.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center
                                transition-all duration-300 ease-in-out hover:shadow-xl hover:border-blue-300"
                            initial={{ opacity: 0, y: 40, rotateX: -15 }} // Subtle 3D rotation on entry
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.7, ease: "easeOut" }}
                            whileHover={{
                                y: -10, // More pronounced lift
                                scale: 1.01, // Subtle scale up
                                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)", // Stronger, more diffused shadow
                                borderColor: '#3B82F6', // Highlight border on hover
                                background: "linear-gradient(to tl, #E0F2FE, #FFFFFF)" // Subtle background change on hover
                            }}
                        >
                            {/* Clone element to pass className for group-hover effects on icon */}
                            {React.cloneElement(item.icon, {
                                className: `${item.icon.props.className} text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-700` // Larger icon, direct color change
                            })}
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Subtle separator */}
            <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-16 md:my-24"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            ></motion.div>
        </div>
    );
};

export default AdvancedProcessPage;