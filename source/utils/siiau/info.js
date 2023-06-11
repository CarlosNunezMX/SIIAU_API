import { load } from "cheerio";
import { LogIn } from "./login.js";
import { Headers, URLs } from "./req.js";
export class StudentInfo extends LogIn{
    constructor(credentials){
        super(credentials);
    }
    Data = {
        Carrera: undefined,
        Codigo: undefined,
        Situacion: undefined,
        Carrera: undefined,
        Centro: undefined,
        Nivel: undefined,
        Admision: undefined,
        UltimoCiclo: undefined,
        Sede: undefined,
        Certificacion: undefined,
        Nombre: undefined
    }
    async Execute(){
        try{
            await this.login.bind(this)();
            await this.GetAllInfo.bind(this)()
            await this.Close.bind(this)()
        }catch(err){
            throw err;
        }
    }

    async GetAllInfo(){
        try{
            const request = await fetch(
                URLs.Siiau_getBoleta
                    .replace("$1", this.Session.Id)
                    .replace("$2", this.Session.Carrera)
                , {
                headers: {
                    ...Headers, 
                    Cookie: this.Session.CookieString
                }
            })
            const response_text = await request.text();
            const $ = load(response_text);
            const $table = $("table>tbody").first().find("td");
            
            this.Data.Codigo = Number($($table[0]).text());
            this.Data.Nombre = $($table[1]).text()
            this.Data.Situacion = $($table[2]).text()
            this.Data.Nivel = $($table[3]).text();
            
            this.Data.Admision = $($table[4]).text();
            this.Data.UltimoCiclo = $($table[5]).text()

            this.Data.Carrera = $($table[6]).text()
            this.Data.Centro = $($table[7]).text()
            this.Data.Sede = $($table[8]).text()
            this.Data.Certificacion = $($table[9]).text()
        }catch(err){
            throw {
                message: "Error al obtener datos del usuario",
                type: "UNKNOW",
                closeSession: true
            }
        }
    }
}