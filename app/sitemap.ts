import { MetadataRoute } from 'next';

import { PATH } from '@/constants/paths';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://weather-link.site';

  const staticRoutes = Object.values(PATH).map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as ChangeFrequency,
    priority: route === PATH.root ? 1 : 0.8,
  }));

  return [...staticRoutes];
}
