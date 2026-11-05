/**
 * Split the guided SDD template into citation chunks for the mentor.
 * Placeholders such as {{project name}} are kept as written.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sourceDir = path.join(root, 'docs', 'sdd');
const outFile = path.join(root, 'dist', 'data', 'sdd-kb.js');

const guidedFiles = ['sdd-template.md', 'view-template.md'];
const skipHeading = /^(for\s+\{\{|table of contents|revision history)/i;

let viewIndex = 0;

function citationFor(heading, fileName){
  const numbered = heading.match(/^(\d+(?:\.\d+)*)\s+(.+)$/);
  if(numbered){
    return {
      id: `sdd-${numbered[1].replace(/\./g, '-')}`,
      citation: `[SDD ${numbered[1]} ${numbered[2]}]`
    };
  }
  if(fileName.startsWith('view-')){
    viewIndex += 1;
    return { id: `sdd-view-${viewIndex}`, citation: `[SDD View: ${heading}]` };
  }
  const slug = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
  return { id: `sdd-${slug}`, citation: `[SDD ${heading}]` };
}

function splitFile(fileName){
  const text = fs.readFileSync(path.join(sourceDir, fileName), 'utf8').replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/);
  const chunks = [];
  let current = null;

  function flush(){
    if(!current || skipHeading.test(current.heading)) return;
    const body = current.body.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    if(body.length < 40) return;
    const named = citationFor(current.heading, fileName);
    const viewpoint = /^\d+\.\d+\.\d+\s+/.test(current.heading) ? 'Viewpoint: ' : '';
    chunks.push({
      id: named.id,
      label: current.heading,
      citation: named.citation,
      type: 'SDD Template',
      text: `${viewpoint}${current.heading}\n${body}`
    });
  }

  lines.forEach(line => {
    const heading = line.match(/^(#{2,4})\s+(.+?)\s*$/);
    if(heading){
      flush();
      current = { heading: heading[2].trim(), body: [] };
      return;
    }
    if(current) current.body.push(line);
  });
  flush();
  return chunks;
}

const chunks = guidedFiles.flatMap(splitFile);
const seen = new Set();
chunks.forEach(chunk => {
  if(seen.has(chunk.id)) throw new Error(`Duplicate SDD chunk id ${chunk.id}`);
  seen.add(chunk.id);
});

const payload = {
  source: 'https://github.com/jam01/SDD-Template',
  license: 'CC0-1.0',
  chunks
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `window.SDD_KB = ${JSON.stringify(payload, null, 2)};\n`);
console.log(`Wrote ${chunks.length} SDD chunks to ${path.relative(root, outFile)}`);
