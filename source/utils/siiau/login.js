import { load } from "cheerio";
import { Headers, Siiau_Wrong_Password, URLs } from "./req.js";

export class LogIn{
    #credentials = {
        user: undefined,
        password: undefined
    };

    Session = {
        CookieString: undefined,
        Id: undefined,
        Carrera: undefined
    };

    constructor({user, password}){
        this.#credentials = {user, password};
    }

    #getStringCredentials(){
        return new URLSearchParams({
            "p_codigo_c": this.#credentials.user,
            "p_clave_c": this.#credentials.password
        }).toString();
    };

    async #login_step_one(){
        const request = await fetch(URLs.Siiau_first_login, {
            method: "POST",
            body: this.#getStringCredentials.bind(this)(),
            headers: Headers
        });

        const response_text = await request.text();
        const $ = load(response_text);

        const $fInicio = $("form[name='fInicio']");
        const $fInicio_action = $fInicio.attr("action");

        if($fInicio_action !== URLs.Siiau_first_login_action)
            throw {
                message: "No se pudo iniciar sesion, posibles causa:\n\t1. Se tiene una sesión en SIIAU abierta.",
                type: "OPENED"
            };
        return;
    }
    async #RetifyLogIn(){
        const request = await fetch(URLs.Siiau_comprobe_login, {
            method: "POST",
            body: this.#getStringCredentials.bind(this)(),
            headers: Headers
        });

        const response_text = await request.text();
        const $ = load(response_text);

        const $script = $("script").first();
        if($script.text() === Siiau_Wrong_Password)
            throw {
                message: "No se pudo iniciar sesion, causa:\n\tEl usuario y/o contraseña son invalidos",
                type: "WRONG"
            }
        

        const cookies = request.headers.get("Set-Cookie");
        if(!cookies) throw {
            message: "No fue posible hacer una sesion. Error desconocido.",
            type: "RARE",
            closeSession: false
        };

        this.Session.CookieString = this.#process_cookies(cookies);
        const $id = $("form input[name='p_bienvenida_c']");
        this.Session.Id = $id.val();

        console.log("[SIIAU]: Sesión de", this.#credentials.user, "iniciada");
    }

    async #GetCarrera(){
        const request = await fetch(URLs.Siiau_getCarrera + this.Session.Id, {
            headers: {
                ...Headers,
                "Cookie": this.Session.CookieString
            },
            method: "GET"
        });

        const response_text = await request.text();
        const $ = load(response_text);
        const $boleta = $("a[target='Contenido']").first();
        this.Session.Carrera = $boleta.attr("href").split("majrp=")[1];
    }

    async Close(){
        if(!this.Session.CookieString)
            throw "No se puede cerrar una sesion no existente!";
        await fetch(URLs.Siiau_endSession, {
            headers: {
                ...Headers,
                Cookie: this.Session.CookieString
            }
        })
        await fetch(URLs.Siiau_encabezado, {headers: Headers});
        await fetch(URLs.Siiau_inico, {headers: Headers});
        console.log("[SIIAU]: Sesion terminada de", this.#credentials.user)
    }
    /**
     * 
     * @param {string} cookies 
     * @returns string
     */
    #process_cookies(cookies){
        return cookies.split(";path=/").map(e => e.replace(",", "")).join(";").slice(0, -1);
    }

    async login(){
        try {
            await this.#login_step_one.bind(this)();
            await this.#RetifyLogIn.bind(this)();
            await this.#GetCarrera.bind(this)()
        }catch(err){
            throw err;
        }
    }
}