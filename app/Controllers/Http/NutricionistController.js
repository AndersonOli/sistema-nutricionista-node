'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with nutricionists
 */ 

const Nutricionist = use('App/Models/Nutricionist') 

class NutricionistController {
  async index ({ request, response, auth }) {
    try {
      if(auth.user.id.lenght <= 0){
        return 'JWT Token'
      }

      const nutricionists = await Nutricionist.all()

      return nutricionists
    } catch(e){
      return e.toString()
    }
  }

  async store ({ request, response, auth }) {
    const {id} = auth.user

    const data = request.only(['name', 'descripition', 'formation', 'crn', 'stars'])

    const nutricionist = await Nutricionist.create({...data, user_id: id})

    return nutricionist
  }
}

module.exports = NutricionistController
