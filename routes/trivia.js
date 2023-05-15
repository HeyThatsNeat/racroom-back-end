import { Router } from 'express'
import * as triviaCtrl from '../controllers/trivia.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post("/", checkAuth, triviaCtrl.create)
router.get("/", checkAuth, triviaCtrl.index)
router.get("/:triviaId", checkAuth, triviaCtrl.show)
router.put("/:triviaId", checkAuth, triviaCtrl.update)
router.delete("/:triviaId", checkAuth, triviaCtrl.delete)


export { router }