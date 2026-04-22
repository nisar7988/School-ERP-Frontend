# 🎨 ERP Frontend - Educational Management System (TanStack)

## Project Overview

ERP Frontend is a modern web application designed to interact with the ERP NestJS backend. It provides a scalable, role-based interface for managing educational institutions, including students, teachers, classes, attendance, and fees.

This frontend is built using the TanStack ecosystem, focusing on performance, type safety, and maintainability. It uses file-based routing and server-state management to ensure a clean and scalable architecture.

## 🚀 Key Features

### 🔐 Authentication & Authorization

- JWT-based login system
- Role-based access control (Admin, Teacher, Student)
- Protected routes using router guards

### 📊 Role-Based Dashboards

- **Admin Dashboard**
  - Full system control
  - Manage users, classes, subjects, fees
- **Teacher Dashboard**
  - Manage classes and subjects
  - Mark and track attendance
- **Student Dashboard**
  - View profile
  - Track attendance and fees

### 🧩 Core Functional Modules

- User Management
- Student Management
- Teacher Management
- Class Management
- Subject Management
- Attendance Tracking
- Fee Management

### ⚡ Advanced Frontend Capabilities

- Server-state caching and synchronization
- Background data refetching
- Optimistic UI updates
- Pagination and filtering
- Lazy loading via file-based routing

## 🧱 Technology Stack

### Core

- React (latest stable version)
- Vite (build tool)
- TypeScript

### Routing

- TanStack Router (file-based routing system)

### Data Fetching

- TanStack Query (server-state management)

### Styling & UI

- Tailwind CSS
- Flowbite React (UI components)
- React Icons

### Forms & Validation

- React Hook Form
- Zod (schema validation)

## 📁 Project Structure

The project uses a strict feature-based structure to scale safely with TanStack Router.

- `app/` → Bootstrap layer (`router.tsx`, `providers.tsx`)
- `routes/` → Thin file-based routing layer that imports from `features/`
- `features/` → Distinct feature modules (e.g. `auth/`, `students/`) containing their own `components/`, `hooks/`, `api/`, `store.ts` and `types.ts`
- `components/ui/` → Dumb, single-responsibility atomic UI components (Buttons, Inputs)
- `components/layout/` → Architecture frame components (Header, Footer, Sidebars)
- `lib/` → Global singletons (like `http.ts` Axios instance) and pure helpers
- `styles/` → Global baseline variables (`globals.css`)

## 🔗 API Integration

The frontend communicates with the backend ERP API for all operations.

### Base API URL

- Configured via environment variables

### Communication Pattern

- All API calls are handled through TanStack Query
- Centralized API service layer
- Automatic caching and invalidation

### Response Format Handling

All responses follow a standardized structure:

- `statusCode`
- `message`
- `data`
- `timestamp`

## 🔐 Authentication Flow

1. User logs in with credentials
2. Backend returns JWT token
3. Token is stored on the client
4. Token is attached to all API requests
5. Routes are protected based on authentication state
6. UI is rendered based on user role

## 🧭 Routing Strategy

### File-Based Routing

- Each route is defined as a file
- Nested routes follow folder structure
- Automatic route generation

### Route Types

- Public routes (e.g., login)
- Protected routes (dashboard and modules)

### Access Control

- Admin: Full access
- Teacher: Limited management access
- Student: Read-only personal access

## 🔄 State Management Strategy

- **Server State** → Managed using TanStack Query
- **UI State** → Managed using React or lightweight state tools
- **Authentication State** → Managed via context or storage

## ⚡ Performance Optimization

- Automatic query caching
- Background refetching
- Lazy-loaded routes
- Minimal re-renders
- Efficient API calls with smart invalidation

## ⚙️ Environment Configuration

Environment variables are used for:

- API base URL
- Environment mode (development/production)

## ▶️ Getting Started

### Prerequisites

- Node.js (latest LTS)
- npm or yarn

### Steps

1. Install dependencies
2. Configure environment variables
3. Start development server

## 📦 Build & Deployment

### Build

- Production build using Vite

### Deployment Platforms

- Vercel
- Netlify
- AWS (S3 + CloudFront)
- Firebase Hosting

## 🔮 Future Enhancements

- Mobile app (React Native)
- Real-time updates (WebSockets)
- Notification system
- Advanced analytics dashboard
- File and document uploads
- Payment gateway integration

## 🤝 Contribution Guidelines

- Follow modular architecture
- Use TypeScript strictly
- Keep components reusable
- Maintain consistency in UI/UX
- Use TanStack Query for all data fetching

## 📌 Important Notes for Agent

- Always use TanStack Query for API interactions
- Do not use manual data fetching patterns
- Follow file-based routing strictly
- Maintain separation between UI and business logic
- Align payloads with backend DTO structure
