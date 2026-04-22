# 🎓 Eduportal - Modern School ERP

![Eduportal Banner](https://via.placeholder.com/1200x400/0f172a/ffffff?text=Eduportal+School+ERP)

Eduportal is a state-of-the-art School Enterprise Resource Planning (ERP) system designed to streamline academic operations, enhance communication, and provide data-driven insights for administrators, teachers, and students. Built with a focus on speed, scalability, and premium user experience.

---

## 📸 Visual Overview

> [!NOTE]
> Screenshots below are currently placeholders. Replace them with actual application captures for production documentation.

````carousel
![Admin Dashboard](https://via.placeholder.com/800x450/1e293b/ffffff?text=Admin+Dashboard+Overview)
<!-- slide -->
![Attendance Management](https://via.placeholder.com/800x450/1e293b/ffffff?text=Real-time+Attendance+Tracking)
<!-- slide -->
![Student Profiles](https://via.placeholder.com/800x450/1e293b/ffffff?text=Comprehensive+Student+Management)
<!-- slide -->
![Dark Mode UI](https://via.placeholder.com/800x450/1e293b/ffffff?text=Premium+Dark+Mode+Experience)
````

---

## ✨ Key Features

- **🛡️ Role-Based Access Control (RBAC)**: Dedicated dashboards and permissions for Admins, Teachers, and Students.
- **📅 Attendance Management**: Efficient bulk attendance taking, historical records, and trend analysis.
- **🏫 Class & Section Management**: Intuitive tools for managing academic years, classes, and student assignments.
- **👤 User Management**: Comprehensive profiles for students and faculty with secure credential management.
- **📊 Real-time Analytics**: Dashboard widgets showcasing attendance trends, revenue, and academic performance.
- **🔔 Global Notification System**: Premium toast notification system for real-time feedback and error handling.
- **🌓 Adaptive UI**: Full support for Light and Dark modes with a sleek, glassmorphic design system.

---

## 🏗️ Architecture & Folder Structure

The project follows a **Feature-Based Modular Architecture**, ensuring high maintainability and vertical scalability.

```text
src/
├── components/          # Shared UI components (Atomic design)
│   └── ui/              # Base primitive components (Buttons, Inputs, etc.)
├── features/            # Domain-driven modules (The core logic)
│   ├── attendance/      # Attendance logic, API, and components
│   ├── auth/            # Authentication & RBAC
│   ├── classes/         # Class and Academic Year management
│   ├── dashboard/       # Specialized role-based layouts
│   └── ...              # Other feature-specific modules
├── hooks/               # Global shared React hooks
├── lib/                 # Core infrastructure
│   ├── http/            # Axios client with interceptors
│   ├── providers/       # Context & Query providers
│   └── stores/          # Global state (Zustand)
├── routes/              # Type-safe file-based routing
├── styles/              # Global Tailwind 4.0 configuration
└── types/               # Base TypeScript definitions
```

> [!TIP]
> Each directory in `src/features` is self-contained, containing its own `api/`, `components/`, `hooks/`, `pages/`, and `types/`. This prevents "spaghetti code" and makes testing easier.

---

## 🛠️ Technology Stack

- **Core**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based, Type-safe)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 💎 Code Quality & Engineering Standards

We adhere to strict engineering standards to ensure a robust and developer-friendly codebase:

1. **Strict Type Safety**: Comprehensive TypeScript usage across the entire stack, including API responses and route parameters.
2. **Schema-First Validation**: All form inputs and API payloads are validated using Zod schemas.
3. **Optimistic Updates**: Utilizing TanStack Query for seamless UI updates during data mutations.
4. **Consistency**: Standardized naming conventions (PascalCase for components, camelCase for functions/vars).
5. **Linting & Formatting**: Automated enforcement via ESLint (TanStack config) and Prettier.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/nisar7988/School-ERP-Frontend.git

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with HMR. |
| `npm run build` | Compiles the application for production. |
| `npm run preview` | Serves the production build locally. |
| `npm run test` | Executes the test suite using Vitest. |
| `npm run lint` | Runs ESLint to check for code issues. |
| `npm run check` | Formats code with Prettier and fixes lint errors. |

---

## 🤝 Contact & Support

For any inquiries or technical support, please contact the development team at [support@eduportal.com](mailto:support@eduportal.com) or visit the repository issue tracker.

---
*Built with ❤️ by the Eduportal Team.*
