import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AdminProvider } from './components/AdminContext'
import { ToastProvider } from './components/Toast'
import AdminLogin from './components/AdminLogin'
import AdminPanel from './components/AdminPanel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Accueil = lazy(() => import('./components/Accueil'))
const Projet = lazy(() => import('./components/Projet'))
const DetaillerProjet = lazy(() => import('./components/DetaillerProjet'))
const AjouterProjet = lazy(() => import('./components/AjouterProjet'))
const Contact = lazy(() => import('./components/Contact'))
const Dossier = lazy(() => import('./components/Dossier'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-5xl text-gold">404</h1>
      <p className="text-muted font-mono text-sm">Page introuvable</p>
      <a href="/" className="text-gold font-mono text-sm hover:text-gold-light transition-colors">
        &larr; Retour à l'accueil
      </a>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
      <AdminProvider>
        <ScrollToTop />
        <div className="grain min-h-screen bg-obsidian">
          <Navbar />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/projets" element={<Projet />} />
              <Route path="/projets/ajouter" element={<AjouterProjet />} />
              <Route path="/projets/:id" element={<DetaillerProjet />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/parcours" element={<Dossier />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          <AdminLogin />
          <AdminPanel />
        </div>
      </AdminProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
