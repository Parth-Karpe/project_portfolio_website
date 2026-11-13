const fs = require('fs');
const live = fs.readFileSync('scratch/live-index.html', 'utf8');
const local = fs.readFileSync('dist/index.html', 'utf8');
const pick = (s) => (s.match(/[a-z_.-]+\.(js|css)\?v=[^"']+/gi) || []).filter((x) => /portfolio-rag|department|style\.css|ai-settings/.test(x));
console.log('LIVE:', pick(live).join('\n'));
console.log('LOCAL:', pick(local).join('\n'));
