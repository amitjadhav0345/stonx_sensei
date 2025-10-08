// Check that Node.js meets the minimum required version before install.
// This helps avoid EBADENGINE warnings/errors coming from transitive deps like @noble/*.

const REQUIRED = { major: 20, minor: 19, patch: 0 };

function parse(v) {
  const [major, minor, patch] = v.replace(/^v/, '').split('.').map(n => parseInt(n, 10));
  return { major, minor, patch };
}

function gte(a, b) {
  if (a.major !== b.major) return a.major > b.major;
  if (a.minor !== b.minor) return a.minor > b.minor;
  return a.patch >= b.patch;
}

const current = parse(process.version);
const ok = gte(current, REQUIRED);

if (!ok) {
  const cur = `${current.major}.${current.minor}.${current.patch}`;
  const req = `${REQUIRED.major}.${REQUIRED.minor}.${REQUIRED.patch}`;
  console.error(`\n[31mNode ${req}+ is required for this project.\u001b[0m`);
  console.error(`Current Node: v${cur}`);
  console.error(`\nWhy: Some dependencies (e.g. @noble/* via inngest) require Node >= ${req}.`);
  console.error(`\nFix on Windows (nvm-windows):`);
  console.error(`  1) nvm install ${req}`);
  console.error(`  2) nvm use ${req}`);
  console.error(`  3) npm install\n`);
  process.exit(1);
}