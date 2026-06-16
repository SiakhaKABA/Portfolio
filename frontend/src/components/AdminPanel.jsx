import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiPlus, HiPencil, HiTrash, HiCheck } from 'react-icons/hi'
import { useAdmin } from './AdminContext'
import { useToast } from './Toast'

const API = import.meta.env.VITE_API_URL

const tabs = [
  { key: 'projets', label: 'Projets' },
  { key: 'formations', label: 'Formations' },
  { key: 'experiences', label: 'Expériences' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'competences', label: 'Compétences' },
]

const defaultForms = {
  projets: { libelle: '', description: '', image: '', technologies: '', github: '', categorie: 'Développement', date: '' },
  formations: { diplome: '', etablissement: '', periode: '', description: '' },
  experiences: { poste: '', entreprise: '', periode: '', description: '' },
  certifications: { titre: '', organisme: '', date: '', description: '' },
  competences: { categorie: '', outils: '' },
}

export default function AdminPanel() {
  const { isAdmin, panelOpen, setPanelOpen, editRequest, setEditRequest, authFetch } = useAdmin()
  const { addToast } = useToast()
  const [tab, setTab] = useState('projets')
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(defaultForms.projets)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (panelOpen) fetchItems()
  }, [tab, panelOpen])

  useEffect(() => {
    if (editRequest && panelOpen) {
      setTab(editRequest.tab)
      const item = editRequest.item
      setEditing(item.id)
      const formData = { ...item }
      delete formData.id
      if (editRequest.tab === 'projets' && Array.isArray(formData.technologies)) {
        formData.technologies = formData.technologies.join(', ')
      }
      if (editRequest.tab === 'competences' && Array.isArray(formData.outils)) {
        formData.outils = formData.outils.join(', ')
      }
      setForm(formData)
      setEditRequest(null)
    }
  }, [editRequest, panelOpen])

  const [error, setError] = useState(false)

  const fetchItems = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(`${API}/${tab}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setItems(data)
    } catch {
      setError(true)
    }
    setLoading(false)
  }

  const resetForm = () => {
    setForm(defaultForms[tab])
    setEditing(null)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    const payload = { ...form }
    if (tab === 'projets' && typeof payload.technologies === 'string') {
      payload.technologies = payload.technologies.split(',').map(t => t.trim()).filter(Boolean)
    }
    if (tab === 'competences' && typeof payload.outils === 'string') {
      payload.outils = payload.outils.split(',').map(t => t.trim()).filter(Boolean)
    }

    try {
      const url = editing ? `${API}/${tab}/${editing}` : `${API}/${tab}`
      const res = await authFetch(url, {
        method: editing ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error()
      resetForm()
      fetchItems()
    } catch {
      addToast('Erreur lors de la sauvegarde')
    }
  }

  const handleEdit = (item) => {
    setEditing(item.id)
    const formData = { ...item }
    delete formData.id
    if (tab === 'projets' && Array.isArray(formData.technologies)) {
      formData.technologies = formData.technologies.join(', ')
    }
    if (tab === 'competences' && Array.isArray(formData.outils)) {
      formData.outils = formData.outils.join(', ')
    }
    setForm(formData)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet élément ?')) return
    try {
      const res = await authFetch(`${API}/${tab}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      fetchItems()
    } catch {
      addToast('Erreur lors de la suppression')
    }
  }

  const getItemLabel = (item) => {
    if (tab === 'projets') return item.libelle
    if (tab === 'formations') return item.diplome
    if (tab === 'experiences') return item.poste
    if (tab === 'certifications') return item.titre
    if (tab === 'competences') return item.categorie
    return ''
  }

  const getFormFields = () => {
    switch (tab) {
      case 'projets': return [
        { name: 'libelle', label: 'Titre', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'image', label: 'URL Image', type: 'text' },
        { name: 'technologies', label: 'Technologies (virgules)', type: 'text' },
        { name: 'github', label: 'Lien GitHub', type: 'text' },
        { name: 'categorie', label: 'Catégorie', type: 'select', options: ['Développement', 'DevOps', 'Sécurité', 'Réseaux'] },
        { name: 'date', label: 'Date', type: 'date' },
      ]
      case 'formations': return [
        { name: 'diplome', label: 'Diplôme', type: 'text' },
        { name: 'etablissement', label: 'Établissement', type: 'text' },
        { name: 'periode', label: 'Période', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]
      case 'experiences': return [
        { name: 'poste', label: 'Poste', type: 'text' },
        { name: 'entreprise', label: 'Entreprise', type: 'text' },
        { name: 'periode', label: 'Période', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]
      case 'certifications': return [
        { name: 'titre', label: 'Titre', type: 'text' },
        { name: 'organisme', label: 'Organisme', type: 'text' },
        { name: 'date', label: 'Date', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]
      case 'competences': return [
        { name: 'categorie', label: 'Catégorie', type: 'text' },
        { name: 'outils', label: 'Outils (séparés par virgules)', type: 'textarea' },
      ]
      default: return []
    }
  }

  if (!isAdmin) return null

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setPanelOpen(true)}
        className="fixed top-24 right-6 z-[90] w-14 h-14 bg-gold text-obsidian rounded-full flex items-center justify-center shadow-lg shadow-gold/20 hover:bg-gold-light transition-colors"
        title="Panneau Admin"
      >
        <HiPencil size={20} />
      </motion.button>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-obsidian/90 backdrop-blur-sm flex justify-end"
            onClick={(e) => e.target === e.currentTarget && setPanelOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-2xl h-full bg-charcoal border-l border-border overflow-y-auto"
            >
              <div className="sticky top-0 bg-charcoal border-b border-border p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="font-display text-xl text-lite">Panneau Admin</h2>
                  <p className="font-mono text-[0.6rem] text-gold tracking-wider">GESTION DU CONTENU</p>
                </div>
                <button onClick={() => { setPanelOpen(false); resetForm() }} className="text-muted hover:text-gold transition-colors">
                  <HiX size={22} />
                </button>
              </div>

              <div className="flex border-b border-border overflow-x-auto">
                {tabs.map(t => (
                  <button
                    key={t.key}
                    onClick={() => { setTab(t.key); resetForm() }}
                    className={`flex-1 py-3 font-mono text-[0.6rem] tracking-wider whitespace-nowrap px-2 transition-colors ${
                      tab === t.key ? 'text-gold border-b-2 border-gold' : 'text-muted hover:text-soft'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <div className="bg-surface border border-border/50 p-5 mb-8">
                  <h3 className="font-mono text-xs text-gold tracking-wider mb-4">
                    {editing ? 'MODIFIER' : 'AJOUTER'}
                  </h3>
                  <div className="space-y-4">
                    {getFormFields().map(field => (
                      <div key={field.name}>
                        <label className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-soft block mb-1.5">
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={form[field.name] || ''}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-obsidian border border-border text-lite px-3 py-2 text-sm outline-none focus:border-gold/50 transition-colors resize-y"
                          />
                        ) : field.type === 'select' ? (
                          <select
                            name={field.name}
                            value={form[field.name] || ''}
                            onChange={handleChange}
                            className="w-full bg-obsidian border border-border text-lite px-3 py-2 text-sm outline-none focus:border-gold/50 transition-colors"
                          >
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={form[field.name] || ''}
                            onChange={handleChange}
                            className="w-full bg-obsidian border border-border text-lite px-3 py-2 text-sm outline-none focus:border-gold/50 transition-colors"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 bg-gold text-obsidian px-5 py-2.5 font-mono text-[0.65rem] tracking-wider uppercase font-medium hover:bg-gold-light transition-colors"
                    >
                      <HiCheck size={14} /> {editing ? 'Mettre à jour' : 'Ajouter'}
                    </button>
                    {editing && (
                      <button
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 border border-border text-muted px-5 py-2.5 font-mono text-[0.65rem] tracking-wider uppercase hover:text-soft transition-colors"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-mono text-xs text-gold tracking-wider mb-4">
                  ÉLÉMENTS ({items.length})
                </h3>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-center py-6 bg-red-500/10 border border-red-500/30 rounded">
                    <p className="text-red-400 font-mono text-xs">Impossible de charger les données</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-surface/50 border border-border/30 px-4 py-3 hover:border-gold/20 transition-colors"
                      >
                        <div className="flex-1 mr-4 truncate">
                          <span className="text-sm text-lite">{getItemLabel(item)}</span>
                          {tab === 'competences' && item.outils && (
                            <p className="text-[0.65rem] text-muted mt-0.5 truncate">{item.outils.join(', ')}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 flex items-center justify-center text-muted hover:text-gold transition-colors"
                            title="Modifier"
                          >
                            <HiPencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-muted hover:text-red-400 transition-colors"
                            title="Supprimer"
                          >
                            <HiTrash size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
