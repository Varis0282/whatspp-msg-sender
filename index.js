const express = require('express');
const whatsappClient = require('./client');
const messageRoutes = require('./messageRoutes');

whatsappClient.initialize();

const app = express();
const port = 3000;


app.use(express.json());
app.use(messageRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/filter', (req, res) => {

    const uniqueNumbers = [...new Set(req.body.numbers.split(/[,\s]+/))];

    console.log(uniqueNumbers);

    // Format each number in the array
    const formattedNumbers = uniqueNumbers.map(number => {
        // Remove any non-digit characters from the number
        const cleanNumber = number.replace(/\D/g, '');

        // Add the country code and '@c.us' to the number
        return `91${cleanNumber}@c.us`;
    });

    res.send(formattedNumbers);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
