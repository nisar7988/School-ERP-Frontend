import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { QueryProvider } from '@/lib/providers/query-provider'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'
import { ToastContainer } from '@/components/ui/ToastContainer'

import appCss from '@/styles/globals.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isServer = typeof window === 'undefined'
    // Skip auth redirection during SSR
    if (isServer) return

    const { isAuthenticated, user, _hasHydrated } = useAuthStore.getState()
    const isLoginPage = location.pathname === '/auth/login'

    // Don't redirect until we know the store has hydrated from localStorage
    if (!_hasHydrated) return

    if (!isAuthenticated && !isLoginPage) {
      throw redirect({ to: '/auth/login' })
    }

    if (isAuthenticated && isLoginPage) {
      if (user?.role === Role.TEACHER) {
        throw redirect({ to: '/teacher/dashboard' })
      }
      if (user?.role === Role.STUDENT) {
        throw redirect({ to: '/student/dashboard' })
      }
      throw redirect({ to: '/dashboard' })
    }
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Academic Atelier' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootLayout,
  errorComponent: ErrorComponent,
  pendingComponent: Loader,
})

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

function ErrorComponent({ error }: { error: any }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-lg">
        {error instanceof Error
          ? error.message
          : 'An unexpected error occurred.'}
      </p>
    </div>
  )
}

export default function RootLayout() {
  const _hasHydrated = useAuthStore((state) => state._hasHydrated)
  const isServer = typeof window === 'undefined'

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <QueryProvider>
          <Header />
          {!_hasHydrated && !isServer ? <Loader /> : <Outlet />}
          <Footer />
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  )
}
