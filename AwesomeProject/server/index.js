const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const axios = require('axios');
const strapiServer = 'http://localhost:1337';

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // Функция для отправки пользователей через сокет
    const sendUsers = async () => {
        try {
            const response = await axios.get(`${strapiServer}/api/users`);
            socket.emit('users', response.data);
        } catch (error) {
            console.error('Error sending users:', error);
        }
    };

    sendUsers();
    let updGeoInterval = undefined;
    socket.on('updateUserGeo', async (userData) => {
        updGeoInterval = setInterval(async () => {
            try {
                await axios.put(
                    `${strapiServer}/api/users/${userData.id}`,
                    userData
                    );
                    console.log('usrdata upd')
            } catch (error) {
                console.log('Error updating user geodata:', error);
            }
        }, 3000)
    });

    socket.on('disconnect', () => {
        clearInterval(updGeoInterval)
        console.log('🔥: A user disconnected');
    });

});

app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
