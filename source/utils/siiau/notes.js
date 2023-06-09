import { LogIn } from "./login.js";
import { URLs, Headers } from "./req.js";
import { load } from "cheerio";

export class Notes extends LogIn{
    constructor(credentials){
        super(credentials);
    }
    /** @type {import("./index.js").Boleta} */
    Boleta = []

    async Execute() {
        try{
            await this.login.bind(this)();
            await this.#GetBoleta.bind(this)();
            await this.Close.bind(this)()
        }catch(err){
            throw err;
        }
    }

    async #GetBoleta(){
        try{
            const request = await fetch(
                URLs.Siiau_getBoleta
                    .replace("$1", this.Session.Id)
                    .replace("$2", this.Session.Carrera), {
                headers: {
                    ...Headers,
                    Cookie: this.Session.CookieString
                }
            });
    
            const response_text = await request.text();
            const $ = load(response_text)
    
            const $table = $("table > tbody")[1];
            const $trs = $($table).find("tr");
            
            $trs.map((i, el) => {
                if(i == 0) return;
                /** @type {import("./index.js").Calificacion} */
                let Calificacion = {};

                const $el = $(el);
                const $childs = $el.find("td");
                Calificacion.NRC = Number($($childs[0]).text());
                Calificacion.Clave = $($childs[1]).text();
                Calificacion.Materia = $($childs[2]).text();
                Calificacion.Ordinario = $($childs[3]).text().trim();
                Calificacion.Kardex = $($childs[4]).text() === "SI"
                Calificacion.Extraordinario = $($childs[5]).text().trim() !== "-"
                this.Boleta.push(Calificacion);
            })
        }catch(err){
            throw {
                message: "Error al obtener datos de las calificaciones",
                type: "UNKNOW",
                closeSession: true
            }
        }
    }
}
