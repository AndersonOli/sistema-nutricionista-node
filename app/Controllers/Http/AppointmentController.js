'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Appointment = use('App/Models/Appointment')
const Database = use('Database')

/**
 * Resourceful controller for interacting with appointments
 */
class AppointmentController {
  /**
   * Show a list of all appointments.
   * GET appointments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth }) {
    const id = auth.user.id
    const account_type = auth.user.account_type

    let result

    if (account_type == 1) {
      result = await Database.select('*').from('appointments').where('nutricionist_id', id)
    } else {
      result = await Database.select('*').from('appointments').where('user_id', id)
    }

    return result
  }

  /**
   * Render a form to be used for creating a new appointment.
   * GET appointments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new appointment.
   * POST appointments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const id = auth.user.id
    const data = request.only(['weight', 'height', 'reason', 'nutricionist_id'])

    let dataNutri = await Database.select('name').select('profile_image').from('nutricionists').where('user_id', data.nutricionist_id).first()

    const appointment = await Appointment.create({ ...data, user_id: id, nutricionist_name: dataNutri.name, profile_image: dataNutri.profile_image })

    return appointment
  }

  /**
   * Display a single appointment.
   * GET appointments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing appointment.
   * GET appointments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update appointment details.
   * PUT or PATCH appointments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, paramns }) {
    const data = request.only(['id']);

    let updateStatus = await Database.update({ status: '1' }).from('appointments').where('id', data.id)

    return updateStatus
  }

  /**
   * Delete a appointment with id.
   * DELETE appointments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = AppointmentController
