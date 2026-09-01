# SPARK GitHub Pages deployment

Repository: https://github.com/odanemaestro/sparkcxc

Expected Pages URL: https://odanemaestro.github.io/sparkcxc/

This package already includes the code-side deployment preparation:

- `homepage` is set for `/sparkcxc`.
- `.env` and all local environment variants are ignored by Git.
- Paper 1 public JSON fetch paths use `PUBLIC_URL`.
- Adaptive Practice manifest and topic fetch paths use `PUBLIC_URL`.
- CXC lesson SVG paths use `PUBLIC_URL`.
- Supabase password recovery and Google login redirects include the Pages base path.
- `.github/workflows/deploy.yml` builds and deploys the React app to GitHub Pages.

Before the first deployment, add these GitHub Actions repository secrets:

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

Then set Settings > Pages > Build and deployment > Source to GitHub Actions.

In Supabase Authentication > URL Configuration, allow:

- `http://localhost:3000`
- `http://localhost:3000/`
- `https://odanemaestro.github.io/sparkcxc`
- `https://odanemaestro.github.io/sparkcxc/`

Run the latest Supabase migrations before testing parent exam results.

## Local testing

The deployment ZIP intentionally does not include `.env`. Copy your existing local `.env` into the project root before running `npm start`. Git will ignore it.
