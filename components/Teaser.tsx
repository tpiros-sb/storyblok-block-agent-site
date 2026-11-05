import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';

interface TeaserBlok extends SbBlokData {
  headline?: string;
}

export default function Teaser({ blok }: { blok: TeaserBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="teaser">
      <h2>{blok.headline}</h2>
    </div>
  );
}
