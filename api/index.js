import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

let cached = global.mongoose
if (!cached) cached = global.mongoose = { conn: null, promise: null }

async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

function protect(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Accès non autorisé' })
  }
  try {
    const token = header.split(' ')[1]
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expiré' })
  }
}

const opts = { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }

const ProjetSchema = new mongoose.Schema({
  libelle: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  technologies: [String],
  github: String,
  categorie: String,
  date: String
}, opts)

const FormationSchema = new mongoose.Schema({
  diplome: { type: String, required: true },
  etablissement: { type: String, required: true },
  periode: String,
  description: String
}, opts)

const ExperienceSchema = new mongoose.Schema({
  poste: { type: String, required: true },
  entreprise: { type: String, required: true },
  periode: String,
  description: String
}, opts)

const CertificationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  organisme: { type: String, required: true },
  date: String,
  description: String
}, opts)

const CompetenceSchema = new mongoose.Schema({
  categorie: { type: String, required: true },
  outils: [String]
}, opts)

const Projet = mongoose.models.Projet || mongoose.model('Projet', ProjetSchema)
const Formation = mongoose.models.Formation || mongoose.model('Formation', FormationSchema)
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema)
const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema)
const Competence = mongoose.models.Competence || mongoose.model('Competence', CompetenceSchema)

function crudRoutes(router, path, Model, label) {
  router.get(path, async (req, res) => {
    await connectDB()
    const items = await Model.find().sort({ createdAt: -1 })
    res.json(items)
  })

  router.get(`${path}/:id`, async (req, res) => {
    await connectDB()
    try {
      const item = await Model.findById(req.params.id)
      if (!item) return res.status(404).json({ error: `${label} introuvable` })
      res.json(item)
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).json({ error: 'ID invalide' })
      res.status(500).json({ error: err.message })
    }
  })

  router.post(path, protect, async (req, res) => {
    await connectDB()
    try {
      const item = await Model.create(req.body)
      res.status(201).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

  router.put(`${path}/:id`, protect, async (req, res) => {
    await connectDB()
    try {
      const { _id, __v, createdAt, updatedAt, id, ...data } = req.body
      const item = await Model.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
      if (!item) return res.status(404).json({ error: `${label} introuvable` })
      res.json(item)
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).json({ error: 'ID invalide' })
      res.status(400).json({ error: err.message })
    }
  })

  router.delete(`${path}/:id`, protect, async (req, res) => {
    await connectDB()
    try {
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) return res.status(404).json({ error: `${label} introuvable` })
      res.json({ message: `${label} supprimé(e)` })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).json({ error: 'ID invalide' })
      res.status(500).json({ error: err.message })
    }
  })
}

const ADMIN_PASSWORD_HASH = bcrypt.hashSync('sk@admin2026', 10)

app.post('/api/auth/login', async (req, res) => {
  await connectDB()
  const { password } = req.body
  if (!password) return res.status(400).json({ error: 'Mot de passe requis' })
  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' })
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' })
  res.json({ token })
})

crudRoutes(app, '/api/projets', Projet, 'Projet')
crudRoutes(app, '/api/formations', Formation, 'Formation')
crudRoutes(app, '/api/experiences', Experience, 'Expérience')
crudRoutes(app, '/api/certifications', Certification, 'Certification')
crudRoutes(app, '/api/competences', Competence, 'Compétence')

app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio API' })
})

export default app
