
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/', async (req, res) => {
    const response = await fetch('http://dummy-service.svc.cluster.local:8080/');
    console.log(response);
    await res.send('Hello world!');
});

app.listen(8080, () => console.log('listening on port 8080'));
