import express, {Request, Response} from 'express';
import axios from 'axios';
import cors from "cors"
import cookieParser from "cookie-parser";
import {router} from "./routes/users-route";

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


const PORT = 3000;
export const BASE_URL = 'http://20.244.56.144/evaluation-service';


app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
