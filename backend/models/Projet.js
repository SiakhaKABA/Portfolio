import mongoose from 'mongoose'

const projetSchema = new mongoose.Schema({
  libelle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  technologies: [String],
  github: { type: String, default: '' },
  categorie: { type: String, required: true, enum: ['Développement', 'DevOps', 'Sécurité', 'Réseaux'] },
  date: { type: String, default: '' }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

export default mongoose.model('Projet', projetSchema)
