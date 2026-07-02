import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Mail, Phone, MapPin, Github, Linkedin, Code2, Database, Sparkles, GraduationCap, Award, Briefcase, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import resumeAsset from "@/assets/resume.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mokshith G S — Full Stack Developer & ML Enthusiast" },
      { name: "description", content: "Portfolio of Mokshith G S — Full Stack Web Developer specializing in React, Node.js, Python and Machine Learning. View projects and download resume." },
      { property: "og:title", content: "Mokshith G S — Full Stack Developer" },
      { property: "og:description", content: "Full Stack Web Developer specializing in React, Node.js, Python and Machine Learning." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const skills = {
  Languages: ["Python", "Java", "JavaScript"],
  Frontend: ["HTML5", "CSS3", "React"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Data: ["SQL", "MongoDB", "Machine Learning"],
  Fundamentals: ["DSA", "OOP", "Problem Solving"],
  Tools: ["Git", "GitHub", "VS Code", "Google Colab"],
};

const projects = [
  {
    title: "AI Mock Interview Platform",
    stack: ["React", "Node.js", "Express.js", "MySQL", "Gemini API"],
    description: "AI-powered interview prep that generates role-specific questions, evaluates responses with Generative AI, provides personalized feedback and scores, and stores interview history with secure auth and dashboard analytics.",
    icon: Sparkles,
  },
  {
    title: "Smart Expense Tracker with AI Insights",
    stack: ["Python", "SQL", "ML", "Data Viz"],
    description: "Full-stack personal finance app to track income and expenses, set monthly budgets, visualize spending trends, and receive AI-powered insights and budget predictions using machine learning models.",
    icon: Database,
  },
  {
    title: "DevConnect — Developer Collaboration Platform",
    stack: ["Python", "React", "SQL", "Node.js", "Express.js"],
    description: "Collaboration platform where developers create projects, recruit teams, manage tasks, and showcase GitHub profiles — with secure auth, task tracking, notifications, and GitHub repo integration.",
    icon: Code2,
  },
];

const education = [
  { title: "B.E. Information Science Engineering", org: "S J C Institute of Technology", period: "2022 – 2026", detail: "CGPA: 8.18" },
  { title: "PCMB", org: "RK Vision PU College", period: "2020 – 2022", detail: "90.33%" },
  { title: "10th Standard", org: "Royal English Medium School", period: "2020", detail: "80.96%" },
];

const certifications = [
  "Cisco Python Certification",
  "Full Stack Web Developer Certification",
  "Gen AI for Data Engineers — Coursera",
];

const roles = ["Full Stack Developer", "ML Enthusiast", "Problem Solver", "React Engineer"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = deleting ? 50 : 90;
    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setI(v => v + 1);
        return;
      }
      setText(deleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return text;
}

function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.setProperty("--mx", `${x / 8}px`);
      el.style.setProperty("--my", `${y / 8}px`);
    };
    const onLeave = () => {
      el.style.setProperty("--mx", `0px`);
      el.style.setProperty("--my", `0px`);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

function Portfolio() {
  useReveal();
  const typed = useTypewriter(roles);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur-lg bg-background/70 border-b border-border" : "bg-transparent"}`}>
        <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-bold text-lg tracking-tight">
            MG<span className="text-gradient">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {["about", "skills", "projects", "experience", "contact"].map(s => (
              <a key={s} href={`#${s}`} className="relative hover:text-foreground transition group capitalize">
                {s}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <a
            href={resumeAsset.url}
            download="Mokshith_GS_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground animate-glow-pulse hover:scale-105 transition"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        {/* Animated blobs */}
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="relative mx-auto max-w-6xl px-6 py-24 w-full">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-mono text-muted-foreground mb-6 animate-[fade-up_0.7s_ease-out]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
            Available for opportunities
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-[fade-up_0.9s_ease-out]">
            Hi, I'm{" "}
            <span className="text-gradient animate-gradient bg-[linear-gradient(135deg,oklch(0.9_0.12_210),oklch(0.82_0.16_320),oklch(0.9_0.12_210))]"
              style={{ WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Mokshith G S
            </span>
            <br />
            <span className="inline-flex items-baseline gap-2">
              <span className="shimmer-text">{typed || "\u00A0"}</span>
              <span className="inline-block w-[3px] h-[0.9em] bg-primary animate-caret translate-y-1" />
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground mb-10 animate-[fade-up_1.1s_ease-out]">
            Tech enthusiast skilled in Python, SQL, Machine Learning and problem-solving —
            crafting responsive full-stack applications with React, Node.js and clean, scalable APIs.
          </p>
          <div className="flex flex-wrap gap-4 animate-[fade-up_1.3s_ease-out]">
            <a href={resumeAsset.url} download="Mokshith_GS_Resume.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:scale-105 transition-transform">
              <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" /> Download Resume
            </a>
            <a href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium hover:bg-card hover:border-primary/50 transition">
              View Projects
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-[fade-up_1.5s_ease-out]">
            <a href="mailto:mokshireddy1488@gmail.com" className="inline-flex items-center gap-2 hover:text-foreground transition"><Mail className="h-4 w-4" /> mokshireddy1488@gmail.com</a>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Bengaluru, KA</span>
          </div>
        </div>

        <a href="#about" aria-label="Scroll" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition animate-float">
          <ArrowDown className="h-5 w-5" />
        </a>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="01" title="About Me">
        <div className="grid md:grid-cols-3 gap-8">
          <p className="reveal md:col-span-2 text-lg text-muted-foreground leading-relaxed">
            I'm a final-year Information Science Engineering student passionate about building end-to-end
            software that solves real problems. I enjoy combining full-stack web development with data and
            AI — from designing clean REST APIs and interactive UIs to training ML models that turn data
            into insight. I'm actively seeking an opportunity to contribute to an ambitious IT team where I
            can keep learning, ship real product, and grow as an engineer.
          </p>
          <div className="reveal rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-glow transition-shadow" style={{ transitionDelay: "0.1s" }}>
            <div className="text-xs font-mono uppercase text-muted-foreground mb-3">Quick Facts</div>
            <dl className="space-y-3 text-sm">
              <FactRow k="Location" v="Bengaluru, KA" />
              <FactRow k="Degree" v="B.E. ISE" />
              <FactRow k="CGPA" v="8.18" />
              <FactRow k="Focus" v="Full Stack + ML" />
            </dl>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="02" title="Technical Skills">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([group, items], idx) => (
            <div key={group} className="reveal group rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/60 hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: `${idx * 60}ms` }}>
              <h3 className="text-sm font-mono uppercase text-primary mb-4 group-hover:tracking-wider transition-all">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(s => (
                  <span key={s} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground hover:bg-gradient-primary hover:text-primary-foreground transition-colors cursor-default">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="03" title="Experience">
        <div className="reveal rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-glow transition-shadow relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-2">
                <Briefcase className="h-4 w-4" /> Internship
              </div>
              <h3 className="text-2xl font-display font-semibold">Full Stack Web Developer Intern</h3>
              <p className="text-muted-foreground">SuprMentr</p>
            </div>
            <span className="text-sm text-muted-foreground font-mono">Feb 2026 – May 2026</span>
          </div>
          <ul className="relative mt-4 space-y-3 text-muted-foreground leading-relaxed">
            <li className="flex gap-3"><Dot /> Developed and maintained responsive full-stack web applications with React.js, HTML5, CSS3, Node.js and Express.js, focused on performance and UX.</li>
            <li className="flex gap-3"><Dot /> Designed and integrated RESTful APIs enabling smooth communication between frontend, backend services and databases.</li>
            <li className="flex gap-3"><Dot /> Implemented data modeling and CRUD flows across MongoDB and SQL for efficient data management.</li>
          </ul>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="04" title="Featured Projects">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <ProjectCard key={p.title} p={p} delay={idx * 100} />
          ))}
        </div>
      </Section>

      {/* EDUCATION + CERTS */}
      <Section id="education" eyebrow="05" title="Education & Certifications">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="reveal rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-5">
              <GraduationCap className="h-4 w-4" /> Education
            </div>
            <ol className="space-y-6">
              {education.map(e => (
                <li key={e.title} className="relative pl-5 border-l-2 border-border hover:border-primary transition-colors">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-gradient-primary animate-glow-pulse" />
                  <h4 className="font-semibold">{e.title}</h4>
                  <p className="text-sm text-muted-foreground">{e.org}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{e.period} · {e.detail}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal rounded-2xl border border-border bg-card p-6 shadow-card" style={{ transitionDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-5">
              <Award className="h-4 w-4" /> Certifications
            </div>
            <ul className="space-y-3">
              {certifications.map(c => (
                <li key={c} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-4 hover:border-primary/50 hover:translate-x-1 transition-all">
                  <Award className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="06" title="Let's Connect">
        <div className="reveal relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14 shadow-card text-center">
          <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Have an opportunity in mind?
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              I'm actively looking for full-stack and ML-focused roles. Reach out — happy to chat about projects, internships, or collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="mailto:mokshireddy1488@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:scale-105 transition-transform">
                <Mail className="h-4 w-4" /> Email Me
              </a>
              <a href="tel:+919148929948" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm hover:bg-background hover:border-primary/50 transition">
                <Phone className="h-4 w-4" /> +91 91489 29948
              </a>
              <a href={resumeAsset.url} download="Mokshith_GS_Resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm hover:bg-background hover:border-primary/50 transition">
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
            <div className="mt-8 flex justify-center gap-4 text-muted-foreground">
              <a href="https://linkedin.com/in/mokshith-g-s-6382b02b9" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground hover:-translate-y-0.5 transition-all"><Linkedin className="h-5 w-5" /></a>
              <a href="https://github.com/mokshith2104" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground hover:-translate-y-0.5 transition-all"><Github className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground font-mono">
        © 2026 Mokshith G S · Built with React 
      </footer>
    </div>
  );
}

function ProjectCard({ p, delay }: { p: typeof projects[number]; delay: number }) {
  const ref = useMagnetic();
  const Icon = p.icon;
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <article
        className="group relative rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/60 transition-all duration-300 overflow-hidden h-full"
        style={{ transform: "translate(var(--mx,0), var(--my,0))", transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease" }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground mb-5 shadow-glow group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-gradient transition-colors">{p.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map(t => (
              <span key={t} className="rounded-md bg-secondary/60 px-2 py-0.5 text-[11px] font-mono text-secondary-foreground">{t}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 reveal">
          <div className="text-xs font-mono text-primary mb-2">// {eyebrow}</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function FactRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/60 pb-2 last:border-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}

function Dot() {
  return <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />;
}
