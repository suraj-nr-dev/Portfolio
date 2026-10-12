import Icon from './Icon.jsx';
import MagneticButton from './MagneticButton.jsx';
import portfolioData from '../data/portfolioData.js';
import '../styles/Footer.css';

const { personal, social, nav } = portfolioData;
const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">{personal.name}</p>
          <p className="footer__title">{personal.title}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {nav.map((item) => (
              <li key={item.id}>
                <a className="link" href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="footer__social">
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

      <div className="container footer__bottom">
        <p>
          &copy; {YEAR} {personal.name}. Built with React and plain CSS.
        </p>
        <MagneticButton href="#home" variant="ghost" icon="arrowUp" className="btn--small">
          Back to top
        </MagneticButton>
      </div>
    </footer>
  );
}
