const fs = require('fs');
const baseCss = fs.readFileSync('dist/style.css', 'utf8');
const fonts = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">'
].join('\n');

const extraCss = `
/* === ProjectGate GAS Additions: Lightbox, Role Strip, Table Builder, Evidence === */
.role-switcher-select {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.08);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}
.role-switcher-select option { color: #0f172a; background: #fff; }
.gas-badge-cloud {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  background: rgba(16,185,129,0.14);
  color: #047857;
  border: 1px solid rgba(16,185,129,0.28);
}
[data-theme='dark'] .gas-badge-cloud {
  color: #34d399;
  background: rgba(16,185,129,0.18);
}
.diagram-lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 23, 42, 0.92);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.diagram-lightbox.open { display: flex; }
.diagram-lightbox-toolbar {
  position: fixed;
  top: 16px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 205;
}
.diagram-lightbox-toolbar button {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: 8px;
  padding: 7px 12px;
  cursor: pointer;
  font-weight: 600;
}
.diagram-lightbox-toolbar button:hover { background: rgba(255,255,255,0.28); }
.diagram-lightbox-stage {
  max-width: 94vw;
  max-height: 82vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.diagram-lightbox-stage img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 10px;
  background: #fff;
  transition: transform 0.18s ease;
}
.diagram-lightbox-caption {
  margin-top: 12px;
  color: #e2e8f0;
  font-size: 0.92rem;
  text-align: center;
  max-width: 820px;
}
.stage-table-editor {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px;
  background: var(--surface-2, #f8fafc);
  margin-bottom: 14px;
}
.stage-table-editor-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
}
.stage-table-row {
  display: grid;
  gap: 8px;
  margin-bottom: 8px;
  align-items: start;
}
.stage-table-row input, .stage-table-row textarea, .stage-table-row select {
  width: 100%;
  padding: 7px 9px;
  border-radius: 7px;
  border: 1px solid var(--line);
  background: var(--surface, #fff);
  color: var(--ink);
  font-size: 0.88rem;
}
.evidence-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  margin-top: 12px;
}
.evidence-card {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
  background: var(--surface, #fff);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.evidence-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  background: #f1f5f9;
  cursor: zoom-in;
}
`;

const out = fonts + '\n<style>\n' + baseCss + '\n' + extraCss + '\n</style>\n';
fs.writeFileSync('google_sites_apps_script/styles.html', out);
console.log('Wrote google_sites_apps_script/styles.html:', out.length, 'bytes');
