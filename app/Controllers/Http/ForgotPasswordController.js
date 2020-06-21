'use strict'

const crypto = require('crypto')
const Mail = use('Mail')

const User = use('App/Models/User')

class ForgotPasswordController {
    async create ({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)

            user.token = crypto.randomBytes(10).toString('hex')
            user.token_created_at = new Date()

            await user.save()

            await Mail.send(
                ['emails.forgot_password'],
                { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
                message => {
                    message
                        .to(user.email)
                        .from('arienemaiara@gmail.com', 'Adonis API')
                        .subject('Password recovery')
                }
            )
        } catch (error) {
            console.log(error)
            return response
                .status(error.status)
                .send({ error: { message: 'Something went wrong. Check if you sent the right email.' } })
        }
        
    }
}

module.exports = ForgotPasswordController
