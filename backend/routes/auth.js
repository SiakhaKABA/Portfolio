import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH

router.post('/login', async (req, res) => {
  const { password } = req.body

  if (!password) {
    return res.status(400).json({ error: 'Mot de passe requis' })
  }

  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  if (!valid) {
    return res.status(401).json({ error: 'Mot de passe incorrect' })
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' })
  res.json({ token })
})

export default router
