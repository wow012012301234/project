import { Client } from '../database/database'
import Target from '../types/Target'

class TargetModel {
  //get all targets by user and offset
  async index(user_id: string, offset: number): Promise<Target[]> {
    try {
      const connection = await Client.connect()
      const sqlQuery =
        'SELECT id,name,value,created_at,user_id FROM target WHERE user_id=$1 LIMIT 10 OFFSET $2'
      const queryResult = await connection.query(sqlQuery, [user_id, offset])
      connection.release()
      return queryResult.rows
    } catch (error) {
      throw new Error(`Error while getting targets : ${error}`)
    }
  }
  // get target by id and also user_id
  async show(target_id: string, user_id: string): Promise<Target> {
    try {
      const connection = await Client.connect()
      const sqlQuery =
        'SELECT id,name,value,created_at FROM target WHERE user_id=$1 AND target_id=$2'
      const queryResult = await connection.query(sqlQuery, [user_id, [user_id, target_id]])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while getting target : ${target_id} with user_id : ${user_id}`)
    }
  }
  // create target
  async create(target: Target): Promise<Target> {
    try {
      const connection = await Client.connect()
      const sqlQuery = 'INSERT INTO target(user_id,name,value) VALUES($1,$2,$3) RETURNING *'
      const queryResult = await connection.query(sqlQuery, [
        target.user_id,
        target.name,
        target.value
      ])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(
        `Error while createing target : ${target.name} with user_id : ${target.user_id}`
      )
    }
  }

  // update target
  async update(target: Target): Promise<Target> {
    try {
      const connection = await Client.connect()
      const sqlQuery = 'UPDATE target SET name=$1,value=$2 WHERE user_id=$3 AND id=$4 RETURNING *'
      const queryResult = await connection.query(sqlQuery, [
        target.name,
        target.value,
        target.user_id,
        target.id
      ])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(
        `Error while updateing target : ${target.id} with user_id : ${target.user_id}`
      )
    }
  }

  // delete target
  async delete(target_id: string, user_id: string): Promise<Target> {
    try {
      const connection = await Client.connect()
      const sqlQuery = 'DELETE FROM target WHERE user_id=$1 AND id=$2 RETURNING *'
      const queryResult = await connection.query(sqlQuery, [user_id, target_id])
      connection.release()
      return queryResult.rows[0]
    } catch (error) {
      throw new Error(`Error while deleteing target : ${target_id} with user_id ${user_id}`)
    }
  }
}

export default TargetModel
