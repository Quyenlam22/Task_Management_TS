import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import mainV1Routes from "./api/v1/routes/index.route";
import cors from "cors";

dotenv.config()

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

database.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())

mainV1Routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})