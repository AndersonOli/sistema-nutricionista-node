'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Nothing here :)' }
})

Route.post('/register', 'UserController.register')
Route.post('/login', 'UserController.login')
Route.resource('rating', 'RatingController').apiOnly().middleware('auth')
Route.resource('appointment', 'AppointmentController').apiOnly().middleware('auth')
Route.resource('nutricionist', 'NutricionistController').apiOnly().middleware('auth')
