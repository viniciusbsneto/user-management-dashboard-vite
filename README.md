# User Management Dashboard

A modern dashboard for user management built with React 19, Vite, TypeScript, and Material UI.

## Features

- User authentication (sign in/sign up)
- User management (create, read, update, delete)
- Theme switching (light/dark mode)
- Responsive design with Material UI
- API integration with Axios
- Form handling with React Hook Form
- Data fetching with TanStack Query

## Prerequisites

- Node.js (v16 or higher)
- npm

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/viniciusbsneto/user-management-dashboard-vite.git
cd user-management-dashboard-vite
npm install
```

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`. The page will reload automatically when you make changes to the code.

### Building for Production

To build the application for production:

```bash
npm run build
```

This command:

1. Compiles TypeScript files
2. Bundles the application with Vite (Rollup)
3. Outputs optimized files to the `dist` directory

### Previewing the Build

To preview the production build locally:

```bash
npm run preview
```

This will serve the built production assets from the `dist` directory, allowing you to check how your application will behave in a production environment.

## Live Demo & Authentication

A live demo of the application is available at:
[https://user-management-dashboard-vite.netlify.app/](https://user-management-dashboard-vite.netlify.app/)

To sign in to the application (both locally and demo), use the following credentials:

```
Email: eve.holt@reqres.in
Password: pilot
```

These credentials are for demonstration purposes and connect to the [Reqres](https://reqres.in/) mock API service.

## Project Structure

```
src/
  ├── api/           # API integration layer
  ├── components/    # UI components
  ├── contexts/      # React contexts (auth, theme)
  ├── hooks/         # Custom React hooks
  ├── layouts/       # Layout components
  ├── pages/         # Page components
  └── utils/         # Utility functions and helpers
```

## Technologies

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [TanStack Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
