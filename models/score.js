import mongoose from "mongoose"

const Schema = mongoose.Schema

const scoreSchema = new Schema({
  score: Number,
  
},{
  timestamps: true,
})

const Score = mongoose.model('Score', scoreSchema)

export { Score }