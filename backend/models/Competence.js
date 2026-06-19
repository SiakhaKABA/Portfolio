import mongoose from 'mongoose'

const competenceSchema = new mongoose.Schema({
  categorie: { type: String, required: true },
  outils: [String],
  ordre: { type: Number, default: 0 }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

export default mongoose.model('Competence', competenceSchema)
