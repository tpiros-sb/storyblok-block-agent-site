# Conventions for agents working in this repository

This is a Next.js App Router site that renders Storyblok content with
`@storyblok/react/rsc`.

## Adding a block component

1. Create `components/<PascalCaseName>.tsx` with a default export that takes
   `{ blok }`.
2. Spread `storyblokEditable(blok)` on the component's root element, so editors
   can select it in the Visual Editor.
3. Type the props with an interface that extends `SbBlokData` and lists every
   field of the Storyblok block as optional.
4. Render nested `bloks` fields through `StoryblokServerComponent`, never by
   picking child components by hand.
5. Read asset fields from `.filename` and `.alt`, external links from `.url`,
   and internal links from `.cached_url`.
6. Register the component in `components/index.ts`, keyed by the block's exact
   technical name, in alphabetical order.

Style blocks with plain class names in `app/globals.css` only if a block
needs styles. Agents may only change files in `components/`.

## Checking your work

Run `npm run typecheck`. It must pass before you open a pull request.
