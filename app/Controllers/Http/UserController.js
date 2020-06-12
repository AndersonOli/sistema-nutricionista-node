'use strict'

const User = use('App/Models/User')
const Nutricionist = use('App/Models/Nutricionist')
const Database = use('Database')
const { validateAll } = use('Validator')

class UserController {
    async register({ request, response }) {
        try {
            const errorMenssages = {
                'email.required': 'Esse campo obrigatório',
                'email.unique': 'Esse email já está em uso'
            }

            const rules = {
                email: 'required|email|unique:users',
                password: 'required|min:6'
            }

            const validation = await validateAll(request.all(), rules, errorMenssages)

            if (validation.fails()) {
                return response.status(401).send({ message: validation.messages() })
            }

            const data = request.only(['name', 'email', 'password', 'descripition', 'profile_image', 'formation', 'account_type', 'crn'])

            const user = await User.create(data)

            if(data.account_type == 1){
                const nutricionist = await Nutricionist.create({
                    user_id: user.id,
                    name: user.name,
                    formation: user.formation,
                    crn: user.crn
                })
            }

            return user
        } catch (e) {
            return response.status(200).send({ error: `Erro: ${e.message}` })
        }
    }

    async login({ request, response, auth }) {
        try {
            const errorMenssages = {
                'email.required': 'Esse campo obrigatório',
                'password.required': 'Esse campo obrigatório'
            }

            const rules = {
                email: 'required|email',
                password: 'required'
            }

            const validation = await validateAll(request.all(), rules, errorMenssages)

            if (validation.fails()) {
                return response.status(401).send({ message: validation.messages() })
            }

            const { email, password } = request.all()
            const token = await auth.attempt(email, password)
            return token
        } catch (e) {
            return response.status(200).send({ error: `Erro: ${e.message}`})
        }
    }
}

module.exports = UserController
