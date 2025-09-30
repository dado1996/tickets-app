# Ticket App

Created by Diego Delgado
diego.960705@gmail.com

## Configuration

- Setup the environment variables using the `.env.example` file
- Run `npm run dev|yarn run dev` for a develoment environment
- Or if you want to deploy it into production, run `npm run build|yarn run build` and copy the generated files in `dist/` into the server you wish to deploy

## Technical decisions

- The auth0 was implemented simple enough using google auth to not rely on an user table
- The home only contains a button that leads to the tickets lists and form and a logout link to simplify the view and agilize development
- The ingest was programmed using a cron job from vercel setup in the vercel.json configuration file

## Missing features

- Configuring the ingest command
- BI / Metabase implementation
- Minor adjustments on visual components

## Tech Stack

- Next.js
- Vercel
- Prisma
- Supabase
- ESLint
- Shadcn
- Tailwind
- Auth0
