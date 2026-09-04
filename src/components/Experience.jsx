import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/paths.js';
import './Experience.css';

/* Newest first — top of the timeline. Every row is the same shape:
   explanation on the left, photo + period on the right. */
const ENTRIES = [
  {
    id: 'telkom',
    role: 'Data Scientist Intern',
    org: 'Telkom Indonesia',
    period: 'Feb 2025 – Feb 2026',
    image: asset('experience/telkom.jpeg'),
    points: [
      'Conducted daily ad-hoc analysis using SQL in BigQuery from Product Manager and business-division requests.',
      'Designed and developed a data mart, transformed and used across 10+ dynamic Looker Studio dashboards.',
      'Ensured data consistency and integrity across 10+ datasets during ingestion from raw data to the data mart.',
      'Executed queries on the data mart and ran statistical analysis in Python, including Tukey HSD, to derive insights.',
      'Performed data ingestion from backend systems into BigQuery raw tables using CLI tools.',
    ],
  },
  {
    id: 'himti',
    role: 'General Manager of Relation Expansion',
    org: 'HIMTI BINUS University',
    period: 'Feb 2024 – Mar 2025',
    image: asset('experience/himti.jpg'),
    points: [
      'Supervised a 154-member team across two divisions — social media content, and external media partnerships with internal bonding events.',
      'Social Media Lead for HIMTI: content development, audience interaction, and platform growth — 6,000+ on Instagram, 7,500+ on Facebook, 2,300+ on X, 1,000+ on LinkedIn, 200+ on TikTok.',
    ],
  },
  {
    id: 'gdsc',
    role: 'Core Team — Publication, Relation & Marketing',
    org: 'GDSC BINUS Malang',
    period: 'Oct 2023 – Aug 2024',
    image: asset('experience/gdsc.jpeg'),
    points: [
      'Maintained brand identity and created social media content for the GDSC BINUS Malang chapter.',
      'Engaged external partners to foster relationships and establish strategic collaborations.',
    ],
  },
];

export default function Experience() {
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
      id="experience"
      className={'xp' + (revealed ? ' is-revealed' : '')}
      ref={sectionRef}
      aria-labelledby="xp-title"
    >
      <header className="xp__intro">
        <h2 className="xp__title" id="xp-title">Experience</h2>
        <div className="xp__rule" aria-hidden="true">
          <span className="xp__rule-line" />
          <span className="xp__rule-mark" />
          <span className="xp__rule-line" />
        </div>
      </header>

      <ol className="xp__timeline">
        {ENTRIES.map((e, i) => (
          <li key={e.id} className="xp__row" style={{ '--i': i }}>
            <div className="xp__body">
              <h3 className="xp__role">{e.role}</h3>
              <p className="xp__org">{e.org}</p>
              <ul className="xp__points">
                {e.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="xp__spine" aria-hidden="true">
              <span className="xp__node" />
            </div>

            <div className="xp__media">
              <figure className="xp__crystal">
                <img src={e.image} alt={`${e.org}`} loading="lazy" draggable="false" />
                <span className="xp__facet" aria-hidden="true" />
              </figure>
              <p className="xp__period">{e.period}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
