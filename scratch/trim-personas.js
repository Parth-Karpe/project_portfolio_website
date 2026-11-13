const fs = require('fs');
const p = 'D:/5sem/Lab/hobby/project/project_portfolio_website/dist/portfolio-rag.js';
let s = fs.readFileSync(p, 'utf8');
const start = s.indexOf('  function themeProfiles(){');
const end = s.indexOf('  const STAGE0_BANK');
if (start < 0 || end < 0 || end < start) throw new Error('theme block bounds ' + start + ' ' + end);
s = s.slice(0, start) + s.slice(end);

function cutPersona(source, name) {
  const marker = "    '" + name + "': {";
  let from = 0;
  let count = 0;
  while (true) {
    const at = source.indexOf(marker, from);
    if (at < 0) break;
    let i = at + marker.length - 1;
    let depth = 0;
    for (; i < source.length; i++) {
      if (source[i] === '{') depth++;
      else if (source[i] === '}') {
        depth--;
        if (depth === 0) {
          i++;
          break;
        }
      }
    }
    if (source[i] === ',') i++;
    if (source[i] === '\n') i++;
    source = source.slice(0, at) + source.slice(i);
    count++;
    from = at;
  }
  if (count !== 2) throw new Error(name + ' removed ' + count);
  return source;
}

s = cutPersona(s, 'Faculty Expertise');
s = s.replace("\n    'Theme-Based Expertise': themeStage0Persona()", '');
s = s.replace("\n    'Theme-Based Expertise': themeStage1Persona()", '');

const themeStart = s.indexOf("    const themeNote = persona === 'Theme-Based Expertise'");
const themeEnd = s.indexOf("    return {", themeStart);
if (themeStart < 0 || themeEnd < 0) throw new Error('theme note missing ' + themeStart + ' ' + themeEnd);
s = s.slice(0, themeStart)
  + "    const themeNote = 'Use this project text for the options. Do not invent a feature, identifier, target, or result that the text does not support.';\n"
  + s.slice(themeEnd);

if (/Faculty Expertise|Theme-Based Expertise|themeStage0Persona|function themeProfiles/.test(s)) {
  throw new Error('leftover persona');
}
fs.writeFileSync(p, s);
console.log('ok', s.length);
