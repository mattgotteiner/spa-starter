# Bootstrapping a SPA Repo from `spa-starter`

This guide is for an agent creating a brand-new GitHub repository from the contents of `spa-starter`. Follow the sequence in order so the new repo is branded correctly, passes validation, and can deploy to GitHub Pages without missing setup steps.

## 1. Create the GitHub repository

1. Create an empty GitHub repository for the new app.
2. Copy the contents of `spa-starter` into the new working tree.
3. Add the new GitHub remote and confirm pushes will go to the new repository, not back to `spa-starter`.
4. Create a feature branch for the bootstrap work instead of editing directly on `main`.

## 2. Authenticate and install dependencies

1. Use Node.js 22 or newer (`.node-version` is the source of truth).
2. Log in to the `@mattgotteiner` package registry scope:

   ```bash
   npm login --scope=@mattgotteiner --auth-type=legacy --registry=https://npm.pkg.github.com
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the app locally if needed:

   ```bash
   npm run dev
   ```

## 3. Rebrand the starter before writing new features

Update the app identity first so the starter does not ship with placeholder metadata.

- `package.json` - app name, description, and any repo-specific metadata
- `README.md` - replace starter language with app-specific setup notes
- `index.html` - browser title, theme color, and Apple app title
- `public/manifest.json` - PWA name, short name, description, theme colors, and icon metadata
- `src/App.tsx` - visible product copy and the repository link in the header
- `src/types/index.ts` - storage key defaults and starter app title

If the new app changes the settings model, continue through:

- `src/hooks/useSettings.ts`
- `src/context/SettingsContext.tsx`
- `src/components/SettingsPanel/SettingsPanel.tsx`
- `src/components/SettingsSidebar/SettingsSidebar.tsx`

For rollout and theming consistency:

- Use the color scheme and shared design tokens from `@mattgotteiner/spa-ui-controls`; do not invent a separate app palette in `src/index.css` or component styles.
- If the app has appearance settings that the control library supports, wire those settings into `ThemeProvider`, `ThemeToggle`, or related `@mattgotteiner/spa-ui-controls` primitives instead of maintaining a parallel theme system.

## 4. Create the app logo and PWA icons

Do not leave the starter icon set in place for a real app.

1. Update `scripts/generate-icons.mjs` so the generated artwork matches the new product branding.
2. If the app also needs a matching vector tab icon, update `public/favicon.svg`.
3. Regenerate the bitmap favicon and PWA assets:

   ```bash
   npm run generate-icons
   ```

4. Confirm these files were refreshed:

- `public/apple-touch-icon.png`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/favicon.ico`

5. Keep `public/manifest.json` aligned with the generated icon files and new app name.

## 5. Keep GitHub Pages deployment working

This starter is already wired for Pages, but the repository still has to be enabled correctly.

1. Keep `vite.config.ts` using `base: './'` unless there is a deliberate reason to change Pages asset behavior.
2. Confirm `.github/workflows/deploy.yml` is present in the new repo.
3. In GitHub, open **Settings** -> **Pages** and enable GitHub Pages for the repository.
4. If GitHub asks for a deployment source, use **GitHub Actions** so the included deploy workflow can publish the `dist/` artifact.
5. After the first merge to `main`, verify the Pages workflow runs and the site publishes successfully.

## 6. Validate before opening the PR

Run the standard checks:

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
```

If icon inputs changed, rerun:

```bash
npm run generate-icons
```

Then review the diff to make sure the repo name, manifest metadata, repository URL, and icon assets all match the new app.

## 7. Open and merge the bootstrap PR

1. Commit the starter-to-app bootstrap changes on the feature branch.
2. Push the branch to the new repository.
3. Open a pull request into `main`.
4. Merge only after validation passes.
5. Confirm the `main` branch triggers CI and GitHub Pages deployment as expected.

## 8. Post-merge verification

After merge:

1. Open the deployed site.
2. Check the browser title, favicon, and manifest-backed install metadata.
3. Verify the GitHub link in the app header points to the new repository.
4. Confirm the app can be installed with the correct icon set on supported devices.
