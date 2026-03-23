# Smart Factory Portfolio - API Documentation

## REST API Reference

This document describes all backend API endpoints provided by the Smart Factory Portfolio application.

---

## API Base URL

**Development**: `http://localhost:3000`  
**Production**: `https://smart-factory-portfolio.com` (deployed on Windows VPS)

All endpoints use JSON request/response format unless otherwise noted.

---

## Authentication

Currently, **NO authentication is required** for any API endpoints. This may change in future versions if admin-only features are added.

---

## Endpoints Overview

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| `POST` | `/api/contact` | Submit contact form email | ✅ Production |
| `POST` | `/api/analytics/visit` | Log visitor session | ✅ Production |
| `GET` | `/api/analytics/summary` | Get visitor statistics | ✅ Production |
| `GET` | `/api/analytics/logs` | Retrieve raw visitor logs | ✅ Production |

---

## 1. Contact Form Submission

### Endpoint
```
POST /api/contact
```

### Purpose
Submits contact form data and sends an email via SMTP.

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "subject": "Project Consultation",
  "message": "I would like to discuss a potential project..."
}
```

### Response (Success - 200 OK)
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Response (Error - 400/500)
```json
{
  "success": false,
  "message": "Failed to send email: SMTP connection error",
  "error": "ECONNREFUSED"
}
```

### Possible Status Codes
- **200 OK**: Email sent successfully
- **400 Bad Request**: Missing required fields (name, email, message)
- **500 Internal Server Error**: SMTP configuration error, network error
- **503 Service Unavailable**: SMTP server temporarily unavailable

### Required Environment Variables
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=recipient@example.com
```

### Implementation Details
- **Location**: `src/app/api/contact/route.ts`
- **Dependencies**: `nodemailer`
- **Email Format**: HTML formatted email with sender details
- **Rate Limiting**: Not currently implemented (consider for production)

### Example cURL Request
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello!"
  }'
```

### Example TypeScript/Fetch
```typescript
async function submitContact(data) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}
```

---

## 2. Log Visitor Session

### Endpoint
```
POST /api/analytics/visit
```

### Purpose
Records a visitor session for analytics tracking. Called automatically on first page load per browser session.

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "visitorId": "hash-abc123def456",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "language": "en-US",
  "timestamp": "2026-03-23T10:15:30.000Z"
}
```

### Response (Success - 200 OK)
```json
{
  "success": true,
  "visitorId": "hash-abc123def456",
  "message": "Visit logged successfully"
}
```

### Response (Error - 500)
```json
{
  "success": false,
  "message": "Failed to log visit",
  "error": "File system error"
}
```

### Possible Status Codes
- **200 OK**: Visit logged successfully
- **500 Internal Server Error**: File write error, invalid data

### Stored Data
Each visitor record includes:
```json
{
  "visitorId": "unique-hash",
  "timestamp": "ISO 8601 datetime",
  "userAgent": "browser info",
  "language": "language code",
  "ip": "visitor IP address (if available)",
  "country": "country code (from geolocation)",
  "city": "city name (from geolocation)"
}
```

### Storage Location
- **File**: `storage/visits.json`
- **Format**: JSON array of visitor objects

### Implementation Details
- **Location**: `src/app/api/analytics/visit/route.ts`
- **Called By**: `<VisitLogger />` component
- **Trigger**: Component mount on first page load
- **localStorage Key**: `visitor_id` - prevents re-logging same browser

### Example cURL Request
```bash
curl -X POST http://localhost:3000/api/analytics/visit \
  -H "Content-Type: application/json" \
  -d '{
    "visitorId": "hash-abc123",
    "userAgent": "Mozilla/5.0...",
    "language": "en-US"
  }'
```

---

## 3. Get Visitor Statistics Summary

### Endpoint
```
GET /api/analytics/summary
```

### Purpose
Returns aggregated visitor statistics: today, week, month, and year unique visitor counts.

### Request
```
GET /api/analytics/summary
```

No query parameters required.

### Response (Success - 200 OK)
```json
{
  "success": true,
  "summary": {
    "today": 5,
    "week": 23,
    "month": 87,
    "year": 342,
    "updatedAt": "2026-03-23T23:59:59.000Z"
  }
}
```

### Response (Error - 500)
```json
{
  "success": false,
  "message": "Failed to retrieve summary",
  "error": "File read error"
}
```

### Possible Status Codes
- **200 OK**: Summary retrieved successfully
- **500 Internal Server Error**: File read error

### Calculation Logic
- **today**: Unique visitors since today at 00:00 UTC
- **week**: Unique visitors since Monday at 00:00 UTC (ISO week)
- **month**: Unique visitors since 1st of month at 00:00 UTC
- **year**: Unique visitors since January 1st at 00:00 UTC
- **updatedAt**: Timestamp when data was last queried

### Implementation Details
- **Location**: `src/app/api/analytics/summary/route.ts`
- **Data Source**: `storage/visits.json`
- **Called By**: `<VisitSummary />` component
- **Caching**: No built-in cache (can add for performance)

### Example cURL Request
```bash
curl -X GET http://localhost:3000/api/analytics/summary
```

### Example TypeScript/Fetch
```typescript
async function getVisitorSummary() {
  const response = await fetch('/api/analytics/summary')
  return response.json()
}

// Usage
const data = await getVisitorSummary()
console.log(`Today: ${data.summary.today} visitors`)
```

---

## 4. Retrieve Visitor Logs

### Endpoint
```
GET /api/analytics/logs
```

### Purpose
Retrieves raw visitor logs with optional filtering. Useful for detailed analytics review.

### Query Parameters
| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `limit` | number | Yes | Max records to return (default: 100) |
| `offset` | number | Yes | Pagination offset (default: 0) |
| `startDate` | ISO 8601 | Yes | Filter logs after this date |
| `endDate` | ISO 8601 | Yes | Filter logs before this date |

### Request Examples
```
GET /api/analytics/logs
GET /api/analytics/logs?limit=50&offset=0
GET /api/analytics/logs?startDate=2026-03-01&endDate=2026-03-31
```

### Response (Success - 200 OK)
```json
{
  "success": true,
  "logs": [
    {
      "visitorId": "hash-abc123",
      "timestamp": "2026-03-23T10:15:30.000Z",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      "language": "en-US",
      "ip": "192.168.1.100",
      "country": "TH",
      "city": "Bangkok"
    },
    {
      "visitorId": "hash-def456",
      "timestamp": "2026-03-23T09:45:20.000Z",
      "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14)...",
      "language": "th-TH",
      "ip": "203.146.255.255",
      "country": "TH",
      "city": "Chiang Mai"
    }
  ],
  "total": 342,
  "limit": 100,
  "offset": 0
}
```

### Response (Error - 500)
```json
{
  "success": false,
  "message": "Failed to retrieve logs",
  "error": "Invalid date format"
}
```

### Possible Status Codes
- **200 OK**: Logs retrieved successfully
- **400 Bad Request**: Invalid query parameters
- **500 Internal Server Error**: File read error, database error

### Implementation Details
- **Location**: `src/app/api/analytics/logs/route.ts`
- **Data Source**: `storage/visits.json`
- **Pagination**: Offset-based (no cursor pagination yet)
- **Sorting**: Newest first (descending by timestamp)

### Example cURL Requests
```bash
# Get first 50 logs
curl -X GET "http://localhost:3000/api/analytics/logs?limit=50"

# Get logs from March 2026
curl -X GET "http://localhost:3000/api/analytics/logs?startDate=2026-03-01&endDate=2026-03-31"

# Get logs with pagination
curl -X GET "http://localhost:3000/api/analytics/logs?limit=20&offset=20"
```

### Example TypeScript/Fetch
```typescript
async function getVisitorLogs(limit = 100, offset = 0) {
  const params = new URLSearchParams({ limit, offset })
  const response = await fetch(`/api/analytics/logs?${params}`)
  return response.json()
}

// Usage
const data = await getVisitorLogs(50)
console.log(`Retrieved ${data.logs.length} logs`)
console.log(`Total available: ${data.total}`)
```

---

## Error Handling

### Standard Error Response Format
All endpoints follow a consistent error response structure:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "Technical error code or stack trace (in development only)"
}
```

### Common HTTP Status Codes
| Status | Meaning |
|--------|---------|
| 200 | Successful request |
| 400 | Bad request (missing/invalid parameters) |
| 500 | Internal server error |
| 503 | Service unavailable (SMTP down, etc.) |

### Recommended Client-Side Error Handling
```typescript
async function callAPI(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, options)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error.message)
    // Show user-friendly error message
    showToast(error.message, 'error')
  }
}
```

---

## Rate Limiting & Throttling

### Current Status
- No rate limiting implemented
- **Recommended for production**: Add rate limiting to `/api/contact` endpoint

### Future Implementation
```typescript
// Example: 5 requests per second per IP
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 s'),
})

// In API route
const { success } = await ratelimit.limit(req.ip)
if (!success) return new Response('Too many requests', { status: 429 })
```

---

## CORS Policy

Currently, API endpoints use default Next.js CORS behavior:
- Same-origin requests fully allowed
- Cross-origin requests allowed without additional headers

### Adding Custom CORS (if needed)
```typescript
// In route handler
const headers = {
  'Access-Control-Allow-Origin': 'https://trusted-domain.com',
  'Access-Control-Allow-Methods': 'GET, POST',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

---

## Analytics Event Tracking

### GA4 Integration
Automatically tracked events on contact interactions:

```
Event: contact_click
Parameters:
  - channel: 'send_message' | 'line'
  - timestamp: ISO 8601
  - user_id: (if GA4 user ID set)
```

### PostHog Integration
If `window.posthog` is available:

```javascript
posthog.capture('contact_click', {
  channel: 'send_message' | 'line'
})
```

---

## Caching Strategy

### Currently Implemented
- **No caching** for analytics endpoints
- Each request reads fresh from file system

### Recommended Production Caching
```typescript
// Cache summary for 5 minutes
export const revalidate = 300 // ISR in seconds
```

---

## Data Storage & Persistence

### Storage Backend
- **Format**: JSON text files
- **Location**: `storage/` directory
- **Files**:
  - `visits.json` - Visitor logs

### Backup Recommendations
1. Daily backup of `storage/visits.json` to external storage
2. Version control repository (don't commit PII if present)
3. Archive old logs periodically

### Data Privacy
- Store minimal PII (email from contact form only)
- visitor logs contain: user agent, language, IP, location
- Comply with GDPR/privacy regulations

---

## Testing API Endpoints

### Using Postman
1. Create new POST request: `http://localhost:3000/api/contact`
2. Add header: `Content-Type: application/json`
3. Add body (JSON):
   ```json
   {
     "name": "Test",
     "email": "test@example.com",
     "subject": "Test",
     "message": "Test message"
   }
   ```
4. Send and verify 200 response

### Using CLI (curl)
```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'

# Test analytics summary
curl -X GET http://localhost:3000/api/analytics/summary
```

### Using VS Code REST Client Extension
Create `.http` file:
```http
### Test Contact Form
POST http://localhost:3000/api/contact
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Test"
}

### Get Analytics Summary
GET http://localhost:3000/api/analytics/summary
```

---

## Related Documentation
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Project setup & configuration
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design & components
- [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) - Environment variables & deployment
