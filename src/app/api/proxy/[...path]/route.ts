import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getUpstreamBaseUrl() {
  const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
  return base?.replace(/\/+$/, '')
}

function buildUpstreamUrl(req: NextRequest, pathSegments: string[] | undefined) {
  const base = getUpstreamBaseUrl()
  if (!base) return null

  const path = (pathSegments || []).join('/')
  const pathname = path ? `/${path}` : ''
  const search = req.nextUrl.search

  return `${base}${pathname}${search}`
}

async function proxy(req: NextRequest, pathSegments: string[] | undefined) {
  const upstreamUrl = buildUpstreamUrl(req, pathSegments)
  if (!upstreamUrl) {
    return NextResponse.json(
      {
        error:
          'Missing upstream API URL. Set API_URL (recommended) or NEXT_PUBLIC_API_URL in Vercel Environment Variables, then redeploy.',
      },
      { status: 500 }
    )
  }

  const method = req.method.toUpperCase()

  const headers = new Headers(req.headers)
  headers.delete('host')
  headers.delete('connection')
  headers.delete('content-length')

  const init: RequestInit = {
    method,
    headers,
    redirect: 'manual',
  }

  if (method !== 'GET' && method !== 'HEAD') {
    const body = await req.arrayBuffer()
    init.body = body
  }

  const upstreamRes = await fetch(upstreamUrl, init)

  const resHeaders = new Headers(upstreamRes.headers)
  // These can cause issues when streaming through NextResponse
  resHeaders.delete('content-encoding')
  resHeaders.delete('transfer-encoding')

  return new NextResponse(upstreamRes.body, {
    status: upstreamRes.status,
    headers: resHeaders,
  })
}

export async function GET(req: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(req, ctx.params.path)
}

export async function POST(req: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(req, ctx.params.path)
}

export async function PUT(req: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(req, ctx.params.path)
}

export async function PATCH(req: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(req, ctx.params.path)
}

export async function DELETE(req: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(req, ctx.params.path)
}

export async function OPTIONS(req: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(req, ctx.params.path)
}
