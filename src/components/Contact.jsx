import { useEffect, useRef, useState } from 'react';
import './Contact.css';

const EMAIL = 'aufaehp@gmail.com';

export default function Contact() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className={'contact' + (revealed ? ' is-revealed' : '')}
      ref={sectionRef}
      aria-labelledby="contact-title"
    >
      <h2 className="contact__title" id="contact-title">Contact</h2>
      <div className="contact__rule" aria-hidden="true">
        <span className="contact__rule-line" />
        <span className="contact__rule-mark" />
        <span className="contact__rule-line" />
      </div>

      <p className="contact__lead">Got a project or a role in mind? Send a note.</p>

      <a className="contact__email" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
    </section>
  );
}
