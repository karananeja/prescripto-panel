# Prescripto Panel

Web dashboard for **Prescripto**: separate flows for **admin** and **doctor** users. Admins manage doctors and appointments; doctors view their dashboard, profile, and appointments. Built with React, TypeScript, and Vite.

## Features

- **Admin**: dashboard, add doctor, doctors list, all appointments  
- **Doctor**: dashboard, profile, appointments  
- **Auth**: JWT stored in `localStorage` (`adminToken` / `doctorToken`); API requests attach `Authorization: Bearer` for `/admin/*` and `/doctor/*` routes  
- **UI**: Tailwind CSS v4, React Router, toast notifications (react-toastify)

## Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended)
- npm (bundled with Node)

## Environment

Create a `.env` file in the project root. The app reads variables prefixed with `VITE_APP_` and maps them for use in code (for example `VITE_APP_API_URL` becomes `API_URL`).

| Variable            | Description                          |
| ------------------- | ------------------------------------ |
| `VITE_APP_API_URL`  | Base URL of the Prescripto backend API |

Example:

```env
VITE_APP_API_URL=http://localhost:4000
```

If this variable is missing or invalid, the app throws at startup with a validation error from the env schema.

## Scripts

| Command       | Description                    |
| ------------- | ------------------------------ |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the project      |

## Project layout

- `src/pages/` — route screens (login, admin, doctor)  
- `src/context/` — admin/doctor/app state and tokens  
- `src/lib/api-client.ts` — Axios instance and auth interceptors  
- `src/config/env.ts` — typed environment loading  

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE).
