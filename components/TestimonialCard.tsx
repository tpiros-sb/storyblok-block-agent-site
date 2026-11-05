import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';

interface TestimonialAsset {
  filename?: string;
  alt?: string;
}

interface TestimonialCardBlok extends SbBlokData {
  quote?: string;
  name?: string;
  role?: string;
  company?: string;
  photo?: TestimonialAsset;
}

export default function TestimonialCard({ blok }: { blok: TestimonialCardBlok }) {
  const attribution = [blok.role, blok.company].filter(Boolean).join(', ');

  return (
    <figure {...storyblokEditable(blok)} className="testimonial-card">
      <blockquote>{blok.quote}</blockquote>
      <figcaption>
        {blok.photo?.filename ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blok.photo.filename}
            alt={blok.photo.alt ?? ''}
            width={48}
            height={48}
          />
        ) : null}
        <strong>{blok.name}</strong>
        {attribution ? <span>{attribution}</span> : null}
      </figcaption>
    </figure>
  );
}
