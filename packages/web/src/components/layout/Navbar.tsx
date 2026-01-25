import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import veilLogo from '@/assets/logo.png';

const navItems = [
  { label: 'Home', href: '#', id: 'home' },
  { label: 'Your Problem', href: '#problem', id: 'problem' },
  { label: 'Our Solution', href: '#solution', id: 'solution' },
  { label: 'How Exactly?', href: '#how-exactly', id: 'how-exactly' },
  { label: 'Why us?', href: '#why-us', id: 'why-us' },
  { label: 'Roadmap', href: '#roadmap', id: 'roadmap' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      if (item.id !== 'home') {
        const section = document.getElementById(item.id);
        if (section) {
          observer.observe(section);
        }
      }
    });

    // Handle home section (when at top of page or hero section is visible)
    const heroSection = document.querySelector('section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src={veilLogo} alt="Veil" className="w-8 h-8 object-contain" />
            {/* <span className="text-xl font-bold font-display">Veil</span> */}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'nav-link transition-colors',
                  activeSection === item.id && 'text-primary font-semibold'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* <a href="#" className="btn-ghost">
              Docs
              <ExternalLink className="w-4 h-4" />
            </a> */}
            <a href="#" className="btn-primary">
              Install Extension
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'nav-link text-lg py-2 transition-colors',
                    activeSection === item.id && 'text-primary font-semibold'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                {/* <a href="#" className="btn-secondary justify-center">
                  Docs
                  <ExternalLink className="w-4 h-4" />
                </a> */}
                <a href="#" className="btn-primary justify-center">
                  Install Extension
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
