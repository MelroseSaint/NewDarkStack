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
    const particleCount = 75;
    const particles: HTMLDivElement[] = [];

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
      setTimeout(() => p.style.opacity = '0.4', 100); 

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
      if (container) container.innerHTML = '';
      if (document.head.contains(styleSheet)) {
          document.head.removeChild(styleSheet);
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
  const [imageError, setImageError] = useState(false);

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
              A hyper-evolved AI development studio led by <span className="text-neon-magenta font-semibold">ObscuraCode</span>. 
              Fully overhauled. Fully animated. Fully engineered for the future.
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
              
              {/* Image Wrapper Container */}
              <div className="w-full h-full bg-[#151515] border border-white/10 rounded-2xl p-3 relative shadow-[0_0_25px_rgba(255,0,128,0.2)] flex items-center justify-center">
                
                {/* Image Content */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-black">
                  {!imageError ? (
                    <img 
                      src="/hero-image.jpg"
                      alt="DarkStack Avatar" 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                     <div className="flex flex-col items-center justify-center h-full z-10 text-center p-4 space-y-2 bg-[#111]">
                        <div className="text-neon-magenta font-mono text-xs tracking-widest">IMAGE_NOT_FOUND</div>
                        <div className="text-gray-600 font-mono text-[10px]">/public/hero-image.jpg</div>
                     </div>
                  )}

                  {/* Floating Code Symbols (Overlay) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="absolute text-5xl text-neon-cyan opacity-40 top-6 left-6 animate-pulse-slow font-mono transform translate-x-3 translate-y-3">{'{}'}</div>
                    <div className="absolute text-3xl text-neon-magenta opacity-40 bottom-6 right-6 animate-pulse-slow font-mono transform -translate-x-3 -translate-y-3">{'//'}</div>
                  </div>
                </div>

                {/* Neon Corner Accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-neon-magenta rounded-tl-lg"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-neon-cyan rounded-br-lg"></div>

              </div>
            </div>
            
            {/* SaintLabs Tag */}
            <div className="absolute -bottom-6 -left-6 px-4 py-2 bg-neon-blue text-black font-mono font-bold text-xs rounded-sm shadow-[0_0_15px_rgba(30,144,255,0.5)]">
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
    { name: 'AI Engineering', icon: Cpu, desc: 'LLM tuning, data science, and intelligent automation.' },
    { name: 'Full-Stack Web Dev', icon: Database, desc: 'Minimal, robust, and optimized web and SaaS platforms.' },
    { name: 'Dev Tools & Scripts', icon: Terminal, desc: 'Custom utilities, CLI tools, and automation scripts.' },
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
    { title: 'AI Tooling & Automation', icon: Cpu, color: 'text-neon-cyan' },
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
      name: 'Repo Generator AI',
      desc: 'Turn code into fully structured, documented repositories using generative AI.',
      tags: ['React', 'Node.js', 'LLMs', 'API'],
      link: '#',
      color: 'neon-cyan'
    },
    {
      name: 'SaintLabs Social Dashboard',
      desc: 'A custom, minimal dashboard for managing DarkStack social presence.',
      tags: ['Svelte', 'FireBase', 'Analytics'],
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
      name: 'SoloFlow Project Manager',
      desc: 'A hyper-minimalist Kanban board designed for maximum studio efficiency.',
      tags: ['Vue.js', 'Firestore'],
      link: '#',
      color: 'purple-500'
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
                <div className={`absolute inset-0 bg-gradient-to-r from-${project.color}/0 via-${project.color}/10 to-${project.color}/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] transform`}></div>

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
              <a href="mailto:contact@darkstackstudios.com" className="flex items-center gap-3 text-gray-300 hover:text-neon-cyan transition-colors font-mono">
                <div className="p-3 bg-white/5 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <span>contact@darkstackstudios.com</span>
              </a>
              
              <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-neon-magenta transition-colors font-mono">
                <div className="p-3 bg-white/5 rounded-full">
                  <Github className="w-6 h-6" />
                </div>
                <span>@DarkStackStudios</span>
              </a>

              <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors font-mono">
                <div className="p-3 bg-white/5 rounded-full">
                  <Twitter className="w-6 h-6" />
                </div>
                <span>@SaintLabs</span>
              </a>
            </div>

            <div className="mt-12">
               <GlowingButton href="mailto:contact@darkstackstudios.com" primary={true}>
                 SEND TRANSMISSION
               </GlowingButton>
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
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
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