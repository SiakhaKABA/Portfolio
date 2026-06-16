import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL || '/api'

export default function DetaillerProjet() {
  const { id } = useParams()
  const [projet, setProjet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/projets/${id}`)
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => {
        setProjet(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  if (!projet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted font-mono">Projet introuvable</p>
        <Link to="/projets" className="text-gold font-mono text-sm hover:text-gold-light">
          &larr; Retour aux projets
        </Link>
      </div>
    )
  }

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
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
          <div className="relative h-72 lg:h-96 overflow-hidden mb-10">
            <img
              src={projet.image}
              alt={projet.libelle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="font-mono text-[0.65rem] px-3 py-1.5 bg-obsidian/80 border border-gold/30 text-gold tracking-wider">
                {projet.categorie}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-3xl lg:text-5xl font-normal mb-6">{projet.libelle}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {projet.technologies.map(tech => (
              <span key={tech} className="px-3 py-1.5 bg-gold/5 border border-gold/20 text-gold font-mono text-xs rounded">
                {tech}
              </span>
            ))}
          </div>

          <div className="prose-custom mb-10">
            <p className="text-soft text-lg leading-loose whitespace-pre-line">
              {projet.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-border/50">
            {projet.github && (
              <a
                href={projet.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-obsidian px-6 py-3 font-mono text-xs tracking-wider uppercase font-medium hover:bg-gold-light transition-colors"
              >
                <FaGithub size={14} /> Voir le code
              </a>
            )}
            <Link
              to="/projets"
              className="inline-flex items-center gap-2 border border-border text-soft px-6 py-3 font-mono text-xs tracking-wider uppercase hover:border-gold/30 hover:text-gold transition-all"
            >
              <HiExternalLink size={14} /> Autres projets
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
