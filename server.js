
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/', async (req, res) => {
    try {
        const response = await fetch(`http://${process.env.DUMMY_SERVICE_SERVICE_HOST}:8080/`);
        const body = await response.text();
        await res.send(`Forwarded {${body}}`);
    } catch (error) {
        console.error(error);
        await res.send('Hello world!');
    } 
});

const port = process.env.port | 80;

app.listen(port, () => console.log(`listening on port ${port}`));

