
console.log(process.env);

const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/', async (req, res) => {
    try {
        const response = await fetch('http://dummy-service.svc.cluster.local:8080/');
        console.log(response);
    } catch (error) {
        console.error(error);
    } 
    await res.send('Hello world!');
});

app.listen(8080, () => console.log('listening on port 8080'));
