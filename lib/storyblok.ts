import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { components } from '@/components';

type Region = 'eu' | 'us' | 'ca' | 'ap' | 'cn';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: (process.env.STORYBLOK_REGION ?? 'eu') as Region,
  },
});
