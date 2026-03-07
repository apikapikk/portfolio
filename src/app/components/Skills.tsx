import { Code2, Database, Wrench, Zap, Cloud, Shield, GitBranch, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend',
    skills: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Laravel']
  },
  {
    icon: Wrench,
    title: 'Backend',
    skills: ['Node.js', 'Java', 'Kotlin', 'PHP']
  },
  {
    icon: Cloud,
    title: 'DevOps',
    skills: ['Linux Basic', 'Docker', 'Bash', 'Git']
  },
  {
    icon: Database,
    title: 'Database',
    skills: ['MySQL','PostgreSQL','Firebase','MongoDB']
  }
];

const practices = [
  { icon: GitBranch, label: 'Version Control' },
  { icon: Terminal, label: 'CLI Tools' },
  { icon: Shield, label: 'Security Best Practices' },
  { icon: Zap, label: 'Performance Optimization' }
];

export function Skills() {
  return (
    <section id="skills" className="min-h-screen py-32 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Centered */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-border" />
            <span className="mono text-sm" style={{ color: 'var(--electric-blue)' }}>04</span>
            <div className="h-px w-12 bg-border" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Tech Stack</h2>
          <p className="mono text-xs text-muted-foreground mt-2">_skills_and_tools</p>
        </motion.div>

        {/* Skills Grid - Symmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="border border-border p-6 hover:border-[var(--electric-blue)] transition-all group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: `0 8px 30px ${getComputedStyle(document.documentElement).getPropertyValue('--electric-blue-glow') || 'rgba(0, 217, 255, 0.15)'}`
              }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <category.icon className="w-6 h-6" style={{ color: 'var(--electric-blue)' }} />
                <h3 className="font-semibold">{category.title}</h3>
              </motion.div>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill} 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <motion.div 
                      className="w-1 h-1 bg-muted-foreground"
                      whileHover={{ 
                        scale: 2,
                        backgroundColor: 'var(--electric-blue)'
                      }}
                    />
                    <span className="mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Best Practices - Centered */}
        <motion.div 
          className="border border-border p-8 md:p-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{
            boxShadow: `0 8px 30px ${getComputedStyle(document.documentElement).getPropertyValue('--electric-blue-glow') || 'rgba(0, 217, 255, 0.15)'}`
          }}
        >
          <motion.h3 
            className="text-2xl font-semibold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Development Practices
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practices.map((practice, index) => (
              <motion.div 
                key={practice.label} 
                className="flex flex-col items-center text-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <motion.div 
                  className="p-4 border border-border hover:border-[var(--electric-blue)] transition-colors"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    borderColor: 'var(--electric-blue)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <practice.icon className="w-8 h-8" style={{ color: 'var(--electric-blue)' }} />
                </motion.div>
                <span className="mono text-xs text-muted-foreground">{practice.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code Philosophy - Centered */}
        <motion.div 
          className="mt-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="border-t-2 pt-8" style={{ borderColor: 'var(--electric-blue)' }}>
            <motion.div 
              className="mono text-sm space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-muted-foreground">
                <span style={{ color: 'var(--electric-blue)' }}>//</span> Code Philosophy:
              </div>
              <div className="text-foreground leading-relaxed">
                "Talk is cheap. Show me the code"
              </div>
              <motion.div 
                className="text-muted-foreground mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <span style={{ color: 'var(--electric-blue)' }}>--</span> Adapted from Linus Torvalrds
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
