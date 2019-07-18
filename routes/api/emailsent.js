const mailgunLoader = require('mailgun-js')
const config = require('config')
const apikey1 = config.get('apikey')
const domain1 = config.get('domain')

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

