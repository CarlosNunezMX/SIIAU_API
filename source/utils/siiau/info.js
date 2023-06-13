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
        Nombre: undefined,
        DatosAdmision: {
            Ciclo: undefined,
            Procedencia: undefined,
            PromedioEscuela: undefined,
            PromedioExamen: undefined,
            PuntajeAdmision: undefined,
            TipoAdmision: undefined,
            AportacionVoluntaria: undefined
        }
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
                URLs.Siiau_ficha
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


            const $PromTable = $('table')[4];
            const $PromTDs = $($PromTable).find('tr td');

            this.Data.DatosAdmision.Ciclo = $($PromTDs[0]).text();
            this.Data.DatosAdmision.Procedencia = $($PromTDs[1]).text();
            this.Data.DatosAdmision.TipoAdmision = $($PromTDs[2]).text();
            this.Data.DatosAdmision.PromedioEscuela = Number($($PromTDs[3]).text() ?? '0').toFixed(2);
            this.Data.DatosAdmision.PromedioExamen = Number($($PromTDs[4]).text() ?? '0').toFixed(2);
            this.Data.DatosAdmision.PuntajeAdmision = Number($($PromTDs[5]).text() ?? '0').toFixed(2);
            this.Data.DatosAdmision.AportacionVoluntaria = '$' + Number($($PromTDs[6]).text() ?? '0').toFixed(2);
        }catch(err){
            throw {
                message: "Error al obtener datos del usuario",
                type: "UNKNOW",
                closeSession: true
            }
        }
    }
}
