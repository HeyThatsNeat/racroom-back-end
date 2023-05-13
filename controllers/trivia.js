import { Profile } from "../models/profile.js"
import { Trivia } from "../models/trivia.js"

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    req.body.questions = [{
        "text": req.body.question,
        "choices": [{
            "text": req.body.answer1,
            "answer": req.body.checkbox1
        },{
            "text": req.body.answer2,
            "answer": req.body.checkbox2
        },{
            "text": req.body.answer3,
            "answer": req.body.checkbox3
        },{
            "text": req.body.answer4,
            "answer": req.body.checkbox4
        }]
    }]
    console.log("req.body ==> ",req.body)
    const trivia = await Trivia.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { trivia: trivia } },
      { new: true }
    )
    trivia.owner = profile
    res.status(201).json(trivia)
    console.log("TRIVIA", trivia)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const index = async (req, res) => {
    try {
      const trivia = await Trivia.find({})
        .populate("owner")
        .sort({ createdAt: 'desc' })
      res.status(200).json(trivia)
    } catch (error) {
      console.log(err)
      res.status(500).json(err)
    }
}

export {
    create,
    index,
}
