# Sentry Configuration Guide

This document outlines the external configuration needed for Sentry.io to work optimally with this Next.js application.

## Environment Variables

Ensure the following environment variables are set in your deployment environment (Vercel, local .env, etc.):

```bash
# Required: Your Sentry DSN (Data Source Name)
NEXT_PUBLIC_SENTRY_DSN=https://your-public-key@o1048537.ingest.us.sentry.io/your-project-id

# Required for source maps upload during build
SENTRY_AUTH_TOKEN=your-auth-token-here

# Optional: Override defaults
SENTRY_ORG=ridemtd
SENTRY_PROJECT=developer-web

# Automatically set by Vercel (no action needed)
NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA=<auto-populated>
NEXT_PUBLIC_VERCEL_ENV=<auto-populated>
```

### Getting Your Sentry Auth Token

1. Go to https://sentry.io/settings/account/api/auth-tokens/
2. Create a new token with the following scopes:
   - `project:read`
   - `project:releases`
   - `org:read`
3. Copy the token and add it to your environment variables

## Sentry.io Dashboard Configuration

### 1. Project Settings

#### General Settings
- **Project Name**: developer-web
- **Platform**: JavaScript - Next.js
- **Team**: Assign to appropriate team

#### Alerts & Notifications
Configure alerts for:
- **Error Rate Alerts**: When error rate exceeds 1% within 1 hour
- **Performance Degradation**: When P95 response time > 3s
- **New Issues**: Notify on Slack/Email for new error types
- **Regression Alerts**: When previously resolved issues reoccur

#### Data Filters
Enable these filters to reduce noise:
- ✅ Filter out errors from known web crawlers
- ✅ Filter out errors from browser extensions
- ✅ Filter localhost
- ✅ Filter out legacy browsers

#### Performance Settings
- **Transaction Threshold**: 300ms (transactions slower than this are marked as slow)
- **Apdex Threshold**: 300ms
- **Enable Distributed Tracing**: Yes

### 2. Source Maps Configuration

#### Verify Source Maps Upload
After deployment, verify source maps are working:
1. Go to **Settings > Projects > developer-web > Source Maps**
2. Check that your releases appear with uploaded source maps
3. Look for the git commit SHA in the release list

#### Release Health
Enable Release Health to track:
- Crash-free sessions
- Crash-free users
- Session duration
- Adoption of new releases

### 3. Integrations

#### Vercel Integration (Recommended)
This is the **easiest way** to ensure source maps work correctly:

1. Go to https://vercel.com/integrations/sentry
2. Install the Sentry integration for your Vercel project
3. This will:
   - Automatically upload source maps on each deployment
   - Link Sentry releases to Vercel deployments
   - Add deployment notifications to Sentry
   - Set proper environment variables

**Benefits:**
- No need to manually configure `SENTRY_AUTH_TOKEN` in Vercel
- Automatic release tracking
- Deployment context in Sentry issues

#### GitHub Integration
1. Go to **Settings > Integrations > GitHub**
2. Install the GitHub integration
3. Link your `CUMTD/developer-web` repository

**Benefits:**
- Commit information in error reports
- Suggested assignees based on git blame
- Ability to create GitHub issues from Sentry
- Stack trace linking to source code on GitHub

#### Slack Integration
1. Go to **Settings > Integrations > Slack**
2. Connect your Slack workspace
3. Configure which alerts go to which channels

**Recommended channels:**
- `#developer-web-errors` - Critical errors
- `#developer-web-releases` - Release notifications

### 4. Issue Grouping & Fingerprinting

Configure custom fingerprinting for better issue grouping:
1. Go to **Settings > Projects > developer-web > Issue Grouping**
2. Consider enabling:
   - **Stack Trace Rules**: Group similar errors
   - **In-App Only**: Focus on your code, not third-party libraries

### 5. Data Scrubbing & Privacy

Configure data scrubbing to protect user privacy:
1. Go to **Settings > Projects > developer-web > Security & Privacy**
2. Enable:
   - ✅ **Scrub IP Addresses**: Remove user IPs
   - ✅ **Scrub Sensitive Data**: Remove passwords, credit cards, etc.
3. Add custom scrubbing rules for:
   - Email addresses (if needed)
   - API keys
   - User tokens

### 6. Performance Monitoring

#### Transaction Settings
1. Go to **Performance > Settings**
2. Configure:
   - **URL Parameterization**: Group similar URLs together (e.g., `/api/users/[id]`)
   - **Enable Frontend Monitoring**: Yes
   - **Enable Backend Monitoring**: Yes

#### Custom Performance Metrics
Consider tracking:
- API response times
- Database query times
- Cache hit/miss rates
- External service calls

### 7. Session Replay

Session replay is configured in the code with privacy-first defaults:
- All text is masked
- All media is blocked
- 5% sample rate for normal sessions
- 100% sample rate for error sessions

To adjust these settings:
1. Go to **Settings > Projects > developer-web > Replays**
2. Modify privacy settings if needed
3. Adjust sample rates based on your needs and budget

### 8. Releases & Deploys

#### Automatic Release Tracking
With the Vercel integration, releases are automatically created with:
- Git commit SHA as the release identifier
- Deploy information
- Associated commits and authors

#### Manual Release Management (if not using Vercel integration)
If you're not using the Vercel integration, you'll need to:
1. Ensure `SENTRY_AUTH_TOKEN` is set in your CI/CD
2. Releases are created automatically during the build process via `@sentry/nextjs`

### 9. Quota Management

Monitor your quota usage:
1. Go to **Settings > Subscription**
2. Monitor:
   - Error events
   - Transaction events
   - Replay events
   - Attachment storage

**Tips to stay within quota:**
- Use sampling rates appropriately (configured in code)
- Filter known noisy errors (configured in code)
- Archive old releases
- Adjust sample rates during high-traffic periods

### 10. User Feedback

The user feedback integration is enabled in the code. To customize:
1. Go to **Settings > Projects > developer-web > User Feedback**
2. Customize the feedback form:
   - Form title
   - Submit button text
   - Success message
   - Color scheme (set to "system" in code)

## Testing Your Configuration

### 1. Test Error Reporting (Development Only)
Visit `/sentry-example-page` in development to test:
- Client-side error capture
- Server-side error capture
- Error linking between frontend and backend
- Sentry connectivity

### 2. Verify Source Maps
After deployment:
1. Trigger an error in production
2. Check the issue in Sentry
3. Verify stack traces show your actual source code (not minified)
4. Click on stack frames - they should link to the correct file and line

### 3. Test Performance Monitoring
1. Check **Performance > Summary** in Sentry
2. Verify you see:
   - Page load transactions
   - API route transactions
   - Transaction duration data

### 4. Test Session Replay
1. Navigate around your site
2. Trigger an error
3. Go to the error in Sentry
4. Look for the "Replays" tab
5. Watch the replay to see what the user did before the error

## Troubleshooting

### Source Maps Not Working
**Symptoms**: Stack traces show minified code instead of original source

**Solutions**:
1. Verify `SENTRY_AUTH_TOKEN` is set in your CI/CD environment
2. Check that source maps were uploaded: Look in Sentry under **Settings > Projects > developer-web > Source Maps**
3. Verify the release name matches (should be the git commit SHA)
4. Check build logs for source map upload errors
5. If using Vercel: Ensure the Sentry integration is properly connected

### High Event Volume
**Symptoms**: Hitting quota limits quickly

**Solutions**:
1. Lower sample rates in configuration files
2. Add more error filters in `beforeSend` hooks
3. Review which errors are most common and filter them if not actionable
4. Check for error loops (errors causing more errors)

### Missing Context in Errors
**Symptoms**: Errors lack user context, breadcrumbs, or tags

**Solutions**:
1. Ensure you're calling `Sentry.setUser()` after authentication
2. Add custom context with `Sentry.setContext()`
3. Add tags with `Sentry.setTag()`
4. Ensure breadcrumbs are enabled (they are by default)

### Performance Data Not Showing
**Symptoms**: No transactions in Performance tab

**Solutions**:
1. Verify `tracesSampleRate` is set and > 0
2. Check that performance monitoring is enabled in Sentry project settings
3. Ensure you're on a paid plan (performance monitoring requires a paid plan)
4. Wait a few minutes after deployment for data to appear

## Best Practices

1. **Review Errors Regularly**: Set aside time weekly to review and resolve errors
2. **Set Up Alerts**: Don't wait for users to report issues
3. **Use Releases**: Track errors by deployment to quickly identify problematic releases
4. **Archive Old Issues**: Keep your issue list manageable
5. **Add Context**: Use `Sentry.setContext()` and `Sentry.setTag()` liberally
6. **Monitor Performance**: Use performance data to identify slow endpoints
7. **Watch Your Quota**: Monitor usage and adjust sampling as needed
8. **Test in Staging**: Use a separate Sentry project for staging environments
9. **Review Replays**: Session replays can be invaluable for debugging UX issues
10. **Keep SDK Updated**: Regularly update `@sentry/nextjs` for bug fixes and features

## Additional Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Sentry Session Replay](https://docs.sentry.io/product/session-replay/)
- [Sentry Release Health](https://docs.sentry.io/product/releases/health/)
- [Sentry Best Practices](https://docs.sentry.io/product/best-practices/)
