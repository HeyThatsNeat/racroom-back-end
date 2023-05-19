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

const scoreSchema = new Schema({
  score: Number,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const triviaSchema = new Schema({
  title: { 
    type:String,
    required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  category: {
    type: String,
    required: true,
    enum: ['All', 'Games', 'General Knowledge', 'Languages', 'Television', 'Pop Culture', 'Sports', 'Music', 'Science', 'History', 'Geography', 'Food & Drink', 'Art & Literature', 'Mythology & Folklore', 'Brain Teasers', 'Nature', 'Politics', 'Technology', 'Fashion', 'Business', 'Fiction'],
  },
  scores: [{ type: Schema.Types.ObjectId, ref: 'Score' }],
  questions: [questionSchema],
  scores: [scoreSchema]
},{
  timestamps: true,
})

const Trivia = mongoose.model('Trivia', triviaSchema)

export { Trivia }

