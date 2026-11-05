import { notFound } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function StoryPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const fullSlug = slug?.join('/') || 'home';

  // Preview deployments show drafts, so the Visual Editor and the agent's demo
  // stories render. Production shows published content only.
  const version = process.env.VERCEL_ENV === 'production' ? 'published' : 'draft';

  try {
    const { data } = await getStoryblokApi().get(`cdn/stories/${fullSlug}`, { version });
    return <StoryblokStory story={data.story} />;
  } catch {
    notFound();
  }
}
