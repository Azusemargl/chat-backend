import { Router } from "express"
import { roomCreation, getRooms } from "../controllers/room.controller"

const router = Router()

router.get('/', getRooms)
router.post('/create', roomCreation)

export default router
