import { useEffect, useRef, useState } from 'react';
import portrait from '../assets/Aufa_PP.jpg';
import './ProfileSection.css';

// Left panel links.
const LINKS = [
  { label: 'RESUME (CV)', href: '/Aufa-Ekananda-Resume.pdf', download: true },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/aufa-ekananda/' },
  { label: 'GITHUB', href: 'https://github.com/AufaNanda' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/aufaekananda/' },
];

const TRAITS = [
  { label: 'Name', options: ['Aufa Ekananda'] },
  { label: 'Major', options: ['Computer Science'] },
  { label: 'GPA', options: ['3.66'] },
  {
    label: 'Role Opportunities',
    options: [
      'Data Analyst',
      'Data Scientist',
      'Business Intelligence',
      'AI Engineer',
      'Data Engineer',
    ],
  },
];

export default function ProfileSection() {
  const [traitIndex, setTraitIndex] = useState(() => TRAITS.map(() => 0));
  const sceneRef = useRef(null);

  const cycleTrait = (row, dir) => {
    setTraitIndex((prev) => {
      const next = [...prev];
      const len = TRAITS[row].options.length;
      next[row] = (next[row] + dir + len) % len;
      return next;
    });
  };

  // Soft pointer parallax — a few pixels of drift, nothing more.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty('--px', x.toFixed(3));
        el.style.setProperty('--py', y.toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="profile" className="profile" ref={sceneRef}>
      <div className="profile__bg" aria-hidden="true">
        <span className="profile__bokeh profile__bokeh--1" />
        <span className="profile__bokeh profile__bokeh--2" />
        <span className="profile__bokeh profile__bokeh--3" />
        <div className="profile__vignette" />
        <div className="profile__grain" />
      </div>

      <div className="profile__portrait-wrap" aria-hidden="true">
        <div className="profile__rimlight" />
        <img className="profile__portrait" src={portrait} alt="" draggable="false" />
        <div className="profile__portrait-blend" />
      </div>

      <div className="profile__layout">
        <div className="panel panel--left">
          <div className="panel__head">
            <span className="panel__title">PROFILE:</span>
            <span className="panel__line" />
          </div>
          <ul className="role-list">
            {LINKS.map((link, i) => (
              <li key={link.label} className="role-list__item" style={{ '--i': i }}>
                <a
                  className="role-list__btn"
                  href={link.href}
                  {...(link.download
                    ? { download: '' }
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="role-list__caret">▶</span>
                  <span className="role-list__label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel panel--right">
          <div className="panel__head panel__head--right">
            <span className="panel__title panel__title--name">AUFA</span>
            <span className="panel__line" />
          </div>

          <div className="traits">
            {TRAITS.map((trait, row) => {
              const value = trait.options[traitIndex[row]];
              const cyclable = trait.options.length > 1;
              return (
                <div className="trait" key={trait.label} style={{ '--i': row }}>
                  <p className="trait__label">{trait.label}</p>
                  <div className="trait__control">
                    {cyclable && (
                      <button
                        type="button"
                        className="trait__arrow"
                        aria-label={`Previous option for ${trait.label}`}
                        onClick={() => cycleTrait(row, -1)}
                      >
                        &lsaquo;
                      </button>
                    )}
                    <span className="trait__value" key={value}>
                      {value}
                    </span>
                    {cyclable && (
                      <button
                        type="button"
                        className="trait__arrow"
                        aria-label={`Next option for ${trait.label}`}
                        onClick={() => cycleTrait(row, 1)}
                      >
                        &rsaquo;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="profile__signature">Aufa.</div>

      <div className="profile__footbar">
        <span className="profile__footbar-spacer" aria-hidden="true" />
        <div className="foot-center">
          <button type="button" className="foot-arrow" aria-hidden="true" tabIndex={-1}>
            &lsaquo;
          </button>
          <span className="foot-hint">ORIGINAL</span>
          <button type="button" className="foot-arrow" aria-hidden="true" tabIndex={-1}>
            &rsaquo;
          </button>
        </div>
      </div>
    </section>
  );
}
