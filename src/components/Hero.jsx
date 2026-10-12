import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import MagneticButton from './MagneticButton.jsx';
import portfolioData from '../data/portfolioData.js';
import useTypingEffect from '../hooks/useTypingEffect.js';
import { prefersReducedMotion } from '../utils/motion.js';
import '../styles/Hero.css';

const { personal, social, animation } = portfolioData;

// The spoken intro uses the browser's built-in speech synthesis (no audio files)
const speechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

/** Prefers an Indian-English male voice, then any English voice. */
function pickVoice(voices) {
  const indian = voices.filter((voice) => voice.lang.replace('_', '-') === 'en-IN');
  return (
    indian.find((voice) => /ravi|prabhat|male/i.test(voice.name)) ??
    indian[0] ??
    voices.find((voice) => voice.lang.startsWith('en')) ??
    null
  );
}

/**
 * `ready` becomes true when the intro loader starts to leave; the entrance
 * animation and the typing effect both wait for it.
 */
export default function Hero({ ready }) {
  const typedRole = useTypingEffect(personal.roles, {
    typeSpeed: animation.typeSpeed,
    deleteSpeed: animation.deleteSpeed,
    pause: animation.typePause,
    enabled: ready,
  });

  // The character's speech bubble steps through the intro lines.
  // With reduced motion it stays on the first line. While the intro is being
  // spoken, the voice decides which line is showing instead.
  const [introIndex, setIntroIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const speechRun = useRef(0); // increases on every play/stop so stale callbacks are ignored
  const utterances = useRef([]); // keeps utterances referenced until they finish

  useEffect(() => {
    if (!ready || speaking || prefersReducedMotion() || personal.introLines.length < 2) {
      return undefined;
    }
    const timer = setInterval(() => {
      setIntroIndex((index) => (index + 1) % personal.introLines.length);
    }, animation.introInterval);
    return () => clearInterval(timer);
  }, [ready, speaking]);

  const stopIntro = useCallback(() => {
    speechRun.current += 1;
    window.speechSynthesis.cancel();
    utterances.current = [];
    setSpeaking(false);
  }, []);

  // Browsers only allow speech after a click, so this runs from the button
  const playIntro = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    speechRun.current += 1;
    const run = speechRun.current;
    const voice = pickVoice(synth.getVoices());
    const lastIndex = personal.introLines.length - 1;

    utterances.current = personal.introLines.map((line, index) => {
      const utterance = new SpeechSynthesisUtterance(line);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang ?? 'en-IN';
      utterance.rate = animation.speechRate;
      // Show each line in the bubble as the voice starts saying it
      utterance.onstart = () => {
        if (speechRun.current === run) setIntroIndex(index);
      };
      utterance.onend = () => {
        if (speechRun.current === run && index === lastIndex) setSpeaking(false);
      };
      utterance.onerror = () => {
        if (speechRun.current === run) setSpeaking(false);
      };
      synth.speak(utterance);
      return utterance;
    });

    setSpeaking(true);
  };

  // Never keep talking after the component goes away
  useEffect(() => {
    if (!speechSupported) return undefined;
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <section id="home" className={`hero${ready ? ' is-ready' : ''}`} aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__badge" data-enter style={{ '--d': '0ms' }}>
            <span className="hero__badge-dot" aria-hidden="true" />
            {personal.availability}
          </p>

          <h1 id="hero-title" className="hero__title" data-enter style={{ '--d': '90ms' }}>
            <span className="hero__hello">Hi, I&apos;m</span>
            <span className="hero__name">{personal.name}</span>
          </h1>

          {/* Screen readers get the static title; the typed text is visual only */}
          <p className="hero__role" data-enter style={{ '--d': '180ms' }}>
            <span className="sr-only">{personal.title}</span>
            <span aria-hidden="true">
              {typedRole}
              <span className="hero__caret" />
            </span>
          </p>

          <p className="hero__tagline" data-enter style={{ '--d': '270ms' }}>
            {personal.tagline}
          </p>

          <div className="hero__actions" data-enter style={{ '--d': '360ms' }}>
            <MagneticButton href="#projects" icon="arrowRight">
              View Projects
            </MagneticButton>
            <MagneticButton
              href={personal.cvFile}
              download={personal.cvDownloadName}
              variant="ghost"
              icon="download"
            >
              Download CV
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" icon="mail">
              Contact Me
            </MagneticButton>
          </div>

          <ul className="hero__social" data-enter style={{ '--d': '450ms' }}>
            {social.map((item) => (
              <li key={item.label}>
                <a
                  className="icon-btn"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} profile (opens in a new tab)`}
                >
                  <Icon name={item.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Character with a speech-bubble intro it can also say out loud.
            The artwork is hidden from screen readers (the same introduction is in
            the text column); only the play button is exposed. */}
        <div
          className={`hero__visual${speaking ? ' is-speaking' : ''}`}
          data-enter
          style={{ '--d': '320ms' }}
        >
          <span className="hero__ring hero__ring--outer" aria-hidden="true" />
          <span className="hero__ring hero__ring--inner" aria-hidden="true" />
          <div className="hero__character" aria-hidden="true">
            {personal.character ? (
              <img src={personal.character} alt="" width="400" height="400" />
            ) : (
              // Shown until a character image path is set in portfolioData.js
              <span className="hero__monogram">{personal.initials}</span>
            )}
          </div>
          <div className="hero__bubble" aria-hidden="true">
            {/* The key restarts the pop-in animation for each new line */}
            <span key={introIndex} className="hero__bubble-text">
              {personal.introLines[introIndex]}
            </span>
          </div>
          {personal.heroHighlights.map((label, index) => (
            <span
              key={label}
              className={`hero__float hero__float--${index + 1}`}
              aria-hidden="true"
            >
              {label}
            </span>
          ))}

          {speechSupported && (
            <div className="hero__speak">
              <MagneticButton
                variant={speaking ? 'ghost' : 'primary'}
                icon={speaking ? 'stop' : 'volume'}
                className="btn--small"
                aria-pressed={speaking}
                onClick={speaking ? stopIntro : playIntro}
              >
                {speaking ? 'Stop' : 'Hear my intro'}
              </MagneticButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
