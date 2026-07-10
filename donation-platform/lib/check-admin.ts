import { auth } from './auth'
import { NextResponse } from 'next/server'

export async function checkAdmin() {
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session || (role !== 'ADMIN' && role !== 'SUPER_ADMIN')) {
    return { authorized: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  return { authorized: true, session }
}
