const fs = require('fs');
const path = require('path');

function CoverageJsonWriter(baseReporterDecorator) {
  baseReporterDecorator(this);
  let coverageMap = {};

  this.onBrowserComplete = function (browser, result) {
    if (result && result.coverage) {
      coverageMap[browser.name] = result.coverage;
    }
  };

  this.onRunComplete = function () {
    const merged = Object.values(coverageMap)[0] || {};
    const outDir = path.join(__dirname, 'coverage');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'coverage-final.json'), JSON.stringify(merged), 'utf8');
  };
}

CoverageJsonWriter.$inject = ['baseReporterDecorator'];

module.exports = {
  'reporter:coverage-json-writer': ['type', CoverageJsonWriter]
};
