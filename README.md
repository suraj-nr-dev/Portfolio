# Suraj N - Portfolio

Single-page portfolio built with React, Vite, and plain CSS. No UI, CSS, or animation libraries.

## Run it

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build locally
```

## Where to edit

| What | Where |
| --- | --- |
| All text, links, stats, projects | `src/data/portfolioData.js` |
| Placeholders still to fill in | search for `[ADD` in `src/data/portfolioData.js` |
| Colours, fonts, radii (dark + light) | `:root` blocks at the top of `src/styles/global.css` |
| CSS animation speed | `--speed-fast`, `--speed`, `--speed-slow`, `--reveal-distance` in `src/styles/global.css` |
| Typing, count-up, loader, stagger timing | `animation` object in `src/data/portfolioData.js` |
| CV file for the Download button | replace `public/Suraj_N_CV.docx` (or add a PDF and update `cvFile`) |
| Profile photo | add the image to `public/` and set `personal.photo` |
| Page title and meta description | `index.html` |

## Deploy

**Vercel:** push the project to GitHub, import the repo at vercel.com/new, keep the detected
Vite settings (build `npm run build`, output `dist`), and deploy.

**Netlify:** push to GitHub, choose "Add new site > Import an existing project", set the build
command to `npm run build` and the publish directory to `dist`, and deploy.
