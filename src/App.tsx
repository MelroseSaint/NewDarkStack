import React, { useState, useEffect, useRef } from 'react';
import {
    Code,
    Terminal,
    Cpu,
    Monitor,
    Github,
    Twitter,
    Mail,
    ArrowRight,
    ExternalLink,
    Menu,
    X,
    Database,
    Smartphone,
    Server,
    Fingerprint
} from 'lucide-react';

// Types
interface AnimatedElementProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

interface GlowingButtonProps {
    children: React.ReactNode;
    href: string;
    primary?: boolean;
}

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    id: string;
}

/**
 * UTILITY: ANIMATED BACKGROUND (Dark Flowing Particles / Code Stream)
 */
const AnimatedBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            // Generate a fixed number of particles (acting as code rain/energy flow)
            const particleCount = 50; // Reduced for performance
            const particles: HTMLDivElement[] = [];
            const colors = ['#00ffcc', '#ff0080', '#1e90ff']; // Direct color values

            for (let i = 0; i < particleCount; i++) {
                const p = document.createElement('div');
                p.className = 'absolute rounded-full pointer-events-none transition-opacity duration-1000';
                p.setAttribute('aria-hidden', 'true');

                // Randomize position
                p.style.left = `${Math.random() * 100}%`;
                p.style.top = `${Math.random() * 100}%`;

                // Randomize size and color
                const size = Math.random() * 2 + 1;
                p.style.width = `${size}px`;
                p.style.height = `${size}px`;
                p.style.backgroundColor = colors[Math.floor(Math.random() * 3)];

                // Custom animation delay and duration
                const flowDuration = Math.random() * 10 + 10;
                const glitchDuration = Math.random() * 5 + 2;
                p.style.animation = `flow ${flowDuration}s linear infinite, glitch-fade ${glitchDuration}s linear infinite`;
                p.style.animationDelay = `${Math.random() * 10}s`;
                p.style.opacity = '0.4';

                container.appendChild(p);
                particles.push(p);
            }

        // Add CSS keyframes dynamically
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.id = 'animated-background-styles';
        styleSheet.innerText = `
      @keyframes flow {
        0% { transform: translateY(0) translateX(0); opacity: 0.4; }
        50% { opacity: 0.7; }
        100% { transform: translateY(-100vh) translateX(5vw); opacity: 0; }
      }
      @keyframes glitch-fade {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(2); }
      }
    `;

        if (!document.head.querySelector('#animated-background-styles')) {
            document.head.appendChild(styleSheet);
        }

        return () => {
            // Cleanup particles
            particles.forEach(p => p.remove());
            if (container) container.innerHTML = '';
            // Cleanup stylesheet
            const existingStyleSheet = document.head.querySelector('#animated-background-styles');
            if (existingStyleSheet) {
                existingStyleSheet.remove();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black"
            style={{
                background: 'radial-gradient(ellipse at center, #0B0B0D 0%, #000000 100%)'
            }}
        />
    );
};

/**
 * UTILITY: ANIMATED SLIDE-IN ELEMENT
 * Uses IntersectionObserver to trigger a slide-up animation when the element enters the viewport.
 */
const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay = 0, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the item is visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        const currentRef = ref.current;
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
};

/**
 * COMPONENT: GLOWING BUTTON
 */
const GlowingButton: React.FC<GlowingButtonProps> = ({ children, href, primary = true }) => (
    <a
        href={href}
        className={`group relative px-8 py-4 font-bold font-mono overflow-hidden text-center text-sm transition-all duration-300
      ${primary
                ? 'bg-neon-magenta text-black shadow-[0_0_15px_rgba(255,0,128,0.4)] hover:shadow-[0_0_30px_rgba(255,0,128,0.8)]'
                : 'border border-white/20 text-white hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,204,0.3)]'
            } rounded-sm`}
    >
        <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
        </span>
        {/* Animated Laser Underline Effect */}
        <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    </a>
);

/**
 * COMPONENT: SECTION HEADER
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, id }) => (
    <AnimatedElement delay={100} className="mb-12 md:mb-20 pt-20 -mt-20">
        <div id={id}>
            <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-4">
                <span className="text-neon-cyan mr-2">{'//'}</span>
                {title}
            </h2>
            {subtitle && (
                <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl border-l-2 border-neon-magenta pl-4">
                    {subtitle}
                </p>
            )}
        </div>
    </AnimatedElement>
);

/**
 * COMPONENT: NAV BAR
 */
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleScroll = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setScrolled(window.scrollY > 50), 16);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    const navLinks = [
        { name: 'About (ObscuraCode)', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`} role="navigation" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#" className="flex items-center space-x-2 group" aria-label="DarkStack Studios Home">
                    <Code className="text-neon-magenta w-6 h-6 group-hover:rotate-6 transition-transform" aria-hidden="true" />
                        <span className="text-xl font-mono font-bold tracking-tighter text-white">
                            DarkStack<span className="text-cyan-300">Studios</span>
                        </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8" role="menubar">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-mono text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                            role="menuitem"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="hidden md:block">
                    <a href="#contact" className="px-4 py-2 border border-neon-blue text-neon-blue font-mono text-xs hover:bg-neon-blue hover:text-black transition-all rounded-sm">
                        @SaintLabs
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden text-white" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black border-b border-white/10 px-6 py-4 absolute w-full">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-3 font-mono text-gray-300 border-l-2 border-transparent hover:border-neon-magenta hover:pl-4 transition-all"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className="block py-3 font-mono text-neon-blue">
                        @SaintLabs Contact
                    </a>
                </div>
            )}
        </nav>
    );
};

/**
 * COMPONENT: HERO SECTION
 */
const Hero = () => {
    const [imageError, setImageError] = useState(false);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">



            {/* Main content wrapper */}
            <div className="relative z-20 flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">

                {/* TEXT SECTION */}
                <div className="flex-1 text-center md:text-left bg-black/40 backdrop-blur-sm rounded-xl p-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                        DarkStack<span className="text-cyan-400">Studios</span>
                    </h1>

                    <p className="text-lg text-gray-300 mt-4 max-w-md mx-auto md:mx-0">
                        A hyper-evolved AI development studio led by <span className="text-cyan-400 font-semibold">ObscuraCode</span>.
                        Fully overhauled. Fully animated. Fully engineered for the future.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.7)] text-white font-semibold">
                            Explore My Work
                        </button>
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 border border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10 transition rounded-xl text-white font-semibold">
                            Collaborate / Contact Me
                        </button>
                    </div>
                </div>

                {/* IMAGE SECTION — RESTORED FALLBACK STATE */}
                <div className="flex-1 relative w-full">
                    <div className="bg-[#151515] border border-white/10 rounded-2xl p-4 relative shadow-[0_0_25px_rgba(139,92,246,0.3)]">

                        <div className="relative w-full h-[420px] rounded-xl overflow-hidden">
                            {!imageError ? (
                                <>
                                    <img
                                        src="/hero-image.jpg"
                                        alt="Background visual"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Dark overlay for better text contrast in the text section */}
                                    <div className="absolute inset-0 bg-black/20"></div>
                                </>
                            ) : (
                                // Fallback if image fails to load
                                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                                        <Code className="w-12 h-12 text-cyan-400" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Small neon accent corners */}
                        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-purple-500 rounded-tl-lg"></div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-purple-500 rounded-br-lg"></div>

                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * COMPONENT: ABOUT SECTION
 */
const About = () => {
    const skills = [
        { name: 'AI Engineering', icon: Cpu, desc: 'LLM tuning and data science.' },
        { name: 'Full-Stack Web Dev', icon: Database, desc: 'Minimal, robust, and optimized web and SaaS platforms.' },
        { name: 'Dev Tools & Scripts', icon: Terminal, desc: 'Custom utilities and CLI tools.' },
    ];

    return (
        <section id="about" className="py-24 relative z-10 bg-[#0A0A0A] border-t border-b border-neon-blue/10">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader
                    title="The Founder — ObscuraCode"
                    subtitle="Precision, Elegance, and Intentional Engineering."
                    id="about"
                />

                <div className="grid lg:grid-cols-3 gap-12">
                    <AnimatedElement delay={300} className="lg:col-span-1 space-y-6 text-gray-300 leading-relaxed font-light">
                        <p className="border-l-4 border-neon-magenta pl-4 italic">
                            DarkStackStudios operates with a clear manifesto: to build software with unparalleled quality, intentional engineering, and an obsession for clean, efficient code.
                        </p>
                        <p>
                            Every project reflects a deep focus on efficiency and elegant solutions. The studio's commitment, driven by the ObscuraCode identity, is to deliver precise, purpose-built software experiences.
                        </p>
                        <p className="text-sm font-mono text-neon-cyan pt-4">
                            <span className="text-neon-magenta"># SaintLabs</span> is the social pulse—where the code meets the community.
                        </p>
                    </AnimatedElement>

                    <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <AnimatedElement key={index} delay={300 + index * 200}>
                                <div
                                    className="group p-6 bg-[#181818] border border-white/5 shadow-xl hover:border-neon-cyan transition-all duration-300 transform hover:scale-[1.03] rounded-lg"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <skill.icon className="w-6 h-6 text-neon-magenta group-hover:text-white transition-colors" />
                                        <h3 className="text-white font-mono font-bold text-lg">{skill.name}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">{skill.desc}</p>
                                </div>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * COMPONENT: SERVICES NETWORK
 */
const Services = () => {
    const services = [
        { title: 'AI Tooling', icon: Cpu, color: 'text-neon-cyan' },
        { title: 'SaaS & Web Dev', icon: Monitor, color: 'text-neon-blue' },
        { title: 'Digital Experiences', icon: Smartphone, color: 'text-neon-magenta' },
        { title: 'Consulting & Architecture', icon: Server, color: 'text-purple-400' }
    ];

    return (
        <section id="services" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader title="My Code, My Canvas" subtitle="A structured approach to delivering intentional software." id="services" />

                <div className="relative flex flex-col md:grid md:grid-cols-4 gap-12 text-center mt-16">

                    {/* Network Lines (CSS based for simplicity) */}
                    <div className="absolute hidden md:block inset-0 pointer-events-none">
                        {/* Center Node: DarkStackStudios */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 border border-white/20 rounded-full bg-black shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                            <Code className="w-8 h-8 text-white animate-spin-slow" />
                            <span className="absolute -bottom-6 text-xs font-mono text-gray-500">DarkStack</span>
                        </div>
                        {/* Lines connecting center to 4 nodes - Laser Effect */}
                        <div className="h-[2px] w-full absolute top-1/2 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent animate-pulse-light"></div>
                        <div className="h-full w-[2px] absolute left-1/2 bg-gradient-to-b from-transparent via-neon-magenta/50 to-transparent animate-pulse-light"></div>
                    </div>


                    {services.map((service, index) => (
                        <AnimatedElement key={index} delay={300 + index * 150}>
                            <div
                                className={`group relative p-6 bg-[#141414] border border-white/5 transition-all duration-500 hover:shadow-[0_0_25px_rgba(30,144,255,0.5)] transform hover:-translate-y-2 rounded-lg`}
                            >
                                <div className={`p-4 mx-auto w-fit border border-white/10 ${service.color} mb-6 transition-colors rounded-sm`}>
                                    <service.icon className={`w-8 h-8 ${service.color} group-hover:animate-pulse transition-colors`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 font-mono">{service.title}</h3>
                                {/* Laser Divider */}
                                <div className={`mt-4 h-[3px] w-12 mx-auto bg-gray-700 group-hover:w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent transition-all duration-500`}></div>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * COMPONENT: PROJECTS
 */
const Projects = () => {
    const projects = [
        {
            name: 'SteadyCoachAI',
            desc: 'AI-powered coaching platform for steady progress and goal achievement.',
            tags: ['AI', 'React', 'Node.js'],
            link: '#',
            color: 'neon-cyan'
        },
        {
            name: 'PlanNest',
            desc: 'Plannest (formerly Stars Binder) – a digital planning tool for teachers that streamlines lesson plans, newsletters, and admin tasks, with AI-powered activity suggestions.',
            tags: ['Web App', 'Planning', 'Collaboration'],
            link: 'https://www.plannest.online/',
            color: 'neon-magenta'
        },
        {
            name: 'RepoGenV2',
            desc: 'Advanced repository generation tool with enhanced AI capabilities.',
            tags: ['AI', 'Code Generation', 'Dev Tools'],
            link: '#',
            color: 'neon-blue'
        },
        {
            name: 'Repo Generator AI',
            desc: 'Turn code into fully structured, documented repositories using generative AI.',
            tags: ['React', 'Node.js', 'LLMs', 'API'],
            link: '#',
            color: 'purple-500'
        },
        {
            name: 'DealMentorAi',
            desc: 'AI-powered deal analysis and mentorship platform for investment decisions.',
            tags: ['Python', 'TensorFlow', 'React', 'FastAPI'],
            link: '#',
            color: 'neon-cyan'
        },
        {
            name: 'Skimmerwatcher',
            desc: 'Advanced fraud detection system using machine learning to identify skimming devices.',
            tags: ['Rust', 'ML', 'Security', 'WebAssembly'],
            link: '#',
            color: 'neon-magenta'
        },
        {
            name: 'Obscura CLI Tool',
            desc: 'A terminal utility for quick development setup and config management.',
            tags: ['Rust', 'CLI', 'WebAssembly'],
            link: '#',
            color: 'neon-blue'
        },
        {
            name: 'SaintLabs Social Dashboard',
            desc: 'A custom, minimal dashboard for managing DarkStack social presence.',
            tags: ['Svelte', 'FireBase', 'Analytics'],
            link: '#',
            color: 'neon-cyan'
        },
        {
            name: 'SoloFlow Project Manager',
            desc: 'A hyper-minimalist Kanban board designed for maximum studio efficiency.',
            tags: ['Vue.js', 'Firestore'],
            link: '#',
            color: 'neon-magenta'
        }
    ];

    return (
        <section id="projects" className="py-24 bg-[#0A0A0A] relative z-10 border-t border-neon-magenta/10">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader title="Projects Born in Code" subtitle="Showcasing the intersection of creativity and logic." id="projects" />

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedElement key={index} delay={300 + index * 150}>
                            <a
                                href={project.link}
                                className="block group relative overflow-hidden rounded-lg border border-white/5 bg-[#121212] hover:bg-[#181818] transition-all duration-500"
                            >
                                {/* Gradient Glow on Hover */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] transform ${
                                    project.color === 'neon-cyan' ? 'bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent' :
                                    project.color === 'neon-magenta' ? 'bg-gradient-to-r from-transparent via-pink-500/10 to-transparent' :
                                    project.color === 'neon-blue' ? 'bg-gradient-to-r from-transparent via-blue-500/10 to-transparent' :
                                    'bg-gradient-to-r from-transparent via-purple-500/10 to-transparent'
                                }`}></div>

                                <div className="p-8 relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-mono font-bold text-white group-hover:text-neon-cyan transition-colors">{project.name}</h3>
                                        <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-gray-400 mb-6 leading-relaxed">{project.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 text-xs font-mono border border-white/10 rounded-full text-gray-300 bg-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* Bottom Line */}
                                <div className={`absolute bottom-0 left-0 w-full h-1 opacity-30 group-hover:opacity-100 ${
                                    project.color === 'neon-cyan' ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' :
                                    project.color === 'neon-magenta' ? 'bg-gradient-to-r from-transparent via-pink-500 to-transparent' :
                                    project.color === 'neon-blue' ? 'bg-gradient-to-r from-transparent via-blue-500 to-transparent' :
                                    'bg-gradient-to-r from-transparent via-purple-500 to-transparent'
                                }`}></div>
                            </a>
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * COMPONENT: CONTACT
 */
const Contact = () => {
    return (
        <section id="contact" className="py-24 relative z-10 bg-[#050505]">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <SectionHeader title="Initialise Connection" id="contact" />

                <AnimatedElement delay={300}>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Ready to bring a vision to life? Whether it's a complex AI integration or a sleek web experience, I'm ready to deploy.
                    </p>

                    <div className="bg-[#111] p-8 md:p-12 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
                        {/* Background Grid Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                            <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors font-mono">
                                <div className="p-3 bg-white/5 rounded-full">
                                    <Twitter className="w-6 h-6" />
                                </div>
                                <span>@SaintLabs</span>
                            </a>
                        </div>

                        <div className="mt-12">
                        </div>
                    </div>
                </AnimatedElement>
            </div>
        </section>
    );
};

/**
 * COMPONENT: FOOTER
 */
const Footer = () => (
    <footer className="py-8 bg-black border-t border-white/10 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
            <Fingerprint className="w-5 h-5 text-gray-600" />
            <span className="text-gray-500 font-mono text-sm">ID: OBSCURA-CODE-V1.0</span>
        </div>
        <p className="text-gray-600 text-sm font-mono">
            © {new Date().getFullYear()} DarkStackStudios. All systems operational.
        </p>
    </footer>
);

/**
 * MAIN APP COMPONENT
 */
function App() {
    // Custom CSS Variables for Neon Theme
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--neon-cyan', '#00ffcc');
        root.style.setProperty('--neon-magenta', '#ff0080');
        root.style.setProperty('--neon-blue', '#1e90ff');
    }, []);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-neon-magenta selection:text-white overflow-x-hidden">
            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-6 { transform: rotateY(10deg); }
        .rotate-x-3 { transform: rotateX(5deg); }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-light { animation: pulse 3s ease-in-out infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite alternate; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes glow { 
          0% { filter: drop-shadow(0 0 5px currentColor); }
          100% { filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 30px currentColor); }
        }
        .text-shadow-neon { 
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        }
      `}</style>

            <AnimatedBackground />
            <Navbar />

            <main>
                <Hero />
                <About />
                <Services />
                <Projects />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default App;
