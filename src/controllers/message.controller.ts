import { Request, Response } from 'express'
import { Message } from '../models'

// Message creation controller
export const messageCreation = async (req: Request, res: Response) => {
   try {
      const { message, user, room } = req.body

      const content = new Message({ message, user, room })

      await content.save()

      return res.json({ message: 'Message was added' })
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}

// Get all room messages and user info for message component
export const getMessages = async (req: Request, res: Response) => {
   try {
      const { id } = req.query
      const messages = await Message.find({ 'room': `${id}` }).populate(['user'])

      return res.json([ ...messages ])
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}