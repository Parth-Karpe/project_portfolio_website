# Changelog

## Pastel visual redesign

Visual restyle only. Roles, forms, imports, and click handlers are unchanged.

### Files
- `dist/style.css` — Nunito, pastel tokens, top bar, cards, tables, portfolio, and responsive rules. Existing class names and variables still resolve.
- `dist/faculty.css` — visual overrides removed. Drawer, diagram lightbox, and chat type sizing remain.
- `dist/projector.css` — color and type overrides removed so the pastel system is the one that shows.
- `dist/index.html` — `viewport-fit=cover` and stylesheet cache bump.
- `dist/workspace.js` — top bar (logo, nav pills, year tag, role select), page frame, footer with Reset demo, portfolio sections stay visible, scroll spy.
- `dist/department.js` — department greeting, theme chips, searchable project cards, richer member cards.
- `dist/app.js` — sentence-case workspace label; broken images become a dashed placeholder.
- `dist/projector.js` — stops forcing all-caps stage labels, hiding portfolio sections, and removing the dashboard subtitle.
- `dist/faculty.js` — stops enlarging small inline type on the new cards.

### Classes added
`topbar-inner`, `app-nav`, `nav-pill`, `role-select`, `ay-tag`, `page-frame`, `page-column`, `theme-chip`, `project-card`, `project-card-grid`, `project-card-top`, `guide-row`, `student-row`, `student-chip`, `member-top`, `member-usn`, `member-skills`, `img-fallback`, `pastel-mint`, `pastel-lilac`, `pastel-peach`.

No existing class names were renamed.
