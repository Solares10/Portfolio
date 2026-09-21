// MichellePortfolio.jsx
import "./MichellePortfolio.css";

export default function MichellePortfolio() {
  const projects = [
    {
      title: "BroncoHacks Website",
      period: "Feb 2026 - Mar 2026",
      tech: ["React", "Responsive Design", "Figma"],
      description:
        "Converted Figma designs into a responsive website for Cal Poly Pomona's BroncoHacks event.",
    },
    {
      title: "Skill Swap",
      period: "Mar 2026",
      tech: ["React", "Git", "Hackathon"],
      description:
        "Built a frontend app where users trade skills instead of money.",
    },
  ];

  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <div>
            <h1 className="name">Michelle Solares</h1>
            <p className="subtitle">Computer Science Student</p>
          </div>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero container">
        <div>
          <span className="badge">Open to opportunities</span>
          <h2 className="hero-title">Building software with purpose</h2>
          <p className="hero-text">
            I am a CS student with experience in full-stack, mobile, and game development.
          </p>
        </div>
      </section>

      <section id="projects" className="section container">
        <h3 className="section-title">Projects</h3>
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p.title} className="project-card">
              <div className="project-top">
                <h4>{p.title}</h4>
                <span className="project-date">{p.period}</span>
              </div>
              <p>{p.description}</p>
              <div className="tech-tags">
                {p.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section container contact">
        <h3>Contact</h3>
        <p>Email: solaresmichelle22@gmail.com</p>
      </section>
    </div>
  );
}


/* ================= CSS FILE ================= */

