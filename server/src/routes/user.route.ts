import { Router } from 'express'
import { createUser, getCurrentUser, updateCurrentUser } from '~/controllers/user.controller'
import { jwtCheck, jwtParse } from '~/middlewares/auth.middleware'
import { validateUserRequest } from '~/middlewares/validate.middleware'

const router = Router()

router.get('/', jwtCheck, jwtParse, getCurrentUser)
router.post('/', jwtCheck, createUser)
router.patch('/', jwtCheck, jwtParse, validateUserRequest, updateCurrentUser)

export default router
