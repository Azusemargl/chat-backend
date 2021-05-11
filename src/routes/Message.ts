import { Router } from 'express'
import { messageCreation, getMessages } from '../controllers/message.controller'

const router = Router()

router.get('/get', getMessages)
router.post('/create', messageCreation)

export default router
