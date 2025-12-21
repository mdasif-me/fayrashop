import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

function getApiBaseUrl() {
  const raw = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
  if (!raw) return null
  return raw.replace(/\/+$/, '')
}

function getRequestHeaders(request: NextRequest) {
  const headers = new Headers(request.headers)

  headers.delete('host')
  headers.delete('connection')
  headers.delete('content-length')
  headers.delete('accept-encoding')

  return headers
}

function getResponseHeaders(headers: Headers) {
  const out = new Headers(headers)

  out.delete('content-encoding')
  out.delete('content-length')
  out.delete('transfer-encoding')

  return out
}

async function proxy(request: NextRequest, params: { path?: string[] }) {
  const baseUrl = getApiBaseUrl()
  if (!baseUrl) {
    return Response.json(
      {
        message:
          'Missing API base URL. Set API_URL (recommended) or NEXT_PUBLIC_API_URL in the environment.',
      },
      { status: 500 }
    )
  }

  const path = Array.isArray(params.path) ? params.path.join('/') : ''
  const search = request.nextUrl.search
  const targetUrl = `${baseUrl}/${path}${search}`

  const method = request.method.toUpperCase()

  const init: RequestInit = {
    method,
    headers: getRequestHeaders(request),
    redirect: 'manual',
  }

  if (method !== 'GET' && method !== 'HEAD') {
    init.body = await request.arrayBuffer()
  }

  const upstream = await fetch(targetUrl, init)

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: getResponseHeaders(upstream.headers),
  })
}

export async function GET(request: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(request, ctx.params)
}

export async function POST(request: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(request, ctx.params)
}

export async function PUT(request: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(request, ctx.params)
}

export async function PATCH(request: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(request, ctx.params)
}

export async function DELETE(request: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(request, ctx.params)
}

export async function OPTIONS(request: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(request, ctx.params)
}

export async function HEAD(request: NextRequest, ctx: { params: { path?: string[] } }) {
  return proxy(request, ctx.params)
}
