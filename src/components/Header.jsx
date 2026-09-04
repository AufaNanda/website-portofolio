import './Header.css';

const NAV = ['Profile', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'];

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#profile">
          <span className="site-header__bracket">[</span>
          <span className="site-header__name">AUFA</span>
          <span className="site-header__bracket">]</span>
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          {NAV.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="site-header__link"
              style={{ '--i': i }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      <div className="site-header__rule" />
    </header>
  );
}
