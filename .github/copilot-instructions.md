# Copilot instructions for vehicle-service-frontend

Short, actionable guidance for AI coding agents working on this repository.

## Project overview
- Single-page React app (Vite) located in `vehicle-service-frontend/`.
- Entry points: `src/main.jsx` (app mount) and `src/App.jsx` (routing).
- UI uses Bootstrap (`bootstrap`, `react-bootstrap`) and icons (`bootstrap-icons`).
- No backend: auth and persistence are implemented via `localStorage` (key: `users`).

## How to run & debug (quick commands)
- Install dependencies and start dev server:
  - cd `vehicle-service-frontend` && `npm install`
  - `npm run dev` (Vite dev server, default http://localhost:5173)
- Build: `npm run build`
- Lint: `npm run lint` (ESLint configured in `eslint.config.js`)

## Important patterns & conventions (do not invent new ones without confirmation)
- Pages vs components:
  - Pages are in `src/pages/` (e.g., `Login.jsx`, `Register.jsx`, `user/UserDashboard.jsx`, `admin/*`).
  - Reusable UI bits in `src/components/` (e.g., `AppNavbar.jsx`).
- Routing is defined in `src/App.jsx` using React Router v7 `BrowserRouter`, `Routes`, and `Route`.
- Persistence:
  - Users are stored in `localStorage` under the `users` key (see `Register.jsx` and `RegisteredUser.jsx`).
  - Login behavior is simulated in `Login.jsx`: admin credentials are hardcoded as `admin@vehicleservice.com` / `admin123`.
- Styling: global imports for bootstrap are in `src/main.jsx`.

## Concrete examples & “where to change” notes
- To replace localStorage with an API:
  - Replace `Register.jsx` logic that reads/writes `localStorage.getItem('users')` and `localStorage.setItem('users', ...)` with your API calls. Update `RegisteredUser.jsx` to fetch the user list from the API rather than reading `localStorage`.
- Admin check: `Login.jsx` currently does a simple string comparison -> change here when adding real auth.
- Routes to coordinate: adding pages requires updating `src/App.jsx` routes.

## Code-quality & common pitfalls
- ESLint rules live in `vehicle-service-frontend/eslint.config.js`. Run `npm run lint` and follow the configured rules.
- Watch out for component/import name collisions (example: `src/components/Navbar.jsx` defines `const Navbar = () => { return (<Navbar ...>) }` which shadows the imported bootstrap `Navbar` and causes recursion). Prefer explicit aliasing, e.g. `import { Navbar as RBNavbar } from 'react-bootstrap'` or rename the local component.
- Some components appear incomplete (e.g., `src/components/UserNavbar.jsx` contains only `import React from "react";`) — treat as TODOs and check usage before removing.

## PR expectations
- Keep changes minimal and focused; reference affected files in the PR description.
- If adding network calls, include fallback behavior for the current localStorage-based demo.
- Add or update small unit/behavior tests where appropriate (there are no tests yet; keep changes easily verifiable via the browser).

## Where to look for examples
- `Register.jsx` — shows how to append and persist user records.
- `RegisteredUser.jsx` — shows listing, deletion, and search filtering.
- `Login.jsx` — shows navigation logic for admin vs user.
- `AppNavbar.jsx` — example of navigation + Bootstrap usage.

## Do NOT assume
- There is no backend in the repo; do not add server-side code unless the task is explicitly to wire an external API.
- There are no test files or CI flows currently configured; suggest tests in PRs when adding non-trivial logic.

---
If anything here is unclear or you want different emphasis (e.g., add rules for accessibility or tests), tell me which areas to expand and I’ll update this file.