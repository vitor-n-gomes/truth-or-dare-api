import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class QuestionValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    categoryIds: schema.array([
      rules.minLength(1)
    ]).members(schema.number()),
    description: schema.string(),
    status: schema.boolean(),
    type: schema.number(),
  })

  public messages: CustomMessages = {}
}
