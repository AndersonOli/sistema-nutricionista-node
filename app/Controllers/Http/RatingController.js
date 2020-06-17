'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Rating = use('App/Models/Rating')
const Database = use('Database')
/**
 * Resourceful controller for interacting with ratings
 */
class RatingController {
  /**
   * Show a list of all ratings.
   * GET ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth }) {
    const id = auth.user.id

    const data = request.only(['nutricionist_id'])

    let rating = await Database.select('*').from('ratings').where('nutricionist_id', data.nutricionist_id)

    return rating
  }

  /**
   * Render a form to be used for creating a new rating.
   * GET ratings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new rating.
   * POST ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const name = auth.user.name
    const id = auth.user.id
    const profile_image = auth.user.profile_image
    const data = request.only(['comment', 'rating', 'nutricionist_id'])

    let rating
    let exist = await Database.select('id').from('ratings').where('user_id', id).where('nutricionist_id', data.nutricionist_id)

    if (exist.length > 0) {
      rating = await Database.update({ comment: data.comment, rating: data.rating }).from('ratings').where('id', exist[0].id).where('nutricionist_id', data.nutricionist_id)
    } else {
      //add new rating
      rating = await Rating.create({ ...data, user_id: id, name: name, profile_image: profile_image })
    }

    //get actual rating
    let actual_rating = await Database.select('rating').from('ratings').where('nutricionist_id', data.nutricionist_id)

    let num_rows = actual_rating.length
    let rating_values = 0

    actual_rating.forEach(element => {
      rating_values += element.rating
    });

    actual_rating = rating_values / num_rows

    //update stars
    await Database.update({ stars: actual_rating }).from('nutricionists').where('user_id', data.nutricionist_id)

    return rating
  }

  /**
   * Display a single rating.
   * GET ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing rating.
   * GET ratings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update rating details.
   * PUT or PATCH ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a rating with id.
   * DELETE ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = RatingController
