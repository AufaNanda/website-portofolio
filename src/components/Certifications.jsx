import { useEffect, useRef, useState } from 'react';
import './Certifications.css';

/* Real data, read straight off each certificate image; hrefs are the
   real verification links. */
const CERTS = [
  {
    id: 'google',
    title: 'Google Advanced Data Analytics',
    issuer: 'Google · Coursera',
    date: 'Feb 18, 2025',
    image: '/certificates/google.png',
    href: 'https://www.coursera.org/account/accomplishments/specialization/R3NV7K5TG1EH',
  },
  {
    id: 'nvidia',
    title: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA',
    date: 'Aug 24, 2024',
    image: '/certificates/nvidia.png',
    href: 'https://learn.nvidia.com/certificates?id=TLMqW-HbSZ2kvC6xABIw3g',
  },
  {
    id: 'da-python',
    title: 'Data Analysis with Python',
    issuer: 'IBM · Cognitive Class',
    date: 'May 17, 2024',
    image: '/certificates/da-python.png',
    href: 'https://courses.cognitiveclass.ai/certificates/a9983aa66679414ab66b7c13c68db048',
  },
  {
    id: 'sql-relational',
    title: 'SQL and Relational Databases 101',
    issuer: 'IBM · Cognitive Class',
    date: 'May 17, 2024',
    image: '/certificates/sql-relational.png',
    href: 'https://courses.cognitiveclass.ai/certificates/97573b978d984590a097f92e90a6eca6',
  },
  {
    id: 'sql-basic',
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: 'Sep 22, 2024',
    image: '/certificates/sql-basic.png',
    href: 'https://www.hackerrank.com/certificates/df28e8cd5e57',
  },
  {
    id: 'sql-intermediate',
    title: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    date: 'Nov 10, 2024',
    image: '/certificates/sql-intermediate.png',
    href: 'https://www.hackerrank.com/certificates/1c17498f1de8',
  },
  {
    id: 'sql-advanced',
    title: 'SQL (Advanced)',
    issuer: 'HackerRank',
    date: 'Feb 9, 2026',
    image: '/certificates/sql-advanced.png',
    href: 'https://www.hackerrank.com/certificates/aae8af56547c',
  },
];

export default function Certifications() {
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      className={'ct' + (revealed ? ' is-revealed' : '')}
      ref={sectionRef}
      aria-labelledby="ct-title"
    >
      <header className="ct__intro">
        <h2 className="ct__title" id="ct-title">Certifications</h2>
        <div className="ct__rule" aria-hidden="true">
          <span className="ct__rule-line" />
          <span className="ct__rule-mark" />
          <span className="ct__rule-line" />
        </div>
      </header>

      <ul className="ct__grid">
        {CERTS.map((c, i) => (
          <li key={c.id} className="ct__cell" style={{ '--i': i }}>
            <a
              className="ct__card"
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ct__wave">
                <span className="ct__banner">
                  <img className="ct__img" src={c.image} alt="" loading="lazy" draggable="false" />
                  <span className="ct__scrim" aria-hidden="true" />
                </span>

                <span className="ct__info">
                  <span className="ct__name">{c.title}</span>
                  <span className="ct__caption">{c.issuer} — {c.date}</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
