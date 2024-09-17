const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

app.use(express.static(__dirname));

const port = new SerialPort({ path: 'COM6', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

io.on('connection', (socket) => {
    parser.on('data', (data) => {
        socket.emit('data', data);
    });
});

http.listen(3000, () => {
    console.log('Running at Port 3000');
});
