/**
 * Seed default campaigns into the database
 * 
 * Usage: npx tsx scripts/seed-campaigns.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const campaigns = [
  {
    slug: 'square-feet-seva',
    title: 'Square Feet Seva',
    description: 'Be a brick in the foundation of this divine temple. Sponsor square feet and earn eternal merit. Every square foot of the temple carries the name and blessings of its donor. This is a rare opportunity to be permanently associated with a sacred place of worship.',
    category: 'construction',
    goalAmount: 10000000,
    isFeatured: true,
    isActive: true,
  },
  {
    slug: 'anna-daan',
    title: 'Anna Daan Seva',
    description: 'Feed hundreds of devotees and underprivileged people. Anna Daan is considered the greatest form of charity in our scriptures. The food distributed through this program nourishes not just the body but also the soul. Every meal served earns immeasurable punya.',
    category: 'charitable',
    goalAmount: 2000000,
    isFeatured: true,
    isActive: true,
  },
  {
    slug: 'cow-shed-seva',
    title: 'Cow Shed Seva',
    description: 'Help build a modern, spacious gaushala to care for and protect holy cows. The cow is considered divine in our culture and her protection is a sacred duty. A proper cow shed ensures their safety, comfort, and wellbeing throughout the year.',
    category: 'construction',
    goalAmount: 2000000,
    isFeatured: false,
    isActive: true,
  },
  {
    slug: 'gau-seva',
    title: 'Gau Seva',
    description: 'Support the daily care, feeding, and medical needs of cows residing in our gaushala. Gau Mata is considered the abode of all deities in Hindu tradition. Supporting Gau Seva brings tremendous blessings and removes obstacles from one\'s life.',
    category: 'charitable',
    goalAmount: 3000000,
    isFeatured: true,
    isActive: true,
  },
  {
    slug: 'poor-feeding',
    title: 'Poor Feeding',
    description: 'Provide nutritious meals to those in need in our community. Your donation can feed a family for a day and bring smiles to hungry faces. This program operates daily across multiple locations and serves hundreds of people every single day.',
    category: 'charitable',
    goalAmount: 1000000,
    isFeatured: false,
    isActive: true,
  },
  {
    slug: 'khichadi-distribution',
    title: 'Khichadi Distribution',
    description: 'Distribute khichadi to the poor and needy on auspicious Ekadashi occasions. Simple food, great punya. This program distributes nutritious khichadi to hundreds of people every Ekadashi, making it a deeply sacred and impactful act of service.',
    category: 'ekadashi',
    goalAmount: 500000,
    isFeatured: false,
    isActive: true,
  },
  {
    slug: 'gita-daan',
    title: 'Gita Daan',
    description: 'Donate Bhagavad Gita books to spread the divine wisdom. The gift of knowledge is the greatest gift one can give. Help us place the sacred words of Lord Krishna in as many hands as possible — in schools, hospitals, prisons, and homes.',
    category: 'other',
    goalAmount: 250000,
    isFeatured: false,
    isActive: true,
  },
  {
    slug: 'general-donation',
    title: 'General Donation',
    description: 'Support the overall mission with a general donation that goes towards the highest priority needs — whether temple construction, feeding programs, or cow care. Your contribution will be directed where it is needed most.',
    category: 'other',
    goalAmount: null,
    isFeatured: false,
    isActive: true,
  },
]

async function main() {
  console.log('🌱 Seeding campaigns...')

  for (const campaign of campaigns) {
    const existing = await prisma.campaign.findUnique({ where: { slug: campaign.slug } })
    if (existing) {
      console.log(`  ⏭️  Skipping: ${campaign.title} (already exists)`)
      continue
    }
    await prisma.campaign.create({ data: campaign })
    console.log(`  ✅ Created: ${campaign.title}`)
  }

  console.log('\n✅ Campaign seeding complete!')
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
