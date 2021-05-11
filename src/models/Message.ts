import { Schema, Document, Types, model } from 'mongoose'
import { IUser } from './User'

export interface IMessage extends Document {
   message: string
   date:    Date
   attachments: Array<string>
   read:    boolean
   user:    IUser
   room:    string,
}

const Message: Schema = new Schema(
   {
      message: {
         type: String,
         require: true
      },
      attachments: [{
         type: Types.ObjectId,
         ref: 'UploadFile'
      }],
      date: {
         type: Date,
         default: new Date()
      },
      read: {
         type: Boolean,
         default: false
      },
      user: {
         type: Types.ObjectId,
         ref: "User",
         require: true
      },
      room: {
         type: Types.ObjectId,
         ref: "Room",
         require: true
      }
   },
   {
      timestamps: true
   }
)

const MessageSchema = model<IMessage>('Message', Message)

export default MessageSchema
