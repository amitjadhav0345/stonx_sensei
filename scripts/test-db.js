/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Error: MONGODB_URI is not set in the environment.');
  console.error('Tip: Create a .env file with MONGODB_URI=your-uri-here (recommended), or on PowerShell set it temporarily:  $env:MONGODB_URI = "your-uri-here"');
  console.error('Note: If your password contains special characters (e.g., @, #, /), URL-encode them (e.g., @ becomes %40).');
  process.exit(1);
}

(async () => {
  const startedAt = Date.now();
  try {
    const conn = await mongoose.connect(uri, { bufferCommands: false });

    let pingResult = 'skipped';
    try {
      // @ts-ignore native driver admin() is available
      const r = await conn.connection.db.admin().command({ ping: 1 });
      pingResult = r?.ok === 1 ? 'ok' : 'unexpected';
    } catch {}

    const elapsedMs = Date.now() - startedAt;
    console.log(
      JSON.stringify(
        {
          ok: true,
          elapsedMs,
          readyState: conn.connection.readyState,
          dbName: conn.connection.name,
          host: conn.connection.host,
          ping: pingResult,
          env: process.env.NODE_ENV,
        },
        null,
        2
      )
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    const elapsedMs = Date.now() - startedAt;
    console.error(
      JSON.stringify(
        {
          ok: false,
          elapsedMs,
          error: err?.message || String(err),
        },
        null,
        2
      )
    );
    process.exit(2);
  }
})();
