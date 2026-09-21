import { useMemo, useState } from "react";
import "./MichellePortfolio.css";

function App() {
  const projects = [
    {
      id: 1,
      title: "PetMinder",
      shortDescription:
        "A mobile app for keeping track of pet routines, reminders, and basic pet info.",
      fullDescription:
        "PetMinder is a mobile app project focused on helping pet owners stay organized. The idea was to keep daily tasks like feeding, reminders, and schedules in one place. I wanted the app to feel simple, useful, and easy to follow.",
      category: "Mobile",
      tech: ["Flutter", "Firebase", "Figma"],
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "BroncoHacks Website",
      shortDescription:
        "A responsive React website built from Figma designs for BroncoHacks.",
      fullDescription:
        "I worked on turning Figma designs into a working React website. The main focus was building reusable components, keeping the layout clean, and making sure the site looked good across screen sizes.",
      category: "Frontend",
      tech: ["React", "JavaScript", "CSS"],
      github: "#",
      demo: "#",
    },
    {
      id: 3,
      title: "Future Script",
      shortDescription:
        "An Android app for scheduling messages to be sent at a future date.",
      fullDescription:
        "Future Script is an Android app project built around message scheduling. I focused on the app structure, notification logic, and making the experience feel clear and straightforward.",
      category: "Mobile",
      tech: ["Java", "Android", "Notifications"],
      github: "#",
      demo: "#",
    },
    {
      id: 4,
      title: "Skill Swap",
      shortDescription:
        "A team project where users can exchange skills instead of money.",
      fullDescription:
        "Skill Swap was built during a hackathon. I helped with the frontend side of the project and worked on making the browsing and request flow easier to use. It was a good experience working quickly with a team and building something in a short amount of time.",
      category: "Full Stack",
      tech: ["React", "Node.js", "MongoDB"],
      github: "#",
      demo: "#",
    },
    {
      id: 5,
      title: "Rock Paper Escape",
      shortDescription:
        "A Unity game project with puzzle and combat elements.",
      fullDescription:
        "This project combined game logic, interaction, and presentation. I contributed to development and helped improve the overall gameplay experience. It gave me experience working on a more creative project while still thinking through mechanics and user interaction.",
      category: "Game Dev",
      tech: ["Unity", "C#", "Blender"],
      github: "#",
      demo: "#",
    },
    {
      id: 6,
      title: "Sudoku Solver",
      shortDescription:
        "A Sudoku solver built in MIPS assembly.",
      fullDescription:
        "This project helped me practice low-level programming and problem solving by building Sudoku logic, validation, and board handling in MIPS. It pushed me to think carefully about structure and accuracy.",
      category: "Systems",
      tech: ["MIPS", "Assembly", "Algorithms"],
      github: "#",
      demo: "#",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const searchableText =
        `${project.title} ${project.shortDescription} ${project.fullDescription} ${project.tech.join(" ")}`.toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-content">
          <div>
            <h1 className="site-title">Michelle Solares</h1>
            <p className="site-tagline">Computer Science Student</p>
          </div>

          <nav className="site-nav">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero-section">
          <div className="hero-main">
            <p className="eyebrow">Cal Poly Pomona • May 2026</p>
            <h2 className="hero-title">Hi, I’m Michelle.</h2>
            <p className="hero-description">
              I’m a Computer Science student interested in software engineering,
              frontend development, mobile apps, and game development. I like
              building projects that are clean, easy to use, and actually feel complete.
            </p>

            <div className="hero-tags">
              <span className="tag">React</span>
              <span className="tag">Android</span>
              <span className="tag">Frontend</span>
              <span className="tag">Full Stack</span>
            </div>

            <div className="hero-buttons">
              <a href="#projects" className="button button-primary">See Projects</a>
              <a href="#contact" className="button button-secondary">Contact</a>
            </div>
          </div>

          <aside className="hero-side">
            <p className="card-label">Quick Info</p>
            <div className="info-row">
              <span>School</span>
              <strong>Cal Poly Pomona</strong>
            </div>
            <div className="info-row">
              <span>Major</span>
              <strong>Computer Science</strong>
            </div>
            <div className="info-row">
              <span>Graduation</span>
              <strong>May 2026</strong>
            </div>
            <div className="info-row">
              <span>Interested in</span>
              <strong>Frontend, Mobile, Full Stack</strong>
            </div>
          </aside>
        </section>

        <section id="about" className="content-section">
          <div className="section-header">
            <p className="section-label">About</p>
            <h3 className="section-title">A little about me</h3>
          </div>

          <div className="two-column">
            <div className="card">
              <p>
                I’m currently studying Computer Science at Cal Poly Pomona and
                looking for opportunities where I can keep improving as a developer.
              </p>
              <p>
                Most of my experience so far has been through class projects,
                hackathons, and team-based work. I’ve built websites, mobile apps,
                and game projects, and I especially enjoy frontend work and building
                interfaces that feel organized.
              </p>
            </div>

            <div id="skills" className="card">
              <h4 className="card-title">Skills</h4>
              <div className="tag-list">
                <span className="tag">Java</span>
                <span className="tag">Python</span>
                <span className="tag">JavaScript</span>
                <span className="tag">C#</span>
                <span className="tag">C++</span>
                <span className="tag">React</span>
                <span className="tag">Node.js</span>
                <span className="tag">HTML</span>
                <span className="tag">CSS</span>
                <span className="tag">MongoDB</span>
                <span className="tag">Android</span>
                <span className="tag">Git/GitHub</span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <p className="section-label">What I like working on</p>
            <h3 className="section-title">Main areas I enjoy</h3>
          </div>

          <div className="focus-grid">
            <div className="card focus-card">
              <h4>Frontend Development</h4>
              <p>
                I enjoy building interfaces in React and creating layouts that are
                easy to follow and nice to use.
              </p>
            </div>

            <div className="card focus-card">
              <h4>Mobile Apps</h4>
              <p>
                I like working on app ideas that feel practical, organized, and useful
                in everyday life.
              </p>
            </div>

            <div className="card focus-card">
              <h4>Team Projects</h4>
              <p>
                I’ve worked on collaborative projects where communication, planning,
                and clean code all mattered.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="section-header center">
            <p className="section-label">Projects</p>
            <h3 className="section-title">Things I’ve built</h3>
            <p className="section-subtitle">
              You can search by title, technology, or category.
            </p>
          </div>

          <div className="project-toolbar">
            <input
              type="text"
              className="search-input"
              placeholder="Search projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="card project-card">
                <div className="project-top">
                  <h4 className="project-name">{project.title}</h4>
                  <span className="project-category">{project.category}</span>
                </div>

                <p className="project-summary">{project.shortDescription}</p>

                <div className="tag-list compact">
                  {project.tech.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <button
                    className="button button-primary"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </button>
                  <a className="button button-secondary" href={project.github}>
                    GitHub
                  </a>
                  <a className="button button-secondary" href={project.demo}>
                    Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section">
          <div className="contact-card">
            <div>
              <p className="section-label">Contact</p>
              <h3 className="section-title">Get in touch</h3>
              <p className="section-subtitle">
                I’m currently looking for internships and early career opportunities.
              </p>
            </div>

            <div className="contact-links">
              <a className="button button-primary" href="mailto:solaresmichelle22@gmail.com">
                Email
              </a>
              <a className="button button-secondary" href="#">
                LinkedIn
              </a>
              <a className="button button-secondary" href="#">
                Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="section-label">Project</p>
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-subtitle">{selectedProject.shortDescription}</p>
              </div>

              <button
                className="button button-secondary"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="card">
                <p>{selectedProject.fullDescription}</p>
              </div>

              <div className="card">
                <h4 className="card-title">Tech Stack</h4>
                <div className="tag-list">
                  {selectedProject.tech.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="project-actions modal-actions">
                  <a className="button button-secondary" href={selectedProject.github}>
                    GitHub
                  </a>
                  <a className="button button-primary" href={selectedProject.demo}>
                    Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;