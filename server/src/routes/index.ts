import { Router } from 'express'
import { Request, Response } from 'express'
import userRouter from './user.route'

const router = Router()

router.get('/check', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' })
})
router.use('/users', userRouter)

export default router
