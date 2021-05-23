import { Request, Response } from "express"
import { User } from '../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

// User registration controller
export const userRegistration = async (req: Request, res: Response) => {
   try {
      const { name, email, password } = req.body
      
      const candidate = await User.findOne({ email })

      if (candidate) return res.json({ registrationError: 'User already exists' })

      const hashPassword = await bcrypt.hash(password, 7)
      const user = new User({ name, email, password: hashPassword })

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

      if (!user) return res.json({ loginError: 'User does not exist' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.json({ loginError: 'Password is not correct' })

      const token = jwt.sign(
         { user: user.id },
         `${process.env.SECRET_KEY}`,
         { expiresIn: '1h' }
      )

      const userData = {
         id:    user._id,
         name:  user.name,
         email: user.email,
         last_seen: user.last_seen,
         avatar: user.avatar,
         confirmed: user.confirmed,
      }

      return res.json({ ...userData, token })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}

// Me controller
export const userMe = async (req: Request, res: Response) => {
   try {
      const { token } = req.body
      
      const userId = await jwt.verify(token, `${process.env.SECRET_KEY}`, (err: any, decoded: any) => decoded.user)
      const user = await User.findById(userId)
      
      if (!user) return res.json({ loginError: 'Authentication error' })

      const userData = {
         auth:  true,
         id:    user._id,
         name:  user.name,
         email: user.email,
         last_seen: user.last_seen,
         avatar: user.avatar,
         confirmed: user.confirmed,
      }

      return res.json({ ...userData })
   } catch(e) {
      return res.json({ error: `Server error: ${e}` })
   }
}