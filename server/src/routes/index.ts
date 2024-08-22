import { Router } from 'express'
import { Request, Response } from 'express'
// import authRouter from './auth.route'

const router = Router()

router.get('/check', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' })
})
// router.use('/auth', authRouter)

export default router
