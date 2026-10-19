import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Terminal } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const { profile, projects, skills, experience, certifications } = portfolioData;

/* ─── Intro Overlay ──────────────────────────────────────────────────────── */
function IntroOverlay({ onDismiss }: { onDismiss: () => void }) {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0, 260], [0, 1, 0]);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const dismissed = useRef(false);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    onDismiss();
  };

  // drag / wheel dismiss
  const handleDragEnd = (_: unknown, info: { offset: { y: number; x: number }; velocity: { y: number; x: number } }) => {
    if (Math.abs(info.offset.y) > 40 || Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.y) > 200) {
      dismiss();
    } else {
      y.set(0);
    }
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 8) {
        e.preventDefault();
        dismiss();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        dismiss();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
        touchStartX.current = e.touches[0].clientX;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current !== null && e.changedTouches.length > 0) {
        const diffY = e.changedTouches[0].clientY - touchStartY.current;
        const diffX = e.changedTouches[0].clientX - (touchStartX.current ?? e.changedTouches[0].clientX);
        if (Math.abs(diffY) > 30 || Math.abs(diffX) > 30) {
          dismiss();
        }
      }
      touchStartY.current = null;
      touchStartX.current = null;
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-grab select-none flex-col items-center justify-center overflow-hidden bg-[#09090b] active:cursor-grabbing touch-none"
      style={{ y, opacity }}
      drag="y"
      dragConstraints={{ top: -200, bottom: 400 }}
      dragElastic={{ top: 0.35, bottom: 0.35 }}
      onDragEnd={handleDragEnd}
      exit={{ opacity: 0, y: '100%', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      onClick={dismiss}
    >
      {/* corner accents */}
      <span className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-[#ffd166]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-[#ffd166]" />

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-10" />

      {/* glowing orb */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd166]/10 blur-3xl"
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* content */}
      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <motion.div
          className="font-mono text-[10px] uppercase tracking-[.35em] text-zinc-600"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Portfolio — {new Date().getFullYear()}
        </motion.div>

        <motion.p
          className="text-[clamp(3rem,12vw,8rem)] font-bold leading-none tracking-[-0.07em] text-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          alfan<span className="text-[#ffd166]">.</span>
        </motion.p>

        <motion.p
          className="max-w-xs font-mono text-xs leading-relaxed text-zinc-500"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          Systems · Full-Stack · Open source
        </motion.p>

        {/* swipe / tap hint */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          onClick={dismiss}
        >
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-transparent to-[#ffd166]/70"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          />
          <span className="font-mono text-[9px] uppercase tracking-[.25em] text-zinc-500 hover:text-[#ffd166] transition-colors">
            Swipe or tap to explore
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}


const scenes = [
  { id: 'intro', index: '01', label: 'Tide', eyebrow: 'Systems / Full-Stack', title: 'Build close to the machine.', color: '#ffd166' },
  { id: 'education', index: '02', label: 'Foundation', eyebrow: 'Education / UNESA', title: 'Strong fundamentals compound.', color: '#ffe08a' },
  { id: 'experience', index: '03', label: 'Altitude', eyebrow: 'Experience / Teaching', title: 'Turn complexity into clarity.', color: '#ff6b35' },
  { id: 'systems', index: '04', label: 'Summit', eyebrow: 'Low-level / C / POSIX', title: 'Understand every layer.', color: '#a7f3d0' },
  { id: 'web', index: '05', label: 'Orbit', eyebrow: 'Web / Product / Data', title: 'Ship useful systems.', color: '#b8f35a' },
  { id: 'skills', index: '06', label: 'Toolkit', eyebrow: 'Skills / Tools / People', title: 'A toolkit with range.', color: '#93c5fd' },
  { id: 'certifications', index: '07', label: 'Signal', eyebrow: 'Learning / Certifications', title: 'Keep learning in public.', color: '#f9a8d4' },
  { id: 'contact', index: '08', label: 'Night line', eyebrow: 'Open for collaboration', title: 'Let’s make something precise.', color: '#ff4ecd' },
];

function ScenePath({ active }: { active: number }) {
  return (
    <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d="M-80 730 C 230 730, 270 110, 660 210 S 1110 720, 1530 130" fill="none" stroke={scenes[active].color} strokeOpacity=".27" strokeWidth="1.5" animate={{ pathLength: [0.35, 1], opacity: [0.2, 0.55] }} transition={{ duration: 1.1, ease: 'easeOut' }} />
      <motion.path d="M-100 780 C 300 780, 420 360, 790 430 S 1140 840, 1530 430" fill="none" stroke="#ffffff" strokeOpacity=".08" strokeWidth="1" animate={{ x: active % 2 ? 18 : -18, y: active * -7 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
      <motion.circle cx="660" cy="210" r="5" fill={scenes[active].color} animate={{ r: [3, 7, 3] }} transition={{ repeat: Infinity, duration: 2.2 }} />
      <motion.circle cx="660" cy="210" r="18" fill="none" stroke={scenes[active].color} strokeOpacity=".35" animate={{ r: [12, 30], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} />
    </svg>
  );
}

function CelestialBody({ active }: { active: number }) {
  const positions = [
    { left: '74%', top: '10%', color: '#ffd166', shadow: '0 0 100px 30px rgba(255,209,102,.2)' },
    { left: '67%', top: '12%', color: '#ffe08a', shadow: '0 0 110px 35px rgba(255,224,138,.18)' },
    { left: '78%', top: '13%', color: '#ff6b35', shadow: '0 0 110px 35px rgba(255,107,53,.18)' },
    { left: '69%', top: '16%', color: '#a7f3d0', shadow: '0 0 110px 35px rgba(167,243,208,.16)' },
    { left: '14%', top: '9%', color: '#b8f35a', shadow: '0 0 120px 35px rgba(184,243,90,.15)' },
    { left: '30%', top: '19%', color: '#93c5fd', shadow: '0 0 100px 30px rgba(147,197,253,.15)' },
    { left: '77%', top: '14%', color: '#ff4ecd', shadow: '0 0 80px 25px rgba(255,78,205,.18)' },
    { left: '59%', top: '24%', color: '#ff4ecd', shadow: '0 0 80px 25px rgba(255,78,205,.18)' },
  ];
  const body = positions[active];

  return (
    <motion.div
      className="pointer-events-none absolute z-0 h-28 w-28 rounded-full sm:h-48 sm:w-48"
      animate={{
        left: body.left,
        top: body.top,
        backgroundColor: body.color,
        boxShadow: body.shadow,
        scale: [1, 1.04, 1],
      }}
      transition={{
        left: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        top: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        backgroundColor: { duration: 0.5 },
        boxShadow: { duration: 0.5 },
        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {/* rotating orbital aura ring */}
      <motion.div
        className="absolute -inset-3 sm:-inset-5 rounded-full border border-dashed opacity-40"
        style={{ borderColor: body.color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}

function AmbientParticles() {
  const particles = [
    { left: '14%', top: '22%', size: 3, duration: 4.5, delay: 0 },
    { left: '84%', top: '16%', size: 2, duration: 5.2, delay: 0.8 },
    { left: '42%', top: '75%', size: 2.5, duration: 6.0, delay: 1.6 },
    { left: '90%', top: '68%', size: 2, duration: 4.8, delay: 0.4 },
    { left: '22%', top: '82%', size: 3, duration: 5.5, delay: 1.2 },
    { left: '68%', top: '85%', size: 2, duration: 6.2, delay: 2.0 },
    { left: '55%', top: '18%', size: 2.5, duration: 5.0, delay: 2.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/40"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{
            y: [-12, 12, -12],
            opacity: [0.2, 0.75, 0.2],
            scale: [0.85, 1.25, 0.85],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function SceneBackdrop({ active, direction }: { active: number; direction: number }) {
  return (
    <AnimatePresence>
      <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: 'easeInOut' }} className="absolute inset-0 overflow-hidden">
        {active === 0 && (
          <div className="absolute inset-0 bg-[#063451]">
            <motion.div animate={{ x: [-25, 25, -25] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-8 left-0 h-52 w-[115%] rounded-[50%] bg-[#087e8b] shadow-[0_-18px_0_#0a6274]" />
            <motion.div animate={{ x: [20, -30, 20] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-20 -left-10 h-48 w-[120%] rounded-[50%] bg-[#00a6a6]" />
            <div className="absolute bottom-16 left-1/2 h-px w-52 -translate-x-1/2 bg-[#ffd166]/60 shadow-[0_0_18px_#ffd166]" />
            <div className="absolute left-[14%] top-[28%] h-2 w-2 bg-white/70" /><div className="absolute left-[29%] top-[19%] h-1 w-1 bg-white/60" /><div className="absolute right-[27%] top-[34%] h-1.5 w-1.5 bg-white/60" />
          </div>
        )}
        {active === 1 && (
          <div className="absolute inset-0 bg-[#182b24]">
            <motion.div animate={{ x: [-15, 22, -15], y: [0, -6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-10 left-[-10%] h-[52%] w-[75%] rotate-[8deg] bg-[#2d5a45]" style={{ clipPath: 'polygon(0 100%, 0 58%, 28% 26%, 46% 48%, 68% 5%, 100% 46%, 100% 100%)' }} />
            <motion.div animate={{ x: [24, -20, 24] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-12 right-[-9%] h-[63%] w-[76%] bg-[#4b8063]" style={{ clipPath: 'polygon(0 100%, 0 54%, 25% 35%, 43% 52%, 63% 17%, 100% 56%, 100% 100%)' }} />
            <div className="absolute bottom-0 left-0 h-[24%] w-full bg-[#0c1814]" />
            <div className="absolute bottom-[23%] left-[48%] h-24 w-px rotate-12 bg-[#ff6b35]/70" />
          </div>
        )}
        {active === 2 && (
          <div className="absolute inset-0 bg-[#102b2b]">
            <motion.div animate={{ x: [-15, 22, -15], y: [0, -6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-10 left-[-10%] h-[52%] w-[75%] rotate-[8deg] bg-[#255f58]" style={{ clipPath: 'polygon(0 100%, 0 58%, 28% 26%, 46% 48%, 68% 5%, 100% 46%, 100% 100%)' }} />
            <motion.div animate={{ x: [24, -20, 24] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-12 right-[-9%] h-[63%] w-[76%] bg-[#3a8173]" style={{ clipPath: 'polygon(0 100%, 0 54%, 25% 35%, 43% 52%, 63% 17%, 100% 56%, 100% 100%)' }} />
            <div className="absolute bottom-0 left-0 h-[24%] w-full bg-[#081716]" />
          </div>
        )}
        {active >= 3 && active <= 5 && (
          <div className="absolute inset-0 bg-[#21134f]">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#b8f35a 1px, transparent 1px), linear-gradient(90deg, #b8f35a 1px, transparent 1px)', backgroundSize: '62px 62px', transform: 'perspective(460px) rotateX(58deg) translateY(33%) scale(1.7)' }} />
            <motion.div animate={{ x: [-16, 16, -16] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-0 left-[8%] h-[47%] w-20 border-x border-t border-[#b8f35a]/40 bg-[#171034] shadow-[0_0_20px_rgba(184,243,90,.1)] sm:w-28" />
            <motion.div animate={{ x: [18, -14, 18] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-0 left-[35%] h-[63%] w-24 border-x border-t border-[#b8f35a]/40 bg-[#171034] sm:w-36" />
            <div className="absolute bottom-0 right-[14%] h-[35%] w-24 border-x border-t border-[#b8f35a]/40 bg-[#171034] sm:w-36" />
          </div>
        )}
        {active >= 6 && (
          <div className="absolute inset-0 bg-[#260a2d]">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="absolute right-[8%] top-[7%] h-64 w-64 rounded-full border border-dashed border-[#ff4ecd]/50" />
            <div className="absolute bottom-0 left-0 h-[43%] w-full bg-[#110714]" style={{ clipPath: 'polygon(0 50%, 8% 38%, 13% 60%, 22% 26%, 29% 52%, 39% 20%, 47% 54%, 58% 31%, 67% 57%, 75% 22%, 84% 51%, 93% 33%, 100% 49%, 100% 100%, 0 100%)' }} />
            <div className="absolute bottom-[20%] left-[24%] h-1 w-36 bg-[#ff4ecd] shadow-[0_0_25px_#ff4ecd]" />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, compact = false }: { project: (typeof projects)[number]; compact?: boolean }) {
  return (
    <motion.a
      href={project.github ?? '#'}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`group relative block overflow-hidden border border-zinc-800 bg-[#09090b]/90 p-3 backdrop-blur-md transition-all hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] sm:p-4 ${compact ? 'min-h-[125px]' : 'min-h-[170px]'}`}
    >
      <span className="absolute right-0 top-0 h-7 w-7 border-b border-l border-blue-600/70 transition-transform duration-300 group-hover:scale-110" />
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
        <span className="transition-colors group-hover:text-blue-400">{project.id}</span>
        <span>{project.year}</span>
      </div>
      <h3 className="mt-2 max-w-sm text-sm font-bold leading-tight text-white transition-colors group-hover:text-blue-400 sm:mt-3 sm:text-base">
        {project.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-zinc-500 sm:mt-2 sm:text-xs">
        {project.summary}
      </p>
      <div className="mt-2 flex items-center justify-between gap-2 sm:mt-4">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="border border-zinc-800 bg-zinc-950/60 px-1 py-0.5 font-mono text-[8px] text-zinc-400 transition-colors group-hover:border-blue-500/40 sm:px-1.5 sm:text-[9px]">
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-blue-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-4 sm:w-4" />
      </div>
    </motion.a>
  );
}

function Socials() {
  return (
    <div className="flex gap-2">
      <motion.a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        whileHover={{ y: -3, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-9 w-9 items-center justify-center border border-zinc-700 bg-zinc-950/60 text-zinc-400 transition-colors hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]"
      >
        <Github className="h-4 w-4" />
      </motion.a>
      <motion.a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        whileHover={{ y: -3, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-9 w-9 items-center justify-center border border-zinc-700 bg-zinc-950/60 text-zinc-400 transition-colors hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]"
      >
        <Linkedin className="h-4 w-4" />
      </motion.a>
      <motion.a
        href={`mailto:${profile.email}`}
        aria-label="Email"
        whileHover={{ y: -3, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-9 w-9 items-center justify-center border border-zinc-700 bg-zinc-950/60 text-zinc-400 transition-colors hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]"
      >
        <Mail className="h-4 w-4" />
      </motion.a>
    </div>
  );
}

function SceneContent({ active }: { active: number }) {
  if (active === 0) return (
    <div className="max-w-xl">
      <p className="text-[clamp(3.5rem,8vw,7.8rem)] font-bold leading-[.82] tracking-[-.07em] text-white">
        {profile.shortName}<span className="text-blue-600">.</span>
      </p>
      <p className="mt-7 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
        {profile.bio}
      </p>
      <div className="mt-7 flex flex-wrap gap-2 font-mono text-[10px] text-zinc-500">
        <motion.span whileHover={{ y: -2 }} className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-950/50 px-2.5 py-1.5 text-zinc-300">
          <MapPin className="h-3 w-3 text-blue-500" /> Blitar, ID
        </motion.span>
        <motion.span whileHover={{ y: -2 }} className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-950/50 px-2.5 py-1.5 text-zinc-300">
          <Terminal className="h-3 w-3 text-blue-500" /> C / Go / Web
        </motion.span>
      </div>
    </div>
  );

  if (active === 1) return (
    <div className="grid max-w-3xl gap-2">
      <motion.div whileHover={{ y: -2 }} className="border border-yellow-200/40 bg-[#09090b]/90 p-3 backdrop-blur-md sm:p-5 transition-shadow hover:shadow-[0_0_20px_rgba(255,224,138,0.15)]">
        <span className="font-mono text-[9px] uppercase tracking-[.2em] text-yellow-200 sm:text-[10px]">Education</span>
        <h3 className="mt-2 text-base font-bold text-white sm:mt-3 sm:text-2xl">{profile.education.degree}</h3>
        <p className="mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-sm">{profile.education.institution} · {profile.education.period}</p>
        <p className="mt-1 font-mono text-[10px] text-yellow-100 sm:text-xs">GPA {profile.education.gpa} · {profile.education.faculty}</p>
      </motion.div>
      <div className="border border-zinc-800 bg-[#09090b]/90 p-3 backdrop-blur-md sm:p-4">
        <span className="font-mono text-[9px] text-zinc-600 sm:text-[10px]">RELEVANT AREAS</span>
        <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
          {profile.education.relevantAreas.map((area) => (
            <motion.span whileHover={{ y: -2, scale: 1.04 }} key={area} className="border border-zinc-800 bg-zinc-950/50 px-2 py-1 text-[10px] text-zinc-300 sm:px-2.5 sm:text-xs">
              {area}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );

  if (active === 2) return (
    <div className="grid max-w-4xl grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
      {experience.map((item) => (
        <motion.div whileHover={{ y: -3 }} key={item.title} className="border border-zinc-800 bg-[#09090b]/90 p-3 backdrop-blur-md transition-shadow hover:border-orange-500/50 hover:shadow-[0_8px_25px_rgba(255,107,53,0.12)] sm:p-4">
          <div className="flex flex-col gap-1">
            <div>
              <h3 className="text-xs font-bold leading-tight text-white sm:text-base">{item.title}</h3>
              <p className="mt-1 text-[10px] text-orange-300 sm:text-xs">{item.company}</p>
            </div>
            <span className="font-mono text-[8px] text-zinc-600 sm:text-[9px]">{item.period}</span>
          </div>
          <p className="mt-2 line-clamp-3 text-[10px] leading-relaxed text-zinc-400 sm:mt-3 sm:text-xs">{item.description}</p>
          <div className="mt-2 flex flex-wrap gap-1 sm:mt-3">
            {item.technologies.map((tech) => (
              <span key={tech} className="border border-zinc-800 bg-zinc-950/60 px-1 py-0.5 font-mono text-[8px] text-zinc-400 sm:px-1.5 sm:text-[9px]">{tech}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  if (active === 3) return (
    <div className="grid max-w-3xl gap-2 sm:gap-4 sm:grid-cols-2">
      <motion.div whileHover={{ y: -2 }} className="border border-emerald-300/40 bg-emerald-300/5 p-3.5 backdrop-blur-md transition-shadow hover:shadow-[0_0_25px_rgba(167,243,208,0.15)] sm:p-5 sm:col-span-2">
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.2em] text-emerald-200">Deep work / C Systems Programming</span>
        <h3 className="mt-2 sm:mt-3 text-lg sm:text-2xl sm:text-3xl font-bold text-white">Low-level thinking, documented.</h3>
        <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-400 line-clamp-3 sm:line-clamp-none">
          Pointers, pointer arithmetic, function pointers, structures, memory management, linked lists, dan computer systems fundamentals.
        </p>
        <motion.a whileHover={{ x: 3 }} href={projects[2].github} target="_blank" rel="noreferrer" className="mt-2.5 sm:mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-emerald-200 hover:text-white">
          Open learning journal <ArrowUpRight className="h-3 w-3" />
        </motion.a>
      </motion.div>
      <div className="grid grid-cols-2 gap-2 sm:contents">
        <motion.div whileHover={{ y: -2 }} className="border border-zinc-800 bg-zinc-950/70 p-2.5 backdrop-blur-md sm:p-4">
          <span className="font-mono text-[9px] sm:text-[10px] text-zinc-600">EDUCATION</span>
          <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm font-bold text-white leading-tight">{profile.education.degree}</p>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-zinc-500">{profile.education.institution} · GPA {profile.education.gpa}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="border border-zinc-800 bg-zinc-950/70 p-2.5 backdrop-blur-md sm:p-4">
          <span className="font-mono text-[9px] sm:text-[10px] text-zinc-600">CURRENTLY EXPLORING</span>
          <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm font-bold text-white leading-tight">Go / Linux internals</p>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-zinc-500">Building stronger foundations beside production web work.</p>
        </motion.div>
      </div>
    </div>
  );

  if (active === 4) return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <ProjectCard project={projects[0]} compact />
        <ProjectCard project={projects[1]} compact />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-3 sm:gap-2">
        {projects.slice(3).map((project) => (
          <motion.a
            key={project.id}
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className="border border-zinc-800 bg-[#09090b]/90 p-2.5 backdrop-blur-md hover:border-lime-300 hover:shadow-[0_4px_20px_rgba(184,243,90,0.15)] sm:p-3 transition-colors"
          >
            <span className="font-mono text-[8px] text-zinc-600 sm:text-[9px]">{project.year}</span>
            <p className="mt-1 text-[11px] font-bold leading-tight text-white sm:mt-2 sm:text-xs">{project.title}</p>
            <p className="mt-1 line-clamp-1 font-mono text-[9px] text-zinc-500 sm:text-[10px]">{project.technologies.join(' · ')}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );

  if (active === 5) return (
    <div className="grid max-w-4xl grid-cols-2 gap-1.5 sm:gap-2">
      {skills.map((group) => (
        <motion.div whileHover={{ y: -3 }} key={group.category} className="border border-blue-300/20 bg-[#09090b]/90 p-2.5 backdrop-blur-md hover:border-blue-400 hover:shadow-[0_4px_20px_rgba(147,197,253,0.12)] sm:p-3.5 transition-colors">
          <span className="font-mono text-[8px] uppercase tracking-wider text-blue-200 sm:text-[10px]">{group.category}</span>
          <p className="mt-1 text-[10px] leading-relaxed text-zinc-400 sm:mt-2 sm:text-xs">{group.items.map((item) => item.name).join(' · ')}</p>
        </motion.div>
      ))}
    </div>
  );

  if (active === 6) return (
    <div className="grid max-w-3xl grid-cols-2 gap-1.5 sm:gap-2">
      {certifications.map((certificate) => (
        <motion.div whileHover={{ y: -3 }} key={certificate.name} className="border border-pink-300/30 bg-[#09090b]/90 p-2.5 backdrop-blur-md hover:border-pink-400 hover:shadow-[0_4px_20px_rgba(249,168,212,0.15)] sm:p-4 transition-colors">
          <p className="text-[10px] font-bold leading-tight text-white sm:text-sm">{certificate.name}</p>
          <p className="mt-1 text-[9px] text-pink-200 sm:text-xs">{certificate.issuer} · {certificate.date}</p>
          <p className="mt-2 hidden break-all font-mono text-[9px] text-zinc-600 sm:mt-3 sm:block">ID: {certificate.credentialId}</p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="max-w-xl">
      <p className="text-lg leading-relaxed text-zinc-400 sm:text-2xl">
        Terbuka untuk diskusi rekayasa sistem, eksplorasi C, peluang magang, dan kolaborasi produk digital.
      </p>
      <motion.a
        href={`mailto:${profile.email}`}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="mt-7 inline-flex items-center gap-2 bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-[0_0_25px_rgba(37,99,235,0.35)]"
      >
        Start a conversation <ArrowUpRight className="h-4 w-4" />
      </motion.a>
      <p className="mt-5 font-mono text-xs text-zinc-600">{profile.email}</p>
      <div className="mt-6"><Socials /></div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showIntro, setShowIntro] = useState(true);

  const lockedRef = useRef(false);
  const showIntroRef = useRef(showIntro);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const justSwipedRef = useRef(false);

  useEffect(() => {
    showIntroRef.current = showIntro;
  }, [showIntro]);

  const changeScene = (dir: number) => {
    if (lockedRef.current || showIntroRef.current) return;
    lockedRef.current = true;

    setActive((current) => {
      // If at last scene and moving forward, loop back to start
      if (dir > 0 && current === scenes.length - 1) {
        setDirection(-1);
        return 0;
      }
      // If at first scene and moving backward, stay at start
      if (dir < 0 && current === 0) {
        return 0;
      }
      setDirection(dir);
      return Math.max(0, Math.min(scenes.length - 1, current + dir));
    });

    window.setTimeout(() => {
      lockedRef.current = false;
    }, 520);
  };

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (!showIntroRef.current && Math.abs(event.deltaY) > 8) {
        changeScene(event.deltaY > 0 ? 1 : -1);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (showIntroRef.current) return;
      if (['ArrowDown', 'PageDown', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        changeScene(1);
      }
      if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(event.key)) {
        event.preventDefault();
        changeScene(-1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (showIntroRef.current) return;
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now()
        };
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (showIntroRef.current || !touchStartRef.current || e.changedTouches.length === 0) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;
      touchStartRef.current = null;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Ignore slight touches (under 28px) so clicks and links work smoothly
      if (absX < 28 && absY < 28) return;

      const velocityX = absX / Math.max(1, deltaTime);
      const velocityY = absY / Math.max(1, deltaTime);

      if (absX > absY) {
        // Horizontal swipe has priority
        if (deltaX < -28 || (deltaX < -15 && velocityX > 0.25)) {
          justSwipedRef.current = true;
          setTimeout(() => { justSwipedRef.current = false; }, 300);
          changeScene(1); // Swipe left -> Next
        } else if (deltaX > 28 || (deltaX > 15 && velocityX > 0.25)) {
          justSwipedRef.current = true;
          setTimeout(() => { justSwipedRef.current = false; }, 300);
          changeScene(-1); // Swipe right -> Prev
        }
      } else {
        // Vertical swipe (swipe up = move to next scene, swipe down = move to prev scene)
        if (deltaY < -28 || (deltaY < -15 && velocityY > 0.25)) {
          justSwipedRef.current = true;
          setTimeout(() => { justSwipedRef.current = false; }, 300);
          changeScene(1); // Swipe up -> Next
        } else if (deltaY > 28 || (deltaY > 15 && velocityY > 0.25)) {
          justSwipedRef.current = true;
          setTimeout(() => { justSwipedRef.current = false; }, 300);
          changeScene(-1); // Swipe down -> Prev
        }
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      if (justSwipedRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('click', onClickCapture, { capture: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('click', onClickCapture, { capture: true });
    };
  }, []);

  const scene = scenes[active];
  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroOverlay onDismiss={() => setShowIntro(false)} />}
      </AnimatePresence>

      <main className="relative h-[100svh] min-h-[520px] overflow-hidden bg-[#09090b] text-white">
        <SceneBackdrop active={active} direction={direction} />
        <CelestialBody active={active} />
        <AmbientParticles />
        <div className="pointer-events-none absolute inset-0 geo-grid opacity-20" /><ScenePath active={active} />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#09090b]/55 via-[#09090b]/10 to-[#09090b]/35" />
        <motion.span className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2" animate={{ borderColor: scene.color }} transition={{ duration: 0.6 }} />
        <motion.span className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2" animate={{ borderColor: scene.color }} transition={{ duration: 0.6 }} />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-5 py-4 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
          <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-zinc-800/90 pb-3 sm:pb-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setDirection(-1);
                setActive(0);
              }}
              className="font-mono text-sm font-bold sm:text-base hover:opacity-80 transition-opacity"
            >
              alfan<span style={{ color: scene.color }}>.</span>
            </a>
            <div className="flex items-center gap-3 sm:gap-6 font-mono text-[10px] uppercase tracking-[.2em] text-zinc-500">
              <span className="hidden sm:inline">Scroll / Swipe to explore</span>
              <span className="sm:hidden text-zinc-500">Swipe</span>
              <div className="relative inline-flex items-center overflow-hidden h-4">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={scene.index}
                    initial={{ y: direction > 0 ? 12 : -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: direction > 0 ? -12 : 12, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="font-bold font-mono text-[10px]"
                    style={{ color: scene.color }}
                  >
                    {scene.index}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-1 text-zinc-600">/ 08</span>
              </div>
            </div>
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: scene.color, color: scene.color }}
            >
              Contact
            </motion.a>
          </header>

          <div className="relative z-10 flex min-h-0 flex-1 -translate-y-3 flex-col justify-start overflow-y-auto py-3 sm:translate-y-0 sm:justify-center sm:overflow-y-visible sm:py-7 lg:py-10">
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.25em] sm:mb-6" style={{ color: scene.color }}>
              <motion.span className="h-px w-8" animate={{ backgroundColor: scene.color }} transition={{ duration: 0.5 }} />
              {scene.index} — {scene.eyebrow}
            </div>
            <div className="relative min-h-[300px] overflow-x-clip overflow-y-visible sm:min-h-[320px] lg:min-h-[360px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.section
                  key={scene.id}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 60 : -60,
                      opacity: 0,
                      scale: 0.96,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.52,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                    exit: (dir: number) => ({
                      x: dir > 0 ? -55 : 55,
                      opacity: 0,
                      scale: 0.96,
                      transition: {
                        duration: 0.42,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-x-0 top-0"
                >
                  <motion.h1
                    className="mb-4 max-w-3xl text-2xl font-bold tracking-tight text-white mix-blend-difference sm:mb-8 sm:text-5xl"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  >
                    {scene.title}
                  </motion.h1>
                  <SceneContent active={active} />
                </motion.section>
              </AnimatePresence>
            </div>
          </div>

          <footer className="relative z-10 flex shrink-0 items-end justify-between border-t border-zinc-700/80 pt-3 sm:pt-4">
            <div>
              <div className="mb-3 flex gap-1.5 items-center">
                {scenes.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setDirection(index >= active ? 1 : -1);
                      setActive(index);
                    }}
                    aria-label={`Go to ${item.label}`}
                    className="h-1.5 rounded-full cursor-pointer"
                    animate={{
                      width: index === active ? 32 : 10,
                      backgroundColor: index === active ? scene.color : '#3f3f46',
                      boxShadow: index === active ? `0 0 10px ${scene.color}80` : 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[.16em] text-zinc-400 drop-shadow-[0_1px_3px_rgba(0,0,0,.8)]">
                <span>{scene.label}</span>
                <span className="hidden sm:inline">{skills[0].items.slice(0, 3).map((skill) => skill.name).join(' / ')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {active > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => changeScene(-1)}
                  className="flex items-center gap-1 border border-zinc-800 bg-[#09090b]/80 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-zinc-400 hover:text-white sm:border-0 sm:bg-transparent sm:p-0 cursor-pointer"
                >
                  Prev
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (active === scenes.length - 1) {
                    setDirection(-1);
                    setActive(0);
                  } else {
                    changeScene(1);
                  }
                }}
                className="flex items-center gap-1.5 border border-zinc-800 bg-[#09090b]/80 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-zinc-400 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.8)] sm:border-0 sm:bg-transparent sm:p-0 cursor-pointer"
              >
                {active === scenes.length - 1 ? 'Restart' : 'Next'} <ArrowUpRight className="h-3 w-3" />
              </motion.button>
            </div>
          </footer>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-zinc-600 lg:flex"><ArrowDown className="h-3 w-3 animate-bounce" /> Wheel / keys / swipe</div>
      </main>
    </>
  );
}
