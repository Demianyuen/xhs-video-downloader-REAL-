# XHS Video Downloader - Operations & Maintenance Guide

## Operations Manual

This document provides comprehensive operational procedures, maintenance schedules, troubleshooting guides, and best practices for running the XHS Video Downloader platform.

---

## Table of Contents

1. System Administration
2. Monitoring & Alerting
3. Maintenance Procedures
4. Troubleshooting Guide
5. Incident Response
6. Performance Tuning
7. Security Operations
8. Backup & Recovery
9. Scaling Operations
10. Documentation & Knowledge Base

---

## 1. System Administration

### 1.1 Access Management

**Admin Roles**:
- **Super Admin**: Full system access, user management, billing
- **Technical Admin**: Infrastructure, deployments, monitoring
- **Content Admin**: Blog, pages, SEO content
- **Support Admin**: User support, refunds, account issues

**Access Control**:
```
Super Admin
├── User Management
├── Billing & Payments
├── System Configuration
├── Deployment Control
└── Audit Logs

Technical Admin
├── Infrastructure
├── Deployments
├── Monitoring
├── Database Management
└── Backup Management

Content Admin
├── Blog Management
├── Page Content
├── SEO Settings
└── Analytics

Support Admin
├── User Support
├── Refunds
├── Account Issues
└── Feedback Management
```

### 1.2 User Management

**User Lifecycle**:

1. **Registration**
   - Email verification required
   - Password strength validation
   - Terms acceptance
   - GDPR consent

2. **Activation**
   - Email confirmation link
   - Account activation
   - Welcome email
   - Onboarding flow

3. **Active Usage**
   - Download tracking
   - Usage analytics
   - Support tickets
   - Feedback collection

4. **Subscription Management**
   - Upgrade/downgrade
   - Renewal reminders
   - Cancellation process
   - Refund handling

5. **Deactivation**
   - Account deletion request
   - Data export (GDPR)
   - Subscription cancellation
   - Data retention policy

**User Management Commands**:
```bash
# View user details
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://api.xhsdownloader.com/admin/users/{userId}

# Suspend user account
curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://api.xhsdownloader.com/admin/users/{userId}/suspend

# Delete user data (GDPR)
curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://api.xhsdownloader.com/admin/users/{userId}/delete

# Export user data
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://api.xhsdownloader.com/admin/users/{userId}/export
```

### 1.3 Configuration Management

**Environment Configuration**:

| Setting | Development | Staging | Production |
|---------|-------------|---------|-----------|
| API Rate Limit | 1000/min | 500/min | 30/min |
| Cache TTL | 5 min | 30 min | 1 hour |
| Log Level | DEBUG | INFO | WARN |
| Error Reporting | Console | Sentry | Sentry |
| Analytics | Disabled | Enabled | Enabled |
| Ads | Disabled | Disabled | Enabled |

**Configuration Update Process**:
1. Update environment variables in Vercel dashboard
2. Trigger deployment
3. Verify changes in staging
4. Deploy to production
5. Monitor for issues

---

## 2. Monitoring & Alerting

### 2.1 Key Metrics to Monitor

**Application Metrics**:
- Request rate (req/sec)
- Response time (p50, p95, p99)
- Error rate (%)
- Success rate (%)
- API endpoint performance

**Business Metrics**:
- Daily active users
- Downloads per day
- Premium conversions
- Revenue
- Churn rate

**Infrastructure Metrics**:
- CPU usage
- Memory usage
- Disk usage
- Network I/O
- Database connections

**SEO Metrics**:
- Organic traffic
- Keyword rankings
- Backlinks
- Domain authority
- Page speed

### 2.2 Monitoring Setup

**Vercel Analytics**:
```
Dashboard → Analytics
├── Real-time traffic
├── Error tracking
├── Performance metrics
├── Deployment history
└── Usage statistics
```

**Google Analytics**:
```
Dashboard → Real-time
├── Active users
├── Traffic sources
├── Page views
├── Conversion tracking
└── User behavior
```

**Custom Monitoring**:
```typescript
// lib/monitoring.ts

class Monitoring {
  static async trackMetric(name: string, value: number, tags?: Record<string, string>) {
    await fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify({
        name,
        value,
        timestamp: Date.now(),
        tags,
      }),
    });
  }

  static async trackError(error: Error, context?: Record<string, any>) {
    await fetch('/api/errors', {
      method: 'POST',
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context,
        timestamp: Date.now(),
      }),
    });
  }
}
```

### 2.3 Alert Configuration

**Critical Alerts** (Immediate notification):
- Error rate > 5%
- Response time > 5s (p95)
- API downtime
- Database connection failure
- Payment processing failure

**Warning Alerts** (Daily digest):
- Error rate > 1%
- Response time > 2s (p95)
- High memory usage (> 80%)
- High disk usage (> 80%)
- Unusual traffic patterns

**Info Alerts** (Weekly digest):
- Deployment status
- Backup completion
- Certificate renewal
- Usage statistics
- Performance trends

**Alert Channels**:
- Email (all alerts)
- Slack (critical + warnings)
- SMS (critical only)
- PagerDuty (on-call rotation)

---

## 3. Maintenance Procedures

### 3.1 Daily Maintenance

**Morning Checklist** (9 AM):
- [ ] Check system status dashboard
- [ ] Review error logs
- [ ] Check payment processing
- [ ] Verify database backups completed
- [ ] Review overnight traffic patterns

**Afternoon Checklist** (3 PM):
- [ ] Monitor API performance
- [ ] Check user support tickets
- [ ] Review analytics
- [ ] Verify cache hit rates
- [ ] Check rate limiting effectiveness

**Evening Checklist** (6 PM):
- [ ] Prepare for backup window
- [ ] Review deployment queue
- [ ] Check scheduled tasks
- [ ] Verify monitoring alerts
- [ ] Document any issues

### 3.2 Weekly Maintenance

**Monday**:
- [ ] Review weekly metrics report
- [ ] Analyze user feedback
- [ ] Check SEO rankings
- [ ] Review competitor activity
- [ ] Plan content calendar

**Wednesday**:
- [ ] Database optimization
- [ ] Cache analysis
- [ ] Query performance review
- [ ] Index optimization
- [ ] Connection pool tuning

**Friday**:
- [ ] Security audit
- [ ] Dependency updates check
- [ ] Performance review
- [ ] Capacity planning
- [ ] Team sync meeting

### 3.3 Monthly Maintenance

**First Week**:
- [ ] Full system audit
- [ ] Security assessment
- [ ] Performance analysis
- [ ] Capacity planning
- [ ] Budget review

**Second Week**:
- [ ] Database maintenance
- [ ] Log rotation
- [ ] Backup verification
- [ ] Disaster recovery drill
- [ ] Documentation update

**Third Week**:
- [ ] Dependency updates
- [ ] Security patches
- [ ] Performance optimization
- [ ] User feedback analysis
- [ ] Roadmap planning

**Fourth Week**:
- [ ] Monthly report generation
- [ ] Metrics analysis
- [ ] Team retrospective
- [ ] Planning for next month
- [ ] Stakeholder communication

### 3.4 Quarterly Maintenance

**Q1/Q2/Q3/Q4**:
- [ ] Major version updates
- [ ] Infrastructure review
- [ ] Security audit
- [ ] Capacity planning
- [ ] Strategic review
- [ ] Budget planning
- [ ] Team training
- [ ] Documentation refresh

---

## 4. Troubleshooting Guide

### 4.1 Common Issues & Solutions

#### Issue: High Error Rate (> 5%)

**Symptoms**:
- Users reporting failures
- Error rate spike in dashboard
- Support tickets increasing

**Diagnosis**:
```bash
# Check error logs
curl -H "Authorization: Bearer $TOKEN" \
  https://api.xhsdownloader.com/admin/logs?level=ERROR&limit=100

# Check API status
curl https://api.xhsdownloader.com/health

# Check database connection
curl -H "Authorization: Bearer $TOKEN" \
  https://api.xhsdownloader.com/admin/health/database
```

**Solutions**:
1. Check XHS API status
2. Verify database connectivity
3. Check rate limiting
4. Review recent deployments
5. Restart API servers if needed
6. Rollback recent changes if necessary

#### Issue: Slow Response Times (> 2s p95)

**Symptoms**:
- Users report slow loading
- Performance metrics spike
- Timeout errors

**Diagnosis**:
```bash
# Check database query performance
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

# Check cache hit rate
redis-cli INFO stats | grep hit_rate

# Check API endpoint performance
curl -H "Authorization: Bearer $TOKEN" \
  https://api.xhsdownloader.com/admin/metrics/endpoints
```

**Solutions**:
1. Optimize slow queries
2. Add database indexes
3. Increase cache TTL
4. Enable compression
5. Optimize images
6. Scale horizontally if needed

#### Issue: Database Connection Failures

**Symptoms**:
- Connection timeout errors
- "Too many connections" error
- Database unavailable

**Diagnosis**:
```bash
# Check connection pool status
SELECT count(*) FROM pg_stat_activity;

# Check max connections
SHOW max_connections;

# Check active connections
SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;
```

**Solutions**:
1. Increase max_connections
2. Implement connection pooling
3. Close idle connections
4. Restart database if needed
5. Scale database vertically
6. Implement read replicas

#### Issue: Payment Processing Failures

**Symptoms**:
- Subscription creation fails
- Stripe webhook errors
- Billing issues

**Diagnosis**:
```bash
# Check Stripe webhook logs
curl -H "Authorization: Bearer $STRIPE_TOKEN" \
  https://api.stripe.com/v1/events?type=charge.failed

# Check subscription status
curl -H "Authorization: Bearer $STRIPE_TOKEN" \
  https://api.stripe.com/v1/subscriptions/{subscription_id}

# Check payment method
curl -H "Authorization: Bearer $STRIPE_TOKEN" \
  https://api.stripe.com/v1/payment_methods/{payment_method_id}
```

**Solutions**:
1. Verify Stripe API keys
2. Check webhook configuration
3. Retry failed payments
4. Update payment method
5. Contact Stripe support if needed

#### Issue: High Memory Usage (> 80%)

**Symptoms**:
- Slow performance
- Out of memory errors
- Process crashes

**Diagnosis**:
```bash
# Check memory usage
free -h

# Check process memory
ps aux --sort=-%mem | head -10

# Check Node.js heap
node --expose-gc -e "console.log(require('v8').getHeapStatistics())"
```

**Solutions**:
1. Identify memory leaks
2. Optimize data structures
3. Implement garbage collection
4. Scale vertically
5. Implement caching
6. Reduce batch sizes

### 4.2 Troubleshooting Checklist

**When Issues Occur**:
1. [ ] Check system status dashboard
2. [ ] Review error logs
3. [ ] Check recent deployments
4. [ ] Verify external service status
5. [ ] Check resource usage
6. [ ] Review recent changes
7. [ ] Check monitoring alerts
8. [ ] Communicate with team
9. [ ] Document issue
10. [ ] Implement fix
11. [ ] Verify resolution
12. [ ] Post-mortem analysis

---

## 5. Incident Response

### 5.1 Incident Severity Levels

**Severity 1 (Critical)**:
- Service completely down
- Data loss occurring
- Security breach
- Major payment failure
- Response time: Immediate

**Severity 2 (High)**:
- Service degraded (> 50% users affected)
- Partial data loss
- Security vulnerability
- Payment processing issues
- Response time: 15 minutes

**Severity 3 (Medium)**:
- Service degraded (< 50% users affected)
- Minor functionality broken
- Performance issues
- Non-critical feature failure
- Response time: 1 hour

**Severity 4 (Low)**:
- Minor issues
- Cosmetic problems
- Documentation issues
- Non-urgent feature requests
- Response time: 24 hours

### 5.2 Incident Response Process

**Phase 1: Detection & Alerting** (0-5 min)
- Alert triggered
- On-call engineer notified
- Incident created
- Team assembled

**Phase 2: Initial Response** (5-15 min)
- Assess severity
- Gather information
- Communicate status
- Begin investigation

**Phase 3: Mitigation** (15-60 min)
- Identify root cause
- Implement temporary fix
- Restore service
- Verify resolution

**Phase 4: Resolution** (60+ min)
- Implement permanent fix
- Deploy changes
- Monitor for stability
- Document incident

**Phase 5: Post-Incident** (24-48 hours)
- Conduct post-mortem
- Identify improvements
- Update documentation
- Implement preventive measures

### 5.3 Communication Template

**Initial Alert**:
```
🚨 INCIDENT: [Service Name] - Severity [1-4]

Status: INVESTIGATING
Affected: [Number] users
Impact: [Description]
ETA: [Time estimate]

Updates: [Slack channel]
```

**Status Update**:
```
📊 UPDATE: [Service Name]

Status: [INVESTIGATING/MITIGATING/RESOLVED]
Progress: [Description]
ETA: [Time estimate]
Next update: [Time]
```

**Resolution**:
```
✅ RESOLVED: [Service Name]

Duration: [Time]
Root cause: [Description]
Fix: [Description]
Post-mortem: [Link]
```

---

## 6. Performance Tuning

### 6.1 Database Optimization

**Query Optimization**:
```sql
-- Identify slow queries
SELECT query, mean_time, calls
FROM pg_stat_statements
WHERE mean_time > 1000
ORDER BY mean_time DESC;

-- Add indexes for frequently queried columns
CREATE INDEX idx_downloads_user_id ON downloads(user_id);
CREATE INDEX idx_downloads_created_at ON downloads(created_at);

-- Analyze query plans
EXPLAIN ANALYZE
SELECT * FROM downloads
WHERE user_id = $1
ORDER BY created_at DESC;
```

**Connection Pooling**:
```
PgBouncer Configuration:
- Pool mode: transaction
- Max client conn: 1000
- Default pool size: 25
- Min pool size: 10
- Reserve pool size: 5
```

**Maintenance**:
```sql
-- Vacuum and analyze
VACUUM ANALYZE;

-- Reindex tables
REINDEX TABLE downloads;

-- Update statistics
ANALYZE;
```

### 6.2 Cache Optimization

**Redis Configuration**:
```
maxmemory: 2gb
maxmemory-policy: allkeys-lru
timeout: 300
tcp-keepalive: 60
```

**Cache Strategy**:
```typescript
// Cache frequently accessed data
const cacheKey = `video:${videoId}`;
const ttl = 3600; // 1 hour

// Check cache first
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Fetch and cache
const data = await fetchData();
await redis.setex(cacheKey, ttl, JSON.stringify(data));
return data;
```

### 6.3 API Optimization

**Response Compression**:
```typescript
// Enable gzip compression
import compression from 'compression';
app.use(compression());
```

**Pagination**:
```typescript
// Implement cursor-based pagination
const limit = 20;
const cursor = req.query.cursor;

const results = await db.downloads
  .find({ _id: { $gt: cursor } })
  .limit(limit + 1);

const hasMore = results.length > limit;
const items = results.slice(0, limit);
```

**Field Selection**:
```typescript
// Only return needed fields
const user = await db.user.findById(userId, {
  id: 1,
  email: 1,
  name: 1,
  isPremium: 1,
});
```

---

## 7. Security Operations

### 7.1 Security Checklist

**Daily**:
- [ ] Review security logs
- [ ] Check for failed login attempts
- [ ] Monitor API abuse
- [ ] Verify SSL certificates
- [ ] Check for unauthorized access

**Weekly**:
- [ ] Security audit
- [ ] Dependency vulnerability scan
- [ ] Access control review
- [ ] Backup verification
- [ ] Firewall rule review

**Monthly**:
- [ ] Penetration testing
- [ ] Security assessment
- [ ] Compliance audit
- [ ] Password policy review
- [ ] Two-factor authentication audit

**Quarterly**:
- [ ] Full security audit
- [ ] Disaster recovery drill
- [ ] Incident response drill
- [ ] Security training
- [ ] Policy review

### 7.2 Vulnerability Management

**Dependency Scanning**:
```bash
# Check for vulnerabilities
npm audit

# Update vulnerable packages
npm audit fix

# Check specific package
npm audit --package lodash
```

**Security Headers**:
```typescript
// Implement security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
```

### 7.3 Access Control

**Role-Based Access Control (RBAC)**:
```typescript
const roles = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  moderator: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};

function checkPermission(role, action) {
  return roles[role]?.includes(action) || false;
}
```

---

## 8. Backup & Recovery

### 8.1 Backup Strategy

**Database Backups**:
- Frequency: Daily
- Retention: 30 days
- Location: Separate region
- Verification: Weekly restore test

**Configuration Backups**:
- Frequency: On change
- Retention: 90 days
- Location: Git repository
- Verification: Manual review

**Application Backups**:
- Frequency: On deployment
- Retention: 10 deployments
- Location: Vercel
- Verification: Automatic

### 8.2 Recovery Procedures

**Database Recovery**:
```bash
# List available backups
aws rds describe-db-snapshots

# Restore from snapshot
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier xhs-restored \
  --db-snapshot-identifier xhs-backup-2024-03-04

# Verify restoration
psql -h xhs-restored.xxx.rds.amazonaws.com -U admin -d xhs_db
```

**Application Recovery**:
```bash
# Rollback to previous deployment
vercel rollback

# Redeploy specific commit
vercel deploy --prod --target production
```

---

## 9. Scaling Operations

### 9.1 Horizontal Scaling

**When to Scale**:
- CPU usage > 70% consistently
- Memory usage > 80%
- Request queue building up
- Response times increasing

**Scaling Process**:
1. Increase replica count
2. Update load balancer
3. Monitor new instances
4. Verify traffic distribution
5. Document scaling event

### 9.2 Vertical Scaling

**Database Scaling**:
- Increase instance size
- Add read replicas
- Implement sharding
- Optimize queries

**API Scaling**:
- Increase memory
- Increase CPU
- Optimize code
- Implement caching

---

## 10. Documentation & Knowledge Base

### 10.1 Documentation Standards

**Required Documentation**:
- Architecture diagrams
- API documentation
- Database schema
- Deployment procedures
- Troubleshooting guides
- Runbooks for common tasks
- Security procedures
- Disaster recovery plans

### 10.2 Knowledge Base

**Topics to Document**:
- System architecture
- API endpoints
- Database schema
- Deployment process
- Monitoring setup
- Troubleshooting
- Security procedures
- Scaling procedures
- Incident response
- Backup & recovery

### 10.3 Documentation Maintenance

**Update Schedule**:
- Architecture: Quarterly
- API docs: On change
- Procedures: Quarterly
- Troubleshooting: As needed
- Knowledge base: Continuous

---

## Appendix: Useful Commands

### Vercel Commands
```bash
# Deploy to production
vercel --prod

# View logs
vercel logs

# Check deployment status
vercel status

# Rollback deployment
vercel rollback
```

### Database Commands
```bash
# Connect to database
psql -h $DB_HOST -U $DB_USER -d $DB_NAME

# Backup database
pg_dump -h $DB_HOST -U $DB_USER $DB_NAME > backup.sql

# Restore database
psql -h $DB_HOST -U $DB_USER $DB_NAME < backup.sql
```

### Redis Commands
```bash
# Connect to Redis
redis-cli -h $REDIS_HOST -p $REDIS_PORT

# Check memory usage
INFO memory

# Clear cache
FLUSHALL

# Monitor commands
MONITOR
```

---

**Last Updated**: March 4, 2024
**Version**: 1.0
**Next Review**: June 4, 2024
