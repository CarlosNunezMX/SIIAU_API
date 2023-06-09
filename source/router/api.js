import { Router } from "express";
import { LogIn } from "../utils/siiau/login.js";
import { Notes } from "../utils/siiau/notes.js";
import { StudentInfo } from "../utils/siiau/info.js";

function getHeaders(req, res, next){
    const user = req.headers["x-auth-user"];
    const password = req.headers["x-auth-password"];

    if(!user || !password){
        return res.status(401).json({
            message: "No se puede acceder a este recurso sin un correo y/o contraseña",
            code: "EMPTY"
        })
    }

    req.credentials = {
        user, 
        password
    }
    next()
}

export const ApiRouter = Router();

ApiRouter.use(getHeaders)
ApiRouter.get("/student", async (req, res) => {
    const student = new StudentInfo(req.credentials);
    await student.Execute();

    return res.json(student.Data)
})

ApiRouter.get("/notes", async (req, res) => {
    const notes = new Notes(req.credentials);
    await notes.Execute();

    return res.json(notes.Boleta)
})