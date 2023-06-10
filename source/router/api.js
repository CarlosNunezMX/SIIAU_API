import { Router } from "express";
import { LogIn } from "../utils/siiau/login.js";
import { Notes } from "../utils/siiau/notes.js";
import { StudentInfo } from "../utils/siiau/info.js";
import { Shedule } from "../utils/siiau/shedule.js";

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
ApiRouter.get("/verify", async(req, res) => {
    const login = new LogIn(req.credentials);
    try{
        await login.login();
        await login.Close();
        return res.json({ok: true});
    }
    catch(err){
        if(err.endSession){
            await login.Close();
        }

        return res.status(500).json(err);
    }
})

ApiRouter.get("/student", async (req, res) => {
    const student = new StudentInfo(req.credentials);
    try{
        await student.Execute();
        return res.json(student.Data);
    }
    catch(err){
        if(err.endSession){
            await student.Close();
        }

        return res.status(500).json(err);
    }
})

ApiRouter.get("/notes", async (req, res) => {
    const notes = new Notes(req.credentials);
    try{
        await notes.Execute();
        return res.json(notes.Boleta)
    }
    catch(err){
        if(err.endSession){
            await notes.Close();
        }

        return res.status(500).json(err);
    }
})

ApiRouter.get("/shedule",async (req, res) => {
    const {course} = req.query;
    const shedule = new Shedule(req.credentials, course);
    try{
        await shedule.Execute()
        return res.json({
            courses: shedule.Courses,
            shedule: shedule.Shedule
        });
    }
    catch(err){
        if(err.endSession){
            await shedule.Close();
        }

        return res.status(500).json(err);
    }
})