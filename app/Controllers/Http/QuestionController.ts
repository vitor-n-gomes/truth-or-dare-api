import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import QuestionValidator from 'App/Validators/QuestionValidator'

export default class QuestionController {

  public async index({ response }: HttpContextContract) {
    
    const questions = await Question.query().orderBy('id', 'desc');

    response.status(200); 
    
    return questions
  }

  public async store({ request, auth, response }: HttpContextContract) {
    
    const data = await request.validate(QuestionValidator)

    const createQuestion:any = {...data}

    delete createQuestion.categoryIds

    const user = await auth.authenticate()

    const question = await user.related('question').create(createQuestion)
    
    await question.related('category').attach(data.categoryIds)

    response.status(201)

    return question
  }

  public async show({ params }: HttpContextContract) {
   
    const question = await Question.findOrFail(params.id)
   
    return question
  }

  public async update({ params, request, response }: HttpContextContract) {
  
    const data = await request.validate(QuestionValidator)

    const updateQuestion:any = {...data}

    delete updateQuestion.categoryIds

    const question = await Question.findOrFail(params.id)
  
    question.merge({...updateQuestion});
    
    await question.save()
    
    await question.related('category').detach()
    
    const categoryIds = data.categoryIds

    if (categoryIds && categoryIds.length > 0) {
    
      await question.related('category').sync(categoryIds)
    
    }
  
    response.status(200)

    return question
  }
  

  public async destroy({ params, response }: HttpContextContract) {

    const question = await Question.findOrFail(params.id)

    await question.related('category').detach()

    await question.delete()

    return response.status(204)

  }
}
