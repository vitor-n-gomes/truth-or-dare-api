import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UserNotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UserNotFoundException extends Exception {
    public async handle(error: this, ctx: HttpContextContract) {

        let errors:any[] = [
            {
                message: error.message
            }
        ]

        ctx.response.status(error.status).send({errors: errors})
      }
}
