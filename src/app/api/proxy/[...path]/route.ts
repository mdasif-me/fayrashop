import { NextRequest, NextResponse } from 'next/server'

async function proxy(_req: NextRequest, _ctx: { params: Promise<{ path: string[] }> }) {
  void _req
  void _ctx
  return NextResponse.json({ message: 'API disabled (design-only mode)' }, { status: 410 })
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE }
