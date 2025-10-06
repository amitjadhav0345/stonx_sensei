import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/database/mongoose';

export async function GET() {
  const startedAt = Date.now();
  try {
    const conn = await connectToDatabase();

    let pingResult: unknown = null;
    try {
      // Try a low-cost ping to verify the connection is usable
      // @ts-ignore - admin() exists on the native MongoDB driver
      pingResult = await conn.connection.db.admin().command({ ping: 1 });
    } catch {
      // If ping is not available (e.g., during unit tests), ignore
      pingResult = 'skipped';
    }

    const elapsedMs = Date.now() - startedAt;
    const safeInfo = {
      ok: true as const,
      elapsedMs,
      // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      readyState: conn.connection.readyState,
      dbName: conn.connection.name,
      host: (conn.connection as any).host ?? undefined,
      ping: typeof pingResult === 'object' ? 'ok' : String(pingResult),
      env: process.env.NODE_ENV,
    };

    return NextResponse.json(safeInfo, { status: 200 });
  } catch (err: any) {
    const elapsedMs = Date.now() - startedAt;
    return NextResponse.json(
      {
        ok: false,
        elapsedMs,
        error: err?.message ?? 'Unknown error',
      },
      { status: 500 }
    );
  }
}
