import mongoose from 'mongoose'

const Schema = mongoose.Schema

const scoreSchema = new Schema({
  score: Number,
  trivia: {type: Schema.Types.ObjectId, ref: "Score"}
},{
  timestamps: true,
})

const profileSchema = new Schema({
  name: String,
  photo: String,
  trivia: [{type: Schema.Types.ObjectId, ref: "Trivia" }],
  scores: [scoreSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
