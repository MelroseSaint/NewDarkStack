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

/**
 * UTILITY: ANIMATED BACKGROUND (Dark Flowing Particles / Code Stream)
 */
const AnimatedBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Generate a fixed number of particles (acting as code rain/energy flow)
        const particleCount = 75;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'absolute rounded-full pointer-events-none opacity-0 transition-opacity duration-1000';

            // Randomize position
            p.style.left = `${Math.random() * 100}vw`;
            p.style.top = `${Math.random() * 100}vh`;

            // Randomize size and color
            const size = Math.random() * 2 + 1; // 1px to 3px
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            const colorIndex = Math.floor(Math.random() * 3);
            const colors = ['var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-blue)'];
            p.style.backgroundColor = colors[colorIndex];

            // Custom animation delay and duration for flowing/glitch effect
            p.style.animation = `flow ${Math.random() * 10 + 10}s linear infinite, glitch-fade ${Math.random() * 5}s linear infinite`;
            p.style.animationDelay = `${Math.random() * 10}s`;

            // Initial fade in
            setTimeout(() => p.style.opacity = 0.4, 100);

            container.appendChild(p);
            particles.push(p);
        }

        // Add CSS keyframes dynamically
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
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
        document.head.appendChild(styleSheet);

        return () => {
            // Cleanup
            container.innerHTML = '';
            document.head.removeChild(styleSheet);
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
const AnimatedElement = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
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

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
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
const GlowingButton = ({ children, href, primary = true }) => (
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
const SectionHeader = ({ title, subtitle, id }) => (
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
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#" className="flex items-center space-x-2 group">
                    <Code className="text-neon-magenta w-6 h-6 group-hover:rotate-6 transition-transform" />
                    <span className="text-xl font-mono font-bold tracking-tighter text-white">
                        DarkStack<span className="text-neon-cyan">Studios</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-mono text-sm text-gray-400 hover:text-neon-cyan transition-colors"
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
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
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
    // Removed typing state and effect to make the FOUNDER tag static as requested

    return (
        <section className="relative min-h-screen flex items-center pt-32 lg:pt-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                <div className="order-2 lg:order-1 space-y-8">
                    <AnimatedElement delay={100}>
                        <div className="inline-block px-3 py-1 border border-neon-cyan/30 rounded bg-neon-cyan/5 backdrop-blur-sm">
                            <span className="font-mono text-xs text-neon-cyan animate-pulse">
                // FOUNDER: ObscuraCode
                                <span className={`inline-block w-2 h-4 ml-1 bg-neon-magenta animate-blink`}></span>
                            </span>
                        </div>
                    </AnimatedElement>

                    <AnimatedElement delay={300}>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                            <span className="block text-gray-200">DarkStackStudios</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-neon-blue">
                                Digital Futures
                            </span>
                        </h1>
                    </AnimatedElement>

                    <AnimatedElement delay={500}>
                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed border-l-4 border-neon-blue pl-6">
                            Crafting AI-driven code and digital experiences from the shadows.
                        </p>
                    </AnimatedElement>

                    <AnimatedElement delay={700} className="flex flex-col sm:flex-row gap-4 pt-4">
                        <GlowingButton href="#projects" primary={true}>
                            EXPLORE THE STACK
                            <ArrowRight className="w-4 h-4" />
                        </GlowingButton>
                        <GlowingButton href="#contact" primary={false}>
                            Collaborate / Contact Me
                        </GlowingButton>
                    </AnimatedElement>
                </div>

                <AnimatedElement delay={500} className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
                    {/* SaintLabs / ObscuraCode Avatar Container */}
                    <div className="relative w-72 h-72 md:w-96 md:h-96 group perspective-1000">
                        {/* Animated 3D Card Effect */}
                        <div className="relative w-full h-full transform transition-transform duration-1000 group-hover:rotate-y-6 group-hover:rotate-x-3 group-hover:shadow-[0_0_50px_rgba(30,144,255,0.4)]">

                            {/* Image Wrapper */}
                            <div className="w-full h-full overflow-hidden bg-[#151515] border border-white/10 rounded-lg">
                                <img
                                    src="image.png"
                                    alt="Founder of DarkStackStudios"
                                    // Using object-cover for the portrait image
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                                        // Fallback placeholder
                                        e.target.parentElement.innerHTML = '<div class="text-center p-8"><div class="text-neon-magenta text-6xl mb-2 font-mono">/\\</div><div class="text-sm font-mono text-gray-500">FAILED TO DECRYPT IMAGE DATA.</div></div>';
                                    }}
                                />
                            </div>

                            {/* Floating Code Symbols */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="absolute text-5xl text-neon-cyan opacity-40 top-10 left-10 animate-pulse-slow font-mono transform translate-x-3 translate-y-3">{'{}'}</div>
                                <div className="absolute text-3xl text-neon-magenta opacity-40 bottom-10 right-10 animate-pulse-slow font-mono transform -translate-x-3 -translate-y-3">{'//'}</div>
                            </div>
                        </div>

                        {/* SaintLabs Tag */}
                        <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-neon-blue text-black font-mono font-bold text-xs rounded-sm">
                            @SAINTLABS
                        </div>
                    </div>
                </AnimatedElement>
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
            name: 'SaintLabs Social Dashboard',
            desc: 'A custom, minimal dashboard for managing DarkStack social presence.',
            tags: ['Svelte', 'FireBase', 'Analytics'],
            link: '#',
            color: 'neon-cyan'
        },
        {
            name: 'Obscura CLI Tool',
            desc: 'A terminal utility for quick development setup and config management.',
            tags: ['Rust', 'CLI', 'WebAssembly'],
            link: '#',
            color: 'neon-magenta'
        },
        {
            name: 'SoloFlow Project Manager',
            desc: 'A hyper-minimalist Kanban board designed for maximum studio efficiency.',
            tags: ['Vue.js', 'Firestore'],
            link: '#',
            color: 'neon-blue'
        }
    ];

    return (
        <section id="projects" className="py-24 bg-[#0A0A0A] relative z-10 border-t border-neon-magenta/10">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader title="Projects Born in Code" id="projects" />

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedElement key={index} delay={index * 200}>
                            <div
                                className={`group relative bg-[#111] border border-white/10 overflow-hidden transition-all duration-300 
                  hover:border-white/30 transform hover:scale-[1.01] hover:shadow-2xl hover:shadow-${project.color}/20 rounded-lg`}
                                style={{
                                    '--project-color': `var(--${project.color})`
                                }}
                            >
                                {/* Animated Code Preview (Placeholder) */}
                                <div className="h-4 bg-gray-900 border-b border-white/10 overflow-hidden">
                                    <div className="flex space-x-4 animate-scroll-code">
                                        <span className="text-xs font-mono text-gray-700">import {project.tags.join(', ')} from '{project.name}.js';</span>
                                    </div>
                                </div>

                                <div className="p-8 relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-black border border-white/10 rounded-lg">
                                            <Fingerprint className="w-5 h-5 text-neon-magenta" />
                                        </div>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-neon-cyan transition-colors cursor-pointer" />
                                        </a>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors font-mono">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-400 mb-6 font-light">
                                        {project.desc}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 text-xs font-mono text-gray-500 bg-white/5 rounded border border-white/5 group-hover:border-neon-cyan/50 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
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
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section id="contact" className="py-24 relative z-10">
            <div className="max-w-3xl mx-auto px-6">
                <AnimatedElement delay={100} className="text-center mb-12">
                    <SectionHeader title="Let's Connect / Transmit Data" id="contact" />
                    <p className="text-gray-400 text-lg">
                        Let’s build something that matters. DarkStackStudios is always open to collaboration.
                    </p>
                </AnimatedElement>

                <AnimatedElement delay={300}>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-neon-cyan">USER_ID (NAME)</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#111] border border-white/10 p-4 text-white focus:outline-none focus:border-neon-blue transition-colors rounded-sm"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-neon-cyan">COMMS_LINK (EMAIL)</label>
                                <input
                                    type="email"
                                    className="w-full bg-[#111] border border-white/10 p-4 text-white focus:outline-none focus:border-neon-blue transition-colors rounded-sm"
                                    placeholder="Email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-cyan">PAYLOAD (MESSAGE)</label>
                            <textarea
                                rows="5"
                                className="w-full bg-[#111] border border-white/10 p-4 text-white focus:outline-none focus:border-neon-blue transition-colors rounded-sm"
                                placeholder="Tell us about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-4 bg-neon-magenta text-black font-bold font-mono tracking-wider transition-all relative overflow-hidden 
                shadow-[0_0_15px_rgba(255,0,128,0.4)] hover:shadow-[0_0_30px_rgba(255,0,128,0.8)] animate-pulse-light rounded-sm`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <span className="relative z-10">
                                {isHovered ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                            </span>
                        </button>
                    </form>
                </AnimatedElement>

                <AnimatedElement delay={500} className="flex justify-center gap-8 mt-16">
                    <a href="https://twitter.com/SaintLabs" target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-7 h-7 text-gray-600 hover:text-neon-cyan cursor-pointer transition-colors" />
                    </a>
                    <a href="https://github.com/ObscuraCode" target="_blank" rel="noopener noreferrer">
                        <Github className="w-7 h-7 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                    </a>
                    <a href="#contact">
                        <Mail className="w-7 h-7 text-gray-600 hover:text-neon-magenta cursor-pointer transition-colors" />
                    </a>
                </AnimatedElement>
            </div>
        </section>
    );
};

/**
 * COMPONENT: FOOTER
 */
const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/5 bg-black relative z-10 text-center">
            <div className="font-mono text-xs text-gray-600 flex flex-col md:flex-row justify-center items-center gap-4">
                <span>© 2025 DarkStackStudios</span>
                <span className="hidden md:inline">|</span>
                <span>Developed by DarkStackStudios.</span>
            </div>
        </footer>
    );
};

/**
 * MAIN APP COMPONENT
 */
const App = () => {
    // Easter Egg
    useEffect(() => {
        console.log(
            "%c DarkStackStudios // ObscuraCode // @SaintLabs ",
            "background: #000; color: #FF0080; font-size: 18px; padding: 10px; border: 2px solid #00FFCC;"
        );
    }, []);

    return (
        <div className="bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden selection:bg-neon-magenta selection:text-white font-sans">

            {/* Custom Styles and Keyframes */}
            <style>{`
        /* Custom Neon Colors (Deep Black, Neon Accents) 
          Using variables for easy modification
        */
        :root {
          --neon-cyan: #00FFCC;
          --neon-blue: #1E90FF;
          --neon-magenta: #FF0080;
        }
        
        .text-neon-cyan { color: var(--neon-cyan); }
        .text-neon-blue { color: var(--neon-blue); }
        .text-neon-magenta { color: var(--neon-magenta); }
        
        .bg-neon-cyan { background-color: var(--neon-cyan); }
        .bg-neon-blue { background-color: var(--neon-blue); }
        .bg-neon-magenta { background-color: var(--neon-magenta); }
        
        .border-neon-cyan { border-color: var(--neon-cyan); }
        .border-neon-blue { border-color: var(--neon-blue); }
        .border-neon-magenta { border-color: var(--neon-magenta); }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s infinite alternate;
        }
        @keyframes pulse-slow {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.5; transform: scale(1.05); }
        }
        
        .animate-pulse-light {
          animation: pulse-light 2s infinite;
        }
        @keyframes pulse-light {
          0%, 100% { box-shadow: 0 0 15px rgba(255, 0, 128, 0.4); }
          50% { box-shadow: 0 0 25px rgba(255, 0, 128, 0.8); }
        }

        .animate-scroll-code {
          animation: scroll-code 20s linear infinite;
        }
        @keyframes scroll-code {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--neon-cyan); }
      `}</style>

            {/* Background Effect */}
            <AnimatedBackground />

            {/* Main Content */}
            <div className="relative">
                <Navbar />
                <Hero />
                <About />
                <Services />
                <Projects />
                <Contact />
                <Footer />
            </div>
        </div>
    );
};

export default App;
