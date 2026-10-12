import Icon from './Icon.jsx';
import MagneticButton from './MagneticButton.jsx';
import portfolioData from '../data/portfolioData.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import useTilt from '../hooks/useTilt.js';
import { stagger } from '../utils/motion.js';
import '../styles/Projects.css';

const { projects, social } = portfolioData;

const githubProfile = social.find((item) => item.icon === 'github')?.url;

/** Placeholders such as "[ADD GITHUB REPO URL]" are not real links. */
const isRealUrl = (value) => /^https?:\/\//.test(value ?? '');

function ProjectCard({ project }) {
  const tiltRef = useTilt();
  const hasRepo = isRealUrl(project.links.github);
  const hasLive = isRealUrl(project.links.live);

  return (
    <article ref={tiltRef} className="card tilt project-card">
      {/* Light spot that follows the pointer while tilting */}
      <span className="tilt__glare" aria-hidden="true" />

      <div className="project-card__main">
        <span className="project-card__icon" aria-hidden="true">
          <Icon name="code" size={22} />
        </span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <ul className="chips project-card__tech" aria-label="Technologies used">
          {project.tech.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-card__links">
          {/* Until a repo URL is added, the button points to the GitHub profile */}
          <MagneticButton
            href={hasRepo ? project.links.github : githubProfile}
            variant="ghost"
            icon="github"
            className="btn--small"
            aria-label={`${hasRepo ? 'Source code for' : 'GitHub profile, home of'} ${project.title} (opens in a new tab)`}
          >
            {hasRepo ? 'Code' : 'GitHub'}
          </MagneticButton>

          {hasLive && (
            <MagneticButton
              href={project.links.live}
              icon="external"
              className="btn--small"
              aria-label={`Live demo of ${project.title} (opens in a new tab)`}
            >
              Live demo
            </MagneticButton>
          )}
        </div>
      </div>

      {project.highlights.length > 0 && (
        <ul className="project-card__highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>
              <Icon name="check" size={18} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section projects"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <header className="section__head" data-reveal>
          <h2 id="projects-title" className="section__title">
            Projects
          </h2>
          <p className="section__lead">
            4 independent builds, from a full-stack WhatsApp campaign panel to an NLP resume
            analyzer.
          </p>
        </header>

        <ul className="projects__grid">
          {projects.map((project, index) => (
            // The <li> handles the scroll reveal; the card inside handles the tilt
            <li
              key={project.title}
              className={`projects__item${project.featured ? ' projects__item--featured' : ''}`}
              data-reveal="scale"
              style={stagger(index)}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
