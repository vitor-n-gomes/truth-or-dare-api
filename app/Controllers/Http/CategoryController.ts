import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoryController {
  
  public async index() {

    const categories = await Category.all()

    return categories
  }

  public async store({ request, auth, response }: HttpContextContract) {
  
    const categoryData = await request.validate(CategoryValidator)
    
    const user = await auth.authenticate()

    const category = await user.related('category').create(categoryData)

    response.status(201);

    return category
  }

  public async show({ params }: HttpContextContract) {
    
    const category = await Category.findOrFail(params.id)

    return category

  }

  public async update({ params, request, response  }: HttpContextContract) {

    const categoryData = await request.validate(CategoryValidator)

    const category = await Category.findOrFail(params.id)

    category.description = categoryData.description

    category.status = categoryData.status

    await category.save()

    response.status(201);

    return category
  }

  public async destroy({ params,  response }: HttpContextContract) {

    const category = await Category.findOrFail(params.id)

    await category.delete()

    return response.status(204)
  }
}
