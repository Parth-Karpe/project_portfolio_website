const fs = require('fs');
const p = 'D:/5sem/Lab/hobby/project/project_portfolio_website/dist/index.html';
let s = fs.readFileSync(p, 'utf8');
const m = s.match(/portfolio-rag\.js\?v=[^"']+/);
console.log('before', m && m[0]);
if (m) {
  s = s.replace(m[0], 'portfolio-rag.js?v=three-personas-2');
  fs.writeFileSync(p, s);
  console.log('after portfolio-rag.js?v=three-personas-2');
}
const d = s.match(/department\.js\?v=[^"']+/);
console.log('department', d && d[0]);
