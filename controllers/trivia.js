import { Profile } from "../models/profile.js"
import { Trivia } from "../models/trivia.js"


async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const trivia = await Trivia.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { trivias: trivia } },
      { new: true }
    )
    trivia.author = profile
    res.status(201).json(trivia)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
}