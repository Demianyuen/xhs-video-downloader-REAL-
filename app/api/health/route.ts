import { NextResponse } from 'next/server';

const SERVER_START_TIME = Date.now();

export async function GET() {
  const uptime = Date.now() - SERVER_START_TIME;
  const mem = process.memoryUsage();

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: {
      ms: uptime,
      minutes: Math.floor(uptime / 60000),
    },
    memory: {
      heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
      heapTotalMB: Math.round(mem.heapTotal / 1024 / 1024),
    },
    node: process.version,
  });
}
