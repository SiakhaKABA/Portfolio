import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  poste: { type: String, required: true },
  entreprise: { type: String, required: true },
  periode: { type: String, required: true },
  description: { type: String, default: '' }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

export default mongoose.model('Experience', experienceSchema)
