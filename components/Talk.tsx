import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

interface RelatedPick {
  uuid: string;
  title: string;
  reason: string;
}

interface TalkBlok extends SbBlokData {
  title?: string;
  abstract?: string;
  speaker_name?: string;
  speaker_company?: string;
  day?: string;
  start_time?: string;
  duration?: string;
  room?: string;
  level?: string;
  topics?: string[];
  related_talks?: { picks?: RelatedPick[] };
}

// The field stores each pick's uuid, so links follow a talk that was renamed or moved.
async function relatedLinks(picks: RelatedPick[]) {
  if (picks.length === 0) return new Map<string, string>();
  const { data } = await getStoryblokApi().get('cdn/stories', {
    by_uuids: picks.map((pick) => pick.uuid).join(','),
    version: 'published',
  });
  return new Map<string, string>(data.stories.map((story: { uuid: string; full_slug: string }) => [story.uuid, story.full_slug]));
}

export default async function Talk({ blok }: { blok: TalkBlok }) {
  const picks = blok.related_talks?.picks ?? [];
  const links = await relatedLinks(picks);

  return (
    <article {...storyblokEditable(blok)} className="talk">
      <p className="talk-meta">
        {[blok.day?.replace('day-', 'Day '), blok.start_time, blok.room, blok.duration && `${blok.duration} min`, blok.level]
          .filter(Boolean)
          .join(' · ')}
      </p>
      <h1>{blok.title}</h1>
      <p className="talk-speaker">
        {blok.speaker_name}
        {blok.speaker_company ? `, ${blok.speaker_company}` : ''}
      </p>
      <p>{blok.abstract}</p>
      {blok.topics?.length ? <p className="talk-topics">{blok.topics.join(' · ')}</p> : null}

      <section className="related">
        <h2>Related talks</h2>
        {picks.length === 0 ? (
          <p className="related-empty">No related talks yet.</p>
        ) : (
          <ul>
            {picks.map((pick) => (
              <li key={pick.uuid}>
                {links.has(pick.uuid) ? <a href={`/${links.get(pick.uuid)}`}>{pick.title}</a> : <strong>{pick.title}</strong>}
                <span>{pick.reason}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
