import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX, HiLogout } from 'react-icons/hi'
import logo from '../assets/logo-sk.jpeg'
import { useAdmin } from './AdminContext'

const links = [
  { path: '/', label: 'Accueil' },
  { path: '/projets', label: 'Projets' },
  { path: '/parcours', label: 'Parcours' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdmin, triggerLogin, logout } = useAdmin()
  const clickCount = useRef(0)
  const clickTimer = useRef(null)

  const handleLogoClick = (e) => {
    e.preventDefault()
    clickCount.current += 1
    if (clickCount.current === 3) {
      clickCount.current = 0
      clearTimeout(clickTimer.current)
      triggerLogin()
    } else {
      clearTimeout(clickTimer.current)
      clickTimer.current = setTimeout(() => {
        if (clickCount.current < 3) {
          navigate('/')
        }
        clickCount.current = 0
      }, 400)
    }
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="Logo SK"
              className={`w-10 h-10 rounded-full object-cover border-[1.5px] transition-shadow ${
                isAdmin ? 'border-green-400 shadow-[0_0_12px_rgba(74,222,128,0.4)]' : 'border-gold/50 shadow-[0_0_12px_rgba(201,168,76,0.3)] group-hover:shadow-[0_0_20px_rgba(201,168,76,0.5)]'
              }`}
            />
            <span className="font-mono text-xs tracking-[0.2em] text-gold-light group-hover:text-gold transition-colors">
              SK<span className="text-muted">_</span>ADMIN
            </span>
            {isAdmin && (
              <span className="font-mono text-[0.55rem] px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 tracking-wider">
                ADMIN
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-10">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-gold' : 'text-soft hover:text-gold'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                  />
                )}
              </Link>
            ))}
            {isAdmin && (
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wider px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all rounded"
                title="Se déconnecter"
              >
                <HiLogout size={12} /> LOGOUT
              </button>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-soft hover:text-gold transition-colors"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-obsidian/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-56 bg-charcoal border-l border-border/50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-border/50">
                <span className="font-mono text-xs tracking-[0.2em] text-gold-light">MENU</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-soft hover:text-gold transition-colors"
                >
                  <HiX size={24} />
                </button>
              </div>

              <nav className="flex flex-col px-6 pt-8 gap-2">
                {links.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={link.path}
                      className={`block font-mono text-sm tracking-[0.2em] uppercase py-3 px-4 rounded transition-all ${
                        location.pathname === link.path
                          ? 'text-gold bg-gold/10 border-l-2 border-gold'
                          : 'text-soft hover:text-gold hover:bg-surface/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto px-6 pb-8 border-t border-border/50 pt-6">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Logo SK" className="w-8 h-8 rounded-full object-cover border border-gold/30" />
                  <div>
                    <span className="font-mono text-[0.6rem] tracking-wider text-gold-light block">Siakha Kaba</span>
                    <span className="font-mono text-[0.55rem] text-muted">Ingénieur Réseaux & DevOps</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
