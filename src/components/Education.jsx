import Icon from './Icon.jsx';
import portfolioData from '../data/portfolioData.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { stagger } from '../utils/motion.js';
import '../styles/Education.css';

const { education, coursework, certifications, leadership } = portfolioData;

export default function Education() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section education"
      aria-labelledby="education-title"
    >
      <div className="container">
        <header className="section__head" data-reveal>
          <h2 id="education-title" className="section__title">
            Education &amp; Certifications
          </h2>
        </header>

        <div className="education__grid">
          {/* Degrees and coursework */}
          <div className="education__column">
            <ul className="education__degrees">
              {education.map((item, index) => (
                <li key={item.degree} data-reveal="left" style={stagger(index)}>
                  <article className="card card--lift degree">
                    <span className="degree__icon" aria-hidden="true">
                      <Icon name="book" size={22} />
                    </span>
                    <div className="degree__body">
                      <h3 className="degree__title">{item.degree}</h3>
                      <p className="degree__school">{item.school}</p>
                      <p className="degree__meta">
                        <span>{item.year}</span>
                        <span className="degree__score">{item.score}</span>
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            <div className="education__block" data-reveal>
              <h3 className="education__subtitle">Relevant coursework</h3>
              <ul className="chips">
                {coursework.map((course) => (
                  <li key={course} className="chip">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certifications and leadership */}
          <div className="education__column">
            <div className="education__block" data-reveal="right">
              <h3 className="education__subtitle">Certifications</h3>
              <ul className="certs">
                {certifications.map((cert) => (
                  <li key={cert.name} className="certs__item">
                    <Icon name="award" size={20} />
                    <p>
                      <span className="certs__name">{cert.name}</span>
                      {cert.issuer && <span className="certs__issuer">{cert.issuer}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="education__block" data-reveal="right" style={stagger(1)}>
              <h3 className="education__subtitle">Leadership &amp; volunteering</h3>
              <ul className="leadership">
                {leadership.map((item) => (
                  <li key={item.title} className="leadership__item">
                    <p className="leadership__title">{item.title}</p>
                    <p className="leadership__meta">
                      {[item.org, item.period].filter(Boolean).join(', ')}
                    </p>
                    <p className="leadership__description">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
