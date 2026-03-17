'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

// ==================== DATA ====================
const navLinks = ["About", "Skills", "Services", "Projects", "Pricing", "Certificates", "Blog", "Contact"];

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
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", title: "Web Designing", desc: "Creating stunning, pixel-perfect websites that captivate audiences and drive engagement." },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", title: "App development", desc: "Beautiful mobile experiences with intuitive UX flows and delightful interactions." },
  { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg", title: "Shopify", desc: "Custom Shopify stores with beautiful themes, payment integrations and seamless checkout." },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg", title: "Wordpress", desc: "Professional WordPress development with custom themes, plugins and optimized performance." },
  { image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg", title: "3D Modeling", desc: "Realistic 3D assets, product visualizations and stunning architectural renders." },
  { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg", title: "SEO Audit", desc: "Complete SEO audit solutions with keyword research, site analysis and ranking strategies." },
  { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg", title: "AI Integration", desc: "Smart AI-powered features, chatbots and automation tools for modern businesses." },
  { image: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleads.svg", title: "Digital Marketing", desc: "Data-driven campaigns that grow your brand and convert visitors into loyal customers." },
];

const projects = [
  { icon: "📱", title: "FinTrack Mobile App", tags: ["React Native", "Node.js"], desc: "Full-stack finance tracking app with real-time analytics and AI insights.", color: "#d4c5b0", liveDemo: "https://fintrack-demo.com" },
  { icon: "🎭", title: "Creative Agency Website", tags: ["Next.js", "Framer"], desc: "Award-winning agency portfolio site with immersive animations.", color: "#c8d4b8", liveDemo: "https://agency-demo.com" },
  { icon: "🎮", title: "Gaming Dashboard UI", tags: ["React", "Three.js"], desc: "3D interactive gaming statistics dashboard with live data visualization.", color: "#b8c4d4", liveDemo: "https://dashboard-demo.com" },
  { icon: "🏠", title: "Real Estate Platform", tags: ["Next.js", "Maps API"], desc: "Modern property listing platform with virtual tour integration.", color: "#d4b8c4", liveDemo: "https://realestate-demo.com" },
  { icon: "🛍️", title: "E-Commerce Store", tags: ["Shopify", "React"], desc: "High-conversion online store with personalized recommendation engine.", color: "#d4d0b8", liveDemo: "https://ecommerce-demo.com" },
  { icon: "🎵", title: "Music Streaming App", tags: ["React", "Web Audio"], desc: "Spotify-inspired music player with amazing audio visualizations.", color: "#c4b8d4", liveDemo: "https://music-demo.com" },
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
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    issuer: "Google",
    title: "Google UX Design Professional",
    desc: "Comprehensive UX design program covering user research, wireframing, prototyping and usability testing.",
    date: "Dec 2024",
    ribbon: "Verified",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
    issuer: "Meta",
    title: "React Developer Certification",
    desc: "Advanced React patterns, state management, performance optimization and modern React ecosystem tools.",
    date: "Oct 2024",
    ribbon: "Verified",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    issuer: "AWS",
    title: "AWS Cloud Practitioner",
    desc: "Cloud computing concepts, AWS core services, security, architecture and cloud economics fundamentals.",
    date: "Sep 2024",
    ribbon: "Verified",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg",
    issuer: "Adobe",
    title: "Adobe Certified Expert",
    desc: "Expert-level proficiency in Adobe Creative Suite including Photoshop, Illustrator, and After Effects.",
    date: "Jul 2024",
    ribbon: "Certified",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    issuer: "OpenAI",
    title: "AI Prompt Engineering",
    desc: "Mastery of prompt engineering techniques, AI integration and building LLM-powered applications.",
    date: "Jun 2024",
    ribbon: "Certified",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    issuer: "Google",
    title: "Data Analytics Certificate",
    desc: "Data analysis with SQL, R, and Tableau. Data cleaning, visualization and dashboard creation.",
    date: "Apr 2024",
    ribbon: "Verified",
  },
];

const testimonials = [
  {
    text: "Chris delivered beyond our expectations. The 3D animations he created for our landing page increased our conversion rate by 40%. Absolutely brilliant work!",
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    stars: 5,
    initials: "SJ",
  },
  {
    text: "Working with Chris was a game-changer. His attention to detail and creative direction transformed our brand identity into something truly remarkable.",
    name: "Ahmed Al-Rashid",
    role: "Founder, NovaBrands",
    stars: 5,
    initials: "AR",
  },
  {
    text: "The most skilled designer I've worked with in 10 years. Chris understood our vision immediately and delivered a stunning e-commerce experience our customers love.",
    name: "Emily Chen",
    role: "CMO, ShopElite",
    stars: 5,
    initials: "EC",
  },
];

const blogs = [
  {
    icon: "🎨",
    cat: "Design",
    title: "The Future of 3D Web Design: Trends for 2025",
    desc: "Explore how WebGL, Three.js and CSS 3D transforms are reshaping the digital landscape.",
    date: "Mar 12, 2025",
    color: "#d4c5b0",
  },
  {
    icon: "⚡",
    cat: "Development",
    title: "Building Blazing Fast Websites with Next.js 15",
    desc: "Performance optimization strategies and new features that make Next.js 15 a game-changer.",
    date: "Feb 28, 2025",
    color: "#c8d4b8",
  },
  {
    icon: "🤖",
    cat: "AI / Tech",
    title: "Integrating AI Tools into Your Design Workflow",
    desc: "How AI-powered tools like Midjourney and GPT-4 can supercharge your creative process.",
    date: "Feb 10, 2025",
    color: "#b8c4d4",
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
          Hi, I am <span className="highlight">Chris</span><br />
          This is my<br />
          <span className="highlight">favorite work.</span>
        </h1>
        <p className="hero-sub">
          I&apos;m a creative designer & developer crafting stunning digital experiences with 3D animations, pixel-perfect interfaces, and innovative web solutions.
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
              <img src="/saif.png" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} alt="About Image" />
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
            Hi! I&apos;m Chris, a multi-disciplinary designer and developer based in New York. I specialize in creating compelling digital experiences that merge beautiful aesthetics with cutting-edge technology. My work spans branding, web design, 3D visualization, and interactive development.
          </p>
          <div className="about-details-grid">
            <div className="about-detail-item">
              <span className="label">Name</span>
              <span className="value">Chris Anderson</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Email</span>
              <span className="value">chris@portfolio.io</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Location</span>
              <span className="value">New York, USA</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Availability</span>
              <span className="value" style={{ color: '#7a8c5c' }}>✓ Open to Work</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Phone</span>
              <span className="value">+1 (555) 000-1234</span>
            </div>
            <div className="about-detail-item">
              <span className="label">Freelance</span>
              <span className="value">Available</span>
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
        <h2 className="section-title">Our Projects</h2>
        <p className="section-subtitle">
          Hand-picked portfolio of my best work across branding, web, app, and multimedia projects.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <div key={i} className="project-card animate-in" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="project-img" style={{ background: `linear-gradient(135deg, ${proj.color}, ${proj.color}cc)`, fontSize: '5rem' }}>
              {proj.icon}
              <div className="project-img-overlay" />
            </div>
            <div className="project-info">
              <div className="project-tags">
                {proj.tags.map((tag, ti) => (
                  <span key={ti} className="project-tag">{tag}</span>
                ))}
              </div>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <div className="project-buttons">
                <a href="#" className="project-link">View Case Study →</a>
                <a href={proj.liveDemo || "#"} className="btn-primary project-live-btn" target="_blank" rel="noopener noreferrer">
                  🌐 View Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
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
      <span className="cert-ribbon">{cert.ribbon}</span>

      {/* Animated emblem */}
      <div className="cert-emblem-3d">
        <div className="cert-emblem-ring" />
        <div className="cert-emblem-inner">
          <img src={cert.image} alt={cert.issuer} className="cert-image-icon" />
        </div>
        <div className="cert-emblem-particles">
          {[0, 1, 2, 3, 4, 5].map(j => (
            <div key={j} className="cert-particle" style={{ '--pi': j }} />
          ))}
        </div>
      </div>

      <div className="cert-issuer cert-issuer-badge">{cert.issuer}</div>
      <h3 className="cert-title">{cert.title}</h3>
      <p className="cert-desc">{cert.desc}</p>
      <div className="cert-meta">
        <span className="cert-date">📅 {cert.date}</span>
        <button className="cert-verify">✓ Verify</button>
      </div>

      {/* Bottom glow line */}
      <div className="cert-glow-line" style={{ opacity: hovered ? 1 : 0 }} />
    </div>
  );
}

function Certificates() {
  const sliderRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const cardWidth = 380;

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
        <h2 className="section-title">What Client Say About Us</h2>
        <p className="section-subtitle">
          Real feedback from real clients who trusted me with their most important projects.
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

function Blog() {
  return (
    <section id="blog" className="blog">
      <div className="text-center">
        <div className="section-label">Knowledge</div>
        <h2 className="section-title">Our Blog</h2>
        <p className="section-subtitle">
          Insights, tutorials, and creative explorations on design, development and technology.
        </p>
      </div>
      <div className="blog-grid">
        {blogs.map((post, i) => (
          <div key={i} className="blog-card animate-in" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="blog-img" style={{ background: `linear-gradient(135deg, ${post.color}, ${post.color}aa)`, fontSize: '4rem' }}>
              {post.icon}
            </div>
            <div className="blog-info">
              <div className="blog-cat">{post.cat}</div>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <div className="blog-meta">
                <span className="blog-date">📅 {post.date}</span>
                <a href="#" className="blog-read">Read More →</a>
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
          <h2>Let&apos;s Work Together</h2>
          <p>I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
          <div className="contact-items">
            {[
              { icon: "📍", label: "Address", value: "New York, USA" },
              { icon: "📞", label: "Phone", value: "+1 (555) 000-1234" },
              { icon: "✉️", label: "Email", value: "chris@portfolio.io" },
              { icon: "🌐", label: "Website", value: "www.chrisportfolio.io" },
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
          <div className="logo">Chris.</div>
          <p>Crafting stunning digital experiences with passion, precision, and a touch of magic. Let&apos;s build something amazing together.</p>
          <div className="social-links" style={{ marginTop: 24 }}>
            {["🐦", "💼", "📸", "🐙"].map((icon, i) => (
              <a href="#" className="social-link" key={i} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}>{icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Links</h4>
          <ul>
            {["About", "Services", "Projects", "Pricing", "Blog"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {["Web Design", "App Design", "Branding", "3D Modeling", "Video Editing"].map((s) => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col footer-newsletter">
          <h4>Newsletter</h4>
          <p style={{ fontSize: '0.82rem', marginBottom: 16 }}>Subscribe to get the latest design tips and project updates.</p>
          <input type="email" placeholder="your@email.com" />
          <button>Subscribe →</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Chris. All rights reserved.</span>
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
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
