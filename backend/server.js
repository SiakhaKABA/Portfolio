import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import { createCrudRouter } from './routes/crud.js'
import authRoutes from './routes/auth.js'
import Projet from './models/Projet.js'
import Formation from './models/Formation.js'
import Experience from './models/Experience.js'
import Certification from './models/Certification.js'
import Competence from './models/Competence.js'
import { seedData } from './data.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*',
  credentials: true
}))

app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, réessayez dans 15 minutes' }
})
app.use('/auth', limiter)

async function autoSeed() {
  const count = await Projet.countDocuments()
  if (count === 0) {
    console.log('Base vide détectée, insertion des données initiales...')
    await Projet.insertMany(seedData.projets)
    await Formation.insertMany(seedData.formations)
    await Experience.insertMany(seedData.experiences)
    await Certification.insertMany(seedData.certifications)
  }
  await Competence.deleteMany()
  await Competence.insertMany(seedData.competences)
  console.log('Compétences mises à jour')
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connecté')
    await autoSeed()
  })
  .catch(err => {
    console.error('Erreur MongoDB:', err.message)
    process.exit(1)
  })

app.use('/auth', authRoutes)
app.use('/projets', createCrudRouter(Projet, 'Projet'))
app.use('/formations', createCrudRouter(Formation, 'Formation'))
app.use('/experiences', createCrudRouter(Experience, 'Expérience'))
app.use('/certifications', createCrudRouter(Certification, 'Certification'))
app.use('/competences', createCrudRouter(Competence, 'Compétence'))

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API' })
})

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
})
