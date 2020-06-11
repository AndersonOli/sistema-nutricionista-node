'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NutricionistSchema extends Schema {
  up() {
    this.create('nutricionists', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.integer('stars').defaultTo('0')
      table.string('name').notNullable()
      table.string('description')
      table.string('formation').notNullable()
      table.string('crn').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('nutricionists')
  }
}

module.exports = NutricionistSchema
