import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Category from './Category'

export default class Question extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public description: string

  @column()
  public status: boolean

  @column()
  public type: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  public user: BelongsTo<typeof User>
  
  @manyToMany(() => Category, {
    localKey: 'id',
    pivotForeignKey: 'question_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'category_id',
    pivotTable: 'questions_categories',
  })
  public category: ManyToMany<typeof Category>
  
}
