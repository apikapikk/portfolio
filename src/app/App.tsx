import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Terminal } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const { profile, projects, skills, experience, certifications } = portfolioData;

/* ─── Intro Overlay ──────────────────────────────────────────────────────── */
function IntroOverlay({ onDismiss }: { onDismiss: () => void }) {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 260], [1, 0]);
  const touchStartY = useRef<number | null>(null);
  const dismissed = useRef(false);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    onDismiss();
  };

  // drag / wheel dismiss
  const handleDragEnd = (_: unknown, info: { offset: { y: number } }) => {
    if (info.offset.y > 80) dismiss();
    else y.set(0);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 8) { e.preventDefault(); dismiss(); } };
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); dismiss(); }
    };
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current !== null && touchStartY.current - e.changedTouches[0].clientY < -40) dismiss();
      touchStartY.current = null;
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-grab select-none flex-col items-center justify-center overflow-hidden bg-[#09090b] active:cursor-grabbing"
      style={{ y, opacity }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 400 }}
      dragElastic={{ top: 0, bottom: 0.35 }}
      onDragEnd={handleDragEnd}
      exit={{ y: '100%', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
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

        {/* swipe / scroll hint */}
        <motion.div
          className="mt-4 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-transparent to-[#ffd166]/70"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />
          <span className="font-mono text-[9px] uppercase tracking-[.25em] text-zinc-600">
            Swipe down
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

  return <motion.div className="pointer-events-none absolute z-0 h-28 w-28 rounded-full sm:h-48 sm:w-48" animate={{ left: body.left, top: body.top, backgroundColor: body.color, boxShadow: body.shadow }} transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }} />;
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
    <a href={project.github ?? '#'} target="_blank" rel="noreferrer" className={`group relative block overflow-hidden border border-zinc-800 bg-[#09090b]/90 p-3 backdrop-blur-sm transition-colors hover:border-blue-500 sm:p-4 ${compact ? 'min-h-[125px]' : 'min-h-[170px]'}`}>
      <span className="absolute right-0 top-0 h-7 w-7 border-b border-l border-blue-600/70" />
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600"><span>{project.id}</span><span>{project.year}</span></div>
      <h3 className="mt-2 max-w-sm text-sm font-bold leading-tight text-white transition-colors group-hover:text-blue-500 sm:mt-3 sm:text-base">{project.title}</h3>
      <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-zinc-500 sm:mt-2 sm:text-xs">{project.summary}</p>
      <div className="mt-2 flex items-center justify-between gap-2 sm:mt-4"><div className="flex flex-wrap gap-1">{project.tags.slice(0, 3).map((tag) => <span key={tag} className="border border-zinc-800 px-1 py-0.5 font-mono text-[8px] text-zinc-500 sm:px-1.5 sm:text-[9px]">{tag}</span>)}</div><ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-blue-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-4 sm:w-4" /></div>
    </a>
  );
}

function Socials() {
  return <div className="flex gap-2"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center border border-zinc-700 text-zinc-400 hover:border-blue-500 hover:text-blue-500"><Github className="h-4 w-4" /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center border border-zinc-700 text-zinc-400 hover:border-blue-500 hover:text-blue-500"><Linkedin className="h-4 w-4" /></a><a href={`mailto:${profile.email}`} aria-label="Email" className="flex h-9 w-9 items-center justify-center border border-zinc-700 text-zinc-400 hover:border-blue-500 hover:text-blue-500"><Mail className="h-4 w-4" /></a></div>;
}

function SceneContent({ active }: { active: number }) {
  if (active === 0) return <div className="max-w-xl"><p className="text-[clamp(3.5rem,8vw,7.8rem)] font-bold leading-[.82] tracking-[-.07em] text-white">{profile.shortName}<span className="text-blue-600">.</span></p><p className="mt-7 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">{profile.bio}</p><div className="mt-7 flex flex-wrap gap-2 font-mono text-[10px] text-zinc-500"><span className="flex items-center gap-1.5 border border-zinc-800 px-2 py-1"><MapPin className="h-3 w-3 text-blue-500" /> Blitar, ID</span><span className="flex items-center gap-1.5 border border-zinc-800 px-2 py-1"><Terminal className="h-3 w-3 text-blue-500" /> C / Go / Web</span></div></div>;
  if (active === 1) return <div className="grid max-w-3xl gap-2"><div className="border border-yellow-200/40 bg-[#09090b]/90 p-3 backdrop-blur-sm sm:p-5"><span className="font-mono text-[9px] uppercase tracking-[.2em] text-yellow-200 sm:text-[10px]">Education</span><h3 className="mt-2 text-base font-bold text-white sm:mt-3 sm:text-2xl">{profile.education.degree}</h3><p className="mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-sm">{profile.education.institution} · {profile.education.period}</p><p className="mt-1 font-mono text-[10px] text-yellow-100 sm:text-xs">GPA {profile.education.gpa} · {profile.education.faculty}</p></div><div className="border border-zinc-800 bg-[#09090b]/90 p-3 backdrop-blur-sm sm:p-4"><span className="font-mono text-[9px] text-zinc-600 sm:text-[10px]">RELEVANT AREAS</span><div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">{profile.education.relevantAreas.map((area) => <span key={area} className="border border-zinc-800 px-1.5 py-1 text-[10px] text-zinc-300 sm:px-2 sm:text-xs">{area}</span>)}</div></div></div>;
  if (active === 2) return <div className="grid max-w-4xl grid-cols-2 gap-2 sm:gap-3">{experience.map((item) => <div key={item.title} className="border border-zinc-800 bg-[#09090b]/90 p-2.5 backdrop-blur-sm sm:p-4"><div className="flex flex-col gap-1"><div><h3 className="text-xs font-bold leading-tight text-white sm:text-base">{item.title}</h3><p className="mt-1 text-[10px] text-orange-300 sm:text-xs">{item.company}</p></div><span className="font-mono text-[8px] text-zinc-600 sm:text-[9px]">{item.period}</span></div><p className="mt-2 line-clamp-3 text-[10px] leading-relaxed text-zinc-400 sm:mt-3 sm:text-xs">{item.description}</p><div className="mt-2 flex flex-wrap gap-1 sm:mt-3">{item.technologies.map((tech) => <span key={tech} className="border border-zinc-800 px-1 py-0.5 font-mono text-[8px] text-zinc-500 sm:px-1.5 sm:text-[9px]">{tech}</span>)}</div></div>)}</div>;
  if (active === 3) return <div className="grid max-w-3xl gap-2 sm:gap-4 sm:grid-cols-2"><div className="border border-emerald-300/40 bg-emerald-300/5 p-3 sm:p-5 sm:col-span-2"><span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[.2em] text-emerald-200">Deep work / C Systems Programming</span><h3 className="mt-2 sm:mt-3 text-lg sm:text-2xl sm:text-3xl font-bold text-white">Low-level thinking, documented.</h3><p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-400 line-clamp-3 sm:line-clamp-none">Pointers, pointer arithmetic, function pointers, structures, memory management, linked lists, dan computer systems fundamentals.</p><a href={projects[2].github} target="_blank" rel="noreferrer" className="mt-2 sm:mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-emerald-200 hover:text-white">Open learning journal <ArrowUpRight className="h-3 w-3" /></a></div><div className="grid grid-cols-2 gap-2 sm:contents"><div className="border border-zinc-800 bg-zinc-950/70 p-2.5 sm:p-4"><span className="font-mono text-[9px] sm:text-[10px] text-zinc-600">EDUCATION</span><p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm font-bold text-white leading-tight">{profile.education.degree}</p><p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-zinc-500">{profile.education.institution} · GPA {profile.education.gpa}</p></div><div className="border border-zinc-800 bg-zinc-950/70 p-2.5 sm:p-4"><span className="font-mono text-[9px] sm:text-[10px] text-zinc-600">CURRENTLY EXPLORING</span><p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm font-bold text-white leading-tight">Go / Linux internals</p><p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-zinc-500">Building stronger foundations beside production web work.</p></div></div></div>;
  if (active === 4) return <div className="max-w-4xl"><div className="grid grid-cols-2 gap-2 sm:gap-3"><ProjectCard project={projects[0]} compact /><ProjectCard project={projects[1]} compact /></div><div className="mt-2 grid grid-cols-3 gap-1.5 sm:mt-3 sm:gap-2">{projects.slice(3).map((project) => <a key={project.id} href={project.github} target="_blank" rel="noreferrer" className="border border-zinc-800 bg-[#09090b]/90 p-2 backdrop-blur-sm hover:border-lime-300 sm:p-3"><span className="font-mono text-[8px] text-zinc-600 sm:text-[9px]">{project.year}</span><p className="mt-1 text-[10px] font-bold leading-tight text-white sm:mt-2 sm:text-xs">{project.title}</p><p className="mt-1 hidden text-[10px] text-zinc-500 sm:block">{project.technologies.join(' · ')}</p></a>)}</div></div>;
  if (active === 5) return <div className="grid max-w-4xl grid-cols-2 gap-1.5 sm:gap-2">{skills.map((group) => <div key={group.category} className="border border-blue-300/20 bg-[#09090b]/90 p-2 backdrop-blur-sm sm:p-3"><span className="font-mono text-[8px] uppercase tracking-wider text-blue-200 sm:text-[10px]">{group.category}</span><p className="mt-1 text-[10px] leading-relaxed text-zinc-400 sm:mt-2 sm:text-xs">{group.items.map((item) => item.name).join(' · ')}</p></div>)}</div>;
  if (active === 6) return <div className="grid max-w-3xl grid-cols-2 gap-1.5 sm:gap-2">{certifications.map((certificate) => <div key={certificate.name} className="border border-pink-300/30 bg-[#09090b]/90 p-2.5 backdrop-blur-sm sm:p-4"><p className="text-[10px] font-bold leading-tight text-white sm:text-sm">{certificate.name}</p><p className="mt-1 text-[9px] text-pink-200 sm:text-xs">{certificate.issuer} · {certificate.date}</p><p className="mt-2 hidden break-all font-mono text-[9px] text-zinc-600 sm:mt-3 sm:block">ID: {certificate.credentialId}</p></div>)}</div>;
  return <div className="max-w-xl"><p className="text-lg leading-relaxed text-zinc-400 sm:text-2xl">Terbuka untuk diskusi rekayasa sistem, eksplorasi C, peluang magang, dan kolaborasi produk digital.</p><a href={`mailto:${profile.email}`} className="mt-7 inline-flex items-center gap-2 bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">Start a conversation <ArrowUpRight className="h-4 w-4" /></a><p className="mt-5 font-mono text-xs text-zinc-600">{profile.email}</p><div className="mt-6"><Socials /></div></div>;
}

export default function App() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [locked, setLocked] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const changeScene = (direction: number) => {
    if (locked || showIntro) return;
    setDirection(direction);
    setActive((current) => Math.max(0, Math.min(scenes.length - 1, current + direction)));
    setLocked(true);
    window.setTimeout(() => setLocked(false), 650);
  };

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (!showIntro && Math.abs(event.deltaY) > 8) changeScene(event.deltaY > 0 ? 1 : -1);
    };
    const onKey = (event: KeyboardEvent) => {
      if (showIntro) return;
      if (['ArrowDown', 'PageDown', 'ArrowRight'].includes(event.key)) { event.preventDefault(); changeScene(1); }
      if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); changeScene(-1); }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); };
  });

  const scene = scenes[active];
  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroOverlay onDismiss={() => setShowIntro(false)} />}
      </AnimatePresence>

      <main className="relative h-[100svh] min-h-[520px] overflow-hidden bg-[#09090b] text-white">
        <SceneBackdrop active={active} direction={direction} />
        <CelestialBody active={active} />
        <div className="pointer-events-none absolute inset-0 geo-grid opacity-20" /><ScenePath active={active} />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#09090b]/55 via-[#09090b]/10 to-[#09090b]/35" />
        <span className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2" style={{ borderColor: scene.color }} /><span className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2" style={{ borderColor: scene.color }} />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-5 py-4 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
          <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-zinc-800/90 pb-3 sm:pb-4"><a href="#top" className="font-mono text-sm font-bold sm:text-base">alfan<span style={{ color: scene.color }}>.</span></a><div className="hidden items-center gap-6 font-mono text-[10px] uppercase tracking-[.2em] text-zinc-500 sm:flex"><span>Scroll to explore</span><span className="text-blue-500">{scene.index} / 08</span></div><a href={`mailto:${profile.email}`} className="border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors hover:bg-white hover:text-black" style={{ borderColor: scene.color, color: scene.color }}>Contact</a></header>

          <div className="relative z-10 flex min-h-0 flex-1 -translate-y-3 flex-col justify-start overflow-y-auto py-3 sm:translate-y-0 sm:justify-center sm:overflow-y-visible sm:py-7 lg:py-10"><div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.25em] sm:mb-6" style={{ color: scene.color }}><span className="h-px w-8" style={{ backgroundColor: scene.color }} />{scene.index} — {scene.eyebrow}</div><div className="relative min-h-[260px] overflow-x-clip overflow-y-visible sm:min-h-[300px] lg:min-h-[360px]"><AnimatePresence initial={false}><motion.section key={scene.id} className="absolute inset-x-0 top-0" initial={{ x: `${direction * 110}%` }} animate={{ x: '0%' }} exit={{ x: `${direction * -110}%` }} transition={{ duration: .52, ease: [0.22, 1, 0.36, 1] }}><h1 className="mb-5 max-w-3xl text-2xl font-bold tracking-tight text-white mix-blend-difference sm:mb-8 sm:text-5xl">{scene.title}</h1><SceneContent active={active} /></motion.section></AnimatePresence></div></div>

          <footer className="relative z-10 flex shrink-0 items-end justify-between border-t border-zinc-700/80 pt-3 sm:pt-4"><div><div className="mb-3 flex gap-1.5">{scenes.map((item, index) => <button key={item.id} onClick={() => { setDirection(index >= active ? 1 : -1); setActive(index); }} aria-label={`Go to ${item.label}`} className="h-1.5 transition-all" style={{ width: index === active ? 32 : 10, backgroundColor: index === active ? scene.color : '#52525b' }} />)}</div><div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[.16em] text-zinc-400 drop-shadow-[0_1px_3px_rgba(0,0,0,.8)]"><span>{scene.label}</span><span className="hidden sm:inline">{skills[0].items.slice(0, 3).map((skill) => skill.name).join(' / ')}</span></div></div><button onClick={() => { if (active === scenes.length - 1) { setDirection(-1); setActive(0); } else changeScene(1); }} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-zinc-400 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.8)]">{active === scenes.length - 1 ? 'Restart' : 'Next'} <ArrowUpRight className="h-3 w-3" /></button></footer>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-zinc-600 lg:flex"><ArrowDown className="h-3 w-3 animate-bounce" /> Wheel / keys</div>
      </main>
    </>
  );
}
