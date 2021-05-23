import { Router } from "express"
import { userRegistration, userLogin, userMe } from "../controllers/user.controller"

const router = Router()

router.post('/registration', userRegistration)
router.post('/login', userLogin)
router.post('/me', userMe)

export default router
