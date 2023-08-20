import { Router, Request, Response, NextFunction } from "express";


const router: Router = Router()

router.get('/', (_: Request, res: Response, next: NextFunction) => {
  res.send('Wine API')
})

const user = require('./user/user')
router.use('/user', user)

module.exports = router