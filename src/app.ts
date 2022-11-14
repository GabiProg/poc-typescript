import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import router from './routes/creationRoutes.js';

const server = express();
server.use(express.json());

server.use(router);

server.listen(process.env.PORT, () => {
    console.log("The server is current listening.");
});