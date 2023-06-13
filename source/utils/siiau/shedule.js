import { load } from "cheerio";
import { LogIn } from "./login.js";
import { Headers, URLs } from "./req.js";

export class Schedule extends LogIn {
    ciclo;
    constructor(credentials, ciclo) {
        super(credentials);
        this.ciclo = ciclo
    }
    #processDate(date){
        date = date.split("-");
        date = date.map(d => d.slice(0, 2) + ":" + d.slice(2));
        return {
            start: date[0],
            end: date[1]
        }
    }
    Courses = []
    Schedule = []
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
        let scheduleDays = [{
            Day: "Lunes",
            Initial: "L"
        }, {
            Day: "Martes",
            Initial: "M"
        }, {
            Day: "Miercoles",
            Initial: "I"
        }, {
            Day: "Jueves",
            Initial: "J"
        }, {
            Day: "Viernes",
            Initial: "V"
        }, {
            Day: "Sabado",
            Initial: "S"
        }];
        try {
            let request;
            if (!this.ciclo) {
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
            } else {
                request = await fetch(URLs.Siiau_shedule_by_date, {
                    body: new URLSearchParams({
                        pidmP: this.Session.Id,
                        cicloP: this.ciclo,
                        majrP: this.Session.Carrera,
                        encaP: 0
                    }).toString(),
                    headers: { ...Headers, Cookie: this.Session.CookieString },
                    method: "POST"
                });
            }
            const response_text = await request.text();
            const $ = load(response_text);

            let table = $('TABLE[ALIGN="CENTER"]>tbody').find("tr");
            let lastCourse = "";
            if (table.length > 0) {
                console.log("[SIIAU]: Processing")
                let jsonData = {};

                table.map((index, object) => {
                    if (index >= 2) {

                        let corseLength = $(object).children().length;
                        let childs = $(object).find("td")

                        if (corseLength === 17) {

                            let courseName = $(childs.get(2)).text();
                            lastCourse = courseName;
                            jsonData[courseName] = {}
                            jsonData[courseName]["NRC"] = $(childs.get(0)).text()
                            jsonData[courseName]["Clave"] = $(childs.get(1)).text()
                            jsonData[courseName]["Seccion"] = $(childs.get(3)).text()
                            jsonData[courseName]["Creditos"] = $(childs.get(4)).text()
                            jsonData[courseName]["Profesor"] = $(childs.get(14)).text()
                            jsonData[courseName]["Inicio"] = $(childs.get(15)).text()
                            jsonData[courseName]["Fin"] = $(childs.get(16)).text()
                            jsonData[courseName]["Horario"] = []

                            let jsonDay = {}

                            let i = 6

                            while (i <= 11) {
                                if ($(childs.get(i)).text() !== "") {

                                    jsonDay["Dia"] = $(childs.get(i)).text();
                                    i = 12;
                                }
                                i += 1;
                            }
                            jsonDay["Horario"] = this.#processDate($(childs.get(5)).text());

                            jsonDay["Edificio"] = $(childs.get(12)).text()
                            jsonDay["Aula"] = $(childs.get(13)).text();
                            jsonData[courseName]["Horario"].push(jsonDay);

                        } else if (corseLength === 13) {

                            let jsonDay = {}
                            let i = 2

                            while (i <= 7) {
                                if ($(childs.get(i)).text() !== "") {
                                    jsonDay["Dia"] = $(childs.get(i)).text()
                                    i = 8;
                                }
                                i += 1

                            }

                            jsonDay["Horario"] = this.#processDate($(childs.get(1)).text());
                            jsonDay["Edificio"] = $(childs.get(8)).text();
                            jsonDay["Aula"] = $(childs.get(9)).text();
                            jsonData[lastCourse]["Horario"].push(jsonDay);
                        }


                    }
                });

                const toArray = Object.keys(jsonData);
                let l = toArray.map(e => ({
                    ...jsonData[e],
                    Materia: e
                }))

                scheduleDays.forEach(day => {
                    const _W = l.filter(e => e.Horario.some(x => x.Dia === day.Initial));
                    this.Schedule.push({
                        Day: day.Day,
                        Classes: _W.map(e => ({
                            ...e,
                            Horario: e.Horario.filter(x => x.Dia === day.Initial)
                        })).sort((a, b) => {
                            return Number(a) < Number(b)
                        })
                    });
                })
            }

            // Getting all Courses
            const $Courses = $("select[name='pCiclo'] option");
            $Courses.map((i, course_el) => {
                if (i == 0) return;
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