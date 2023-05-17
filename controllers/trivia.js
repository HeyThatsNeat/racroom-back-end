import { Profile } from "../models/profile.js"
import { Trivia } from "../models/trivia.js"

const create = async (req, res) => {
    try {
        req.body.owner = req.user.profile
        // console.log("req.body ==> ",req.body)
        const trivia = await Trivia.create(req.body)
        const profile = await Profile.findByIdAndUpdate(
            req.user.profile,
            { $push: { trivia: trivia } },
            { new: true }
        )
        trivia.owner = profile
        res.status(201).json(trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const addScore = async (req, res) => {
    try {
        req.body.owner = req.user.profile
        console.log("req.body ==> ",req.body)
        const { triviaId } = req.params
        const trivia = await Trivia.findByIdAndUpdate(
            triviaId,
            { $push: { scores: {
                score: req.body.score,
                owner: req.body.owner
            }}},
            { new: true }
        )
        const profile = await Profile.findByIdAndUpdate(
            req.user.profile,
            { $push: { scores: {
                score: req.body.score,
                trivia: triviaId
            }}},
            { new: true }
        )
        res.status(200).json(trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const index = async (req, res) => {
    try {
        const trivia = await Trivia.find({})
            .populate("owner")
            .sort({ createdAt: 'desc' })
        res.status(200).json(trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const show = async (req, res) => {
    try {
        const { triviaId } = req.params
        const trivia = await Trivia.findById(triviaId)
            .populate(["owner", "scores.owner"])
        res.status(200).json(trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const update = async (req, res) => {
    try {
        const { triviaId } = req.params
        const trivia = await Trivia.findByIdAndUpdate(triviaId, req.body, {
            new: true,
        }).populate("owner")
        res.status(200).json(trivia)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteTrivia = async (req, res) => {
  try {
    const trivia = await Trivia.findByIdAndDelete(req.params.triviaId)
    // req.user.profile is being used through middleware, decodeUserFromToken route
    const profile = await Profile.findById(req.user.profile)
    // req.params.triviaId can also be trivia._id from line 69. Its actually better to do trivia._id
    profile.trivia.remove({_id: req.params.triviaId})
    await profile.save()
    // we are returning the trivia that was deleted for filtering purposes in the front end. To filter the deleted on from the rest.
    res.json(trivia)
    console.log("TRIVIA DELETED",trivia)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
    create,
    addScore,
    index,
    show,
    update,
    updateScore,
    deleteTrivia as delete,
}
