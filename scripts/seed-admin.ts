/**
 * Seed Script — Creates an admin user for the dashboard
 * 
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 * 
 * Or install ts-node:
 *   npm install -D tsx
 *   npx tsx scripts/seed-admin.ts
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@divinemission.org'
  const password = process.env.ADMIN_PASSWORD || 'Admin@123!'
  const name = process.env.ADMIN_NAME || 'Admin'

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log(`Admin already exists: ${email}`)
    if (existing.role !== 'ADMIN') {
      await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } })
      console.log('Role updated to ADMIN')
    }
    return
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log(`✅ Admin created successfully!`)
  console.log(`   Email: ${user.email}`)
  console.log(`   Password: ${password}`)
  console.log(`   Login at: /admin/login`)
  console.log(`\n⚠️  Change the password after first login!`)
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
