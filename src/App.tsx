import React, { useState, useEffect, useRef } from 'react';
import {
    Code,
    Terminal,
    Cpu,
    Zap,
    Layers,
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
import heroImage from './assets/hero-image.png';

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

        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 30 : 75;
        const particles: HTMLDivElement[] = [];
        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'absolute rounded-full pointer-events-none opacity-0 transition-opacity duration-1000';
            p.style.left = `${Math.random() * 100}vw`;
            p.style.top = `${Math.random() * 100}vh`;
            const size = Math.random() * 2 + 1;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            const colors = ['var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-blue)'];
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.animation = `flow ${Math.random() * 10 + 10}s linear infinite, glitch-fade ${Math.random() * 5}s linear infinite`;
            p.style.animationDelay = `${Math.random() * 10}s`;
            setTimeout(() => (p.style.opacity = '0.4'), 100);
            container.appendChild(p);
            particles.push(p);
        }
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
      @keyframes flow {0% {transform: translateY(0) translateX(0); opacity: 0.4;} 50% {opacity: 0.7;} 100% {transform: translateY(-100vh) translateX(5vw); opacity: 0;}}
      @keyframes glitch-fade {0%,100% {filter: brightness(1);} 50% {filter: brightness(2);}}
    `;
        document.head.appendChild(styleSheet);
        return () => {
            if (container) container.innerHTML = '';
            if (document.head.contains(styleSheet)) document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black"
            style={{ background: 'radial-gradient(ellipse at center, #0B0B0D 0%, #000000 100%)' }}
        />
    );
};

/**
 * UTILITY: ANIMATED SLIDE-IN ELEMENT
 */
const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay = 0, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        const cur = ref.current;
        return () => { if (cur) observer.unobserve(cur); };
    }, []);
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${className}`}
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${delay}ms` }}
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
        className={`group relative px-8 py-4 font-bold font-mono overflow-hidden text-center text-sm transition-all duration-300 ${primary
            ? 'bg-neon-magenta text-black shadow-[0_0_15px_rgba(255,0,128,0.4)] hover:shadow-[0_0_30px_rgba(255,0,128,0.8)]'
            : 'border border-white/20 text-white hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,204,0.3)]'
            } rounded-sm`}
    >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
    </a>
);

/**
 * COMPONENT: SECTION HEADER
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, id }) => (
    <AnimatedElement delay={100} className="mb-12 md:mb-20 pt-20 -mt-20">
        <div id={id}>
            <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-4">
                <span className="text-neon-cyan mr-2">{'//'} </span>{title}
            </h2>
            {subtitle && (
                <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl border-l-2 border-neon-magenta pl-4">{subtitle}</p>
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
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navLinks = [
        { name: 'About (ObscuraCode)', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                <a href="#" className="flex items-center space-x-2 group">
                    <Code className="text-neon-magenta w-6 h-6 group-hover:rotate-6 transition-transform" />
                    <span className="text-xl font-mono font-bold tracking-tighter text-white">DarkStack<span className="text-neon-cyan">Studios</span></span>
                </a>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} className="font-mono text-sm text-gray-400 hover:text-neon-cyan transition-colors">{link.name}</a>
                    ))}
                </div>
                <div className="hidden md:block">
                    <a href="#contact" className="px-4 py-2 border border-neon-blue text-neon-blue font-mono text-xs hover:bg-neon-blue hover:text-black transition-all rounded-sm">@SaintLabs</a>
                </div>
                <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
            </div>
            {isOpen && (
                <div className="md:hidden fixed inset-0 top-20 bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-8 animate-in slide-in-from-top-5 duration-300 flex flex-col gap-4 h-[calc(100vh-5rem)]">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block py-3 font-mono text-xl text-gray-300 border-l-2 border-transparent hover:border-neon-magenta hover:pl-4 hover:text-white transition-all">{link.name}</a>
                    ))}
                    <a href="#contact" onClick={() => setIsOpen(false)} className="block py-3 font-mono text-xl text-neon-blue border-l-2 border-transparent hover:border-neon-blue hover:pl-4 transition-all mt-4">@SaintLabs Contact</a>
                </div>
            )}
        </nav>
    );
};

/**
 * COMPONENT: HERO SECTION
 * Displays the main hero image and introduction
 */
const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-6 py-20 md:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,rgba(0,0,0,1)_70%] pointer-events-none"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-12 left-16 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-70"></div>
                <div className="absolute bottom-20 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-70"></div>
            </div>
            <div className="relative z-20 flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-6xl mx-auto">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">DarkStackStudios</h1>
                    <p className="text-base sm:text-lg text-gray-300 mt-4 max-w-md mx-auto md:mx-0">A hyper-evolved AI development studio led by <span className="text-purple-400 font-semibold">ObscuraCode</span>.</p>
                    <button className="mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.7)] w-full md:w-auto">Explore the Stack</button>

                    {/* Tech Stack */}
                    <div className="mt-8 md:mt-10 flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 opacity-80">
                        {['Trae AI', 'Google Canvas', 'Google Antigravity', 'AI Studio'].map((tech) => (
                            <span key={tech} className="px-3 py-1 text-[10px] md:text-xs font-mono text-purple-300 bg-purple-900/30 border border-purple-500/30 rounded-full whitespace-nowrap">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex-1 relative w-full">
                    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[420px] bg-[#151515] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                        <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-4xl md:text-5xl text-neon-cyan opacity-40 font-mono animate-pulse translate-x-3 translate-y-3">{'{}'}</div>
                            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-2xl md:text-3xl text-neon-magenta opacity-40 font-mono animate-pulse -translate-x-3 -translate-y-3">{'//'}</div>
                        </div>
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
        { name: 'AI Engineering', icon: Cpu, desc: 'LLM tuning, data science, and intelligent automation.' },
        { name: 'Full-Stack Web Dev', icon: Database, desc: 'Minimal, robust, and optimized web and SaaS platforms.' },
        { name: 'Dev Tools & Scripts', icon: Terminal, desc: 'Custom utilities, CLI tools, and automation scripts.' },
    ];
    return (
        <section id="about" className="py-16 md:py-24 relative z-10 bg-[#0A0A0A] border-t border-b border-neon-blue/10">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <SectionHeader title="The Founder — ObscuraCode" subtitle="Precision, Elegance, and Intentional Engineering." id="about" />
                <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                    <AnimatedElement delay={300} className="lg:col-span-1 space-y-6 text-gray-300 leading-relaxed font-light text-sm md:text-base">
                        <p className="border-l-4 border-neon-magenta pl-4 italic">DarkStackStudios operates with a clear manifesto: to build software with unparalleled quality, intentional engineering, and an obsession for clean, efficient code.</p>
                        <p>Every project reflects a deep focus on efficiency and elegant solutions. The studio's commitment, driven by the ObscuraCode identity, is to deliver precise, purpose-built software experiences.</p>
                        <p className="text-sm font-mono text-neon-cyan pt-4"><span className="text-neon-magenta"># SaintLabs</span> is the social pulse—where the code meets the community.</p>
                    </AnimatedElement>
                    <div className="lg:col-span-2 grid md:grid-cols-3 gap-4 md:gap-6">
                        {skills.map((skill, index) => (
                            <AnimatedElement key={index} delay={300 + index * 200}>
                                <div className="group p-5 md:p-6 bg-[#181818] border border-white/5 shadow-xl hover:border-neon-cyan transition-all duration-300 transform hover:scale-[1.03] rounded-lg h-full">
                                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                                        <skill.icon className="w-5 h-5 md:w-6 md:h-6 text-neon-magenta group-hover:text-white transition-colors" />
                                        <h3 className="text-white font-mono font-bold text-base md:text-lg">{skill.name}</h3>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm">{skill.desc}</p>
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
        { title: 'AI Tooling & Automation', icon: Cpu, color: 'text-neon-cyan' },
        { title: 'SaaS & Web Dev', icon: Monitor, color: 'text-neon-blue' },
        { title: 'Digital Experiences', icon: Smartphone, color: 'text-neon-magenta' },
        { title: 'Consulting & Architecture', icon: Server, color: 'text-purple-400' },
    ];
    return (
        <section id="services" className="py-16 md:py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <SectionHeader title="My Code, My Canvas" subtitle="A structured approach to delivering intentional software." id="services" />
                <div className="relative flex flex-col md:grid md:grid-cols-4 gap-8 md:gap-12 text-center mt-12 md:mt-16">
                    <div className="absolute hidden md:block inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 border border-white/20 rounded-full bg-black shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                            <Code className="w-8 h-8 text-white animate-spin-slow" />
                            <span className="absolute -bottom-6 text-xs font-mono text-gray-500">DarkStack</span>
                        </div>
                        <div className="h-[2px] w-full absolute top-1/2 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent animate-pulse-light"></div>
                        <div className="h-full w-[2px] absolute left-1/2 bg-gradient-to-b from-transparent via-neon-magenta/50 to-transparent animate-pulse-light"></div>
                    </div>
                    {services.map((service, index) => (
                        <AnimatedElement key={index} delay={300 + index * 150}>
                            <div className={`group relative p-6 bg-[#141414] border border-white/5 transition-all duration-500 hover:shadow-[0_0_25px_rgba(30,144,255,0.5)] transform hover:-translate-y-2 rounded-lg h-full`}
                            >
                                <div className={`p-4 mx-auto w-fit border border-white/10 ${service.color} mb-6 transition-colors rounded-sm`}>
                                    <service.icon className={`w-8 h-8 ${service.color} group-hover:animate-pulse transition-colors`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 font-mono">{service.title}</h3>
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
        { name: 'Repo Generator AI', desc: 'Turn code into fully structured, documented repositories using generative AI.', tags: ['React', 'Node.js', 'LLMs', 'API'], link: '#', color: 'neon-cyan' },
        { name: 'SaintLabs Social Dashboard', desc: 'A custom, minimal dashboard for managing DarkStack social presence.', tags: ['Svelte', 'FireBase', 'Analytics'], link: '#', color: 'neon-magenta' },
        { name: 'Obscura CLI Tool', desc: 'A terminal utility for quick development setup and config management.', tags: ['Rust', 'CLI', 'WebAssembly'], link: '#', color: 'neon-blue' },
        { name: 'SoloFlow Project Manager', desc: 'A hyper-minimalist Kanban board designed for maximum studio efficiency.', tags: ['Vue.js', 'Firestore'], link: '#', color: 'purple-500' },
    ];
    return (
        <section id="projects" className="py-16 md:py-24 bg-[#0A0A0A] relative z-10 border-t border-neon-magenta/10">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <SectionHeader title="Projects Born in Code" subtitle="Showcasing the intersection of creativity and logic." id="projects" />
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <AnimatedElement key={index} delay={300 + index * 150}>
                            <a href={project.link} className="block group relative overflow-hidden rounded-lg border border-white/5 bg-[#121212] hover:bg-[#181818] transition-all duration-500 h-full">
                                <div className={`absolute inset-0 bg-gradient-to-r from-${project.color}/0 via-${project.color}/10 to-${project.color}/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] transform`}></div>
                                <div className="p-6 md:p-8 relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl md:text-2xl font-mono font-bold text-white group-hover:text-neon-cyan transition-colors">{project.name}</h3>
                                        <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">{project.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 text-xs font-mono border border-white/10 rounded-full text-gray-300 bg-white/5">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${project.color} to-transparent opacity-30 group-hover:opacity-100`}></div>
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
const Contact = () => (
    <section id="contact" className="py-16 md:py-24 relative z-10 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <SectionHeader title="Initialise Connection" id="contact" />
            <AnimatedElement delay={300}>
                <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto">Ready to bring a vision to life? Whether it's a complex AI integration or a sleek web experience, I'm ready to deploy.</p>
                <div className="bg-[#111] p-6 md:p-12 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                        <a href="mailto:contact@darkstackstudios.com" className="flex items-center gap-3 text-gray-300 hover:text-neon-cyan transition-colors font-mono text-sm md:text-base"><div className="p-3 bg-white/5 rounded-full"><Mail className="w-5 h-5 md:w-6 md:h-6" /></div><span>contact@darkstackstudios.com</span></a>
                        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-neon-magenta transition-colors font-mono text-sm md:text-base"><div className="p-3 bg-white/5 rounded-full"><Github className="w-5 h-5 md:w-6 md:h-6" /></div><span>@DarkStackStudios</span></a>
                        <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors font-mono text-sm md:text-base"><div className="p-3 bg-white/5 rounded-full"><Twitter className="w-5 h-5 md:w-6 md:h-6" /></div><span>@SaintLabs</span></a>
                    </div>
                    <div className="mt-8 md:mt-12"><GlowingButton href="mailto:contact@darkstackstudios.com" primary={true}>SEND TRANSMISSION</GlowingButton></div>
                </div>
            </AnimatedElement>
        </div>
    </section>
);

/**
 * COMPONENT: FOOTER
 */
const Footer = () => (
    <footer className="py-8 bg-black border-t border-white/10 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4"><Fingerprint className="w-5 h-5 text-gray-600" /><span className="text-gray-500 font-mono text-sm">ID: OBSCURA-CODE-V1.0</span></div>
        <p className="text-gray-600 text-sm font-mono">© {new Date().getFullYear()} DarkStackStudios. All systems operational.</p>
    </footer>
);

function App() {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--neon-cyan', '#00ffcc');
        root.style.setProperty('--neon-magenta', '#ff0080');
        root.style.setProperty('--neon-blue', '#1e90ff');
    }, []);
    return (
        <div className="bg-black min-h-screen text-white selection:bg-neon-magenta selection:text-white overflow-x-hidden">
            <style>{`\n        .perspective-1000 { perspective: 1000px; }\n        .rotate-y-6 { transform: rotateY(10deg); }\n        .rotate-x-3 { transform: rotateX(5deg); }\n        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }\n        .animate-pulse-light { animation: pulse 3s ease-in-out infinite; }\n        .animate-blink { animation: blink 1s step-end infinite; }\n        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }\n      `}</style>
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
