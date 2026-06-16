import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Projet from './models/Projet.js'
import Formation from './models/Formation.js'
import Experience from './models/Experience.js'
import Certification from './models/Certification.js'
import Competence from './models/Competence.js'
import { seedData } from './data.js'

dotenv.config()

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connecté')

    await Promise.all([
      Projet.deleteMany(),
      Formation.deleteMany(),
      Experience.deleteMany(),
      Certification.deleteMany(),
      Competence.deleteMany()
    ])
    console.log('Collections vidées')

    await Projet.insertMany(seedData.projets)
    await Formation.insertMany(seedData.formations)
    await Experience.insertMany(seedData.experiences)
    await Certification.insertMany(seedData.certifications)
    await Competence.insertMany(seedData.competences)

    console.log('Données insérées avec succès')
    process.exit(0)
  } catch (err) {
    console.error('Erreur seed:', err)
    process.exit(1)
  }
}

seed()
