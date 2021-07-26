const express = require('express');
const cors = require('cors');
const { EventEmitter } = require('events');

const emitter = new EventEmitter();

const PORT = 5000;

const app = express();

app.use(cors);

app.get('messages', (req, res) => {
    emitter.once('new-message', (message) => {
        res.json(message);
    });
});
app.post('messages', (req, res) => {
    const { body: { message } } = req;
    debugger

    emitter.emit('new-message', message);
    res.status(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
