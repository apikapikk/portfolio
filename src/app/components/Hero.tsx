import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-6 lg:px-12">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col items-center text-center">
          {/* Main Content */}
          <div className="max-w-4xl space-y-6">
            <motion.div 
              className="mono text-sm"
              style={{ color: 'var(--electric-blue)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              $ whoami
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Muhammad
              <br />
              <span className="relative inline-block">
                Alfan Muwaffiqul I
                <motion.span
                  className="absolute -right-4 top-0 w-1 h-full"
                  style={{ backgroundColor: 'var(--electric-blue)' }}
                  animate={{ opacity: showCursor ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                />
              </span>
            </motion.h1>

            <motion.div 
              className="max-w-2xl mx-auto space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Information Technology Education student at Universitas Negeri Surabaya, focused on low-level programming, data structures, and system fundamentals. 
Currently exploring C and building a strong foundation in software engineering through hands-on experimentation.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a 
              href='https://github.com/apikapikk'
                className="px-8 py-3 bg-foreground text-background hover:bg-[var(--electric-blue)] hover:text-background transition-colors border border-foreground hover:border-[var(--electric-blue)] mono text-sm font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                /// <reference path=" />

              >
                View Projects
              </motion.a>
              <motion.a
              href='https://www.linkedin.com/in/muhammad-alfan-muwaffiqul-ihsan-28952228b'
                className="px-8 py-3 border border-border hover:border-[var(--electric-blue)] hover:text-[var(--electric-blue)] transition-colors mono text-sm font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Stats Grid - Centered */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-24 max-w-2xl w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { label: 'Learning Years Eexperience', value: '2+' },
              { label: 'Github Repository', value: '5+' },
              { label: 'Line Of Code', value: '1+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="border border-border p-6 hover:border-[var(--electric-blue)] transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: 'var(--electric-blue)' }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="mono text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.2, duration: 0.6 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
        >
          <span className="mono text-xs text-muted-foreground">scroll</span>
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--electric-blue)' }} />
        </motion.div>
      </div>
    </section>
  );
}
