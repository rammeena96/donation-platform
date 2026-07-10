import { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://divinemission.org'

const campaignSlugs = [
  'square-feet-seva', 'anna-daan', 'cow-shed-seva', 'gau-seva',
  'poor-feeding', 'khichadi-distribution', 'gita-daan', 'general-donation',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/campaigns`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/donate`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const campaignRoutes: MetadataRoute.Sitemap = campaignSlugs.map(slug => ({
    url: `${base}/campaign/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...campaignRoutes]
}
