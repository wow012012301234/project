import { Router } from 'express'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
  userLogout
} from '../../handlers/user.handler'
import validateTokenMiddleware from '../../middlewares/authentication.middleware'

const userRouter: Router = Router()

userRouter.get('/',validateTokenMiddleware, getAllUsers)
userRouter.get('/me',validateTokenMiddleware, getUserById)
userRouter.post('/', createUser)
userRouter.put('/',validateTokenMiddleware, updateUser)
userRouter.delete('/', validateTokenMiddleware, deleteUser)
userRouter.post('/login', userLogin)
userRouter.post('/logout',validateTokenMiddleware, userLogout)

export { userRouter }
