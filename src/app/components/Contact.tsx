import { Mail, Send, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="min-h-screen py-32 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto">
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
            <span className="mono text-sm" style={{ color: 'var(--electric-blue)' }}>05</span>
            <div className="h-px w-12 bg-border" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Get In Touch</h2>
          <p className="mono text-xs text-muted-foreground mt-2">_contact_me</p>
        </motion.div>

        {/* Contact Info Cards - Centered Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { icon: Mail, label: 'Email', value: 'muhammadalfan.23072@mhs.unesa.ac.id', href: '#' },
            { icon: MapPin, label: 'Location', value: 'Global / Remote', href: null },
            { icon: Calendar, label: 'Availability', value: 'Open to new projects', href: null }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="border border-border p-6 text-center hover:border-[var(--electric-blue)] transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: `0 8px 30px ${getComputedStyle(document.documentElement).getPropertyValue('--electric-blue-glow') || 'rgba(0, 217, 255, 0.15)'}`
              }}
            >
              <motion.div 
                className="inline-flex p-3 border border-border mb-4 group-hover:border-[var(--electric-blue)] transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <item.icon className="w-6 h-6" style={{ color: 'var(--electric-blue)' }} />
              </motion.div>
              <div className="mono text-xs text-muted-foreground mb-2">{item.label}</div>
              {item.href ? (
                <a 
                  href={item.href}
                  className="hover:text-[var(--electric-blue)] transition-colors text-sm"
                >
                  {item.value}
                </a>
              ) : (
                <div className="text-sm">{item.value}</div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form - Centered */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="border border-border p-8 md:p-12 space-y-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{
            boxShadow: `0 8px 30px ${getComputedStyle(document.documentElement).getPropertyValue('--electric-blue-glow') || 'rgba(0, 217, 255, 0.15)'}`
          }}
        >
          {/* Form Header */}
          <div className="pb-4 border-b border-border">
            <div className="mono text-sm text-center" style={{ color: 'var(--electric-blue)' }}>
              $ send_message --to lpnd.
            </div>
          </div>

          {/* Name Field */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="name" className="mono text-xs text-muted-foreground">
              {isFocused.name ? '> ' : '_ '}name
            </label>
            <motion.input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setIsFocused({ ...isFocused, name: true })}
              onBlur={() => setIsFocused({ ...isFocused, name: false })}
              className="w-full px-4 py-3 bg-background border border-border focus:border-[var(--electric-blue)] outline-none transition-colors mono text-sm"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </motion.div>

          {/* Email Field */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="email" className="mono text-xs text-muted-foreground">
              {isFocused.email ? '> ' : '_ '}email
            </label>
            <motion.input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setIsFocused({ ...isFocused, email: true })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
              className="w-full px-4 py-3 bg-background border border-border focus:border-[var(--electric-blue)] outline-none transition-colors mono text-sm"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </motion.div>

          {/* Message Field */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <label htmlFor="message" className="mono text-xs text-muted-foreground">
              {isFocused.message ? '> ' : '_ '}message
            </label>
            <motion.textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setIsFocused({ ...isFocused, message: true })}
              onBlur={() => setIsFocused({ ...isFocused, message: false })}
              rows={6}
              className="w-full px-4 py-3 bg-background border border-border focus:border-[var(--electric-blue)] outline-none transition-colors mono text-sm resize-none"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <motion.button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-foreground text-background hover:bg-[var(--electric-blue)] hover:text-background transition-colors border border-foreground hover:border-[var(--electric-blue)] mono text-sm font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.button>
          </div>
        </motion.form>

        {/* Additional Info */}
        <motion.div 
          className="text-center mt-12 mono text-xs text-muted-foreground space-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className='text-xl'><span style={{ color: 'var(--electric-blue)' }}>$</span> response_time: &lt;24h</div>
          <div className='text-xl'><span style={{ color: 'var(--electric-blue)' }}>$</span> timezone: GMT+7</div>
          <div className='text-xl'><span style={{ color: 'var(--electric-blue)' }}>$</span> languages: EN, ID</div>
        </motion.div>
      </div>
    </section>
  );
}
