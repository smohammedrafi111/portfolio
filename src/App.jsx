import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  Code, 
  User, 
  Briefcase, 
  FolderOpen, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Github,
  Linkedin,
  Download,
  ChevronDown,
  Star,
  Award,
  Zap,
  Globe,
  Database,
  Smartphone,
  Monitor,
  Layers
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const floatingElementsRef = useRef([]);

  const sections = [
    { id: 'hero', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const skills = [
    { 
      category: 'Frontend Development', 
      items: ['React.js', 'Redux', 'TypeScript', 'Material-UI', 'HTML5', 'CSS3', 'JavaScript ES6+'],
      icon: Monitor,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      category: 'Backend & Database', 
      items: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs'],
      icon: Database,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      category: 'Tools & Technologies', 
      items: ['Git', 'Webpack', 'Jest', 'Firebase', 'GitHub Actions'],
      icon: Layers,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      category: 'Specializations', 
      items: ['PWA', 'SPA', 'Responsive Design', 'Performance Optimization', 'WCAG Accessibility'],
      icon: Smartphone,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const projects = [
    {
      title: 'AOTM IDP',
      description: 'AI-powered Intelligent Document Processing platform supporting 8+ industry verticals with advanced ML-enhanced document recognition.',
      technologies: ['React.js', 'Redux', 'Material-UI', 'AI/ML Integration'],
      status: 'February 2025 - Present',
      highlights: ['Multi-domain document extraction', 'Real-time validation', 'Microservice architecture']
    },
    {
      title: 'AOTMGPT',
      description: 'AI-powered financial tool for document processing and image generation with real-time data visualization.',
      technologies: ['React.js', 'Context API', 'REST APIs', 'React Router'],
      link: 'https://gpt.aotm.ai',
      status: 'October 2023 - December 2024',
      highlights: ['Custom visualizations', 'Real-time processing', 'Third-party API integration']
    },
    {
      title: 'Hotel Management System',
      description: 'High-performance SPA with advanced filtering, real-time updates, and responsive design achieving excellent Lighthouse scores.',
      technologies: ['React.js', 'Redux', 'Material-UI', 'Performance Optimization'],
      link: 'https://myhotelmatch.com/',
      status: 'December 2022 - August 2023',
      highlights: ['Advanced filtering', 'Responsive design', 'High performance scores']
    },
    {
      title: 'use-fetch-response',
      description: 'Custom React hook NPM package for API requests with advanced error handling and caching mechanisms.',
      technologies: ['React Hooks', 'Axios', 'Unit Testing', 'NPM Publishing'],
      link: 'https://www.npmjs.com/package/use-fetch-response',
      status: 'Open Source',
      highlights: ['Error handling', 'Request cancellation', 'Response caching']
    }
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations with GSAP
      const tl = gsap.timeline();
      
      // Animated title with typewriter effect
      tl.from(titleRef.current, {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power3.out"
      })
      .to(titleRef.current, {
        duration: 2,
        text: "Shaik Mohammed Rafi",
        ease: "none"
      }, "-=0.5")
      .from(subtitleRef.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.5");

      // Floating elements with GSAP
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: -20,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3
          });
        }
      });

      // Skills section scroll animation
      gsap.fromTo(".skill-card", 
        {
          y: 100,
          opacity: 0,
          rotation: 5
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Projects reveal animation
      gsap.fromTo(".project-card",
        {
          scale: 0.8,
          opacity: 0,
          y: 50
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for background elements
      gsap.to(".parallax-slow", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".parallax-fast", {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Mohammed Rafi
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <section.icon className="w-4 h-4 inline mr-2" />
                  {section.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-6 h-0.5 bg-white mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`w-6 h-0.5 bg-white mb-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-4 border-t border-white/10"
              >
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg mb-1"
                    whileTap={{ scale: 0.98 }}
                  >
                    <section.icon className="w-4 h-4 mr-3" />
                    {section.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section with GSAP animations */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        
        {/* GSAP Floating Elements */}
        <div 
          ref={el => floatingElementsRef.current[0] = el}
          className="parallax-slow absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
        />
        <div 
          ref={el => floatingElementsRef.current[1] = el}
          className="parallax-fast absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        />
        <div 
          ref={el => floatingElementsRef.current[2] = el}
          className="parallax-slow absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl"
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10 px-4"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User className="w-16 h-16 text-blue-400" />
              </div>
            </div>
          </motion.div>
          
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {/* GSAP will animate this text */}
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Frontend Developer specializing in React.js & Modern Web Technologies
          </p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <ExternalLink className="w-5 h-5 inline ml-2" />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <Mail className="w-5 h-5 inline ml-2" />
            </motion.button>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="animate-bounce"
          >
            <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Frontend Developer with <span className="text-blue-400 font-semibold">2.7 years of professional experience</span> at 
                Ninestars Information Technologies, specializing in building responsive Single Page Applications (SPAs) 
                and Progressive Web Apps (PWAs).
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Expert in <span className="text-purple-400 font-semibold">React.js, Redux, and Material-UI</span> with a proven track record of 
                significantly reducing load times through performance optimization and creating reusable component libraries 
                that enhance team productivity.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
                  <Award className="w-8 h-8 text-yellow-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Experience</h3>
                  <p className="text-gray-400">2.7+ Years</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
                  <Star className="w-8 h-8 text-green-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Projects</h3>
                  <p className="text-gray-400">15+ Completed</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Bangalore, Karnataka, India</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 text-green-400 mr-3" />
                  <span>smohammedrafi183@gmail.com</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 text-yellow-400 mr-3" />
                  <span>+91-9182858413</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Linkedin className="w-5 h-5 text-blue-500 mr-3" />
                  <span>in/shaik-mohammed-rafi-b18675241</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-semibold text-white mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {['English', 'Telugu', 'Hindi'].map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section with GSAP */}
      <section id="skills" ref={skillsRef} className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className="skill-card bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${skill.color} p-3 mb-4`}>
                  <skill.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">{skill.category}</h3>
                
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <div key={item} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="md:w-1/3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Frontend Developer</h3>
                <p className="text-blue-400 font-semibold mb-2">Ninestars Information Technologies Pvt. Ltd.</p>
                <p className="text-gray-400">December 2022 - Present</p>
              </div>
              
              <div className="md:w-2/3 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Performance Optimization</h4>
                    <p className="text-gray-400 text-sm">Implemented code splitting and lazy loading, significantly improving load times</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Globe className="w-6 h-6 text-green-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">API Integration</h4>
                    <p className="text-gray-400 text-sm">Developed robust data fetching patterns with excellent uptime</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Monitor className="w-6 h-6 text-blue-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Responsive Design</h4>
                    <p className="text-gray-400 text-sm">WCAG 2.1 AA compliance and seamless cross-device functionality</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Layers className="w-6 h-6 text-purple-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Component Library</h4>
                    <p className="text-gray-400 text-sm">Created reusable components increasing team productivity</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     
      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Status: {project.status}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-1">
                  {project.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects. 
              Let's connect and create something amazing together!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Mail className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Email Me</h3>
                <p className="text-gray-300 mb-4">Ready to discuss your next project</p>
                <a 
                  href="mailto:smohammedrafi183@gmail.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  smohammedrafi183@gmail.com
                </a>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Phone className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Call Me</h3>
                <p className="text-gray-300 mb-4">Available for phone consultations</p>
                <a 
                  href="tel:+919182858413"
                  className="text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  +91-9182858413
                </a>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Linkedin className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
                <p className="text-gray-300 mb-4">Connect with me professionally</p>
                <a 
                  href="https://linkedin.com/in/shaik-mohammed-rafi-b18675241"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
                >
                  View Profile
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Let's Work Together</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">What I Can Help You With:</h4>
                  <ul className="space-y-2">
                    {[
                      'React.js Web Application Development',
                      'Single Page Application (SPA) Development',
                      'Progressive Web App (PWA) Implementation',
                      'Frontend Performance Optimization',
                      'UI/UX Implementation with Material-UI',
                      'API Integration & State Management',
                      'Component Library Development',
                      'Code Review & Technical Consultation'
                    ].map((service) => (
                      <li key={service} className="flex items-start text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <motion.button
                    onClick={() => window.open('mailto:smohammedrafi183@gmail.com?subject=Project Inquiry&body=Hi Mohammed, I would like to discuss a project with you.', '_blank')}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                    <Mail className="w-5 h-5 inline ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Shaik Mohammed Rafi
                </h3>
                <p className="text-gray-400">Frontend Developer | React.js Specialist</p>
              </div>
              
              <div className="flex items-center space-x-6">
                <motion.a
                  href="mailto:smohammedrafi183@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/shaik-mohammed-rafi-b18675241"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                © 2025 Shaik Mohammed Rafi. All rights reserved. | Built with React & Framer Motion
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default App;