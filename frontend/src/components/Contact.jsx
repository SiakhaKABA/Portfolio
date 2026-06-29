import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)

    try {
      const res = await fetch('https://formsubmit.co/ajax/siakha.kaba94@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nom: form.nom,
          Prénom: form.prenom,
          Email: form.email,
          Message: form.message,
          _subject: `Portfolio Contact — ${form.prenom} ${form.nom}`,
          _template: 'table'
        })
      })
      const data = await res.json()
      if (data.success === 'true' || res.ok) {
        setSent(true)
        setTimeout(() => setSent(false), 4000)
        setForm({ nom: '', prenom: '', email: '', message: '' })
      } else {
        setError(true)
        setTimeout(() => setError(false), 4000)
      }
    } catch {
      setError(true)
      setTimeout(() => setError(false), 4000)
    }
    setSending(false)
  }

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold block mb-3">Contact</span>
          <div className="w-12 h-px bg-gold mb-8" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-normal">
            Travaillons <span className="gold-gradient italic">ensemble</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-20">
          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-soft text-base sm:text-lg leading-relaxed sm:leading-loose mb-8 sm:mb-10">
              Un projet en tête ? Une infrastructure mettre en place ou à déployer ? Une application à développer ?
              N'hésitez pas, je réponds sous 24 heures.
            </p>

            <div className="space-y-6 mb-10">
              <a href="mailto:siakha.kaba94@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center text-gold group-hover:border-gold/50 transition-colors">
                  <HiMail size={18} />
                </div>
                <div>
                  <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-gold block">Email</span>
                  <span className="text-soft group-hover:text-lite transition-colors">siakha.kaba94@gmail.com</span>
                </div>
              </a>

              <a href="tel:+221772000813" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center text-gold group-hover:border-gold/50 transition-colors">
                  <HiPhone size={18} />
                </div>
                <div>
                  <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-gold block">Téléphone</span>
                  <span className="text-soft group-hover:text-lite transition-colors">+221 77 200 08 13</span>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center text-gold">
                  <HiLocationMarker size={18} />
                </div>
                <div>
                  <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-gold block">Localisation</span>
                  <span className="text-soft">Dakar, Sénégal</span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-4">Réseaux</span>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/siakha-kaba" target="_blank" rel="noreferrer"
                   className="w-11 h-11 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all rounded-lg">
                  <FaLinkedin size={16} />
                </a>
                <a href="https://github.com/SiakhaKABA" target="_blank" rel="noreferrer"
                   className="w-11 h-11 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all rounded-lg">
                  <FaGithub size={16} />
                </a>
                <a href="https://wa.me/221772000813" target="_blank" rel="noreferrer" className="w-11 h-11 border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all rounded-lg">
                  <FaWhatsapp size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted/50"
                  />
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    required
                    value={form.prenom}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted/50"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-muted/50"
                />
              </div>

              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold block mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  maxLength={500}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className="w-full bg-surface border border-border text-lite px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors resize-y placeholder:text-muted/50"
                />
                <div className="text-right mt-1">
                  <span className="font-mono text-[0.6rem] text-muted">{form.message.length}/500</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-obsidian py-3.5 font-mono text-xs tracking-wider uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                <HiPaperAirplane size={14} className="rotate-90" />
                {sending ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-3 bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-xs"
                >
                  Message envoyé avec succès !
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs"
                >
                  Erreur lors de l'envoi. Réessayez.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
