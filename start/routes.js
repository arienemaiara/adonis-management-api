'use strict'

const Route = use('Route')

Route.post('users', 'UserController.create').validator('User')
Route.post('sessions', 'SessionController.create').validator('Session')

Route.post('forgot_password', 'ForgotPasswordController.create').validator('ForgotPassword')
Route.put('forgot_password', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
    Route.post('files', 'FileController.store')

    Route.resource('projects', 'ProjectController')
        .apiOnly()
        .validator(new Map(
            [
                [
                    ['projects.store'],
                    ['Project']
                ]
            ]
        ))

    Route.resource('projects.tasks', 'TaskController')
        .apiOnly()
        .validator(new Map(
            [
                [
                    ['projects.tasks.store'],
                    ['Task']
                ]
            ]
        ))
}).middleware(['auth'])
