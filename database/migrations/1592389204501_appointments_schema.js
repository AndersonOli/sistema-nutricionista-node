'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppointmentsSchema extends Schema {
  up () {
    this.create('appointments', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.double('weight')
      table.double('hieght')
      table.string('reason').notNullable()
      table.integer('status').defaultTo('0')
      table.integer('nutricionist_id').notNullable()
      table.string('report', 1000)
      table.string('comments', 1000)
      table.string('extra_content', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('appointments')
  }
}

module.exports = AppointmentsSchema
