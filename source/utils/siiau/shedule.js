import { load } from "cheerio";
import { LogIn } from "./login.js";
import { Headers, URLs } from "./req.js";

export class Shedule extends LogIn {
    ciclo;
    constructor(credentials, ciclo) {
        super(credentials);
        this.ciclo = ciclo
    }
    Courses = []
    Shedule = []
    async Execute() {
        try {
            await this.login.bind(this)();
            await this.GetInfo.bind(this)();
            await this.Close.bind(this)();
        } catch (err) {
            throw err;
        }
    };
    /**
     * @author IsmaCortGtz https://github.com/IsmaCortGtz
     * Nota, el repo fue borrado pero aún asi dejare el autor original de donde me baso
     * para escribir esta porción de código.
     */
    async GetInfo() {
        try {
            let request;
            if(!this.ciclo){
                request = await fetch(
                    URLs.Siiau_shedule
                        .replace("$1", this.Session.Id)
                        .replace("$2", this.Session.Carrera),
                    {
                        headers: {
                            ...Headers,
                            Cookie: this.Session.CookieString
                        }
                    }
                );
            }else{
                request = await fetch(URLs.Siiau_shedule_by_date, {
                    body: new URLSearchParams({
                        pidmP: this.Session.Id,
                        cicloP: this.ciclo,
                        majrP: this.Session.Carrera,
                        encaP: 0
                    }).toString(),
                    headers: {...Headers, Cookie: this.Session.CookieString},
                    method: "POST"
                });
            }
            const response_text = await request.text();
            const $ = load(response_text);

            let table = $('TABLE[ALIGN="CENTER"]>tbody').find("tr");
            let lastCourse = "";
            if (table.length > 0) {
                let lastIndex = 0;
                console.log("[SIIAU]: Processing")
                let jsonData = {};
                let current_index = 0;
                table.map( (index, object) => {  if(index >= 2){
                    let shedule = {};
                    let corseLength = $(object).children().length;
                    let childs = $(object).find("td")
                    
                    if (corseLength === 17){
                        
                        let courseName = $(childs.get(2)).text();
                        lastCourse = courseName;
                        shedule = {}
                        shedule["Materia"] = courseName
                        shedule["NRC"] = Number($(childs.get(0)).text())
                        shedule["Clave"] = $(childs.get(1)).text()
                        shedule["Seccion"] = $(childs.get(3)).text()
                        shedule["Creditos"] = Number($(childs.get(4)).text())
                        shedule["Profesor"] = $(childs.get(14)).text()
                        shedule["Inicio"] = $(childs.get(15)).text()
                        shedule["Fin"] = $(childs.get(16)).text()
                        shedule["Horario"] = []
        
                        let jsonDay = {}
        
                        let i = 6
        
                        while(i <= 11){
                            if ($(childs.get(i)).text() !== ""){
        
                                jsonDay["Dia"] = $(childs.get(i)).text();
                                i = 12;
                            }
                            i += 1;
                        }
                        jsonDay["Horario"] = $(childs.get(5)).text();
                        jsonDay["Edificio"] = $(childs.get(12)).text();
                        jsonDay["Aula"] = $(childs.get(13)).text();
                        shedule["Horario"].push(jsonDay);
                        this.Shedule.push(shedule)
                    }else if(corseLength === 13){
        
                        let jsonDay = {}
                        let i = 2
        
                        while (i <= 7){
                            if ($(childs.get(i)).text() !== ""){
                                jsonDay["Dia"] = $(childs.get(i)).text()
                                i = 8;
                            }
                            i += 1
                            
                        }
        
                        jsonDay["Horario"] = $(childs.get(1)).text();
                        jsonDay["Edificio"] = $(childs.get(8)).text();
                        jsonDay["Aula"] = $(childs.get(9)).text();
                        this.Shedule[current_index]["Horario"].push(jsonDay);
                        console.log(this.Shedule[current_index]["Horario"]);
                        current_index++;
                    }
        
        
                }});

            }

            // Getting all Courses
            const $Courses = $("select[name='pCiclo'] option");
            $Courses.map((i, course_el) => {
                if(i == 0) return;
                const $el = $(course_el);
                const key = $el.val();
                const value = $el.text().replace("\n", "");
                this.Courses.push({
                    key, value
                })
            })

        } catch (err) {
            console.log(err);
            throw {
                message: "Error al obtener datos del usuario",
                type: "UNKNOW",
                closeSession: true
            }
        }
    }


}