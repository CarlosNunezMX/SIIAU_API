# Info (Información del estudiante)
Este endpoint se caracteriza por obtener la información del usuario basada en la información que se encuentra en la boleta.

## Endpoint
+ **Autenticación:** Requerida
``` 
/api/info
```

## Que retorna?
Para mas informacíón revise: [`student`](#student)

## Declaración de las interfaces
Se incluyen los tipos de datos del retorno de este endpoint, en el lenguaje de programación Typescript/jsdoc
### Student
```typescript
interface Student{
    Carrera: string,
    Codigo: number,
    Situacion: string,
    Nombre: string,
    Carrera: string,
    Centro: string,
    Nivel: string,
    Admision: string,
    UltimoCiclo: string,
    Sede: string,
    Certificacion: string
}

/**
 * @typedef {Object} Student
 * @property {string} Carrera - La carrera del estudiante.
 * @property {number} Codigo - El código del estudiante.
 * @property {string} Situacion - La situación académica del estudiante.
 * @property {string} Nombre - El nombre del estudiante.
 * @property {string} Centro - El centro al que pertenece el estudiante.
 * @property {string} Nivel - El nivel académico del estudiante.
 * @property {string} Admision - La fecha de admisión del estudiante.
 * @property {string} UltimoCiclo - El último ciclo académico en el que el estudiante estuvo inscrito.
 * @property {string} Sede - La sede o campus del estudiante.
 * @property {string} Certificacion - La certificación del estudiante.
 */
```