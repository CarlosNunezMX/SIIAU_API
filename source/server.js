import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ApiRouter } from "./router/api.js";


export class Server{
    app = express();
    constructor(port = process.env.PORT || 3000){
        this.PORT = port;
        this.middlewares()
        this.router()
    }


    middlewares(){
        this.app.use(morgan("dev"));
        this.app.use(cors("http://127.0.0.1"))
    }
    router(){
        this.app.get("/", (req, res) => res.json({message: "Server is alive"}));
        this.app.use("/api", ApiRouter);
    }
    listen(){
        this.app.listen(this.PORT, () => {
            console.log("[APP] - Listening on port ::", this.PORT)
        })
    }
}