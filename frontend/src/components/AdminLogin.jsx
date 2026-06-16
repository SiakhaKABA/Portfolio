import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiLockClosed, HiShieldCheck } from 'react-icons/hi'
import { useAdmin } from './AdminContext'

export default function AdminLogin() {
  const { showLogin, setShowLogin, login } = useAdmin()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(password)
    if (!success) {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
    setPassword('')
  }

  return (
    <AnimatePresence>
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-obsidian/95 backdrop-blur-xl flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface border border-border w-full max-w-sm p-8 relative"
          >
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-muted hover:text-gold transition-colors"
            >
              <HiX size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center">
                <HiShieldCheck className="text-gold" size={20} />
              </div>
              <div>
                <h3 className="font-body font-medium text-lite">Accès Admin</h3>
                <p className="font-mono text-[0.6rem] text-muted tracking-wider">AUTHENTIFICATION REQUISE</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">
                Mot de passe
              </label>
              <div className="relative mb-4">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className="w-full bg-obsidian border border-border text-lite pl-9 pr-4 py-3 font-mono text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted/50"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 font-mono text-xs mb-4"
                >
                  Mot de passe incorrect
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full bg-gold text-obsidian py-3 font-mono text-xs tracking-wider uppercase font-medium hover:bg-gold-light transition-colors"
              >
                Se connecter
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
