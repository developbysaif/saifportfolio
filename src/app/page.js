'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Link from "next/link";

// ==================== DATA ====================
const navLinks = ["About", "Skills", "Services", "Projects", "Pricing", "Certificates", "Contact"];

const skillCategories = [
  {
    category: "Web Development",
    icon: "🌐",
    tools: [
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", name: "HTML5", level: 95 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", name: "CSS3", level: 92 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", name: "Flexbox", level: 90 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", name: "Grid", level: 88 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", name: "Bootstrap", level: 90 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", name: "Tailwind", level: 88 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg", name: "WordPress", level: 85 },
      { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg", name: "Shopify", level: 82 },
    ]
  },
  {
    category: "Design Tools",
    icon: "🎨",
    tools: [
      { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/canva.svg", name: "Canva Pro", level: 94 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", name: "UI/UX Design", level: 87 },
    ]
  },
  {
    category: "Programming & Coding",
    icon: "💻",
    tools: [
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", name: "React", level: 90 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", name: "Next.js", level: 88 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", name: "JavaScript", level: 92 },
      { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg", name: "3D Game Dev", level: 75 },
    ]
  },
  {
    category: "Content Creation & SEO",
    icon: "📈",
    tools: [
      { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg", name: "YouTube", level: 90 },
      { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg", name: "SEO", level: 85 },
      { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/blogger.svg", name: "Blog Writing", level: 88 },
      { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/undertale.svg", name: "Tech Tutorials", level: 92 },
    ]
  },
];

const services = [
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", title: "Website Development", desc: "Modern and responsive websites using the latest technologies for a flawless digital presence." },
  { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg", title: "E-commerce Development", desc: "Shopify & WordPress stores with full setup, payment integrations, and seamless checkout experience." },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", title: "UI/UX Design", desc: "Clean and user-friendly interface designs that delight users and drive engagement." },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg", title: "WordPress Development", desc: "Professional WordPress sites with custom themes, plugins, and optimized performance." },
  { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg", title: "Website Optimization", desc: "Speed, SEO, and performance improvements to boost your site's ranking and user experience." },
  { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg", title: "Tech Content Creation", desc: "YouTube tutorials, AI content, tech scripts, and engaging digital media for global audiences." },
  { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg", title: "AI Integration", desc: "Smart AI-powered features, chatbots, and automation tools for modern businesses." },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", title: "Custom Solutions", desc: "Tailored web solutions designed to meet unique business needs and drive growth." },
];

const projects = [
  { title: "Testthrapy", tags: ["WordPress"], desc: "Intelligent web applications with AI tools and modern frameworks.", github: "#", liveDemo: "https://testherapy.com/" },
  { title: "ilagbilghiza", tags: ["Tailwind", "Next.js"], desc: "Custom Next.js website with seamless checkout, payment setup, and beautiful themes.", github: "#", liveDemo: "https://ilaj-bil-ghiza.vercel.app/" },
  { title: "Portfolio Websites", tags: ["HTML", "CSS", "JS"], desc: "Stunning personal and business portfolio websites with modern design aesthetics.", github: "#", liveDemo: "" },
  { title: "Basic Web Games", tags: ["JavaScript", "Canvas"], desc: "Fun and interactive browser-based games built with vanilla JavaScript.", github: "#", liveDemo: "" },
  { title: "Responsive Landing Pages", tags: ["Tailwind", "Bootstrap"], desc: "High-converting, mobile-first landing pages optimized for performance and SEO.", github: "#", liveDemo: "" },
  { title: "Automation Tools", tags: ["Scripting", "API"], desc: "Custom automation tools and scripts to streamline business workflows.", github: "#", liveDemo: "" },
];

const pricingPlans = [
  {
    plan: "Starter",
    price: "299",
    period: "/project",
    desc: "Perfect for small businesses and startups looking to establish their online presence.",
    features: [
      { text: "5 Pages Website", included: true },
      { text: "Responsive Design", included: true },
      { text: "Basic SEO Setup", included: true },
      { text: "3 Revisions", included: true },
      { text: "Source Files", included: false },
      { text: "Priority Support", included: false },
    ],
    featured: false,
  },
  {
    plan: "Professional",
    price: "799",
    period: "/project",
    desc: "Everything you need to launch a professional, high-performance digital product.",
    features: [
      { text: "15 Pages Website", included: true },
      { text: "Responsive + Animations", included: true },
      { text: "Advanced SEO", included: true },
      { text: "Unlimited Revisions", included: true },
      { text: "Source Files Included", included: true },
      { text: "Priority Support", included: false },
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    plan: "Enterprise",
    price: "1,499",
    period: "/project",
    desc: "Complete solution for large-scale projects with full team collaboration and support.",
    features: [
      { text: "Unlimited Pages", included: true },
      { text: "Custom Animations + 3D", included: true },
      { text: "Full SEO + Analytics", included: true },
      { text: "Unlimited Revisions", included: true },
      { text: "Source Files + Docs", included: true },
      { text: "24/7 Priority Support", included: true },
    ],
    featured: false,
  },
];

const certificates = [
  {
    image: "/google certifide.jpg",
    issuer: "Gemini Educator",
    title: "AI for Everyone Certification",
    desc: "Comprehensive AI fundamentals covering machine learning concepts, neural networks, and practical AI applications.",
    date: "2025",
    ribbon: "Certified",
  },
  {
    image: "/google.jpg",
    issuer: "Google",
    title: "AI for Everyone Certification",
    desc: "Google-certified AI program covering core AI concepts, tools, and real-world implementation strategies.",
    date: "2025",
    ribbon: "Certified",
  },
  {
    image: "/samrush certifide.jpg",
    issuer: "Semrush",
    title: "SEO Fundamentals Certification",
    desc: "Complete SEO training covering keyword research, on-page optimization, link building, and analytics.",
    date: "2024",
    ribbon: "Certified",
  },
  {
    image: "/samrush.png",
    issuer: "Semrush",
    title: "SEO & Content Writing",
    desc: "Advanced SEO content strategy, keyword targeting, and content optimization for search engine ranking.",
    date: "2024",
    ribbon: "Certified",
  },
  {
    image: "/skillup.jpg",
    issuer: "SkillUp",
    title: "SEO & Content Writing",
    desc: "Professional content writing and SEO optimization techniques for digital marketing success.",
    date: "2024",
    ribbon: "Certified",
  },
];

const testimonials = [
  {
    text: "Saif delivered a stunning website for our business. His clean design and fast delivery exceeded all expectations. Highly recommended for any web project!",
    name: "Ali Raza",
    role: "Business Owner, TechVentures",
    stars: 5,
    initials: "AR",
  },
  {
    text: "Working with Saif was seamless. He understood our vision perfectly and delivered a professional Shopify store that boosted our sales significantly.",
    name: "Fatima Noor",
    role: "Founder, StyleHaven",
    stars: 5,
    initials: "FN",
  },
  {
    text: "Saif's attention to detail and professional communication made the entire project a breeze. The website he built is fast, beautiful, and SEO-optimized.",
    name: "Hassan Mehmood",
    role: "CEO, DigitalGrowth",
    stars: 5,
    initials: "HM",
  },
];


// ==================== COMPONENTS ====================

function Logo3D() {
  return (
    <Canvas style={{ width: 60, height: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} />
      <Sphere args={[1, 32, 32]} scale={1}>
        <MeshDistortMaterial
          color="#4ade80"
          attach="material"
          distort={0.5}
          speed={2}
        />
      </Sphere>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (e, link) => {
    e.preventDefault();
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-logo">
        <Logo3D />
      </div>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} onClick={(e) => handleNav(e, link)}>
              {link}
            </a>
          </li>
        ))}
        <li>
          <Link href="/projects" className="nav-projects-link">
            Work Details
          </Link>
        </li>
        <li>
          <a href="#contact" className="nav-cta" onClick={(e) => handleNav(e, "Contact")}>
            Hire Me
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="deco-circle" style={{ width: 300, height: 300, top: '10%', right: '15%', animationDelay: '0s' }} />
      <div className="deco-circle" style={{ width: 150, height: 150, bottom: '20%', left: '5%', animationDelay: '2s' }} />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Available for Freelance Work
        </div>
        <h1 className="hero-title">
          Hi, I am <span className="highlight">Saif</span><br />
          This is my<br />
          <span className="highlight">favorite work.</span>
        </h1>
        <p className="hero-sub">
          I&apos;m a passionate Web Developer & Tech Content Creator who builds modern, responsive websites and shares knowledge through engaging tech content.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>🚀 View Projects</span>
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            💬 Let&apos;s Talk
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <h3>5+</h3>
            <p>Years Experience</p>
          </div>
          <div className="hero-stat">
            <h3>120+</h3>
            <p>Projects Done</p>
          </div>
          <div className="hero-stat">
            <h3>98%</h3>
            <p>Client Satisfaction</p>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-img-wrap">
          <div className="hero-img-bg" />
          <div className="hero-floating-card card-top-left">
            <div className="card-label">🎨 Design Score</div>
            <div className="card-value">98 / 100</div>
          </div>
          <div className="hero-floating-card card-top-right">
            <div className="card-label">⚡ Projects</div>
            <div className="card-value">120+</div>
          </div>
          <div className="hero-floating-card card-bottom-left">
            <div className="card-label">⭐ Rating</div>
            <div className="card-value">5.0 ★★★★★</div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            height: '380px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
            animation: 'float 5s ease-in-out infinite',
            zIndex: 10
          }}>
            <img src="/saif.png" alt="Hero Image" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about animate-in">
      <div className="about-grid">
        <div className="about-img-area">
          <div className="about-img-card">
            <div className="about-img-placeholder">
              <img src="/saif.png" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} alt="Saif - Web Developer" />
            </div>
          </div>
          <div className="about-badge">
            <h4>5+</h4>
            <p>Years Exp.</p>
          </div>
        </div>
        <div className="about-info">
          <div className="section-label">About Me</div>
          <h2 className="section-title">Passionate Creative & Tech Enthusiast</h2>
          <p className="about-intro">
            I am Saif, a dedicated developer specializing in WordPress and Shopify development. I create user-friendly, responsive, and high-performing websites that help businesses grow online. Alongside development, I am a YouTube content creator, producing tech tutorials, AI content, and modern development guides for a global audience.
          </p>
          <p className="about-intro" style={{ marginBottom: '16px' }}>
            My passion lies in blending clean design with robust functionality. Whether it&apos;s crafting pixel-perfect landing pages, setting up full e-commerce stores, or optimizing website speed and SEO — I bring dedication and creativity to every project. I believe in continuous learning and sharing knowledge, which drives my YouTube channel and blog content focused on web development, AI tools, and tech tips.
          </p>
          <div className="about-details-grid">
            <div className="about-detail-item">
              <span className="label">Name</span>
              <span className="value">Saif</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Specialization</span>
              <span className="value">WordPress & Shopify</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Location</span>
              <span className="value">Pakistan</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Availability</span>
              <span className="value" style={{ color: '#7a8c5c' }}>✓ Open to Work</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Role</span>
              <span className="value">Web Developer & Creator</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Freelance</span>
              <span className="value">Available</span>
            </div>
          </div>
          <div className="about-highlights">
            <div className="about-highlight-item">
              <span className="highlight-icon">🎯</span>
              <div>
                <h4>Clean Design</h4>
                <p>Pixel-perfect and modern interfaces</p>
              </div>
            </div>
            <div className="about-highlight-item">
              <span className="highlight-icon">⚡</span>
              <div>
                <h4>Fast Delivery</h4>
                <p>On-time project completion, every time</p>
              </div>
            </div>
            <div className="about-highlight-item">
              <span className="highlight-icon">💬</span>
              <div>
                <h4>Professional Communication</h4>
                <p>Clear, responsive, and collaborative</p>
              </div>
            </div>
            <div className="about-highlight-item">
              <span className="highlight-icon">🏆</span>
              <div>
                <h4>High-Quality Development</h4>
                <p>Well-structured, optimized code</p>
              </div>
            </div>
          </div>
          <div className="social-links">
            {["🐦", "💼", "📸", "🐙", "📺"].map((icon, i) => (
              <a href="#" className="social-link" key={i}>{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard3D({ tool, index }) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={cardRef}
      className={`skill-card-3d animate-in${flipped ? ' flipped' : ''}`}
      style={{
        transitionDelay: `${index * 0.06}s`,
        transform: flipped ? `perspective(800px) rotateY(180deg)` : `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped(f => !f)}
    >
      {/* Front */}
      <div className="skill-face skill-front">
        <div className="skill-3d-orb">
          <img src={tool.image} alt={tool.name} className="skill-icon-img" />
          <div className="skill-orb-ring" />
          <div className="skill-orb-ring ring-b" />
        </div>
        <span className="skill-name">{tool.name}</span>
        <div className="skill-hint">Click to flip ↻</div>
      </div>
      {/* Back */}
      <div className="skill-face skill-back">
        <div className="skill-back-icon">
          <img src={tool.image} alt={tool.name} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
        </div>
        <div className="skill-back-name">{tool.name}</div>
        <div className="skill-level-bar-wrap">
          <div className="skill-level-label">Proficiency</div>
          <div className="skill-level-track">
            <div className="skill-level-fill" style={{ '--level': `${tool.level}%` }} />
          </div>
          <div className="skill-level-pct">{tool.level}%</div>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  let globalIndex = 0;
  return (
    <section id="skills" className="skills skills-3d-section">
      <div className="text-center">
        <div className="section-label">My Tools</div>
        <h2 className="section-title">My Skill Set</h2>
        <p className="section-subtitle">
          Click any card to reveal skill level — hover to see the 3D tilt effect!
        </p>
      </div>
      {skillCategories.map((cat, ci) => {
        const cards = cat.tools.map((tool, ti) => {
          const card = <SkillCard3D key={`${ci}-${ti}`} tool={tool} index={globalIndex} />;
          globalIndex++;
          return card;
        });
        return (
          <div key={ci} className="skill-category-block">
            <div className="skill-category-header">
              <span className="skill-category-icon">{cat.icon}</span>
              <h3 className="skill-category-title">{cat.category}</h3>
            </div>
            <div className="skills-grid-3d">
              {cards}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="services">
      <div className="text-center">
        <div className="section-label">What I Do</div>
        <h2 className="section-title">Services</h2>
        <p className="section-subtitle">
          We move an inch into excellence for our clients, delivering world-class digital solutions.
        </p>
      </div>
      <div className="services-grid">
        {services.map((svc, i) => (
          <div key={i} className="service-card animate-in" style={{ transitionDelay: `${i * 0.07}s` }}>
            <span className="service-num">0{i + 1}</span>
            <div className="service-icon-wrap">
              <img src={svc.image} alt={svc.title} className="service-icon-img" />
            </div>
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HireBanner() {
  return (
    <div className="hire-banner">
      <div className="hire-banner-text">
        <h2>Have a project? Let&apos;s make it shine!</h2>
        <p>Ready to transform your ideas into stunning digital experiences. Let&apos;s collaborate!</p>
      </div>
      <button className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
        <span>📩 Hire Me Now →</span>
      </button>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="text-center">
        <div className="section-label">My Work</div>
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A curated selection of my best work across web development, e-commerce, landing pages, and creative builds.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <div key={i} className="project-card animate-in" style={{ transitionDelay: `${i * 0.1}s`, padding: '40px' }}>
            <div className="project-info" style={{ width: '100%', padding: 0 }}>
              <div className="project-tags">
                {proj.tags.map((tag, ti) => (
                  <span key={ti} className="project-tag">{tag}</span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{proj.title}</h3>
              <p style={{ marginBottom: '30px', color: 'var(--text-light)', fontSize: '1rem' }}>{proj.desc}</p>
              <div className="project-buttons" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a href={proj.github || "#"} className="project-link" style={{ margin: 0, padding: '10px 20px', background: 'rgba(0,0,0,0.05)', borderRadius: '50px', fontWeight: 600 }}>
                  🐙 GitHub Code
                </a>
                {proj.liveDemo && (
                  <a href={proj.liveDemo} className="btn-primary project-live-btn" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 25px' }}>
                    <span>🌐 Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center" style={{ marginTop: 50 }}>
        <Link href="/projects" className="btn-primary">
          <span>🚀 View All Detailed Projects →</span>
        </Link>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="text-center">
        <div className="section-label">Investment</div>
        <h2 className="section-title">Transparent Pricing</h2>
        <p className="section-subtitle">
          No hidden fees, no surprises. Choose the plan that fits your project needs perfectly.
        </p>
      </div>
      <div className="pricing-grid">
        {pricingPlans.map((plan, i) => (
          <div key={i} className={`pricing-card animate-in${plan.featured ? " featured" : ""}`} style={{ transitionDelay: `${i * 0.15}s` }}>
            {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
            <div className="pricing-plan">{plan.plan}</div>
            <div className="pricing-price">
              <span className="pricing-currency">$</span>
              <span className="pricing-amount">{plan.price}</span>
              <span className="pricing-period">{plan.period}</span>
            </div>
            <p className="pricing-desc">{plan.desc}</p>
            <ul className="pricing-features">
              {plan.features.map((feat, fi) => (
                <li key={fi}>
                  <span className={feat.included ? "check" : "cross"}>
                    {feat.included ? "✓" : "✗"}
                  </span>
                  {feat.text}
                </li>
              ))}
            </ul>
            <button className="pricing-btn">
              {plan.featured ? "🚀 Get Started" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertCard3D({ cert, index, isActive }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 25;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -25;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`cert-card-3d${isActive ? ' cert-active' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(20px) translateY(-12px)`
          : 'perspective(900px) rotateX(0) rotateY(0)',
      }}
    >
      {/* Holographic shimmer */}
      <div className="cert-holo-shimmer" style={{ opacity: hovered ? 1 : 0 }} />

      {/* Certificate Image */}
      <div className="cert-image-preview">
        <img src={cert.image} alt={cert.title} className="cert-full-image" />
      </div>
    </div>
  );
}

function Certificates() {
  const sliderRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const cardWidth = 320;

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const next = activeDot + dir;
    if (next < 0 || next >= certificates.length) return;
    sliderRef.current.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
    setActiveDot(next);
  };

  const goTo = (i) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    setActiveDot(i);
  };

  return (
    <section id="certificates" className="certificates cert-3d-section">
      {/* Background decoration */}
      <div className="cert-bg-orb cert-bg-orb-1" />
      <div className="cert-bg-orb cert-bg-orb-2" />

      <div className="text-center">
        <div className="section-label">Credentials</div>
        <h2 className="section-title">My Certificates</h2>
        <p className="section-subtitle">
          Industry-recognized certifications validating expertise — hover for holographic 3D effect!
        </p>
      </div>
      <div className="cert-slider-wrap">
        <div className="cert-slider-3d" ref={sliderRef}>
          {certificates.map((cert, i) => (
            <CertCard3D key={i} cert={cert} index={i} isActive={activeDot === i} />
          ))}
        </div>
        <div className="cert-slider-controls">
          <button className="cert-btn cert-btn-3d" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
          <div className="cert-dots">
            {certificates.map((_, i) => (
              <button key={i} className={`cert-dot${activeDot === i ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to certificate ${i + 1}`} />
            ))}
          </div>
          <button className="cert-btn cert-btn-3d" onClick={() => scroll(1)} aria-label="Next">›</button>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="text-center">
        <div className="section-label">Reviews</div>
        <h2 className="section-title">What Clients Say About Me</h2>
        <p className="section-subtitle">
          Clients appreciate my work for clean design, fast delivery, professional communication, and high-quality development.
        </p>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testi-card animate-in" style={{ transitionDelay: `${i * 0.12}s` }}>
            <div className="testi-quote">&ldquo;</div>
            <div className="testi-stars">{"★".repeat(t.stars)}</div>
            <p className="testi-text">{t.text}</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div className="testi-info">
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


function Contact() {
  const canvasRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const orbs = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 80 + 40,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      hue: [30, 60, 90, 120][i % 4],
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(o => {
        o.x += o.dx; o.y += o.dy;
        if (o.x < -o.r) o.x = canvas.width + o.r;
        if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        if (o.y > canvas.height + o.r) o.y = -o.r;
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, `hsla(${o.hue},50%,60%,0.07)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="contact contact-3d-section">
      <canvas ref={canvasRef} className="contact-canvas" />
      <div className="text-center" style={{ marginBottom: 0, position: 'relative', zIndex: 2 }}>
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle" style={{ marginBottom: 60 }}>
          Have a project in mind? Let&apos;s create something amazing together.
        </p>
      </div>
      <div className="contact-grid" style={{ position: 'relative', zIndex: 2 }}>
        <div className="contact-info">
          <h2>Let&apos;s Work Together!</h2>
          <p>I&apos;m always open to discussing new projects, creative ideas, or opportunities to bring your vision to life.</p>
          <div className="contact-items">
            {[
              { icon: "📍", label: "Location", value: "Pakistan" },
              { icon: "📞", label: "Phone", value: "Your number here" },
              { icon: "✉️", label: "Email", value: "Your email here" },
              { icon: "🌐", label: "Website", value: "www.saifportfolio.io" },
            ].map((item, i) => (
              <div key={i} className="contact-item contact-item-3d">
                <div className="contact-icon contact-icon-3d">{item.icon}</div>
                <div className="contact-item-text">
                  <h4>{item.label}</h4>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="contact-form contact-form-3d">
          {/* Floating form label */}
          <div className="form-3d-header">
            <div className="form-3d-dots">
              <span /><span /><span />
            </div>
            <span className="form-3d-title">Send a Message</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className={`form-group form-group-3d${focused === 'fn' ? ' focused' : ''}`}>
                <label>First Name</label>
                <input type="text" placeholder="John" onFocus={() => setFocused('fn')} onBlur={() => setFocused(null)} required />
                <div className="input-3d-bar" />
              </div>
              <div className={`form-group form-group-3d${focused === 'ln' ? ' focused' : ''}`}>
                <label>Last Name</label>
                <input type="text" placeholder="Doe" onFocus={() => setFocused('ln')} onBlur={() => setFocused(null)} required />
                <div className="input-3d-bar" />
              </div>
            </div>
            <div className="form-row">
              <div className={`form-group form-group-3d${focused === 'em' ? ' focused' : ''}`}>
                <label>Email Address</label>
                <input type="email" placeholder="john@email.com" onFocus={() => setFocused('em')} onBlur={() => setFocused(null)} required />
                <div className="input-3d-bar" />
              </div>
              <div className={`form-group form-group-3d${focused === 'ph' ? ' focused' : ''}`}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" onFocus={() => setFocused('ph')} onBlur={() => setFocused(null)} />
                <div className="input-3d-bar" />
              </div>
            </div>
            <div className={`form-group form-group-3d${focused === 'sv' ? ' focused' : ''}`}>
              <label>Service Needed</label>
              <select onFocus={() => setFocused('sv')} onBlur={() => setFocused(null)}>
                <option value="">Select a service...</option>
                <option>Web Design</option>
                <option>App Design</option>
                <option>Brand Identity</option>
                <option>Video Editing</option>
                <option>3D Modeling</option>
                <option>Other</option>
              </select>
              <div className="input-3d-bar" />
            </div>
            <div className={`form-group form-group-3d${focused === 'msg' ? ' focused' : ''}`}>
              <label>Your Message</label>
              <textarea placeholder="Tell me about your project..." onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)} />
              <div className="input-3d-bar" />
            </div>
            <button type="submit" className={`form-submit form-submit-3d${sent ? ' sent' : ''}`}>
              {sent ? (
                <span className="submit-success">✅ Message Sent!</span>
              ) : (
                <span>🚀 Send Message</span>
              )}
              <div className="submit-particle-trail" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">Saif.</div>
          <p>Web Developer & Tech Creator focused on building modern digital experiences and sharing knowledge with the world.</p>
          <div className="social-links" style={{ marginTop: 24 }}>
            {["🐦", "💼", "📸", "🐙", "📺"].map((icon, i) => (
              <a href="#" className="social-link" key={i} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}>{icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Links</h4>
          <ul>
            {["About", "Services", "Projects", "Pricing", "Certificates"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {["Website Development", "E-commerce", "WordPress", "UI/UX Design", "SEO Optimization"].map((s) => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col footer-newsletter">
          <h4>Newsletter</h4>
          <p style={{ fontSize: '0.82rem', marginBottom: 16 }}>Subscribe to get the latest web development tips and project updates.</p>
          <input type="email" placeholder="your@email.com" />
          <button>Subscribe →</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Saif. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

// ==================== INTERSECTION OBSERVER ====================
function useAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".animate-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ==================== 3D TILT EFFECT ====================
function useTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll(".pricing-card, .service-card, .cert-card");
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
      card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px)`;
    };
    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = "";
    };
    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
}

// ==================== MAIN PAGE ====================
export default function Home() {
  useAnimations();
  useTilt();

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <HireBanner />
      <Projects />
      <Pricing />
      <Testimonials />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}
