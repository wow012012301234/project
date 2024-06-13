import Joi from 'joi'

const PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})')

const validateLoginData = (userCredentials: { email: string; password: string }) => {
  const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required()
  })
  return userLoginSchema.validate(userCredentials, { abortEarly: false })
}

const validateUserData = (user: {
  user_id?: string
  email: string
  password: string
  first_name: string
  last_name: string
}) => {
  const userSchema = Joi.object({
    user_id: Joi.string().allow(null, '').optional(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required()
  })

  return userSchema.validate(user, { abortEarly: false })
}

export { validateUserData, validateLoginData }
