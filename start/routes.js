'use strict'

const Route = use('Route')

Route.post('users', 'UserController.create')
Route.post('sessions', 'SessionController.create')

Route.post('forgot_password', 'ForgotPasswordController.create')
Route.put('forgot_password', 'ForgotPasswordController.update')