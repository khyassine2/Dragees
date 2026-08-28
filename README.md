# Dragées & Fiançailles

Site vitrine pour une maison de dragées, buffet et décoration de fiançailles à
Fès. Élégance, raffinement & détails parfaits.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- GSAP + Lenis pour les animations et le défilement

## Démarrer

```bash
pnpm install
pnpm dev
```

Le site est servi sur http://localhost:3000.

Pour l'ouvrir depuis un téléphone sur le même réseau, l'IP locale doit figurer
dans `allowedDevOrigins` (`next.config.ts`), sinon Next bloque les scripts du
serveur de développement.

## Scripts

| Commande            | Rôle                          |
| ------------------- | ----------------------------- |
| `pnpm dev`          | Serveur de développement      |
| `pnpm build`        | Build de production           |
| `pnpm start`        | Sert le build de production   |
| `pnpm lint`         | Analyse statique (oxlint)     |
| `pnpm check:types`  | Vérification TypeScript       |

## Pages

- `/` — accueil
- `/prestations` et `/prestations/[slug]` — dragées, buffet, décoration
- `/galerie` — réalisations
- `/a-propos` — la maison
- `/rendez-vous` — prise de rendez-vous et devis

## À compléter

Les photographies sont des visuels Unsplash temporaires et les tarifs des
formules sont indicatifs : les deux sont à remplacer par les contenus réels
avant la mise en ligne.
