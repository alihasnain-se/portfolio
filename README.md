# Ali Hasnain — Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · self-hosted fonts (Fontsource).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

All content (projects, skills + proficiency %, education, contact links) lives in `src/data/portfolio.ts`.
Project thumbnails are in `public/posters/`, demo videos in `public/videos/`.

## Testing on your phone

- Quickest and closest to production: `npm run build && npm start`, then open `http://<your-PC-IP>:3000` on the phone.
- With `npm run dev`, the phone must be allowed in `allowedDevOrigins` (see `next.config.ts`; common home/office ranges are already listed). Restart the dev server after changing it.
