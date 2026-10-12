import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import portfolioData from '../data/portfolioData.js';
import useActiveSection from '../hooks/useActiveSection.js';
import { onScrollFrame } from '../utils/motion.js';
import '../styles/Navbar.css';

const { personal, nav } = portfolioData;
// 'home' is watched too, so no link stays highlighted while the hero is on screen
const SECTION_IDS = ['home', ...nav.map((item) => item.id)];

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  // Turn the glass background on once the page has scrolled a little
  useEffect(() => onScrollFrame(() => setScrolled(window.scrollY > 16)), []);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
      <div className="container navbar__inner">
        <a
          href="#home"
          className="navbar__brand"
          aria-label={`${personal.name}, back to top`}
          onClick={closeMenu}
        >
          {personal.initials}
          <span aria-hidden="true">.</span>
        </a>

        <nav id="primary-nav" className="navbar__nav" aria-label="Primary">
          <ul className="navbar__links">
            {nav.map((item, index) => {
              const active = activeId === item.id;
              return (
                <li key={item.id} style={{ '--i': index }}>
                  <a
                    href={`#${item.id}`}
                    className={`navbar__link${active ? ' is-active' : ''}`}
                    aria-current={active ? 'location' : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="icon-btn"
            aria-label={`Switch to ${nextTheme} theme`}
            onClick={onToggleTheme}
          >
            {/* The key restarts the swap animation on every toggle */}
            <span key={theme} className="navbar__theme-icon">
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </span>
          </button>

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
