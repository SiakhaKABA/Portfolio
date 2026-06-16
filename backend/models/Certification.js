import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  organisme: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, default: '' }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

export default mongoose.model('Certification', certificationSchema)
