import { Router } from 'express'
import { createUser } from '~/controllers/user.controller'
import { jwtCheck } from '~/middlewares/auth.middleware'

const router = Router()

router.post('/', jwtCheck, createUser)

export default router
