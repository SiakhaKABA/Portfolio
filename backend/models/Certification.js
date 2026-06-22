import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  organisme: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, default: '' },
  ordre: { type: Number, default: 0 }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

export default mongoose.model('Certification', certificationSchema)
