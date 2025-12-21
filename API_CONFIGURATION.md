# FayraShop - API Configuration Guide

## Environment Variables

This project requires the following environment variables to be set:

### Required Variables

1. **NEXT_PUBLIC_API_URL**
   - Description: Backend API URL (where your API server is hosted)
   - Example: `https://fayrashop-ssr.vercel.app`
   - Used for: All API requests from the frontend

2. **NEXT_PUBLIC_APP_URL**
   - Description: Frontend App URL (where your Next.js app is hosted)
   - Example: `https://fayrashop.vercel.app`
   - Used for: Generating email verification links and other frontend URLs

### Local Development

For local development, create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://fayrashop-ssr.vercel.app
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production (Vercel)

In your Vercel project settings, add these environment variables:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following:
   - `NEXT_PUBLIC_API_URL` = `https://fayrashop-ssr.vercel.app`
   - `NEXT_PUBLIC_APP_URL` = `https://fayrashop.vercel.app`

## API Configuration

The application uses a proxy pattern to avoid CORS issues:

- All API requests go through `/api/proxy/*`
- Next.js rewrites these to the actual backend URL
- This is configured in `next.config.ts`

## Email Verification

**Important**: The backend needs to be configured to use the correct frontend URL when generating email verification links.

In your backend (fayrashop-ssr), ensure you have an environment variable like:

- `FRONTEND_URL` or `CLIENT_URL` = `https://fayrashop.vercel.app`

This ensures email verification links point to the correct domain instead of localhost.

## Files Modified

1. `next.config.ts` - API proxy configuration
2. `src/lib/api-config.ts` - API client configuration
3. `src/utils/constants.ts` - App URL constants
4. All auth components - Updated to use `/v1` endpoints

## Testing

After deployment:

1. Test registration flow
2. Check email verification links (should point to production URL)
3. Test login flow
4. Verify all API calls work correctly

## Troubleshooting

If you see CORS errors:

- Ensure `NEXT_PUBLIC_API_URL` is set correctly
- Restart your development server after changing `.env`
- Clear browser cache

If email verification links point to localhost:

- Update backend environment variable `FRONTEND_URL`
- Redeploy backend
