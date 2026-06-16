import mongoose from 'mongoose'

const formationSchema = new mongoose.Schema({
  diplome: { type: String, required: true },
  etablissement: { type: String, required: true },
  periode: { type: String, required: true },
  description: { type: String, default: '' }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

export default mongoose.model('Formation', formationSchema)
