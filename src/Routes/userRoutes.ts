import { Router } from "express";

const UserController = require('../Controllers/userController')

const router = Router()

router.post('/signup', UserController.postSignup)
router.post('/login', UserController.postLogin)


export default router