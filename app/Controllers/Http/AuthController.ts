import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

import BadRequestException from 'App/Exceptions/BadRequestException'

import User from 'App/Models/User'

export default class AuthController {
    public async register({ request, auth, response }: HttpContextContract) {

        const registerSchema = schema.create({

            email: schema.string({}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email' }),
            ]),

            name: schema.string([rules.minLength(3), rules.maxLength(255)]),

            password: schema.string({}, [rules.minLength(3), rules.maxLength(30), rules.confirmed('passwordConfirmation')]),
        })

        const validatedData = await request.validate({ schema: registerSchema })

        const user = await User.create({ ...validatedData });

        const token = await auth.use('api').attempt(validatedData.email, validatedData.password, {
            expiresIn: '7 days'
        })

        return response.status(201).json({ token, user })
    }

    public async login({ request, auth, response }: HttpContextContract) {

        const registerSchema = schema.create({

            email: schema.string({}, [
                rules.email(),
            ]),

            password: schema.string({}, [rules.minLength(3), rules.maxLength(30)]),
        })

        const validatedData = await request.validate({ schema: registerSchema })

        const email = validatedData.email;
        const password = validatedData.password;

        const user = await User.findBy('email', email);

        if (!user) {
            throw new BadRequestException('User not found', 409)
        }

        const token = await auth.use('api').attempt(email, password, {
            expiresIn: '7 days'
        })

        return response.json({ token, user })

    }

    public async destroy({ response, auth }: HttpContextContract) {
        await auth.logout()
        return response.ok({})
      }
}
