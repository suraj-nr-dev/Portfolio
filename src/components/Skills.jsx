import Icon from './Icon.jsx';
import portfolioData from '../data/portfolioData.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { stagger } from '../utils/motion.js';
import '../styles/Skills.css';

const { skills } = portfolioData;

export default function Skills() {
  const sectionRef = useScrollReveal();

  return (
    <section id="skills" ref={sectionRef} className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <header className="section__head" data-reveal>
          <h2 id="skills-title" className="section__title">
            Skills
          </h2>
          <p className="section__lead">
            The tools I use to design, build, and ship front ends, grouped by how I use them.
          </p>
        </header>

        <ul className="skills__grid">
          {skills.map((group, index) => (
            // The <li> handles the scroll reveal; the card inside handles hover
            <li key={group.title} className="skills__item" data-reveal style={stagger(index)}>
              <article className="card card--lift skill-card">
                <div className="skill-card__head">
                  <span className="skill-card__icon">
                    <Icon name={group.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="skill-card__title">{group.title}</h3>
                    <p className="skill-card__note">{group.note}</p>
                  </div>
                </div>

                {/* Accent line that draws in when the card appears */}
                <span className="skill-card__bar" aria-hidden="true" />

                <ul className="chips" aria-label={`${group.title} skills`}>
                  {group.items.map((skill, chipIndex) => (
                    <li key={skill} className="chip" style={{ '--i': chipIndex }}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
