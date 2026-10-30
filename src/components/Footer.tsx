import { portfolio } from "@/data/portfolio";
import { ArrowUp } from "./Icons";

const links = [
  ["Home", "#home"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

export function Footer() {
  return (
    <footer className="border-t border-line/15 bg-surface/50">
      <div className="wrap flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{portfolio.name}</p>
          <p className="mt-1 text-sm text-muted">{portfolio.title} · {portfolio.location}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {links.map(([label, href]) => (
              <li key={href}><a href={href} className="transition-colors hover:text-text">{label}</a></li>
            ))}
          </ul>
        </nav>
        <a href="#home" aria-label="Back to top" className="btn btn-ghost !min-h-10 self-start !px-3.5 md:self-auto">
          Top <ArrowUp className="h-4 w-4" />
        </a>
      </div>
      <div className="border-t border-line/10">
        <p className="wrap py-4 text-xs text-muted">© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
