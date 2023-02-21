import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'

export default class TruthOrDareController {

    private async getQuestionsByTypeAndCategories(type: number, categoryId: number) {

        return await Question.query()
            .innerJoin('questions_categories', 'questions_categories.question_id', '=', 'questions.id')
            .where('type', type)
            .where('category_id', categoryId)
            .orderByRaw('RAND()');

    }

    public async truthQuestion({ response, params }: HttpContextContract) {

        const categoryId = params.category

        const truthQuestions = await this.getQuestionsByTypeAndCategories(1, categoryId)
        
        response.status(200)

        return truthQuestions

    }

    public async dareQuestion({ response, params }: HttpContextContract) {

        const categoryId = params.category

        const dareQuestions = await this.getQuestionsByTypeAndCategories(0, categoryId)

        response.status(200)

        return dareQuestions

    }
}