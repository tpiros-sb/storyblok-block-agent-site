import { storyblokEditable, StoryblokServerComponent, type SbBlokData } from '@storyblok/react/rsc';

interface GridBlok extends SbBlokData {
  columns?: SbBlokData[];
}

export default function Grid({ blok }: { blok: GridBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="grid">
      {blok.columns?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
