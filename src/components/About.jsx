import Icon from './Icon.jsx';
import portfolioData from '../data/portfolioData.js';
import useScrollReveal, { useInView } from '../hooks/useScrollReveal.js';
import useCountUp from '../hooks/useCountUp.js';
import { stagger } from '../utils/motion.js';
import '../styles/About.css';

const { personal, about, animation } = portfolioData;

/** One stat whose number counts up the first time it scrolls into view. */
function Stat({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const display = useCountUp(stat.value, {
    decimals: stat.decimals,
    duration: animation.countUpDuration,
    start: inView,
  });

  return (
    <li ref={ref} className="about__stat" data-reveal="scale" style={stagger(index)}>
      <p className="about__stat-value" aria-hidden="true">
        {display}
        {stat.suffix}
      </p>
      <p className="about__stat-label">
        {/* Screen readers get the final number, not the animation frames */}
        <span className="sr-only">
          {stat.value}
          {stat.suffix}{' '}
        </span>
        {stat.label}
      </p>
    </li>
  );
}

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" ref={sectionRef} className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__aside" data-reveal="left">
          <figure className="card about__photo">
            {personal.photo ? (
              <img src={personal.photo} alt={`Portrait of ${personal.name}`} loading="lazy" />
            ) : (
              // Shown until a photo path is set in portfolioData.js
              <div className="about__photo-placeholder" role="img" aria-label="Photo placeholder">
                <span className="about__photo-initials">{personal.initials}</span>
                <span className="about__photo-note">[ADD PHOTO]</span>
              </div>
            )}
          </figure>

          <dl className="about__facts">
            <div className="about__fact">
              <dt>
                <Icon name="mapPin" size={18} />
                <span className="sr-only">Location</span>
              </dt>
              <dd>{personal.location}</dd>
            </div>
            <div className="about__fact">
              <dt>
                <Icon name="globe" size={18} />
                <span className="sr-only">Languages</span>
              </dt>
              <dd>{personal.spokenLanguages.join(', ')}</dd>
            </div>
            <div className="about__fact">
              <dt>
                <Icon name="mail" size={18} />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a className="link" href={`mailto:${personal.email}`}>
                  {personal.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="about__body">
          <h2 id="about-title" className="section__title" data-reveal>
            About me
          </h2>

          <div className="about__text">
            {about.paragraphs.map((paragraph, index) => (
              <p key={paragraph} data-reveal style={stagger(index + 1)}>
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="about__stats">
            {about.stats.map((stat, index) => (
              <Stat key={stat.label} stat={stat} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
