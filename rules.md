# 📜 ERP Frontend Development Rules

These are the strict architectural, organizational, and technological rules for developing the ERP Frontend. All developers and AI agents must adhere to these guidelines to ensure consistency, scalability, and maintainability.

## 🏗️ 1. Architecture & Structure
Our codebase follows a strictly delineated feature-based architecture to scale securely.

- **App Root Layer (`src/app/`)**: Core application setup (`router.tsx`, context `providers.tsx`).
- **Feature-Based Encapsulation (`src/features/`)**: ALL domain logic MUST exist inside a related feature (e.g., `src/features/auth/`).
  - Contains feature-specific `components/`, `hooks/`, `store.ts`, `types.ts`, and `api/`.
- **Thin Routing Layer (`src/routes/`)**: Use TanStack File-Based routing purely as a structural registry.
  - Route files (like `routes/auth/login.tsx`) should ONLY import components from their respective `features/[feature]/components` directory without duplicating logic inside `routes/`.
- **Segregated Components (`src/components/`)**:
  - `src/components/ui/` for atomic, reusable UI primitives (Inputs, Buttons, ThemeToggle).
  - `src/components/layout/` for architectural framing (Header, Footer, Sidebars).
- **Core Globals (`src/lib/`, `src/styles/`)**:
  - Global pure functions and HTTP clients (Axios) go in `src/lib/` (e.g., `lib/http.ts`).
  - Global styles reside strictly in `src/styles/globals.css`.
- **NO Generic Dumpster Folders**: Do NOT use global `/utils`, `/hooks`, `/types`, or `/store` for feature-specific logic. Move it into the relevant feature structure!

## 📦 2. Data Fetching & State Management
- **TanStack Query is Mandatory:** All API interactions (queries and mutations) MUST use TanStack Query.
- **No Manual Fetching:** Do NOT use manual `useEffect` data fetching patterns or raw `fetch`/`axios` calls inside components.
- **State Segregation:**
  - **Server State:** Managed entirely by TanStack Query (caching, background refetching, invalidation).
  - **UI/Client State:** Managed via React local state (`useState`) or lightweight tools (`zustand`). Do NOT duplicate server state into client state stores.

## 🔗 3. Strict API Integration Flow
To ensure consistency and prevent scattered API logic, **all API integrations MUST follow this strict 4-step flow** within the target feature directory (e.g., `src/features/[feature-name]/api/`):

1. **Define API Routes (`routes.ts`):**
   Store all endpoint paths as constants to prevent hardcoded strings across files.
   ```ts
   // src/features/auth/api/routes.ts
   export const AUTH_ROUTES = {
     LOGIN: '/auth/login',
   };
   ```

2. **Define Service Functions (`services.ts`):**
   Create pure, asynchronous functions using the global `apiClient` (`axios`). These handle DTOs and return standardized responses.
   ```ts
   // src/features/auth/api/services.ts
   import { apiClient } from '../../../services/client';
   import { AUTH_ROUTES } from './routes';
   
   export const loginService = async (credentials: LoginDto) => {
     const { data } = await apiClient.post<LoginResponse>(AUTH_ROUTES.LOGIN, credentials);
     return data;
   };
   ```

3. **Define TanStack Query Hooks (`queries.ts` or `mutations.ts`):**
   Wrap the service functions in custom hooks using TanStack Query.
   ```ts
   // src/features/auth/api/mutations.ts
   import { useMutation } from '@tanstack/react-query';
   import { loginService } from './services';
   
   export const useLogin = () => {
     return useMutation({
       mutationFn: loginService,
       // ... success/error handling
     });
   };
   ```

4. **Consume in Components:**
   Components import the hook. No `axios` or `fetch` code should ever appear directly in a component.

- **Centralized Client:** Always use the globally configured `apiClient` (`axios` instance) to make requests.
- **Payload Alignment:** Request payloads and types must strictly match NestJS backend DTOs.
- **Standardized Responses:** Expect and handle the backend standard response format:
  ```ts
  {
    statusCode: number;
    message: string;
    data: any;
    timestamp: string;
  }
  ```

## 🔐 4. Authentication & Security
- **JWT Handling:** The JWT token from login must be stored securely on the client and attached via an interceptor to all outgoing API requests.
- **Role-Based Access Control (RBAC):** Implement UI and routing restrictions based on the active user's role (Admin, Teacher, Student). Use router `beforeLoad` guards to protect routes.

## 💅 5. Styling & UI Components
- **Tailwind CSS:** Use Tailwind CSS for all custom styling. Avoid inline and traditional CSS files where possible.
- **UI Libraries:** Utilize Flowbite React for consistent UI components and React Icons for iconography.

## 🛡️ 6. Forms & Validation
- **React Hook Form:** Use React Hook Form for performant form state management.
- **Zod Validation:** Use Zod for strict client-side schema validation. Types should be inferred directly from Zod schemas (`z.infer<typeof schema>`).

## 🛠️ 7. TypeScript Standards
- **Strict Typing:** Use TypeScript strictly everywhere. Avoid the use of `any`.
- **Types Organization:** Store generic global types in `src/types/` and feature-specific types locally in `src/features/[feature]/types/`.

## 📌 8. Automatic Rules for AI Agents
- **ALWAYS** use TanStack Query for API interactions.
- **NEVER** use manual data fetching patterns.
- **ALWAYS** follow TanStack file-based routing conventions strictly.
- **MAINTAIN** physical separation between dumb UI components and smart business logic.
- **ALIGN** payloads verbatim with backend DTO constraints.
