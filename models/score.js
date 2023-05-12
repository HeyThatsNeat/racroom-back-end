import mongoose from "mongoose"

const Schema = mongoose.Schema

const scoreSchema = new Schema({
  score: Number,
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  trivia: { type: Schema.Types.ObjectId, ref: 'Trivia' },
},{
  timestamps: true,
})

const Score = mongoose.model('Score', scoreSchema)

export { Score }