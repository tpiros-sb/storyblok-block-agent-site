import { notFound } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function StoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const fullSlug = slug?.join('/') || 'home';

  // Draft content in the Visual Editor, which adds a _storyblok parameter, and
  // on preview deployments. Production shows published content otherwise.
  const inEditor = '_storyblok' in (await searchParams);
  const version = inEditor || process.env.VERCEL_ENV !== 'production' ? 'draft' : 'published';

  try {
    const { data } = await getStoryblokApi().get(`cdn/stories/${fullSlug}`, { version });
    return <StoryblokStory story={data.story} />;
  } catch {
    notFound();
  }
}
