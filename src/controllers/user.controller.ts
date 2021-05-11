import { Request, Response } from "express"
import { User } from '../models'
import bcrypt from 'bcrypt'

// User registration controller
export const userRegistration = async (req: Request, res: Response) => {
   try {
      const { email, name, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) return res.json({ error: 'User already exists' })

      const hashPassword = await bcrypt.hash(password, 7)
      const user = new User({ email, name, password: hashPassword })

      await user.save()

      return res.json({ message: 'User was created' })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// User login controller
export const userLogin = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) return res.json({ error: 'User does not exist' })
      if (bcrypt.compare(user.password, password)) return res.json({ error: 'Password is not correct' })

      return res.json({ message: 'Login success' })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}