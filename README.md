# Ujala Wishlist

A Next.js waitlist app for collecting early access signups for the Ujala product. The landing page invites visitors to join the list, captures a lightweight browser fingerprint to reduce duplicate signups, and provides an admin dashboard to monitor new registrations and manage account settings.

## Overview

This project is designed for a product launch funnel:

- A clean landing page with a simple email capture form
- Browser fingerprinting based on screen size, color depth, timezone, language, IP address, and user agent
- Duplicate prevention by matching similar fingerprint data before creating a new subscriber record
- A secured admin dashboard for viewing signups over the last 30 days
- Configurable admin password and welcome email template stored in the database

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- Recharts for the signup chart

## Features

### Public landing page

The home page renders a minimal product teaser with a form that accepts an email address. When a user submits, the app gathers browser metadata and creates or reuses a fingerprint record before saving the subscriber.

### Fingerprint-based deduplication

The app stores fingerprint attributes in the `Fingerprint` model and uses those fields to find an existing user instead of creating duplicates. This helps avoid multiple signups from the same browser/session profile.

### Admin dashboard

Protected admin routes show:

- total subscriber count
- signups over the last 30 days
- per-fingerprint visitor profiles and their associated emails

### Admin settings

The admin settings page lets you edit the welcome email template and manage the login password setup via the `ADMIN_INITIAL_PASSWORD` environment variable.

## Project structure

```text
app/
  admin/              # protected dashboard and settings UI
  components/         # public UI components
  login/              # admin authentication page
  actions.ts          # server actions for signup and fingerprint logic
lib/
  adminAuth.ts        # admin cookie/session helpers
  adminPassword.ts    # password hashing/verification
  adminSettings.ts    # default admin settings initialization
prisma/
  schema.prisma       # database schema
public/               # static assets
```

## Prerequisites

- Node.js 20+
- PostgreSQL database
- npm

## Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ujala"
ADMIN_INITIAL_PASSWORD="your-admin-password"
```

Notes:

- `DATABASE_URL` is required for Prisma and the app database connection.
- `ADMIN_INITIAL_PASSWORD` initializes the admin password the first time the app boots and creates default settings.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run Prisma migrations:

```bash
npx prisma migrate dev
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:3000
```

For the admin dashboard, sign in at:

```text
http://localhost:3000/login
```

## Useful scripts

```bash
npm run dev      # start the local development server
npm run build    # create a production build
npm run start    # run the production build
npm run lint     # run ESLint checks
```

## Prisma schema summary

The database includes:

- `User` for a basic user model
- `Subscriber` for waitlist signups linked to a fingerprint
- `Fingerprint` for browser/device metadata
- `Settings` for admin login and welcome email configuration

## Deployment

This app is ready to deploy to a Next.js-compatible host such as Vercel, but it requires a configured PostgreSQL connection and the same environment variables listed above.

## License

This project is currently for internal product launch work and has no explicit public license file.
..