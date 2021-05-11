import { Request, Response } from "express"
import { Room, User } from '../models'

// Room creation controller
export const roomCreation = async (req: Request, res: Response) => {
   const { ownerId, partnerId } = req.body

   const author = await User.findById({ _id: ownerId })
   const interlocutors = await User.findById({ _id: partnerId })
   const users = [author, interlocutors]

   const room = new Room({ users })

   await room.save()

   return res.json({ message: 'Room was created' })
}

// Get all rooms
export const getRooms = async (req: Request, res: Response) => {
   const rooms = await Room.find()

   return res.json([ ...rooms ])
}