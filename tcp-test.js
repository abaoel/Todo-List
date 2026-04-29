const net = require("net");

const host = "ac-wtkgi3j-shard-00-00.owtte45.mongodb.net";
const port = 27017;

console.log(`Connecting to ${host}:${port}...`);

const socket = new net.Socket();
socket.setTimeout(5000);

socket.on('connect', () => {
    console.log('TCP Connection established!');
    socket.destroy();
});

socket.on('timeout', () => {
    console.error('TCP Connection timed out!');
    socket.destroy();
});

socket.on('error', (err) => {
    console.error('TCP Connection error:', err.message);
});

socket.connect(port, host);
