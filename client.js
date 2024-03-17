const { Client, LocalAuth } = require('whatsapp-web.js')
const qrCode = require('qrcode-terminal')


const whatsappClient = new Client({
    authStrategy: new LocalAuth()
})

whatsappClient.on('qr', (qr) => {
    qrCode.generate(qr, { small: true })
    console.log('QR CODE GENERATED')
})

whatsappClient.on('ready', () => {
    console.log('Client is ready!')
})

whatsappClient.on('message', async (message) => {
    try {
        if (message.from !== 'status@broadcast') {
            const contact = await message.getContact()
            console.log(contact, message.body);
        }
    } catch (error) {

    }
})

module.exports = whatsappClient