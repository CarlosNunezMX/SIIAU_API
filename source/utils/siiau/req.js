export const URLs = {
    Siiau_first_login: "http://siiauescolar.siiau.udg.mx/wus/gupprincipal.forma_inicio_bd",
    Siiau_comprobe_login: "http://siiauescolar.siiau.udg.mx/wus/GUPPRINCIPAL.VALIDA_INICIO",
    Siiau_first_login_action: "GUPPRINCIPAL.VALIDA_INICIO",
    Siiau_getCarrera: "http://siiauescolar.siiau.udg.mx/wal/gupmenug.menu?p_sistema_c=ALUMNOS SEMS&p_sistemaid_n=1430&p_menupredid_n=1434&p_pidm_n=",
    Siiau_getBoleta: "http://siiauescolar.siiau.udg.mx/wal/sglhist.boleta?pidmp=$1&majrp=$2",
    Siiau_endSession: "http://siiauescolar.siiau.udg.mx/wus/gupprincipal.salir",
    Siiau_encabezado: "http://siiauescolar.siiau.udg.mx/wus/gupprincipal.encabezado",
    Siiau_inico: "http://siiauescolar.siiau.udg.mx/wus/gupprincipal.forma_inicio",
    Siiau_shedule: "http://siiauescolar.siiau.udg.mx/wal/sgpregi.horario?pidmp=$1&majrp=$2",
    Siiau_shedule_by_date: "http://siiauescolar.siiau.udg.mx/wal/sfpcoal.horario",
    Siiau_home: "http://siiauescolar.siiau.udg.mx/wus/gupprincipal.inicio"
}

export const Headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "es-MX,es;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded"
};

export const Siiau_Wrong_Password = "alert('Los datos proporcionados no son validos');"