import { Schema, Document, Types, model } from 'mongoose'
import { IUser } from './User'
import { IMessage } from './Message'

export interface IRoom extends Document {
   users: Array<IUser>
   messages: Array<IMessage>
}

const Room: Schema = new Schema(
   {
      users: {
         type: Types.ObjectId,
         ref: "Users",
         require: true
      },
      message: {
         type: Types.ObjectId,
         ref: "Message"
      }
   },
   {
      timestamps: true
   }
)

const RoomSchema = model<IRoom>('Room', Room)

export default RoomSchema
