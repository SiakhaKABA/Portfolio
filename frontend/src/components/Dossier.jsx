import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiAcademicCap, HiBriefcase, HiBadgeCheck, HiChevronRight, HiPencil, HiTrash } from 'react-icons/hi'
import { useAdmin } from './AdminContext'
import { useToast } from './Toast'

const API = import.meta.env.VITE_API_URL

export default function Dossier() {
  const { isAdmin, openPanelEdit, authFetch } = useAdmin()
  const { addToast } = useToast()
  const [formations, setFormations] = useState([])
  const [experiences, setExperiences] = useState([])
  const [certifications, setCertifications] = useState([])

  const [error, setError] = useState(false)

  const fetchAll = () => {
    Promise.all([
      fetch(`${API}/formations`).then(r => { if (!r.ok) throw new Error(); return r.json() }),
      fetch(`${API}/experiences`).then(r => { if (!r.ok) throw new Error(); return r.json() }),
      fetch(`${API}/certifications`).then(r => { if (!r.ok) throw new Error(); return r.json() }),
    ]).then(([f, e, c]) => {
      setFormations(f)
      setExperiences(e)
      setCertifications(c)
      setError(false)
    }).catch(() => setError(true))
  }

  useEffect(() => { fetchAll() }, [])

  const handleDelete = async (type, id) => {
    if (!confirm('Supprimer cet élément ?')) return
    try {
      const res = await authFetch(`${API}/${type}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      fetchAll()
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
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold block mb-3">Parcours</span>
          <div className="w-12 h-px bg-gold mb-8" />
          <h1 className="font-display text-4xl lg:text-6xl font-normal">
            Mon <span className="gold-gradient italic">Parcours</span>
          </h1>
        </motion.div>

        {error && (
          <div className="text-center py-8 mb-8 bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 font-mono text-sm">Impossible de charger les données. Vérifiez que le serveur est lancé.</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Expériences */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center">
                <HiBriefcase className="text-gold" size={18} />
              </div>
              <h2 className="font-display text-2xl">Expériences</h2>
            </div>

            <div className="space-y-6 relative before:absolute before:left-5 before:top-0 before:bottom-0 before:w-px before:bg-border/50 pl-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -left-[1.85rem] top-2 w-2.5 h-2.5 rounded-full bg-gold border-2 border-obsidian" />
                  <div className="bg-surface/50 border border-border/50 p-5 hover:border-gold/20 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-body font-medium text-lite">{exp.poste}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[0.6rem] text-gold-dark whitespace-nowrap">{exp.periode}</span>
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => openPanelEdit('experiences', exp)}
                              className="w-6 h-6 flex items-center justify-center text-muted hover:text-gold transition-colors opacity-0 group-hover:opacity-100"
                              title="Modifier"
                            >
                              <HiPencil size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete('experiences', exp.id)}
                              className="w-6 h-6 flex items-center justify-center text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                              title="Supprimer"
                            >
                              <HiTrash size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="font-mono text-xs text-gold mb-2">{exp.entreprise}</p>
                    <p className="text-muted text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Formations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center">
                <HiAcademicCap className="text-gold" size={18} />
              </div>
              <h2 className="font-display text-2xl">Formations</h2>
            </div>

            <div className="space-y-6 relative before:absolute before:left-5 before:top-0 before:bottom-0 before:w-px before:bg-border/50 pl-12">
              {formations.map((formation, i) => (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -left-[1.85rem] top-2 w-2.5 h-2.5 rounded-full bg-gold border-2 border-obsidian" />
                  <div className="bg-surface/50 border border-border/50 p-5 hover:border-gold/20 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-body font-medium text-lite text-sm">{formation.diplome}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[0.6rem] text-gold-dark whitespace-nowrap">{formation.periode}</span>
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => openPanelEdit('formations', formation)}
                              className="w-6 h-6 flex items-center justify-center text-muted hover:text-gold transition-colors opacity-0 group-hover:opacity-100"
                              title="Modifier"
                            >
                              <HiPencil size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete('formations', formation.id)}
                              className="w-6 h-6 flex items-center justify-center text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                              title="Supprimer"
                            >
                              <HiTrash size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="font-mono text-xs text-gold mb-2">{formation.etablissement}</p>
                    <p className="text-muted text-sm leading-relaxed">{formation.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center">
              <HiBadgeCheck className="text-gold" size={18} />
            </div>
            <h2 className="font-display text-2xl">Certifications</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-surface/50 border border-border/50 p-6 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 relative"
              >
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openPanelEdit('certifications', cert)}
                      className="w-6 h-6 flex items-center justify-center text-muted hover:text-gold transition-colors"
                      title="Modifier"
                    >
                      <HiPencil size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete('certifications', cert.id)}
                      className="w-6 h-6 flex items-center justify-center text-muted hover:text-red-400 transition-colors"
                      title="Supprimer"
                    >
                      <HiTrash size={12} />
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-gold/10 border border-gold/25 flex items-center justify-center">
                    <HiBadgeCheck className="text-gold" size={14} />
                  </div>
                  <span className="font-mono text-[0.6rem] text-gold-dark">{cert.date}</span>
                </div>
                <h3 className="font-body font-medium text-lite text-sm mb-1.5 group-hover:text-gold-light transition-colors">
                  {cert.titre}
                </h3>
                <p className="font-mono text-[0.65rem] text-gold mb-3">{cert.organisme}</p>
                <p className="text-muted text-xs leading-relaxed">{cert.description}</p>
              </motion.div>
            ))}

            <div className="border border-dashed border-border/50 p-6 flex flex-col items-center justify-center gap-2 text-border hover:text-gold/30 hover:border-gold/20 transition-colors cursor-default min-h-[180px]">
              <HiChevronRight size={24} />
              <span className="font-mono text-[0.65rem] tracking-wider text-muted">En cours...</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
