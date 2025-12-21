# Backend Configuration Guide - Fix Email Links

## 🚨 Problem

When users register on the live site (https://fayrashop.vercel.app), they receive email verification links that point to `http://localhost:3000` instead of the production URL.

**Example of wrong link:**

```
http://localhost:3000/auth/verify-email?token=xxx
```

**Should be:**

```
https://fayrashop.vercel.app/auth/verify-email?token=xxx
```

## 🔧 Solution

This requires changes to your **BACKEND** repository (`fayrashop-ssr`).

### Step 1: Add Environment Variable to Backend

1. Go to https://vercel.com/dashboard
2. Select your **fayrashop-ssr** project (backend)
3. Go to **Settings** → **Environment Variables**
4. Add this variable:
   ```
   Name: FRONTEND_URL
   Value: https://fayrashop.vercel.app
   ```
5. Check: ✅ Production ✅ Preview ✅ Development
6. Click **Save**

### Step 2: Update Backend Code

You need to find where email verification links are generated in your backend code.

#### Common File Locations:

- `src/services/email.service.ts` or `email.service.js`
- `src/controllers/auth.controller.ts` or `auth.controller.js`
- `src/utils/email.ts` or `email.js`
- `src/services/auth.service.ts` or `auth.service.js`

#### Search for These Patterns:

Search your backend code for:

```javascript
'localhost:3000'
'http://localhost'
'/auth/verify-email'
'/auth/reset-password'
```

#### Example Fix:

**Before (❌ Wrong):**

```javascript
// In auth.service.ts or similar file
async sendVerificationEmail(user, token) {
  const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: 'Verify your email',
    html: `Click here to verify: ${verificationLink}`
  });
}
```

**After (✅ Correct):**

```javascript
// In auth.service.ts or similar file
async sendVerificationEmail(user, token) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verificationLink = `${frontendUrl}/auth/verify-email?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: 'Verify your email',
    html: `Click here to verify: ${verificationLink}`
  });
}
```

### Step 3: Update All Email Templates

Make sure to update ALL places where email links are generated:

1. **Email Verification Link**

   ```javascript
   const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`
   ```

2. **Password Reset Link**

   ```javascript
   const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`
   ```

3. **Any Other Email Links**
   ```javascript
   const link = `${process.env.FRONTEND_URL}/your-path?param=${value}`
   ```

### Step 4: Create Environment Configuration File

Create a file like `src/config/environment.ts`:

```typescript
export const config = {
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:5000',
  // ... other config
}
```

Then use it everywhere:

```typescript
import { config } from './config/environment'

const verificationLink = `${config.frontendUrl}/auth/verify-email?token=${token}`
```

### Step 5: Redeploy Backend

1. Commit your changes to GitHub
2. Push to main branch
3. Vercel will automatically redeploy
4. Wait 2-3 minutes for deployment

### Step 6: Test

1. Register a new user on https://fayrashop.vercel.app
2. Check the email
3. Verify the link points to `https://fayrashop.vercel.app/auth/verify-email?token=xxx`
4. Click the link - it should work!

## 📋 Checklist

- [ ] Add `FRONTEND_URL` environment variable to Vercel (backend project)
- [ ] Find email service file in backend code
- [ ] Replace all `localhost:3000` with `process.env.FRONTEND_URL`
- [ ] Update email verification link generation
- [ ] Update password reset link generation
- [ ] Commit and push changes
- [ ] Wait for Vercel to redeploy backend
- [ ] Test registration flow
- [ ] Test forgot password flow
- [ ] Verify all email links point to production URL

## 🐛 Troubleshooting

### Links still point to localhost

- Make sure you added the environment variable to the **backend** project, not frontend
- Make sure you redeployed after adding the variable
- Check Vercel deployment logs for errors

### Email not sending

- Check backend logs in Vercel
- Verify email service configuration
- Check SMTP credentials

### Token invalid

- Check token expiration time
- Verify token generation logic
- Check database for token storage

## 📞 Need Help?

If you need help finding the right files in your backend:

1. Look for files with "email" in the name
2. Search for "localhost:3000" in the entire backend codebase
3. Check the auth controller or service files
4. Look in the utils or helpers folder

## ✅ Expected Result

After fixing:

- ✅ Registration emails contain production URL
- ✅ Password reset emails contain production URL
- ✅ All email links work on production
- ✅ No more localhost links in emails
