const mailgunLoader = require('mailgun-js')
// const config = require('config')
const apikey1 = process.env.apikey
const domain1 = process.env.domain

let mailgun = mailgunLoader({
    apiKey: apikey1,
    domain: domain1
})

const sendEmail = (to, from, subject, content) => {
    let data = {
        to,
        from,
        subject,
        text: content
    }
    return mailgun.messages().send(data)
}

module.exports = sendEmail

