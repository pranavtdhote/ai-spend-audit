import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { RootLayout } from '@/components/layout';

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const AuditPage = lazy(() => import('@/pages/AuditPage'));
const ResultsPage = lazy(() => import('@/pages/ResultsPage'));
const SharePage = lazy(() => import('@/pages/SharePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-neutral-500">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/share/:id" element={<SharePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
