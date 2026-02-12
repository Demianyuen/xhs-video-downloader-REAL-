/**
 * User Management System
 * Handles user registration, login, and profile management
 */

export interface UserProfile {
  userId: string;
  email: string;
  username: string;
  createdAt: number;
  lastLogin: number;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}

// In-memory user storage (replace with database in production)
export const users = new Map<string, UserProfile>();

/**
 * Generate user ID
 */
export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create user account
 */
export function createUser(email: string, username: string): UserProfile {
  const userId = generateUserId();
  const user: UserProfile = {
    userId,
    email,
    username,
    createdAt: Date.now(),
    lastLogin: Date.now(),
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: true,
    },
  };

  users.set(userId, user);
  return user;
}

/**
 * Get user by ID
 */
export function getUser(userId: string): UserProfile | null {
  return users.get(userId) || null;
}

/**
 * Get user by email
 */
export function getUserByEmail(email: string): UserProfile | null {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * Update user profile
 */
export function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): UserProfile | null {
  const user = getUser(userId);
  if (!user) return null;

  Object.assign(user, updates);
  return user;
}

/**
 * Update user preferences
 */
export function updateUserPreferences(
  userId: string,
  preferences: Partial<UserProfile['preferences']>
): UserProfile | null {
  const user = getUser(userId);
  if (!user) return null;

  user.preferences = { ...user.preferences, ...preferences };
  return user;
}

/**
 * Update last login
 */
export function updateLastLogin(userId: string): UserProfile | null {
  const user = getUser(userId);
  if (!user) return null;

  user.lastLogin = Date.now();
  return user;
}

/**
 * Delete user account
 */
export function deleteUser(userId: string): boolean {
  return users.delete(userId);
}

/**
 * Check if email exists
 */
export function emailExists(email: string): boolean {
  return getUserByEmail(email) !== null;
}

/**
 * Check if username exists
 */
export function usernameExists(username: string): boolean {
  for (const user of users.values()) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
}
