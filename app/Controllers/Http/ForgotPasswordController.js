'use strict'

const crypto = require('crypto')

const User = use('App/Models/User')

class ForgotPasswordController {
    async create ({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)

            user.token = crypto.randomBytes(10).toString('hex')
            user.token_created_at = new Date()

            user.save()
        } catch (error) {
            return response
                .status(error.status)
                .send({ error: { message: 'Something went wrong. Check if you sent the right email.' } })
        }
        
    }
}

module.exports = ForgotPasswordController
