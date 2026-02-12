/**
 * Session Management System
 * Tracks download sessions and user activity
 */

import { logger } from './logger';

export interface Session {
  id: string;
  url: string;
  videoUrl?: string;
  metadata?: {
    title: string;
    author: string;
    type: string;
  };
  status: 'pending' | 'downloading' | 'ready' | 'completed' | 'failed';
  createdAt: number;
  completedAt?: number;
  ipAddress: string;
  userAgent?: string;
  error?: string;
}

class SessionManager {
  private sessions: Map<string, Session> = new Map();
  private readonly SESSION_TIMEOUT = 3600000; // 1 hour

  /**
   * Create a new session
   */
  create(url: string, ipAddress: string, userAgent?: string): Session {
    const sessionId = this.generateSessionId();
    const session: Session = {
      id: sessionId,
      url,
      status: 'pending',
      createdAt: Date.now(),
      ipAddress,
      userAgent,
    };

    this.sessions.set(sessionId, session);
    logger.info('Session created', { sessionId, url, ipAddress });

    return session;
  }

  /**
   * Update session status
   */
  update(
    id: string,
    updates: Partial<Session>
  ): Session | null {
    const session = this.sessions.get(id);
    if (!session) {
      logger.warn('Session not found for update', { id });
      return null;
    }

    const updated = { ...session, ...updates };
    this.sessions.set(id, updated);

    logger.debug('Session updated', {
      sessionId: id,
      status: updated.status,
    });

    return updated;
  }

  /**
   * Get session by ID
   */
  get(id: string): Session | null {
    return this.sessions.get(id) || null;
  }

  /**
   * Get all active sessions
   */
  list(): Session[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Get sessions by status
   */
  getByStatus(status: Session['status']): Session[] {
    return Array.from(this.sessions.values()).filter(
      (s) => s.status === status
    );
  }

  /**
   * Get sessions by IP address
   */
  getByIp(ipAddress: string): Session[] {
    return Array.from(this.sessions.values()).filter(
      (s) => s.ipAddress === ipAddress
    );
  }

  /**
   * Delete session
   */
  delete(id: string): boolean {
    const deleted = this.sessions.delete(id);
    if (deleted) {
      logger.debug('Session deleted', { sessionId: id });
    }
    return deleted;
  }

  /**
   * Clean up expired sessions
   */
  cleanup(): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [id, session] of this.sessions.entries()) {
      if (now - session.createdAt > this.SESSION_TIMEOUT) {
        this.sessions.delete(id);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.info('Sessions cleaned up', { count: cleaned });
    }

    return cleaned;
  }

  /**
   * Get session statistics
   */
  getStats() {
    const sessions = Array.from(this.sessions.values());
    const statuses = {
      pending: sessions.filter((s) => s.status === 'pending').length,
      downloading: sessions.filter((s) => s.status === 'downloading').length,
      ready: sessions.filter((s) => s.status === 'ready').length,
      completed: sessions.filter((s) => s.status === 'completed').length,
      failed: sessions.filter((s) => s.status === 'failed').length,
    };

    return {
      total: sessions.length,
      statuses,
      avgDuration:
        sessions.length > 0
          ? sessions.reduce((sum, s) => {
              const duration = (s.completedAt || Date.now()) - s.createdAt;
              return sum + duration;
            }, 0) / sessions.length
          : 0,
    };
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}_${random}`;
  }

  /**
   * Clear all sessions (for testing)
   */
  clear(): void {
    this.sessions.clear();
    logger.warn('All sessions cleared');
  }
}

export const sessionManager = new SessionManager();

// Cleanup expired sessions every 5 minutes
setInterval(() => {
  sessionManager.cleanup();
}, 5 * 60 * 1000);
