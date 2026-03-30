# Copilot Instructions

This repository is a React + TypeScript SPA starter built with Vite. It is meant to be cloned, renamed, and reshaped quickly into a browser-first single page app without rebuilding the shell, settings, testing, and Pages deployment setup from scratch.

## Quick Reference

- **Dev:** `npm run dev`
- **Lint:** `npm run lint`
- **Typecheck:** `npm run typecheck`
- **Test:** `npm run test:run`
- **Build:** `npm run build`
- **Generate app icons:** `npm run generate-icons`

## Project Structure

```text
src/           - Application source (React + TypeScript)
src/test/      - Vitest setup
public/        - Static assets, manifest, and generated PWA icons
scripts/       - Utility scripts such as icon generation
.github/       - CI/CD workflows and Copilot instructions
dist/          - Production build output (generated)
```

## Key Constraints

- TypeScript strict mode is enabled; keep app code in TypeScript.
- Node.js 22 is required (see `.node-version`).
- The starter is built on React 19, Vite 7, Vitest 4, and ESLint 9.
- `vite.config.ts` intentionally uses `base: './'` so GitHub Pages deployments work with relative asset paths.
- The shell and controls come from `@mattgotteiner/spa-ui-controls`; preserve that integration unless the app is intentionally replacing it.
- If branding changes affect app icons or PWA metadata, update `scripts/generate-icons.mjs`, regenerate the assets, and keep `public/manifest.json` in sync.
- Tests are expected for behavior changes, not just happy-path manual validation.

## When Customizing the Starter

Update these files early when turning the starter into a new app:

- `package.json`
- `README.md`
- `index.html`
- `public/manifest.json`
- `src/App.tsx`
- `src/types/index.ts`
- `scripts/generate-icons.mjs`

Also update the repository URL in `src/App.tsx` so the header link points at the new project instead of `spa-starter`.

## Before Committing

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test:run`
4. `npm run build`
5. `npm run generate-icons` if icon or branding inputs changed

## Deployment

- Pushing to `main` triggers the CI workflow and the GitHub Pages deployment workflow in `.github/workflows/deploy.yml`.
- GitHub Pages must be enabled in the repository settings before the deploy workflow can publish successfully.
- The deploy workflow uploads the built `dist/` directory as the Pages artifact.
