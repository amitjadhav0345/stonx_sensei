// Connectivity test for Next.js app and Inngest endpoint compatibility
// Usage: BASE_URL=http://localhost:3000 node scripts/test-inngest.mjs

const base = process.env.BASE_URL || 'http://localhost:3000';

const tests = [
  { method: 'GET', path: '/api', label: 'API root GET' },
  { method: 'GET', path: '/api/inngest', label: 'Inngest GET' },
  { method: 'PUT', path: '/api/inngest', label: 'Inngest PUT (probe)' },
  { method: 'HEAD', path: '/api/inngest', label: 'Inngest HEAD' },
  { method: 'OPTIONS', path: '/api/inngest', label: 'Inngest OPTIONS' },
  { method: 'GET', path: '/x/inngest', label: 'Rewrite: /x/inngest GET' },
  { method: 'GET', path: '/.netlify/functions/inngest', label: 'Rewrite: Netlify GET' },
  { method: 'PUT', path: '/.netlify/functions/inngest', label: 'Rewrite: Netlify PUT' },
  { method: 'GET', path: '/.redwood/functions/inngest', label: 'Rewrite: Redwood GET' },
  { method: 'PUT', path: '/.redwood/functions/inngest', label: 'Rewrite: Redwood PUT' },
];

function is2xx(status) {
  return status >= 200 && status < 300;
}

async function run() {
  console.log(`Testing connectivity against ${base}`);
  const results = [];

  for (const t of tests) {
    const url = base + t.path;
    try {
      const res = await fetch(url, {
        method: t.method,
        headers: {
          'Accept': 'text/plain,application/json,*/*',
        },
      });
      const ok = is2xx(res.status);
      results.push({ ...t, status: res.status, ok });
      console.log(`${ok ? '✓' : '✗'} ${t.label} ${t.method} ${t.path} -> ${res.status}`);
    } catch (err) {
      results.push({ ...t, status: 0, ok: false, error: String(err) });
      console.log(`✗ ${t.label} ${t.method} ${t.path} -> ERROR ${String(err)}`);
    }
  }

  const failed = results.filter(r => !r.ok);
  console.log('\nSummary:');
  console.log(`  Passed: ${results.length - failed.length}/${results.length}`);
  if (failed.length) {
    console.log('  Failures:');
    for (const f of failed) {
      console.log(`   - ${f.label} ${f.method} ${f.path} -> ${f.status || f.error}`);
    }
    console.log('\nHint: Ensure Next.js dev server is running (npm run dev), then re-run this test.');
    process.exit(1);
  } else {
    console.log('  All connectivity checks returned 2xx. Inngest endpoint and rewrites are reachable.');
  }
}

run();