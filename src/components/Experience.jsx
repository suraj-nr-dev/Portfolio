import { useEffect, useRef } from 'react';
import portfolioData from '../data/portfolioData.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { onScrollFrame, prefersReducedMotion } from '../utils/motion.js';
import '../styles/Experience.css';

const { experience } = portfolioData;

export default function Experience() {
  const sectionRef = useScrollReveal();
  const timelineRef = useRef(null);

  // Draw the timeline line as the visitor scrolls through it.
  // Progress is written to a CSS variable and applied with scaleY in CSS.
  useEffect(() => {
    const timeline = timelineRef.current;

    if (prefersReducedMotion()) {
      timeline.style.setProperty('--progress', '1');
      return undefined;
    }

    return onScrollFrame(() => {
      const rect = timeline.getBoundingClientRect();
      const drawn = (window.innerHeight * 0.7 - rect.top) / rect.height;
      const progress = Math.min(Math.max(drawn, 0), 1);
      timeline.style.setProperty('--progress', progress.toFixed(3));
    });
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section experience"
      aria-labelledby="experience-title"
    >
      <div className="container experience__layout">
        <header className="section__head experience__head" data-reveal>
          <h2 id="experience-title" className="section__title">
            Experience
          </h2>
          <p className="section__lead">
            Two internships, 6 months in total, spent building and integrating real front ends.
          </p>
        </header>

        <div ref={timelineRef} className="timeline">
          <span className="timeline__line" aria-hidden="true" />

          <ol className="timeline__list">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period}`} className="timeline__item" data-reveal="right">
                <span className="timeline__dot" aria-hidden="true" />

                <article className="card card--lift timeline__card">
                  <header className="timeline__header">
                    <div>
                      <h3 className="timeline__role">{job.role}</h3>
                      <p className="timeline__company">{job.company}</p>
                    </div>
                    <p className="timeline__meta">
                      <span className="timeline__period">{job.period}</span>
                      <span className="timeline__duration">{job.duration}</span>
                    </p>
                  </header>

                  <ul className="timeline__points">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
