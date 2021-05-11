import mongoose, { Schema, Document } from "mongoose"
import validator from "validator"

export interface IUser extends Document {
   email:        string
   name:         string
   password:     string
   confirmed:    boolean
   avatar:       string
   confirm_hash: string
   last_seen:    Date
}

const User: Schema = new Schema(
   {
      email: {
         type: String,
         require: "Обязательное поле",
         validate: [validator.isEmail, 'Invalid email'],
         unique: true,
      },
      name: {
         type: String,
         required: "Обязательное поле",
      },
      password: {
         type: String,
         required: "Обязательное поле",
      },
      confirmed: {
         type: Boolean,
         default: false,
      },
      avatar: String,
      confirm_hash: String,
      last_seen: {
         type: Date,
         default: new Date(),
      },
   },
   {
      timestamps: true,
   }
)

const UserSchema = mongoose.model<IUser>('User', User)

export default UserSchema