import { motion } from 'motion/react';

export function About() {
  const codeLines = [
    { type: 'comment', text: '/* about.c - Professional Developer Profile */' },
    { type: 'blank', text: '' },
    { type: 'include', text: '#include <stdio.h>' },
    { type: 'include', text: '#include <stdlib.h>' },
    { type: 'include', text: '#include <passion.h>' },
    { type: 'blank', text: '' },
    { type: 'comment', text: '// Developer structure definition' },
    { type: 'code', text: 'typedef struct {' },
    { type: 'code', text: '    char name[50];' },
    { type: 'code', text: '    int learning_experience_years;' },
    { type: 'code', text: '    char *specialties[];' },
    { type: 'code', text: '    bool available_for_hire;' },
    { type: 'code', text: '} Developer;' },
    { type: 'blank', text: '' },
    { type: 'code', text: 'int main(void) {' },
    { type: 'code', text: '    Developer me = {' },
    { type: 'code', text: '        .name = "Muhammad Alfan Muwaffiqul Ihsan",' },
    { type: 'code', text: '        .learning_experience_years = 2,' },
    { type: 'code', text: '        .specialties = {' },
    { type: 'code', text: '            "Full-Stack Development",' },
    { type: 'code', text: '            "Low Level Programming",' },
    { type: 'code', text: '            "Linux Ops",' },
    { type: 'code', text: '            "System Archithecture"' },
    { type: 'code', text: '        },' },
    { type: 'code', text: '        .available_for_hire = 0' },
    { type: 'code', text: '    };' },
    { type: 'blank', text: '' },
    { type: 'comment', text: '    // Philosophy: Write clean, maintainable code' },
    { type: 'comment', text: '    // Approach: Test-driven, agile, continuous learning' },
    { type: 'blank', text: '' },
    { type: 'code', text: '    printf("Building the future, one commit at a time.\\n");' },
    { type: 'code', text: '    return EXIT_SUCCESS;' },
    { type: 'code', text: '}' },
    { type: 'cursor', text: '' },
  ];

  const getSyntaxColor = (type: string) => {
    switch (type) {
      case 'comment':
        return 'var(--slate-500)';
      case 'include':
      case 'code':
        return 'var(--foreground)';
      default:
        return 'var(--foreground)';
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-32 px-6 lg:px-12 relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="max-w-5xl w-full relative z-10">
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
            <span className="mono text-sm" style={{ color: 'var(--electric-blue)' }}>02</span>
            <div className="h-px w-12 bg-border" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">About</h2>
          <p className="mono text-xs text-muted-foreground mt-2">_who_am_i</p>
        </motion.div>

        {/* C Code Terminal Block */}
        <motion.div 
          className="border border-border bg-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ 
            boxShadow: `0 0 30px ${getComputedStyle(document.documentElement).getPropertyValue('--electric-blue-glow') || 'rgba(0, 217, 255, 0.2)'}`
          }}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-destructive"
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'var(--slate-500)' }}
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'var(--slate-500)' }}
                whileHover={{ scale: 1.2 }}
              />
            </div>
            <span className="mono text-xs text-muted-foreground">about.c</span>
            <div className="w-12" />
          </div>

          {/* Code Content with line numbers */}
          <div className="p-6 md:p-8 overflow-x-auto">
            <div className="mono text-sm space-y-0.5 whitespace-pre-wrap">
              {codeLines.map((line, index) => (
                <motion.div
                  key={index}
                  className="flex leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  {/* Line number */}
                  <span className="text-muted-foreground mr-4 select-none w-8 text-right flex-shrink-0">
                    {line.type !== 'blank' && line.type !== 'cursor' ? index + 1 : ''}
                  </span>
                  
                  {/* Code content */}
                  <span style={{ color: getSyntaxColor(line.type) }}>
                    {line.type === 'include' && (
                      <>
                        <span style={{ color: 'var(--electric-blue)' }}>#include</span>
                        <span> {line.text.replace('#include ', '')}</span>
                      </>
                    )}
                    {line.type !== 'include' && line.type !== 'cursor' && line.text}
                    {line.type === 'cursor' && (
                      <motion.span
                        className="inline-block w-2 h-4 ml-1"
                        style={{ backgroundColor: 'var(--electric-blue)' }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Metrics - Centered below */}
        <motion.div 
          className="flex justify-center gap-12 mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: 'Languages', value: '4+' },
            { label: 'Frameworks', value: '2+' },
            { label: 'Technologies', value: '5+' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              className="mono text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--electric-blue)' }}>
                {metric.value}
              </div>
              <div className="text-muted-foreground text-xs">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
