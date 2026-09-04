import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/paths.js';
import './SkillTree.css';

/* Constellation field is authored in a 1000 x 640 coordinate space.
   Positions are a loose organic scatter — no grid, no category labels —
   with data / BI tools drifting right and languages left. */
const VIEW_W = 1000;
const VIEW_H = 640;

const SKILLS = [
  { id: 'python', name: 'Python', x: 175, y: 235 },
  { id: 'javascript', name: 'JavaScript', x: 315, y: 140 },
  { id: 'c', name: 'C', x: 120, y: 390 },
  { id: 'r', name: 'R', x: 340, y: 315 },
  { id: 'html', name: 'HTML', x: 455, y: 235 },
  { id: 'css', name: 'CSS', x: 480, y: 395 },
  { id: 'spreadsheet', name: 'Spreadsheet', x: 585, y: 505 },
  { id: 'office', name: 'Microsoft Office', x: 425, y: 545 },
  { id: 'mysql', name: 'MySQL', x: 650, y: 340 },
  { id: 'bigquery', name: 'BigQuery', x: 710, y: 190 },
  { id: 'power-bi', name: 'Power BI', x: 835, y: 300 },
  { id: 'tableau', name: 'Tableau', x: 870, y: 145 },
  { id: 'looker-studio', name: 'Looker Studio', x: 790, y: 445 },
];

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/* Edges = a minimum spanning tree (guarantees every node is connected)
   plus each node's single nearest neighbour, deduplicated. Organic web,
   no islands. Computed once at module load. */
function buildEdges(nodes) {
  const key = (i, j) => (i < j ? `${i}-${j}` : `${j}-${i}`);
  const edges = new Map();

  // Prim's MST
  const inTree = new Set([0]);
  while (inTree.size < nodes.length) {
    let best = null;
    for (const i of inTree) {
      for (let j = 0; j < nodes.length; j++) {
        if (inTree.has(j)) continue;
        const d = dist(nodes[i], nodes[j]);
        if (!best || d < best.d) best = { i, j, d };
      }
    }
    inTree.add(best.j);
    edges.set(key(best.i, best.j), [best.i, best.j]);
  }

  // Nearest neighbour per node
  for (let i = 0; i < nodes.length; i++) {
    let near = null;
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const d = dist(nodes[i], nodes[j]);
      if (!near || d < near.d) near = { j, d };
    }
    edges.set(key(i, near.j), [i, near.j]);
  }

  return [...edges.values()];
}

const EDGES = buildEdges(SKILLS);

const logoSrc = (id) => asset(`skills/${id}.png`);

/* A handful of ambient background stars — a few twinkle slowly. */
const STARS = [
  { x: 12, y: 18, size: 1.6, delay: 0 },
  { x: 22, y: 62, size: 1, delay: 1.4 },
  { x: 34, y: 30, size: 1.2, delay: 3.1 },
  { x: 44, y: 78, size: 1, delay: 2.2 },
  { x: 58, y: 14, size: 1.4, delay: 4.6 },
  { x: 63, y: 55, size: 1, delay: 0.8 },
  { x: 71, y: 82, size: 1.2, delay: 3.7 },
  { x: 82, y: 26, size: 1, delay: 1.9 },
  { x: 88, y: 66, size: 1.6, delay: 5.2 },
  { x: 50, y: 44, size: 1, delay: 2.8 },
  { x: 6, y: 44, size: 1, delay: 4.1 },
  { x: 94, y: 40, size: 1.2, delay: 0.4 },
];

export default function SkillTree() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(null); // skill id under pointer / focus

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const activeIndex = active ? SKILLS.findIndex((s) => s.id === active) : -1;

  return (
    <section
      id="skills"
      className={'skilltree' + (revealed ? ' is-revealed' : '')}
      ref={sectionRef}
      aria-labelledby="skilltree-title"
    >
      <div className="skilltree__starfield" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="skilltree__star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              '--s': s.size,
              '--d': `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <header className="skilltree__intro">
        <h2 className="skilltree__title" id="skilltree-title">
          Skill &amp; Technologies
        </h2>
        <div className="skilltree__rule" aria-hidden="true">
          <span className="skilltree__rule-line" />
          <span className="skilltree__rule-mark" />
          <span className="skilltree__rule-line" />
        </div>
        <p className="skilltree__lead">
          The tools I reach for across data analysis, engineering, and visualisation.
        </p>
      </header>

      <div className="skilltree__field">
        <svg
          className="skilltree__canvas"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g className="skilltree__rings">
            <circle cx={VIEW_W / 2} cy={VIEW_H / 2} r={150} />
            <circle cx={VIEW_W / 2} cy={VIEW_H / 2} r={260} />
            <circle cx={VIEW_W / 2} cy={VIEW_H / 2} r={370} />
          </g>

          <g className="skilltree__links">
            {EDGES.map(([a, b], i) => {
              const lit = a === activeIndex || b === activeIndex;
              return (
                <line
                  key={i}
                  className={'skilltree__link' + (lit ? ' is-lit' : '')}
                  x1={SKILLS[a].x}
                  y1={SKILLS[a].y}
                  x2={SKILLS[b].x}
                  y2={SKILLS[b].y}
                  pathLength={1}
                  style={{ '--delay': `${0.15 + i * 0.045}s` }}
                />
              );
            })}
          </g>

          <g className="skilltree__cores">
            {SKILLS.map((s) => (
              <circle
                key={s.id}
                className={'skilltree__core' + (s.id === active ? ' is-active' : '')}
                cx={s.x}
                cy={s.y}
                r={3}
              />
            ))}
          </g>
        </svg>

        <ul className="skilltree__nodes">
          {SKILLS.map((s, i) => {
            const flip = s.y < 190; // tooltip below when node sits near the top
            const align = s.x < 170 ? 'left' : s.x > 830 ? 'right' : 'center';
            return (
              <li
                key={s.id}
                className="skilltree__node"
                style={{
                  left: `${(s.x / VIEW_W) * 100}%`,
                  top: `${(s.y / VIEW_H) * 100}%`,
                  '--reveal-delay': `${0.5 + i * 0.06}s`,
                }}
              >
                <button
                  type="button"
                  className={'skilltree__hit' + (s.id === active ? ' is-active' : '')}
                  aria-label={s.name}
                  onMouseEnter={() => setActive(s.id)}
                  onMouseLeave={() => setActive((cur) => (cur === s.id ? null : cur))}
                  onFocus={() => setActive(s.id)}
                  onBlur={() => setActive((cur) => (cur === s.id ? null : cur))}
                >
                  <span className="skilltree__disc" />
                  <img
                    className="skilltree__logo"
                    src={logoSrc(s.id)}
                    alt=""
                    loading="lazy"
                    draggable="false"
                  />
                </button>

                <span
                  className={'skilltree__tip' + (s.id === active ? ' is-shown' : '')}
                  data-flip={flip ? 'down' : 'up'}
                  data-align={align}
                  role="tooltip"
                  aria-hidden={s.id !== active}
                >
                  <img
                    className="skilltree__tip-logo"
                    src={logoSrc(s.id)}
                    alt=""
                    draggable="false"
                  />
                  <span className="skilltree__tip-name">{s.name}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
