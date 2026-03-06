import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';

const projects = [
  {
    id: 1,
    title: 'AMARTA (Aplikasi Manajemen Jalan Dan Jembatan)',
    description: 'web-based public reporting management system that allows the public to report infrastructure conditions (roads, bridges) and monitor the status of follow-up in real-time.',
    tags: ['Laravel', 'TailwindCSS', 'MongoDB', 'JSON'],
    github: 'https://github.com/amarta-project-091825',
    live: 'https://github.com/amarta-project-091825',
    year: '2025'
  },
  {
    id: 2,
    title: 'Scriptoria (Aplikasi Manajemen Barang)',
    description: 'This POS System Website for Stationery MSMEs is designed to help digitize sales processes and store management for greater efficiency and organization. The system supports two main roles: Admin (store owner) and Employee (cashier), each with access rights based on operational needs.',
    tags: ['NextJS', 'PostgreSQL', 'Supabase', 'CSS'],
    github: 'https://github.com/apikapikk/scriptoria',
    live: 'https://github.com/apikapikk/scriptoria',
    year: '2025'
  },
  {
    id: 3,
    title: 'Recipe Apps (Aplikasi Pencarian Resep Mobile)',
    description: 'A platform for users to search, save, and share recipes. Users can add new recipes, edit existing ones, and save their favorites for later access.',
    tags: ['Kotlin', 'Firebase', 'XML'],
    github: 'https://github.com/apikapikk/recipeApp',
    live: 'https://github.com/apikapikk/recipeApp',
    year: '2024'
  },
  {
    id: 4,
    title: 'ArchDots (Linux Hyprland Dotfiles)',
    description: 'Dotfiles for Hyprland Window Manager Linux',
    tags: ['Bash','config','CSS','JSON'],
    github: 'https://github.com/apikapikk/dtflies-arch',
    live: 'https://github.com/apikapikk/dtflies-arch',
    year: '2024'
  },
  {
    id: 5,
    title: 'Simple Memory Allocator C (Custom Malloc)',
    description: 'Docs About Learning to create Memory Allocator In C Language',
    tags: ['C','GCC'],
    github: 'https://github.com',
    live: null,
    year: '2026'
  },
  {
    id: 6,
    title: 'Simple LRU Cache using Double Linked List (Custom LRU Cache Hashing Methode)',
    description: 'Docs About Learning to create Simple LRU cache using Double Linked List Methode In C Language',
    tags: ['C','GCC'],
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2026'
  }
];

export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-32 px-6 lg:px-12 relative">
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
            <span className="mono text-sm" style={{ color: 'var(--electric-blue)' }}>03</span>
            <div className="h-px w-12 bg-border" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Selected Work</h2>
          <p className="mono text-xs text-muted-foreground mt-2">_recent_projects</p>
        </motion.div>

        {/* Symmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="border border-border p-6 hover:border-[var(--electric-blue)] transition-all duration-300 group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -12,
                boxShadow: `0 8px 30px ${getComputedStyle(document.documentElement).getPropertyValue('--electric-blue-glow') || 'rgba(0, 217, 255, 0.15)'}`
              }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <motion.div 
                    className="mono text-xs text-muted-foreground mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    [{project.year}]
                  </motion.div>
                  <h3 className="text-xl font-semibold group-hover:text-[var(--electric-blue)] transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-secondary border border-border opacity-0 group-hover:opacity-100 transition-all"
                      aria-label="View on GitHub"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-secondary border border-border opacity-0 group-hover:opacity-100 transition-all"
                      aria-label="View live demo"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Project Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tag}
                    className="mono text-xs px-3 py-1 border border-border text-muted-foreground group-hover:border-[var(--electric-blue)] group-hover:text-[var(--electric-blue)] transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Decorative Corner */}
              <motion.div 
                className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-[var(--electric-blue)] transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button 
            className="px-8 py-3 border border-border hover:border-[var(--electric-blue)] hover:text-[var(--electric-blue)] transition-colors mono text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
