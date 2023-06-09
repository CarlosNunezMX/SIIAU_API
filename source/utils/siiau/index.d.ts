export interface Calificacion{
    NRC: number,
    Clave: string,
    Materia: string,
    Ordinario: string,
    Kardex: boolean,
    Extraordinario: boolean | string,
}

export interface Error{
    type: string,
    message: string,
    closeSession: string
}

export type Boleta = Calificacion[]