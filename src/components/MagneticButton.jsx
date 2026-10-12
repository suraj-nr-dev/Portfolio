import Icon from './Icon.jsx';
import useMagnetic from '../hooks/useMagnetic.js';
import '../styles/MagneticButton.css';

/**
 * Pill button that drifts toward the pointer (see useMagnetic).
 * Renders an <a> when `href` is given, otherwise a <button>.
 * External http(s) links open in a new tab.
 */
export default function MagneticButton({
  href,
  variant = 'primary',
  icon,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const ref = useMagnetic();
  const classes = `btn btn--${variant} ${className}`.trim();

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && <Icon name={icon} size={18} className="btn__icon" />}
    </>
  );

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
