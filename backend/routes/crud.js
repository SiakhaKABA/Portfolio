import { Router } from 'express'
import { protect } from '../middleware/auth.js'

export function createCrudRouter(Model, label, { sort } = {}) {
  const router = Router()
  const defaultSort = sort || { createdAt: -1 }

  router.get('/', async (req, res) => {
    try {
      const items = await Model.find().sort(defaultSort)
      res.json(items)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const item = await Model.findById(req.params.id)
      if (!item) return res.status(404).json({ error: `${label} introuvable` })
      res.json(item)
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).json({ error: 'ID invalide' })
      res.status(500).json({ error: err.message })
    }
  })

  router.post('/', protect, async (req, res) => {
    try {
      const item = await Model.create(req.body)
      res.status(201).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

  router.put('/:id', protect, async (req, res) => {
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

  router.delete('/:id', protect, async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) return res.status(404).json({ error: `${label} introuvable` })
      res.json({ message: `${label} supprimé(e)` })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).json({ error: 'ID invalide' })
      res.status(500).json({ error: err.message })
    }
  })

  return router
}
