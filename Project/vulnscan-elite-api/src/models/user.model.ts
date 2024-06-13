import { Client } from '../database/database'
import { User } from '../types/UserTypes'
import { isValidPassword, passwordHashing } from '../utils/hashing-utils'

class UserModel {
  //get all users
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `SELECT user_id,email,first_name,last_name,created_at,updated_at FROM users;`
      const queryResult = await connection.query(sqlQuery)
      connection.release()
      return queryResult.rows
    } catch (error) {
      throw new Error(`Error while getting all users: ${error}`)
    }
  }

  //get user by user_id
  async show(user_id: string): Promise<User> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `SELECT user_id,email,first_name,last_name,created_at,updated_at FROM users WHERE user_id=$1;`
      const queryResult = await connection.query(sqlQuery, [user_id])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while getting user: ${error}`)
    }
  }

  //get user by email
  async findOne(email: string): Promise<User> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `SELECT user_id,email,first_name,last_name,created_at,updated_at FROM users WHERE email=$1;`
      const queryResult = await connection.query(sqlQuery, [email])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while getting user: ${error}`)
    }
  }

  //create user
  async createUser(user: User): Promise<User> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `INSERT INTO users (email,password,first_name,last_name) VALUES ($1,$2,$3,$4) RETURNING * ;`
      const hashedPassword = passwordHashing(user.password)
      const queryResult = await connection.query(sqlQuery, [
        user.email,
        hashedPassword,
        user.first_name,
        user.last_name
      ])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while Creating user: ${error}`)
    }
  }

  //update user
  async updateUser(user: User): Promise<User> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `UPDATE users SET email=($2), password=($3)  ,first_name=($4) ,last_name=($5), updated_at= now() WHERE user_id=($1) RETURNING user_id,email,first_name,last_name ;`
      const hashedPassword = passwordHashing(user.password)
      const queryResult = await connection.query(sqlQuery, [
        user.user_id,
        user.email,
        hashedPassword,
        user.first_name,
        user.last_name
      ])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while Updating user ${user.user_id} : ${error}`)
    }
  }

  //delete user
  async delete(user_id: string): Promise<User> {
    try {
      const connection = await Client.connect()
      const sqlQuery = `DELETE FROM users WHERE user_id= $1 RETURNING user_id,email,first_name,last_name,created_at ;`
      const queryResult = await connection.query(sqlQuery, [user_id])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while deleting user :${user_id} ${error}`)
    }
  }

  //user login (auth)

  async authenticate(email: string, password: string): Promise<string | false> {
    try {
      const connection = await Client.connect()
      const sqlQuery = 'SELECT password FROM users WHERE email=$1;'
      const queryResult = await connection.query(sqlQuery, [email])
      if (isValidPassword(password, queryResult.rows[0].password as string)) {
        const result = await connection.query(`SELECT user_id From users WHERE email=$1;`, [email])
        connection.release()
        return result.rows[0].user_id
      }
      return false
    } catch (error) {
      throw new Error(`Error while User Login`)
    }
  }
}
export { UserModel }
