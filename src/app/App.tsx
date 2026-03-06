import { useState, useEffect } from 'react';
import { Moon, Sun, Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-2 mono"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Terminal className="w-5 h-5" style={{ color: 'var(--electric-blue)' }} />
              <span className="font-semibold tracking-tight">lpnd.</span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8 mono text-sm">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ color: 'var(--electric-blue)', scale: 1.1 }}
                  className="transition-colors"
                >
                  _{item}
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-secondary rounded transition-colors border border-border"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isDark ? (
                <Sun className="w-5 h-5" style={{ color: 'var(--electric-blue)' }} />
              ) : (
                <Moon className="w-5 h-5" style={{ color: 'var(--electric-blue)' }} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              className="mono text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2026 <span style={{ color: 'var(--electric-blue)' }}>dev.portfolio</span> — Crafted with precision
            </motion.p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: 'https://github.com/apikapikk', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-alfan-muwaffiqul-ihsan-28952228b', label: 'LinkedIn' },
                { icon: Mail, href: 'muhammadalfan.23072@mhs.unesa.ac.id', label: 'Email' }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-secondary rounded transition-colors border border-border"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    borderColor: 'var(--electric-blue)',
                    y: -4 
                  }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
