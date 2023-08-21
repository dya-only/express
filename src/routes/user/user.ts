import { Router } from "express"

const router: Router = Router()
const userController = require('../../api/user/user.controller')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/getUsers/:n', userController.range)

module.exports = router
