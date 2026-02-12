/**
 * Health Check Endpoint
 * Returns system status and metrics
 */

import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { sessionManager } from '@/lib/session-manager';
import { userManager } from '@/lib/user-manager';
import os from 'os';

const SERVER_START_TIME = Date.now();

export async function GET() {
  try {
    const uptime = Date.now() - SERVER_START_TIME;
    const sessionStats = sessionManager.getStats();
    const userStats = userManager.getStats();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    const health = {
      status: 'ok' as const,
      timestamp: new Date().toISOString(),
      uptime: {
        ms: uptime,
        seconds: Math.floor(uptime / 1000),
        minutes: Math.floor(uptime / 60000),
        hours: Math.floor(uptime / 3600000),
      },
      sessions: sessionStats,
      users: userStats,
      memory: {
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        external: Math.round(memoryUsage.external / 1024 / 1024), // MB
        rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system,
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        totalMemory: Math.round(os.totalmem() / 1024 / 1024), // MB
        freeMemory: Math.round(os.freemem() / 1024 / 1024), // MB
      },
      node: {
        version: process.version,
        env: process.env.NODE_ENV,
      },
    };

    logger.debug('Health check', health);

    return NextResponse.json(health);
  } catch (error) {
    logger.error('Health check failed', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
