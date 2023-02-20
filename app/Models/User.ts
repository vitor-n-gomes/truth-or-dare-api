import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Question from './Question'
import Category from './Category'

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public status: boolean

  @column()
  public forcePasswordReset: boolean

  @column()
  public resetPasswordToken: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Question, {
    foreignKey: 'userId', 
  })
  public questions: HasMany<typeof Question>

  @hasMany(() => Category, {
    foreignKey: 'userId', 
  })
  public category: HasMany<typeof Category>

  @beforeSave()
  public static async hashPassword (auth: User) {
    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }

}
