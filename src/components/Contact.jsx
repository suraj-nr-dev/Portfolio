import { useRef, useState } from 'react';
import Icon from './Icon.jsx';
import MagneticButton from './MagneticButton.jsx';
import portfolioData from '../data/portfolioData.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import '../styles/Contact.css';

const { personal, social, contact } = portfolioData;

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Your email', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'Message', type: 'textarea', autoComplete: 'off' },
];

const EMPTY_FORM = { name: '', email: '', message: '' };

// Each validator returns an error message, or '' when the value is fine
const VALIDATORS = {
  name: (value) =>
    value.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
  message: (value) =>
    value.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.',
};

export default function Contact() {
  const sectionRef = useScrollReveal();
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sentTo, setSentTo] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Once a field has an error, re-check it on every keystroke
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: VALIDATORS[name](value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((current) => ({ ...current, [name]: VALIDATORS[name](value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    FIELDS.forEach(({ name }) => {
      nextErrors[name] = VALIDATORS[name](values[name]);
    });
    setErrors(nextErrors);

    const firstInvalid = FIELDS.find(({ name }) => nextErrors[name]);
    if (firstInvalid) {
      setSentTo('');
      formRef.current.elements[firstInvalid.name].focus();
      return;
    }

    // No back end needed: hand the message to the visitor's email app
    const name = values.name.trim();
    const subject = `Portfolio enquiry from ${name}`;
    const body = `${values.message.trim()}\n\nFrom: ${name}\nReply to: ${values.email.trim()}`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSentTo(name);
    setValues(EMPTY_FORM);
    setErrors({});
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div className="container contact__grid">
        <div className="contact__info" data-reveal="left">
          <h2 id="contact-title" className="section__title">
            {contact.heading}
          </h2>
          <p className="section__lead">{contact.text}</p>

          <ul className="contact__details">
            <li>
              <span className="contact__detail-icon" aria-hidden="true">
                <Icon name="mail" />
              </span>
              <a className="link" href={`mailto:${personal.email}`}>
                {personal.email}
              </a>
            </li>
            <li>
              <span className="contact__detail-icon" aria-hidden="true">
                <Icon name="phone" />
              </span>
              <a className="link" href={personal.phoneHref}>
                {personal.phone}
              </a>
            </li>
            <li>
              <span className="contact__detail-icon" aria-hidden="true">
                <Icon name="mapPin" />
              </span>
              <span>{personal.location}</span>
            </li>
          </ul>

          <ul className="contact__social">
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

        <div className="contact__form-wrap" data-reveal="right">
          <form ref={formRef} className="card contact__form" onSubmit={handleSubmit} noValidate>
            {FIELDS.map((field) => {
              const error = errors[field.name];
              const inputProps = {
                id: `contact-${field.name}`,
                name: field.name,
                className: 'field__input',
                value: values[field.name],
                autoComplete: field.autoComplete,
                required: true,
                'aria-invalid': error ? 'true' : undefined,
                'aria-describedby': error ? `contact-${field.name}-error` : undefined,
                onChange: handleChange,
                onBlur: handleBlur,
              };

              return (
                <div key={field.name} className={`field${error ? ' has-error' : ''}`}>
                  <label className="field__label" htmlFor={inputProps.id}>
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea rows={5} {...inputProps} />
                  ) : (
                    <input type={field.type} {...inputProps} />
                  )}
                  {error && (
                    <p id={`contact-${field.name}-error`} className="field__error">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}

            <MagneticButton type="submit" icon="send" className="contact__submit">
              Send message
            </MagneticButton>

            {/* Announced to screen readers when it appears */}
            <p className="contact__status" role="status">
              {sentTo && (
                <span className="contact__status-message">
                  <Icon name="check" size={18} />
                  Thanks, {sentTo}. Your email app should now be open with the message ready to
                  send.
                </span>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
