/**
 * Centralized Logging System
 * Logs all API requests, errors, and debug information
 */

import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, `app-${new Date().toISOString().split('T')[0]}.log`);

// Ensure logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'ERROR' | 'DEBUG' | 'WARN';
  message: string;
  data?: any;
  stack?: string;
}

function formatLogEntry(entry: LogEntry): string {
  const { timestamp, level, message, data, stack } = entry;
  let log = `[${timestamp}] [${level}] ${message}`;

  if (data) {
    log += ` | ${JSON.stringify(data)}`;
  }

  if (stack) {
    log += `\n${stack}`;
  }

  return log;
}

function writeToFile(entry: LogEntry): void {
  try {
    const logLine = formatLogEntry(entry) + '\n';
    fs.appendFileSync(LOG_FILE, logLine, 'utf-8');
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
}

export const logger = {
  info: (message: string, data?: any) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      data,
    };
    console.log(formatLogEntry(entry));
    writeToFile(entry);
  },

  error: (message: string, error?: any) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      data: error?.message || error,
      stack: error?.stack,
    };
    console.error(formatLogEntry(entry));
    writeToFile(entry);
  },

  debug: (message: string, data?: any) => {
    if (process.env.DEBUG === 'true') {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'DEBUG',
        message,
        data,
      };
      console.log(formatLogEntry(entry));
      writeToFile(entry);
    }
  },

  warn: (message: string, data?: any) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      message,
      data,
    };
    console.warn(formatLogEntry(entry));
    writeToFile(entry);
  },

  getLogFile: () => LOG_FILE,
  getLogDir: () => LOG_DIR,
};
