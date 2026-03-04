# XHS Video Downloader - Technical Architecture

## System Architecture Overview

This document provides a comprehensive technical architecture guide for the XHS Video Downloader project, covering system design, API specifications, database schema, and deployment architecture.

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Web Browser (React 18 + Next.js 14)                │   │
│  │  - Homepage                                          │   │
│  │  - Download Form                                     │   │
│  │  - Blog Pages                                        │   │
│  │  - User Dashboard (Premium)                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway Layer                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js API Routes (TypeScript)                     │   │
│  │  - /api/download                                     │   │
│  │  - /api/metadata                                     │   │
│  │  - /api/auth                                         │   │
│  │  - /api/subscription                                 │   │
│  │  - /api/analytics                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Middleware                                          │   │
│  │  - Rate Limiting                                     │   │
│  │  - Authentication                                    │   │
│  │  - Error Handling                                    │   │
│  │  - Logging                                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Business Logic Layer                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Core Services                                       │   │
│  │  - Video Extraction Service                          │   │
│  │  - XHS API Integration                               │   │
│  │  - Download Manager                                  │   │
│  │  - User Service                                      │   │
│  │  - Subscription Service                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database (PostgreSQL)                               │   │
│  │  - Users                                             │   │
│  │  - Subscriptions                                     │   │
│  │  - Downloads                                         │   │
│  │  - Analytics                                         │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Cache Layer (Redis)                                 │   │
│  │  - Rate Limit Counters                               │   │
│  │  - Session Data                                      │   │
│  │  - Video Metadata Cache                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                External Services                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  XHS API                                             │   │
│  │  - Video Metadata                                    │   │
│  │  - Download URLs                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Payment Processing (Stripe)                         │   │
│  │  - Subscription Management                           │   │
│  │  - Billing                                           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Analytics (Google Analytics)                        │   │
│  │  - User Tracking                                     │   │
│  │  - Conversion Tracking                               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack Details

### Frontend Stack

**Framework & Libraries**:
```typescript
// Next.js 14 with App Router
import { NextRequest, NextResponse } from 'next/server';

// React 18 with Hooks
import { useState, useEffect, useCallback } from 'react';

// TypeScript for type safety
interface DownloadRequest {
  url: string;
  format: 'mp4' | 'webm';
  quality: '720p' | '1080p';
}

// Tailwind CSS for styling
import clsx from 'clsx';
```

**Key Dependencies**:
- `next`: 14.x - Framework
- `react`: 18.x - UI library
- `typescript`: 5.x - Type safety
- `tailwindcss`: 3.x - Styling
- `axios`: HTTP client
- `react-query`: Data fetching
- `zustand`: State management
- `stripe-js`: Payment integration

### Backend Stack

**Runtime & Framework**:
- Node.js 18+
- Next.js 14 API Routes
- TypeScript 5.x

**Key Dependencies**:
- `axios`: HTTP requests to XHS API
- `stripe`: Payment processing
- `jsonwebtoken`: Authentication
- `bcryptjs`: Password hashing
- `dotenv`: Environment variables
- `cors`: CORS handling
- `helmet`: Security headers

### Database & Cache

**Primary Database**:
- PostgreSQL 14+
- ORM: Prisma or TypeORM

**Cache Layer**:
- Redis 7.x
- Session storage
- Rate limit counters
- Video metadata cache

### Deployment

**Hosting**:
- Vercel (Next.js optimized)
- Serverless functions
- Edge functions for low latency

**CDN**:
- Vercel Edge Network
- Image optimization
- Static asset caching

---

## API Architecture

### API Endpoints

#### 1. Download Endpoint

**Endpoint**: `POST /api/download`

**Request**:
```typescript
interface DownloadRequest {
  url: string;           // XHS video URL
  format?: 'mp4' | 'webm';  // Video format
  quality?: '720p' | '1080p'; // Video quality
  userId?: string;       // Optional user ID for tracking
}
```

**Response**:
```typescript
interface DownloadResponse {
  success: boolean;
  data?: {
    videoUrl: string;    // Direct download URL
    title: string;       // Video title
    duration: number;    // Duration in seconds
    size: number;        // File size in bytes
    thumbnail: string;   // Thumbnail URL
    uploadedAt: string;  // Upload date
  };
  error?: {
    code: string;
    message: string;
    retryAfter?: number; // For rate limit errors
  };
}
```

**Implementation**:
```typescript
// app/api/download/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, format = 'mp4', quality = '1080p' } = body;

    // Validate URL
    if (!isValidXhsUrl(url)) {
      return NextResponse.json(
        { error: { code: 'INVALID_URL', message: 'Invalid XHS URL' } },
        { status: 400 }
      );
    }

    // Extract video ID
    const videoId = extractVideoId(url);

    // Fetch video metadata
    const metadata = await fetchVideoMetadata(videoId);

    // Get download URL
    const downloadUrl = await getDownloadUrl(videoId, format, quality);

    // Log download
    await logDownload(videoId, request.ip);

    return NextResponse.json({
      success: true,
      data: {
        videoUrl: downloadUrl,
        title: metadata.title,
        duration: metadata.duration,
        size: metadata.size,
        thumbnail: metadata.thumbnail,
        uploadedAt: metadata.uploadedAt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
```

#### 2. Metadata Endpoint

**Endpoint**: `GET /api/metadata?url={url}`

**Response**:
```typescript
interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
  uploadedAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}
```

#### 3. Authentication Endpoints

**Endpoint**: `POST /api/auth/register`

**Request**:
```typescript
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}
```

**Endpoint**: `POST /api/auth/login`

**Request**:
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**Response**:
```typescript
interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    isPremium: boolean;
  };
}
```

#### 4. Subscription Endpoints

**Endpoint**: `POST /api/subscription/create`

**Request**:
```typescript
interface SubscriptionRequest {
  priceId: string;  // Stripe price ID
  paymentMethodId: string;
}
```

**Endpoint**: `GET /api/subscription/status`

**Response**:
```typescript
interface SubscriptionStatus {
  active: boolean;
  plan: 'free' | 'premium';
  renewalDate?: string;
  cancelledAt?: string;
}
```

#### 5. Analytics Endpoints

**Endpoint**: `POST /api/analytics/track`

**Request**:
```typescript
interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
}
```

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  avatar_url VARCHAR(255),
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### Subscriptions Table

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  plan VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
```

### Downloads Table

```sql
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  video_id VARCHAR(255) NOT NULL,
  video_title VARCHAR(255),
  video_url VARCHAR(255),
  format VARCHAR(50),
  quality VARCHAR(50),
  file_size BIGINT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_downloads_user_id ON downloads(user_id);
CREATE INDEX idx_downloads_video_id ON downloads(video_id);
CREATE INDEX idx_downloads_created_at ON downloads(created_at);
```

### Rate Limits Table

```sql
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address VARCHAR(45) NOT NULL,
  user_id UUID REFERENCES users(id),
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  window_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rate_limits_ip ON rate_limits(ip_address);
CREATE INDEX idx_rate_limits_user_id ON rate_limits(user_id);
```

### Analytics Table

```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  event_name VARCHAR(255) NOT NULL,
  event_properties JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);
```

---

## Service Architecture

### Video Extraction Service

```typescript
// lib/services/VideoExtractionService.ts

class VideoExtractionService {
  /**
   * Extract video ID from XHS URL
   */
  static extractVideoId(url: string): string {
    const patterns = [
      /explore\/([a-zA-Z0-9]+)/,
      /video\/([a-zA-Z0-9]+)/,
      /([a-zA-Z0-9]+)$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    throw new Error('Invalid XHS URL');
  }

  /**
   * Fetch video metadata from XHS API
   */
  static async fetchMetadata(videoId: string): Promise<VideoMetadata> {
    const cacheKey = `video:${videoId}`;

    // Check cache first
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    // Fetch from XHS API
    const response = await axios.get(
      `https://api.xiaohongshu.com/video/${videoId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.XHS_API_KEY}`,
        },
      }
    );

    const metadata = response.data;

    // Cache for 1 hour
    await redis.setex(cacheKey, 3600, JSON.stringify(metadata));

    return metadata;
  }

  /**
   * Get download URL for video
   */
  static async getDownloadUrl(
    videoId: string,
    format: string,
    quality: string
  ): Promise<string> {
    const metadata = await this.fetchMetadata(videoId);

    // Find matching quality
    const video = metadata.videos.find(
      (v: any) => v.quality === quality && v.format === format
    );

    if (!video) {
      throw new Error(`Video not available in ${quality} ${format}`);
    }

    return video.downloadUrl;
  }
}
```

### Rate Limiting Service

```typescript
// lib/services/RateLimitService.ts

class RateLimitService {
  private static readonly LIMITS = {
    perIp: { requests: 30, window: 60 }, // 30 req/min
    perUser: { requests: 100, window: 3600 }, // 100 req/hour
    global: { requests: 10000, window: 3600 }, // 10k req/hour
  };

  /**
   * Check if request should be rate limited
   */
  static async checkLimit(
    ip: string,
    userId?: string
  ): Promise<{ allowed: boolean; retryAfter?: number }> {
    const now = Date.now();

    // Check IP-based limit
    const ipKey = `ratelimit:ip:${ip}`;
    const ipCount = await redis.incr(ipKey);

    if (ipCount === 1) {
      await redis.expire(ipKey, this.LIMITS.perIp.window);
    }

    if (ipCount > this.LIMITS.perIp.requests) {
      const ttl = await redis.ttl(ipKey);
      return { allowed: false, retryAfter: ttl };
    }

    // Check user-based limit if authenticated
    if (userId) {
      const userKey = `ratelimit:user:${userId}`;
      const userCount = await redis.incr(userKey);

      if (userCount === 1) {
        await redis.expire(userKey, this.LIMITS.perUser.window);
      }

      if (userCount > this.LIMITS.perUser.requests) {
        const ttl = await redis.ttl(userKey);
        return { allowed: false, retryAfter: ttl };
      }
    }

    return { allowed: true };
  }
}
```

### Authentication Service

```typescript
// lib/services/AuthService.ts

class AuthService {
  /**
   * Register new user
   */
  static async register(
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    // Check if user exists
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        name,
      },
    });

    return user;
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<string> {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return token;
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): { userId: string; email: string } {
    return jwt.verify(token, process.env.JWT_SECRET!) as any;
  }
}
```

### Subscription Service

```typescript
// lib/services/SubscriptionService.ts

class SubscriptionService {
  /**
   * Create subscription
   */
  static async createSubscription(
    userId: string,
    priceId: string,
    paymentMethodId: string
  ): Promise<Subscription> {
    // Get or create Stripe customer
    let customer = await db.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    if (!customer?.stripeCustomerId) {
      const user = await db.user.findUnique({ where: { id: userId } });
      const stripeCustomer = await stripe.customers.create({
        email: user!.email,
        metadata: { userId },
      });

      await db.user.update({
        where: { id: userId },
        data: { stripeCustomerId: stripeCustomer.id },
      });

      customer = { stripeCustomerId: stripeCustomer.id };
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.stripeCustomerId,
      items: [{ price: priceId }],
      payment_method: paymentMethodId,
      default_payment_method: paymentMethodId,
      off_session: true,
    });

    // Save to database
    return await db.subscription.create({
      data: {
        userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customer.stripeCustomerId,
        plan: 'premium',
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(userId: string): Promise<void> {
    const subscription = await db.subscription.findFirst({
      where: { userId, status: 'active' },
    });

    if (!subscription) {
      throw new Error('No active subscription');
    }

    await stripe.subscriptions.del(subscription.stripeSubscriptionId);

    await db.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'cancelled',
        cancelledAt: new Date(),
      },
    });
  }
}
```

---

## Middleware Architecture

### Rate Limiting Middleware

```typescript
// middleware/rateLimitMiddleware.ts

export async function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip || 'unknown';
  const userId = request.headers.get('x-user-id');

  const { allowed, retryAfter } = await RateLimitService.checkLimit(
    ip,
    userId || undefined
  );

  if (!allowed) {
    return NextResponse.json(
      {
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests',
          retryAfter,
        },
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': '30',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Date.now() + (retryAfter || 60) * 1000),
        },
      }
    );
  }

  return NextResponse.next();
}
```

### Authentication Middleware

```typescript
// middleware/authMiddleware.ts

export async function authMiddleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Missing token' } },
      { status: 401 }
    );
  }

  try {
    const payload = AuthService.verifyToken(token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'INVALID_TOKEN', message: 'Invalid token' } },
      { status: 401 }
    );
  }
}
```

---

## Deployment Architecture

### Vercel Deployment

**Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "@next_public_api_url",
    "XHS_API_KEY": "@xhs_api_key",
    "JWT_SECRET": "@jwt_secret",
    "STRIPE_SECRET_KEY": "@stripe_secret_key",
    "DATABASE_URL": "@database_url",
    "REDIS_URL": "@redis_url"
  },
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

### Environment Variables

**Development** (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:3000
XHS_API_KEY=dev_key_xxx
JWT_SECRET=dev_secret_xxx
STRIPE_SECRET_KEY=sk_test_xxx
DATABASE_URL=postgresql://user:pass@localhost:5432/xhs_dev
REDIS_URL=redis://localhost:6379
```

**Production** (Vercel Dashboard):
```
NEXT_PUBLIC_API_URL=https://xhsdownloader.com
XHS_API_KEY=prod_key_xxx
JWT_SECRET=prod_secret_xxx
STRIPE_SECRET_KEY=sk_live_xxx
DATABASE_URL=postgresql://user:pass@prod-db:5432/xhs_prod
REDIS_URL=redis://prod-redis:6379
```

---

## Monitoring & Observability

### Logging Strategy

```typescript
// lib/logger.ts

class Logger {
  static info(message: string, data?: any) {
    console.log(JSON.stringify({
      level: 'INFO',
      timestamp: new Date().toISOString(),
      message,
      data,
    }));
  }

  static error(message: string, error?: Error, data?: any) {
    console.error(JSON.stringify({
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      message,
      error: error?.message,
      stack: error?.stack,
      data,
    }));
  }

  static warn(message: string, data?: any) {
    console.warn(JSON.stringify({
      level: 'WARN',
      timestamp: new Date().toISOString(),
      message,
      data,
    }));
  }
}
```

### Performance Monitoring

**Core Web Vitals**:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Implementation**:
```typescript
// lib/metrics.ts

export function reportWebVitals(metric: any) {
  const body = JSON.stringify(metric);

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/metrics', body);
  } else {
    fetch('/api/analytics/metrics', { body, method: 'POST' });
  }
}
```

---

## Security Architecture

### HTTPS & TLS

- All traffic encrypted with TLS 1.3
- HSTS headers enabled
- Certificate auto-renewal via Vercel

### Authentication & Authorization

- JWT tokens for API authentication
- Bcrypt for password hashing
- Role-based access control (RBAC)
- Session management with Redis

### Data Protection

- Encryption at rest (database)
- Encryption in transit (HTTPS)
- PII data minimization
- GDPR compliance

### API Security

- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention (ORM)
- XSS protection (React escaping)
- CSRF tokens for state-changing operations

---

## Scalability Considerations

### Horizontal Scaling

- Stateless API design
- Session storage in Redis
- Database connection pooling
- CDN for static assets

### Vertical Scaling

- Optimize database queries
- Implement caching strategies
- Compress responses
- Lazy load components

### Database Optimization

- Proper indexing
- Query optimization
- Connection pooling
- Read replicas for analytics

### Caching Strategy

- Browser caching (static assets)
- CDN caching (images, CSS, JS)
- Redis caching (API responses)
- Database query caching

---

## Disaster Recovery

### Backup Strategy

- Daily database backups
- Backup retention: 30 days
- Backup testing: Weekly
- Backup location: Separate region

### Failover Plan

- Database failover: Automatic
- API failover: Load balancer
- CDN failover: Automatic
- DNS failover: Manual (5 min RTO)

### Recovery Time Objectives (RTO)

- Database failure: 5 minutes
- API failure: 1 minute
- CDN failure: 30 seconds
- DNS failure: 5 minutes

---

## Performance Optimization

### Frontend Optimization

- Code splitting
- Lazy loading
- Image optimization
- CSS minification
- JavaScript minification
- Gzip compression

### Backend Optimization

- Database query optimization
- API response caching
- Connection pooling
- Async processing
- Background jobs

### Network Optimization

- CDN usage
- HTTP/2 push
- Compression
- Minification
- Bundling

---

**Last Updated**: March 4, 2024
**Version**: 1.0
**Architecture Review**: Quarterly
