const express = require('express');
const whatsappClient = require('./client');
const { MessageMedia } = require('whatsapp-web.js');
const { ourMessage } = require('./settings');
const router = express.Router();

// Store the last message ID
let lastMessageId = null;


// Event listener to capture the last message ID
whatsappClient.on('message', async (message) => {
    lastMessageId = message.id._serialized;
});

// API endpoint to send an image, a PDF, and reply with a text message
router.post('/send-media-and-reply', async (req, res) => {
    try {
        const numbers = req.body.numbers;

        // Send the PDF file
        const pdfMedia = MessageMedia.fromFilePath('./Web-A-Thon.pdf');
        const pdfResponses = numbers.map(number => whatsappClient.sendMessage(number, pdfMedia, { caption: '' }));

        // Wait for all PDF messages to be sent
        await Promise.all(pdfResponses);

        // Send the image
        const imageMedia = MessageMedia.fromFilePath('./img.png');
        const imageResponses = numbers.map(number => whatsappClient.sendMessage(number, imageMedia, { caption: ourMessage }));

        // Wait for all image messages to be sent
        await Promise.all(imageResponses);

        // Construct the response object
        const numbersLog = numbers.map(number => ({
            number: number,
            success: true,
        }));

        // Send the response
        console.log(numbersLog);
        res.send(numbersLog);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send({ error: 'Error processing request' });
    }
});

module.exports = router;
