import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaDocker, FaAws, FaReact, FaNodeJs, FaGitAlt, FaLinux, FaShieldAlt } from 'react-icons/fa'
import { SiKubernetes, SiTerraform, SiPostgresql } from 'react-icons/si'
import { HiArrowDown, HiDownload, HiExternalLink } from 'react-icons/hi'
import photo from '../assets/siakha-pro.jpeg'

const Scene3D = lazy(() => import('./Scene3D'))
const API = import.meta.env.VITE_API_URL


const skills = [
  { icon: FaReact, label: 'React' },
  { icon: FaNodeJs, label: 'Node.js' },
  { icon: FaDocker, label: 'Docker' },
  { icon: SiKubernetes, label: 'K8s' },
  { icon: FaAws, label: 'AWS' },
  { icon: SiTerraform, label: 'Terraform' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: FaGitAlt, label: 'Git' },
  { icon: FaLinux, label: 'Linux' },
  { icon: FaShieldAlt, label: 'Sécurité Réseaux' },
]


export default function Accueil() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [competences, setCompetences] = useState([])
  const [certifications, setCertifications] = useState([])

  useEffect(() => {
    fetch(`${API}/competences`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setCompetences)
      .catch(() => setCompetences([]))
    fetch(`${API}/certifications`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setCertifications)
      .catch(() => setCertifications([]))
  }, [])

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian z-[1]" />

        <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center pt-24 sm:pt-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-mono text-[0.6rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold mb-4 block">
                  Ingénieur Réseaux & Sécurité | DevOps Junior
                </span>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-gold" />
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-white">Disponible</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-4xl sm:text-6xl lg:text-8xl font-normal leading-[0.9] mb-6 sm:mb-8"
              >
                Siakha
                <br />
                <span className="gold-gradient italic">Kaba</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-soft text-base sm:text-lg leading-relaxed max-w-lg mb-8 sm:mb-10"
              >
                Ingénieur en réseaux et sécurité informatique & DevOps Junior.
                Passionné par l'innovation, je mets mes compétences au service de la transformation digitale et de la modernisation des infrastructures SI.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10"
              >
                <Link to="/projets"
                  className="inline-flex items-center gap-2 bg-gold text-obsidian px-6 py-3 font-mono text-xs tracking-wider uppercase font-medium hover:bg-gold-light transition-colors">
                  <HiExternalLink size={14} /> Voir mes projets
                </Link>
                <a href="/CV_Siakha.pdf" download
                  className="inline-flex items-center gap-2 border border-gold/50 text-gold px-6 py-3 font-mono text-xs tracking-wider uppercase hover:bg-gold/10 transition-colors">
                  <HiDownload size={14} /> Télécharger CV
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="flex flex-wrap gap-3"
              >
                {skills.map(({ icon: Icon, label }) => (
                  <div key={label}
                    className="flex items-center gap-2 px-3 py-1.5 border border-border/50 rounded bg-surface/50 text-muted hover:text-gold hover:border-gold/30 transition-all cursor-default">
                    <Icon size={12} />
                    <span className="font-mono text-[0.65rem] tracking-wider">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex justify-center -mt-16"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex items-center justify-center"
              >
                {/* Glow externe */}
                <div className="absolute w-[360px] h-[360px] rounded-full bg-gold/10 blur-3xl animate-pulse" />
                {/* Anneau doré brillant avec rotation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[350px] h-[350px] rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, #c9a84c, #e8d48b, #c9a84c, transparent, #c9a84c, #e8d48b, #c9a84c, transparent)',
                    padding: '1.5px',
                  }}
                />
                {/* Anneau doré statique */}
                <div className="absolute w-[340px] h-[340px] rounded-full border border-gold/60 shadow-[0_0_30px_rgba(201,168,76,0.4),0_0_60px_rgba(201,168,76,0.2),inset_0_0_30px_rgba(201,168,76,0.1)]" />
                {/* Particules brillantes */}
                <div className="absolute w-[360px] h-[360px] rounded-full overflow-visible">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-2 left-1/2 w-2 h-2 bg-gold rounded-full blur-[2px] shadow-[0_0_8px_#c9a84c]" />
                  <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute top-1/4 right-2 w-1.5 h-1.5 bg-gold-light rounded-full blur-[1px] shadow-[0_0_6px_#e8d48b]" />
                  <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity }} className="absolute bottom-4 left-8 w-2 h-2 bg-gold rounded-full blur-[2px] shadow-[0_0_8px_#c9a84c]" />
                  <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute bottom-1/4 right-6 w-1.5 h-1.5 bg-gold-light rounded-full blur-[1px] shadow-[0_0_6px_#e8d48b]" />
                  <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.2, repeat: Infinity }} className="absolute top-1/3 left-0 w-1.5 h-1.5 bg-gold rounded-full blur-[1px] shadow-[0_0_6px_#c9a84c]" />
                  <motion.div animate={{ opacity: [0.8, 0.3, 0.8] }} transition={{ duration: 2.8, repeat: Infinity }} className="absolute bottom-8 right-1/3 w-2 h-2 bg-gold-light rounded-full blur-[2px] shadow-[0_0_8px_#e8d48b]" />
                </div>
                {/* Photo */}
                <div className="relative w-[330px] h-[330px] rounded-full overflow-hidden">
                  <img
                    src={photo}
                    alt="Siakha Kaba"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-xs text-muted">AdminSys</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <HiArrowDown className="text-gold/50" size={20} />
        </motion.div>
      </section>


      {/* ABOUT */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold block mb-3">À propos</span>
            <div className="w-12 h-px bg-gold mb-8" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-normal mb-10 sm:mb-16">
              Profil & <span className="gold-gradient italic">Compétences</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-soft text-base sm:text-lg leading-relaxed sm:leading-loose mb-6 text-justify">
                Ingénieur en réseaux et sécurité informatique & DevOps Junior. Doté d'une
                base solide en infrastructures réseaux, systèmes et sécurité informatique,
                j'ai développé des compétences complémentaires en Cloud Computing (AWS)
                et culture DevOps. Passionné par l'innovation, je souhaite mettre mes
                compétences au service d'une entreprise pour contribuer à la transformation
                digitale et à la modernisation des infrastructures SI.
              </p>
              <p className="text-soft text-base sm:text-lg leading-relaxed sm:leading-loose mb-8 sm:mb-10 text-justify">
                Mon objectif : mettre en œuvre des infrastructures sécurisées, automatiser
                les déploiements et garantir la haute disponibilité des services au sein
                d'une entreprise innovante.
              </p>

              {certifications.length > 0 && (
                <div className="overflow-hidden rounded">
                  <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="flex gap-6 whitespace-nowrap"
                  >
                    {[...certifications, ...certifications].map((cert, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 bg-surface/50 border border-border/50 rounded">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        <span className="font-mono text-xs text-gold tracking-wider">{cert.titre}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {competences.map(comp => (
                <div key={comp.id}>
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-4 block">{comp.categorie}</span>
                  <div className="flex flex-wrap gap-2">
                    {comp.outils.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-gold/5 border border-gold/20 text-gold font-mono text-xs rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </>
  )
}
