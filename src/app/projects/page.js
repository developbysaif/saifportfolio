'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

const detailedProjects = [
  {
    title: "Testthrapy",
    subtitle: "WordPress & AI-Powered Application",
    tags: ["WordPress", "PHP", "AI", "Custom Plugins"],
    desc: "A sophisticated web application integrating therapy tools with AI to provide interactive, user-focused therapy sessions.",
    longDesc: "Testthrapy is a professional platform built with WordPress, utilizing custom themes and intensive AI integrations. It provides a unique experience for users to interact with advanced therapy algorithms, while maintaining a clean, high-performance interface. The site also includes payment gateway integration and a fully custom user dashboard.",
    image: "",
    liveDemo: "https://testherapy.com/",
    github: "#",
    color: "#d4c5b0"
  },
  {
    title: "ilagbilghiza",
    subtitle: "Next.js E-Commerce Solution",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "Checkout integration"],
    desc: "A high-speed e-commerce platform focused on healthy living, featuring a seamless checkout and payment process.",
    longDesc: "ilaj-bil-ghiza is built on the modern Next.js stack, offering lightning-fast page loads and mobile-first responsiveness. It includes a custom-built shopping cart, integrated payment solutions, and an optimized dashboard for order management. The aesthetic is clean and modern, leveraging Tailwind CSS for a premium user experience.",
    image: "",
    liveDemo: "https://ilaj-bil-ghiza.vercel.app/",
    github: "#",
    color: "#c8d4b8"
  },

];

export default function ProjectsPage() {
  return (
    <div className="projects-page-container">
      {/* Navigation link back to home */}
      <nav className="projects-nav">
        <Link href="/" className="back-link">
          <span>← Back to Home</span>
        </Link>
        <div className="projects-nav-logo">Saif.Portfolio</div>
      </nav>

      {/* Hero Header */}
      <header className="projects-hero">
        <div className="section-label">Showcase</div>
        <h1 className="projects-header-title">My Detailed Projects</h1>
        <p className="projects-header-subtitle">
          Explore a comprehensive list of my work, including technical details, links to source code, and live demonstrations on Vercel and other platforms.
        </p>
      </header>

      {/* Projects Grid with Detail View */}
      <section className="detailed-projects-section">
        <div className="detailed-projects-grid">
          {detailedProjects.map((proj, idx) => (
            <div key={idx} className="project-detail-card animate-in" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="project-card-visual" style={{ background: `linear-gradient(135deg, ${proj.color}, ${proj.color}77)` }}>
                {proj.image ? (
                  <img src={proj.image} alt={proj.title} className="p-img" />
                ) : (
                  <span className="p-placeholder">{proj.title.charAt(0)}</span>
                )}
                <div className="p-overlay">
                  <div className="p-links">
                    {proj.github !== "#" && (
                      <a href={proj.github} className="p-link-btn" target="_blank" rel="noopener noreferrer">
                        <span>🐙 GitHub Code</span>
                      </a>
                    )}
                    {proj.liveDemo !== "#" && (
                      <a href={proj.liveDemo} className="p-link-btn live" target="_blank" rel="noopener noreferrer">
                        <span>🌐 Vercel Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-card-content">
                <div className="p-tags">
                  {proj.tags.map((tag, i) => (
                    <span key={i} className="p-tag">{tag}</span>
                  ))}
                </div>
                <h2 className="p-title">{proj.title}</h2>
                <h4 className="p-subtitle">{proj.subtitle}</h4>
                <p className="p-short-desc">{proj.desc}</p>
                <div className="p-about-section">
                  <h5>About This Project</h5>
                  <p className="p-about-text">{proj.longDesc}</p>
                </div>
                <div className="p-footer-links">
                   {proj.github === "#" && <span className="p-no-link">🔒 Code is Private</span>}
                   {proj.liveDemo === "#" && <span className="p-no-link-live">⌛ Demo coming soon</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="projects-footer">
        <h3>Want to build something similar?</h3>
        <p>I&apos;m available for freelance projects and full-time collaborations.</p>
        <Link href="/#contact" className="btn-primary">
          <span>📩 Contact Me Now →</span>
        </Link>
      </footer>
    </div>
  );
}
