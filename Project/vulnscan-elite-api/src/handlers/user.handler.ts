import { Request, Response } from 'express'
import { UserModel } from '../models/user.model'
import { User } from '../types/UserTypes'
import { validateUserData, validateLoginData } from '../utils/validatior'
import { clearToken, generateToken } from '../utils/token-utils'

const userModel = new UserModel()

// retrive all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await userModel.index()
    if (!users.length) {
      res.status(404).json({ message: 'There is no users retrive' })
      return
    }
    res.status(200).json({ users })
  } catch (error) {
    res.status(400).json({ error: 'error while getting Users' })
  }
}
//retrive user by user_id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.headers['x-user-id'] as string
    if (!user_id) {
      res.status(400).json({ message: 'Missing user id' })
      return
    }
    const user: User = await userModel.show(user_id)
    if (!user) {
      res.status(404).json({ message: 'user Not Found' })
      return
    }
    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: 'error while getting User!' })
  }
}
// create new user

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser: User = {
      email: req.body.email as string,
      password: req.body.password as string,
      first_name: req.body.first_name as string,
      last_name: req.body.last_name as string
    }
    const validationResult = validateUserData(newUser)

    if (!validationResult.error) {
      const userExists = await userModel.findOne(newUser.email as string)
      if (userExists) {
        res.status(400).json({ message: 'The Email already exists' })
        return
      }
      const createdUser = await userModel.createUser(newUser)
      res.status(201).json({ Success: createdUser })
    } else {
      res.status(400).json({ Error: 'Validation failed', details: validationResult.error.details[0].message })
    }
  } catch (err) {
    res.status(400).json({ error: 'error while creating User' })
  }
}

//update user

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateUser: User = {
      user_id: req.headers['x-user-id'] as string,
      email: req.body.email as string,
      password: req.body.password as string,
      first_name: req.body.first_name as string,
      last_name: req.body.last_name as string
    }
    const validationResult = validateUserData(updateUser)

    const isUser = await userModel.show(updateUser.user_id as string)

    if (!isUser) {
      res.status(404).json({ message: 'User not found!' })
      return
    }

    if (!validationResult.error) {
      const updatedUser = await userModel.updateUser(updateUser)
      res.status(200).json({ Success: updatedUser })
    } else {
      res.status(400).json({ Error: 'Validation failed', details: validationResult.error.details[0].message })
    }
  } catch (err) {
    res.status(400).json({ err: 'error while Updating User' })
  }
}
// delete user

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.headers['x-user-id'] as string
        if (!user_id) {
          res.status(400).json({ error: 'Missing user_id' });
          return
    }
    if (!(await userModel.show(user_id as string))) {
      res.status(404).json({ error: 'user not found' })
      return
    }
    await userModel.delete(user_id)
    res.status(200).json('user deleted')
  } catch (error) {
    res.status(400).json({ error: 'error while Deleting User' })
  }
}

// Userlogin
export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const userCredentials = {
      email: req.body.email as string,
      password: req.body.password as string
    }
    const validationResult = validateLoginData(userCredentials)

    if (!validationResult.error) {
      const user = await userModel.findOne(userCredentials.email)
      const user_id = await userModel.authenticate(userCredentials.email, userCredentials.password)

      if (user_id && user) {
        const userToken = generateToken(res, user_id as string)
        res.status(200).json({ Login: 'Success', token: userToken })
      } else {
        res.status(401).json({ Login: 'Failed' })
      }
    } else {
      res.status(400).json({ Error: 'Validation failed', details: validationResult.error.details[0].message })
    }
  } catch (error) {
    res.status(401).json({ Login: 'Failed, Error While Login' })
  }
}
// userlogout
export const userLogout = async (req: Request, res: Response): Promise<void> => {
  try {
    clearToken(res)
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    res.status(500).json({ message: ' Error While user logout ' })
  }
}
