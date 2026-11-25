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

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return [parts[0], parts.length > 1 ? parts[parts.length - 1] : '']
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

export default async function Talk({ blok }: { blok: TalkBlok }) {
  const picks = blok.related_talks?.picks ?? [];
  const links = await relatedLinks(picks);

  const facts = [
    ['Day', blok.day?.replace('day-', '')],
    ['Starts', blok.start_time],
    ['Room', blok.room],
    ['Length', blok.duration && `${blok.duration} min`],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <main {...storyblokEditable(blok)} className="talk" data-day={blok.day}>
      <article className="talk-body">
        <header className="talk-hero">
          {blok.topics?.length ? (
            <ul className="talk-topics" aria-label="Topics">
              {blok.topics.map((topic) => (
                <li key={topic} data-topic={topic}>
                  {topic}
                </li>
              ))}
            </ul>
          ) : null}
          {blok.level ? (
            <p className="talk-level">
              <span className="visually-hidden">Level: </span>
              {blok.level}
            </p>
          ) : null}
          <h1>{blok.title}</h1>
          {blok.speaker_name ? (
            <p className="talk-speaker">
              <span className="talk-speaker-mark" aria-hidden="true">
                {initials(blok.speaker_name)}
              </span>
              <span className="talk-speaker-name">{blok.speaker_name}</span>
              {blok.speaker_company ? <span className="talk-speaker-company">{blok.speaker_company}</span> : null}
            </p>
          ) : null}
        </header>
        {facts.length ? (
          <div className="talk-ticket">
            <dl>
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
        <p className="talk-abstract">{blok.abstract}</p>
      </article>

      <section className="related" aria-labelledby="related-heading">
        <h2 id="related-heading">
          <span>Related talks</span>
        </h2>
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
    </main>
  );
}
