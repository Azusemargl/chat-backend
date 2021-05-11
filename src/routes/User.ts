import { Router } from "express"
import { userRegistration, userLogin } from "../controllers/user.controller"

const router = Router()

router.post('/registration', userRegistration)
router.post('/login', userLogin)

export default router
