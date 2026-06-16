import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiPlus } from 'react-icons/hi'
import { useAdmin } from './AdminContext'

const API = import.meta.env.VITE_API_URL || '/api'

export default function AjouterProjet() {
  const { isAdmin, authFetch } = useAdmin()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    libelle: '',
    description: '',
    image: '',
    technologies: '',
    github: '',
    categorie: 'Développement',
    date: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  if (!isAdmin) return <Navigate to="/projets" replace />

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)

    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean)
    }

    try {
      const res = await authFetch(`${API}/projets`, {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error()
      navigate('/projets')
    } catch {
      setError(true)
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/projets" className="inline-flex items-center gap-2 text-muted hover:text-gold font-mono text-xs tracking-wider mb-10 transition-colors">
            <HiArrowLeft size={14} /> RETOUR AUX PROJETS
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold block mb-3">Nouveau</span>
          <div className="w-12 h-px bg-gold mb-8" />
          <h1 className="font-display text-3xl lg:text-5xl font-normal mb-12">
            Ajouter un <span className="gold-gradient italic">Projet</span>
          </h1>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">
              Titre du projet *
            </label>
            <input
              type="text"
              name="libelle"
              required
              value={form.libelle}
              onChange={handleChange}
              placeholder="Ex: Application E-Commerce"
              className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted/50"
            />
          </div>

          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Décrivez le projet, les objectifs, l'architecture..."
              className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors resize-y placeholder:text-muted/50"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">
                URL Image
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted/50"
              />
            </div>
            <div>
              <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">
                Catégorie *
              </label>
              <select
                name="categorie"
                value={form.categorie}
                onChange={handleChange}
                className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors"
              >
                <option value="Développement">Développement</option>
                <option value="DevOps">DevOps</option>
                <option value="Sécurité">Sécurité</option>
                <option value="Réseaux">Réseaux</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">
              Technologies (séparées par des virgules) *
            </label>
            <input
              type="text"
              name="technologies"
              required
              value={form.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, Docker, AWS"
              className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted/50"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">
                Lien GitHub
              </label>
              <input
                type="url"
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted/50"
              />
            </div>
            <div>
              <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs"
            >
              Erreur lors de l'enregistrement. Vérifiez que le serveur est lancé.
            </motion.div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-gold text-obsidian px-8 py-3.5 font-mono text-xs tracking-wider uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              <HiPlus size={14} />
              {submitting ? 'Enregistrement...' : 'Enregistrer le projet'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
