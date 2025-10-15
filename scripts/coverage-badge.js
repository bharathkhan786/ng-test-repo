const fs = require('fs');
const path = require('path');

function readSummary() {
  const summaryPath = path.join(__dirname, '..', 'coverage', 'jest', 'coverage-summary.json');
  if (!fs.existsSync(summaryPath)) {
    console.error('coverage-summary.json not found at', summaryPath);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
}

function percent(p) {
  return typeof p === 'number' ? Math.round(p) : 0;
}

function makeBadge(label, value, color) {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='20'>\n` +
    `<linearGradient id='b' x2='0' y2='100%'><stop offset='0' stop-color='#bbb' stop-opacity='.1'/><stop offset='1' stop-opacity='.1'/></linearGradient>` +
    `<mask id='a'><rect width='160' height='20' rx='3' fill='#fff'/></mask>` +
    `<g mask='url(#a)'><rect width='80' height='20' fill='#555'/><rect x='80' width='80' height='20' fill='${color}'/><rect width='160' height='20' fill='url(#b)'/></g>` +
    `<g font-family='Verdana,Geneva,DejaVu Sans,sans-serif' font-size='11' text-anchor='middle'>` +
    `<text x='40' y='15' fill='#fff'>${label}</text><text x='120' y='15' fill='#fff'>${value}</text>` +
    `</g></svg>`;
}

function colorFor(pct) {
  if (pct >= 90) return '#4c1';
  if (pct >= 75) return '#97CA00';
  if (pct >= 60) return '#dfb317';
  return '#e05d44';
}

function main() {
  const summary = readSummary();
  const total = summary.total;
  const statements = percent(total.statements.pct);
  const lines = percent(total.lines.pct);
  const branches = percent(total.branches.pct);
  const functions = percent(total.functions.pct);
  const badgeSvg = makeBadge('coverage', `${statements}% stm / ${lines}% ln`, colorFor(statements));
  const outDir = path.join(__dirname, '..', 'coverage');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'coverage-badge.svg'), badgeSvg, 'utf8');
  console.log('Badge written to coverage/coverage-badge.svg');
  console.log(`Statements: ${statements}%, Lines: ${lines}%, Branches: ${branches}%, Functions: ${functions}%`);
}

main();
