// The registration map: one entry per Storyblok block, keyed by the block's
// technical name. Add new blocks here, in alphabetical order.
import Feature from './Feature';
import Grid from './Grid';
import Page from './Page';
import Teaser from './Teaser';
import TestimonialCard from './TestimonialCard';

export const components = {
  feature: Feature,
  grid: Grid,
  page: Page,
  teaser: Teaser,
  testimonial_card: TestimonialCard,
};
