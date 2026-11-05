# Demo site

The Next.js site the block agent opens pull requests against. It renders
Storyblok content with `@storyblok/react/rsc` (7.5.0) and keeps every block
component in `components/`, registered in `components/index.ts`.

`AGENTS.md` holds the conventions the agent follows when it adds a block.

Preview deployments fetch draft content, so the agent's draft demo stories
render there. Production fetches published content only.

```bash
cp .env.example .env.local   # add your space's preview access token
npm install
npm run dev
```

Connect the repository to a Vercel project so every branch gets a preview
deployment, and set the same variables there.
