import { Profile } from "../models/profile.js"
import { Trivia } from "../models/trivia.js"

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    console.log(req.body)
    const trivia = await Trivia.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { trivia: trivia } },
      { new: true }
    )
    trivia.owner = profile
    res.status(201).json(trivia);
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
