/**
 * Prefix a path to a file in `public/` with Vite's configured base URL, so
 * it still resolves once the site is deployed under a sub-path (GitHub
 * Pages project sites, e.g. /website-portofolio/, aren't served from `/`).
 *
 * Always use this instead of a hardcoded "/xxx" string for anything that
 * lives in `public/` — Vite does not rewrite those automatically.
 */
export function asset(path) {
  const base = import.meta.env.BASE_URL; // always ends with '/'
  return base + String(path).replace(/^\/+/, '');
}
