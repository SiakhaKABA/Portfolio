import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-obsidian">SK</span>
              </div>
              <span className="font-mono text-xs tracking-[0.2em] text-gold-light">SK<span className="text-muted">_</span>ADMIN</span>
            </div>
            <p className="text-muted text-sm">Ingénieur informatique & DevOps junior</p>
          </div>

          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/siakha-kaba" target="_blank" rel="noreferrer"
               className="w-10 h-10 border border-border rounded-lg flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all">
              <FaLinkedin size={16} />
            </a>
            <a href="https://github.com/siakha-kaba" target="_blank" rel="noreferrer"
               className="w-10 h-10 border border-border rounded-lg flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all">
              <FaGithub size={16} />
            </a>
            <a href="mailto:siakha.kaba94@gmail.com"
               className="w-10 h-10 border border-border rounded-lg flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all">
              <FaEnvelope size={16} />
            </a>
          </div>

          <div className="text-right">
            <p className="font-mono text-xs text-muted">&copy; 2026 Siakha Kaba</p>
            <p className="font-mono text-xs text-gold-dark mt-1">Tous droits réservés</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
