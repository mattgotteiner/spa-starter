# SPA Starter

An opinionated React + TypeScript + Vite starter for small browser-first single page apps that should feel complete on first run.

It ships with:

- `@mattgotteiner/spa-ui-controls` app shell wiring
- a ready-to-edit settings system
- GitHub Pages-friendly Vite defaults
- favicon and PWA assets
- ESLint, typecheck, Vitest, and Testing Library
- GitHub Actions for CI and Pages deploy

## Prerequisites

- Node.js 22+
- Access to the `@mattgotteiner` GitHub Packages scope for `@mattgotteiner/spa-ui-controls`

## Getting started locally

```bash
npm login --scope=@mattgotteiner --auth-type=legacy --registry=https://npm.pkg.github.com
npm install
npm run dev
```

Then open the Vite URL and replace the starter panels with your app.

## What to customize first

### App title and shell copy

Edit:

- `index.html`
- `public/manifest.json`
- `src/App.tsx`
- `src/types/index.ts`

### Settings

The starter settings flow lives in:

- `src/types/index.ts`
- `src/hooks/useSettings.ts`
- `src/context/SettingsContext.tsx`
- `src/components/SettingsSidebar/SettingsSidebar.tsx`
- `src/components/SettingsPanel/SettingsPanel.tsx`

Add fields to `AppSettings`, update `DEFAULT_SETTINGS`, normalize them in `useSettings`, then render the controls you need in `SettingsPanel`.

### Icons and manifest metadata

Edit the labels and colors in:

- `public/manifest.json`
- `scripts/generate-icons.mjs`
- `index.html`

Then regenerate icons:

```bash
npm run generate-icons
```

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

## GitHub Pages deployment

The repository includes:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`

For GitHub-hosted installs, the workflows already use `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` with `actions/setup-node` configured for the `@mattgotteiner` scope.

After pushing the repo:

1. Enable GitHub Pages for the repository.
2. Keep the default `base: './'` Vite setting for relative asset paths.
3. Let the deploy workflow publish the built `dist/` artifact.

## Project structure

```text
src/
  components/
    SettingsPanel/
    SettingsSidebar/
  context/
  hooks/
  test/
  types/
  utils/
```

This starter is meant to be replaced in pieces, not protected. Delete example settings, sample content, and helper copy as soon as your real app shape is clear.
