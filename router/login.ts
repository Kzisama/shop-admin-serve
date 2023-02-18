import express, { Router } from 'express'
import { loginFn } from '../router-handler/login'

const router: Router = express.Router()

router.post('/login', loginFn)

export default router
