# PAWLOFT: Compassionate Luxury Rescue Network

Welcome to the **PAWLOFT** repository! This platform is an elite, high-utility rescue infrastructure designed to merge cinematic aesthetics with critical emergency response capabilities. 

## Project Architecture

The project has recently undergone a major architectural and aesthetic overhaul to position it as a world-class institutional rescue system.

- **Frontend (pawloft-next/)**: Built with Next.js 16 (App Router), React, and Tailwind CSS. The UI features a "Compassionate Luxury" aesthetic, utilizing an Ivory, Dark Pink, and Deep Teal color palette with serif typography (`var(--font-serif)`).
- **Backend (Supabase)**: We have migrated critical rescue infrastructure to Supabase (PostgreSQL), utilizing PostGIS for spatial data and Row Level Security (RLS) for data integrity.
- **Legacy Systems**: 
  - `client/`: The initial React/Vite MVP frontend.
  - `server/`: The legacy Node/Express/MongoDB backend API.

## Core Features (V2 Redesign)

1. **Live Rescue Engine (`/report`)**
   - **Native Camera Access:** Real-time image capture for immediate emergency triage.
   - **Live GPS Tracking:** Integrates `navigator.geolocation` to map exact emergency coordinates.
   - **Automated Dispatch:** Queries the live Supabase database for the closest available, verified volunteers and assigns them dynamically. Includes an expanding radius search animation (5km -> 10km -> 20km) with automatic fallback routing to Municipal Shelters.

2. **Squad Infrastructure (`/dashboard`)**
   - **Referral Network:** A custom invite-code system linking new users to established "Squads" upon Google OAuth login.
   - **Squad Dashboard:** Visualizes your local rescue team and cumulative rescue impact metrics.
   - **Real-Time Comms:** A glassmorphic, floating Squad Chat interface enabling direct communication between field volunteers.

## Prerequisites

- Node.js (v18 or higher)
- Supabase Project (with PostGIS enabled)
- Google Cloud Console (for OAuth Configuration)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saanvirajput/PAWLOFT_WEBSITE.git
   cd PAWLOFT_WEBSITE
   ```

2. **Database Setup:**
   Run the `supabase_schema.sql` script in your Supabase SQL Editor to provision the necessary tables (`users`, `cases`, `volunteers`), Enums, and RLS policies.

3. **Environment Variables:**
   Create a `.env.local` inside `pawloft-next/`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the Next.js Client:**
   ```bash
   cd pawloft-next
   npm install
   npm run dev
   ```

## Technologies
- Next.js 16 (React)
- Tailwind CSS & Framer Motion
- Supabase (PostgreSQL + PostGIS + Auth)
- Lucide React (Iconography)
