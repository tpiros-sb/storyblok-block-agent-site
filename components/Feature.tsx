import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';

interface FeatureBlok extends SbBlokData {
  name?: string;
}

export default function Feature({ blok }: { blok: FeatureBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="feature">
      <span>{blok.name}</span>
    </div>
  );
}
