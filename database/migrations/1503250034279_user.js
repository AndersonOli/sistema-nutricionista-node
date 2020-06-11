'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('descripition', 255)
      table.string('profile_image', 255).notNullable()
      table.string('formation', 255).notNullable()
      table.integer('account_type', 1).notNullable()
      table.integer('stars', 1)
      table.string('crn', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
