import { load } from "cheerio";
import { LogIn } from "./login.js";
import { Headers, URLs } from "./req.js";

export class Shedule extends LogIn {
    ciclo;
    constructor(credentials, ciclo) {
        super(credentials);
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
            const request = await fetch(
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
            const response_text = await request.text();
            const $ = load(response_text);

            let table = $('TABLE[ALIGN="CENTER"]>tbody').find("tr");
            let lastCourse = "";
            if (table.length > 0) {
                table.map((index, object) => {
                    let Shedule = {};
                    if (index >= 2) {

                        let corseLength = $(object).children().length;
                        let childs = $(object).find("td")
                        
                        if (corseLength === 17) {

                            let courseName = toCapitalLetter($(childs.get(2)).text());
                            lastCourse = courseName;
                            
                            Shedule["NRC"] = $(childs.get(0)).text()
                            Shedule["Clave"] = $(childs.get(1)).text()
                            Shedule["Seccion"] = $(childs.get(3)).text()
                            Shedule["Creditos"] = $(childs.get(4)).text()
                            Shedule["Profesor"] = $(childs.get(14)).text()
                            Shedule["Inicio"] = $(childs.get(15)).text()
                            Shedule["Fin"] = $(childs.get(16)).text()
                            Shedule["Horario"] = []

                            jsonDay = {}

                            let i = 6

                            while (i <= 11) {
                                if ($(childs.get(i)).text() !== "") {

                                    jsonDay["Dia"] = $(childs.get(i)).text();
                                    i = 12;
                                }
                                i += 1;
                            }
                            jsonDay["Horario"] = $(childs.get(5)).text();
                            jsonDay["Edificio"] = $(childs.get(12)).text();
                            jsonDay["Aula"] = $(childs.get(13)).text();
                            Shedule["Horario"].push(jsonDay);

                        } else if (corseLength === 13) {

                            jsonDay = {}
                            i = 2

                            while (i <= 7) {
                                if ($(childs.get(i)).text() !== "") {
                                    jsonDay["Dia"] = $(childs.get(i)).text()
                                    i = 8;
                                }
                                i += 1

                            }

                            jsonDay["Horario"] = $(childs.get(1)).text();
                            jsonDay["Edificio"] = $(childs.get(8)).text();
                            jsonDay["Aula"] = $(childs.get(9)).text();
                            Shedule["Horario"].push(jsonDay);


                        }
                        this.Shedule.push(Shedule)

                    }
                });
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
            throw {
                message: "Error al obtener datos del usuario",
                type: "UNKNOW",
                closeSession: true
            }
        }
    }


}