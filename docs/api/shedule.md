# Shedule (Horario)
Este endpoint se caracteriza por obtener el horario de el estudiante, y los ciclos disponibles

## Endpoint
+ **Autenticación:** Requerida
+ **Query:** Course
``` 
/api/schedule?course=
```

## Query
Para este endpoint existe un opción para hacer un query, que es la propiedad `course: string`, que es opcional; en la cual si se incluye servira para indicar de que ciclo escolar se necesita obtener el horario. De lo contrario se usara el ultimo que el SIIAU proporcione.


## Que retorna?
+  courses: [Course](#course)
+  schedule: [Schedule](#schedule)


## Declaración de las interfaces
Se incluyen los tipos de datos del retorno de este endpoint, en el lenguaje de programación Typescript/jsdoc

### Course
```typescript
interface Course{
    key: string,
    value: string
}

/**
    @typedef {Object} Course
    @property {string} key
    @property {string} value
**/
```


### Schedule
```typescript
interface Schedule{
    Materia: string,
    NRC: number,
    Clave: string,
    Seccion: string,
    Creditos: number,
    Profesor: string,
    Inicio: string,
    Fin: string,
    Horario: Horario[]
}

interface Horario{
        Dia: string,
        Horario: string,
        Edificio: string,
        Aula: string
}

/**
 * @typedef {Object} Horario
 * @property {string} Dia - El día de la semana del horario.
 * @property {string} Horario - El horario de la materia.
 * @property {string} Edificio - El edificio donde se imparte la materia.
 * @property {string} Aula - El aula donde se imparte la materia.
 */

/**
 * @typedef {Object} Schedule
 * @property {string} Materia - El nombre de la materia.
 * @property {number} NRC - El número de registro de curso.
 * @property {string} Clave - La clave de la materia.
 * @property {string} Seccion - La sección de la materia.
 * @property {number} Creditos - El número de créditos de la materia.
 * @property {string} Profesor - El nombre del profesor de la materia.
 * @property {string} Inicio - La hora de inicio de la materia.
 * @property {string} Fin - La hora de fin de la materia.
 * @property {Horario[]} Horario - Los horarios de la materia.
 */
´´´