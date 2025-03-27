import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CodeBracketIcon, 
  PaintBrushIcon, 
  RocketLaunchIcon,
  ArrowRightIcon,
  ChartBarIcon,
  CommandLineIcon,
  CursorArrowRaysIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Scene3D from './components/Scene3D';
import CustomCursor from './components/CustomCursor';
import AnimatedLogo from './components/AnimatedLogo';
import LoadingScreen from './components/LoadingScreen';
import HeroBackground from './components/HeroBackground';
import { ServiceCardSkeleton, HeroSkeleton, StatsSkeleton } from './components/Skeleton';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before showing content
      setTimeout(() => setContentLoaded(true), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (servicesRef.current) {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top center",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    }
  }, [contentLoaded]);

  return (
    <div className="min-h-screen bg-primary text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      <Scene3D />
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-primary/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <AnimatedLogo />
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex space-x-8"
            >
              <a href="#services" className="nav-link">Services</a>
              <a href="#work" className="nav-link">Our Work</a>
              <a href="#process" className="nav-link">Process</a>
              <a href="#contact" className="nav-link">Contact</a>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center">
        <div className="hero-gradient opacity-60" />
        <div className="container mx-auto px-6 relative pt-20">
          {contentLoaded ? (
            <motion.div 
              style={{ opacity, scale }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                  Crafting <span className="gradient-text">Digital Excellence</span> for Your Vision
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                  We transform ideas into stunning digital experiences, combining cutting-edge technology with breathtaking design.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="button-primary"
                  >
                    Start Your Project
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="button-secondary"
                  >
                    View Our Work
                    <CursorArrowRaysIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
              >
                {[
                  { number: "100+", label: "Projects Completed" },
                  { number: "50+", label: "Happy Clients" },
                  { number: "5⭐", label: "Average Rating" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <div key={index} className="glass-card p-6">
                    <div className="text-3xl font-display font-bold gradient-text">{stat.number}</div>
                    <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <HeroSkeleton />
          )}
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-32 relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-6 relative z-20">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading mb-6"
            >
              Our <span className="gradient-text">Services</span>
            </motion.h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We offer comprehensive digital solutions tailored to your needs, ensuring your business stands out in the digital landscape.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {contentLoaded ? (
              [
                {
                  icon: <CodeBracketIcon className="w-8 h-8" />,
                  title: "Web Development",
                  description: "Modern, responsive websites built with cutting-edge technologies for optimal performance and user experience.",
                  features: ["React/Next.js", "Custom CMS", "API Integration"]
                },
                {
                  icon: <PaintBrushIcon className="w-8 h-8" />,
                  title: "UI/UX Design",
                  description: "Intuitive and beautiful interfaces that engage users and drive conversions.",
                  features: ["User Research", "Wireframing", "Prototyping"]
                },
                {
                  icon: <RocketLaunchIcon className="w-8 h-8" />,
                  title: "Digital Strategy",
                  description: "Data-driven strategies to boost your online presence and achieve business goals.",
                  features: ["SEO Optimization", "Analytics", "Growth Planning"]
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card relative z-10 bg-surface/60 backdrop-blur-xl p-8 hover:bg-surface/80 transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-accent mb-6 transform-gpu transition-transform group-hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <SparklesIcon className="w-4 h-4 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))
            ) : (
              <>
                <ServiceCardSkeleton />
                <ServiceCardSkeleton />
                <ServiceCardSkeleton />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading mb-6"
            >
              Our <span className="gradient-text">Process</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We follow a proven methodology to ensure your project's success from concept to launch.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <CommandLineIcon className="w-6 h-6" />,
                step: "01",
                title: "Discovery",
                description: "Understanding your goals and requirements"
              },
              {
                icon: <PaintBrushIcon className="w-6 h-6" />,
                step: "02",
                title: "Design",
                description: "Creating beautiful and functional mockups"
              },
              {
                icon: <CodeBracketIcon className="w-6 h-6" />,
                step: "03",
                title: "Development",
                description: "Building with modern technologies"
              },
              {
                icon: <RocketLaunchIcon className="w-6 h-6" />,
                step: "04",
                title: "Launch",
                description: "Deploying and optimizing for success"
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-8 relative group hover:bg-accent/5 transition-colors"
              >
                <div className="text-accent mb-4">{phase.icon}</div>
                <div className="text-5xl font-display font-bold text-white/10 absolute top-4 right-4 group-hover:text-accent/20 transition-colors">
                  {phase.step}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{phase.title}</h3>
                <p className="text-gray-400">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-conic from-accent/20 via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="container mx-auto px-6 relative">
          <div className="glass-card p-12 md:p-20 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Ready to Transform Your <span className="gradient-text">Digital Presence</span>?
              </h2>
              <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                Let's create something extraordinary together. Get in touch with us to discuss your project and take your business to the next level.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-primary"
                >
                  Schedule a Call
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-secondary"
                >
                  View Pricing
                  <ChartBarIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
