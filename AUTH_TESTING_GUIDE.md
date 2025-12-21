# Authentication Flow Testing Guide

## ✅ All Authentication Endpoints Configured

All authentication flows are properly configured with the correct API endpoints:

### 1. **Registration** (`/auth?mode=register`)

- **Endpoint**: `POST /v1/auth/register`
- **File**: `src/app/(guest)/auth/components/register.tsx`
- **Status**: ✅ Configured
- **Features**:
  - Form validation with Zod schema
  - Proper error handling
  - Redirects to home with `?registered=true` on success
  - Handles "user already exists" gracefully

### 2. **Login** (`/auth?mode=login`)

- **Endpoint**: `POST /v1/auth/login`
- **File**: `src/app/(guest)/auth/components/login.tsx`
- **Status**: ✅ Configured
- **Features**:
  - Form validation
  - Token storage (localStorage + cookie)
  - User data storage
  - Redirects to home on success
  - Proper error handling

### 3. **Forgot Password** (`/auth/forget-password`)

- **Endpoint**: `POST /v1/auth/forgot-password`
- **File**: `src/app/(guest)/auth/forget-password/page.tsx`
- **Status**: ✅ Configured
- **Features**:
  - Email validation
  - Success message (security: doesn't reveal if email exists)
  - Links to Sign In and Sign Up
  - Proper error handling

### 4. **Email Verification** (`/auth/verify-email?token=xxx`)

- **Endpoint**: `POST /v1/auth/verify-email`
- **File**: `src/app/(guest)/auth/verify-email/page.tsx`
- **Status**: ✅ Configured
- **Features**:
  - Automatic verification on page load
  - Loading state with spinner
  - Success/Error states
  - Redirects to login after verification
  - Proper error handling

### 5. **Reset Password** (`/auth/reset-password?token=xxx`)

- **Endpoint**: `POST /v1/auth/reset-password`
- **File**: `src/app/(guest)/auth/reset-password/reset-password.form.tsx`
- **Status**: ✅ Configured
- **Features**:
  - Password confirmation validation
  - Token from URL query params
  - Optional auto-login after reset
  - Proper error handling

## 🔧 Technical Implementation

### API Configuration

- **Base URL**: `/api/proxy` (proxies to `https://fayrashop-ssr.vercel.app`)
- **All endpoints use**: `/v1/auth/*` prefix
- **Error handling**: TypeScript `unknown` type for better type safety
- **Token storage**: localStorage + HTTP-only cookie

### Type Safety

All components use:

- ✅ Zod schemas for validation
- ✅ TypeScript strict mode
- ✅ Proper error type checking (`error instanceof Error`)
- ✅ No `any` types

## 🧪 Testing Checklist

### Local Testing (http://localhost:3000)

- [ ] Register new user
- [ ] Check email for verification link
- [ ] Click verification link (should verify email)
- [ ] Login with verified account
- [ ] Test "Forgot Password" flow
- [ ] Check email for reset link
- [ ] Reset password successfully
- [ ] Login with new password

### Production Testing (https://fayrashop.vercel.app)

- [ ] Register new user
- [ ] Verify email verification link points to production URL
- [ ] Complete email verification
- [ ] Login successfully
- [ ] Test forgot password
- [ ] Verify reset link points to production URL
- [ ] Complete password reset
- [ ] Login with new password

## ⚠️ Known Issues & Solutions

### Issue: Email links point to localhost

**Cause**: Backend sends localhost URLs in emails

**Solution**: Configure backend environment variable:

```env
FRONTEND_URL=https://fayrashop.vercel.app
```

Then update backend code to use this variable when generating email links.

### Issue: CORS errors

**Cause**: Direct API calls without proxy

**Solution**: Already fixed! All requests go through `/api/proxy`

## 📝 Environment Variables Required

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=https://fayrashop-ssr.vercel.app
NEXT_PUBLIC_APP_URL=https://fayrashop.vercel.app
```

### Backend (fayrashop-ssr)

```env
FRONTEND_URL=https://fayrashop.vercel.app
```

### Vercel Environment Variables

Add in Vercel Dashboard > Settings > Environment Variables:

- `NEXT_PUBLIC_API_URL` = `https://fayrashop-ssr.vercel.app`
- `NEXT_PUBLIC_APP_URL` = `https://fayrashop.vercel.app`

## 🎯 Next Steps

1. ✅ All frontend code is configured correctly
2. ⏳ Configure backend `FRONTEND_URL` environment variable
3. ⏳ Add Vercel environment variables
4. ⏳ Test all flows in production
5. ⏳ Verify email links point to correct domain

## 📚 Related Files

- `src/lib/api-config.ts` - API client configuration
- `src/app/(guest)/auth/schema/index.ts` - Validation schemas
- `next.config.ts` - API proxy configuration
- `API_CONFIGURATION.md` - Detailed API setup guide
