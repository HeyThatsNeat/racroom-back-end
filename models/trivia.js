import mongoose from 'mongoose'

const Schema = mongoose.Schema

const choiceSchema = new Schema({
  text: String,
  photo: String,
  answer: Boolean,
}, {
  timestamps: true
})

const questionSchema = new Schema({
  text: String,
  photo: String,
  choices: [choiceSchema],
}, {
  timestamps: true
})


const triviaSchema = new Schema({
  title: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  category: {
    type: String,
    required: true,
    enum: ['Keyboard Shortcuts', 'Programming', 'Games', 'History', 'Languages', 'Television'],
  },
  scores: [{ type: Schema.Types.ObjectId, ref: 'Score' }],
  questions: [questionSchema]
},{
  timestamps: true,
})

const Trivia = mongoose.model('Trivia', triviaSchema)

export { Trivia }

