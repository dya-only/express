import { Request, Response } from 'express'
import { User } from '../../entities/user.entity'

const userService = require('./user.service')

const register = async (req: Request, res: Response) => {
  const user: User = req.body
  const service = await userService.create(user)

  res.json(service)
}

const login = async (req: Request, res: Response) => {
  const user: User = req.body
  const service = await userService.login(user)

  res.json(service)
}

const range = async (req: Request, res: Response) => {
  const service = await userService.take(parseInt(req.params.n))

  res.json(service)
}

module.exports = { register, login, range }