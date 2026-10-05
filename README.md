# Water Lily Atelier

Next.js App Router website using React and plain CSS.

## Local development

```powershell
cd water-lily
npm install
npm run dev
```

Open http://127.0.0.1:4173. Changes update automatically. Stop with Ctrl+C.

## Production preview

```powershell
npm run build
npm start
```

Stop the development server first; both use port 4173. Next.js exports the production website into `out/`. This static export supports the current homepage, without a payment or inventory backend.

## Files

- `app/page.jsx`: assembles the homepage sections.
- `app/layout.jsx`: page metadata and document layout.
- `app/globals.css`: existing visual design and responsive rules.
- `components/`: individual page sections; collection-context.jsx shares category selection between the header and gallery.
- `lib/collections.js`: category descriptions.
- `public/assets/`: jewellery images.
- `next.config.mjs`: Next.js static-export settings.
- `preview.cjs`: local server for the production export.
- `.openai/hosting.json`: existing Sites project, publishing `out/`.
- `package-lock.json`: exact dependency versions.

The previous plain HTML version is preserved outside this project at `../legacy-static/`. Edit the Next.js source, not `.next/` or `out/`, which are generated. Product photos remain illustrative, bracelets are coming soon, and booking/payment services are not connected.
