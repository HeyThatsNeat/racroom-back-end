import { Profile } from "../models/profile.js"
import { Trivia } from "../models/trivia.js"

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const trivia = await Trivia.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { trivia: trivia } },
      { new: true }
    )
    trivia.owner = profile
    res.status(201).json(blog);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
    create,
}
