import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiExternalLink, HiCode, HiPlus, HiPencil, HiTrash } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { useAdmin } from './AdminContext'
import { useToast } from './Toast'

const API = import.meta.env.VITE_API_URL
const categories = ['Tous', 'Développement', 'DevOps', 'Sécurité', 'Réseaux']

export default function Projet() {
  const { isAdmin, openPanelEdit, authFetch } = useAdmin()
  const { addToast } = useToast()
  const [projets, setProjets] = useState([])
  const [filtre, setFiltre] = useState('Tous')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${API}/projets`)
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => {
        setProjets(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const filtered = filtre === 'Tous'
    ? projets
    : projets.filter(p => p.categorie === filtre)

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return
    try {
      const res = await authFetch(`${API}/projets/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setProjets(projets.filter(p => p.id !== id))
    } catch {
      addToast('Erreur lors de la suppression')
    }
  }

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          {isAdmin && (
            <Link
              to="/projets/ajouter"
              className="inline-flex items-center gap-2 border border-gold/50 text-gold px-5 py-2.5 font-mono text-xs tracking-wider uppercase hover:bg-gold/10 transition-colors mb-6"
            >
              <HiPlus size={14} /> Ajouter un projet
            </Link>
          )}
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold block mb-3">Portfolio</span>
          <div className="w-12 h-px bg-gold mb-8" />
          <h1 className="font-display text-4xl lg:text-6xl font-normal">
            Mes <span className="gold-gradient italic">Projets</span>
          </h1>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltre(cat)}
              className={`font-mono text-xs tracking-wider px-4 py-2 border transition-all ${
                filtre === cat
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-border text-muted hover:border-gold/30 hover:text-soft'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grille projets */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-surface border border-border animate-pulse h-80 rounded" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((projet, i) => (
              <motion.div
                key={projet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group bg-surface/50 border border-border/50 overflow-hidden hover:border-gold/30 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={projet.image}
                    alt={projet.libelle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-[0.6rem] px-2 py-1 bg-obsidian/80 border border-border/50 text-gold tracking-wider">
                      {projet.categorie}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-body font-medium text-lite mb-3 group-hover:text-gold-light transition-colors">
                    {projet.libelle}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                    {projet.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {projet.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="font-mono text-[0.6rem] px-2 py-0.5 bg-gold/5 border border-gold/15 text-gold-dark">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/projets/${projet.id}`}
                        className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wider text-gold hover:text-gold-light transition-colors"
                      >
                        <HiExternalLink size={12} /> DÉTAILS
                      </Link>
                      {projet.github && (
                        <a
                          href={projet.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wider text-muted hover:text-soft transition-colors"
                        >
                          <FaGithub size={12} /> CODE
                        </a>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => openPanelEdit('projets', projet)}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-gold transition-colors"
                          title="Modifier"
                        >
                          <HiPencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(projet.id)}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          <HiTrash size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-400 font-mono text-sm">Impossible de charger les projets. Vérifiez que le serveur est lancé.</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <HiCode className="mx-auto text-border mb-4" size={48} />
            <p className="text-muted font-mono text-sm">Aucun projet dans cette catégorie</p>
          </div>
        )}
      </div>
    </section>
  )
}
