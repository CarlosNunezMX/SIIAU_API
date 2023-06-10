# Notes (Boleta)
Este endpoint se caracteriza por obtener la boleta de el estudiante, del ciclo correspondiente.

## Que retorna?
Este endpoint retornara un Arreglo en caso de tener disponible una boleta, la definicion de este arreglo esta en [Note](#note)

## Declaración de las interfaces
Se incluyen los tipos de datos del retorno de este endpoint, en el lenguaje de programación Typescript/jsdoc

### Note
```typescript
interface Note{
    NRC: number,
    Clave: string,
    Materia: string,
    Ordinario: string,
    Kardex: boolean,
    Extraordinario: boolean
};

/**
 * @typedef {Object} Note
 * @property {number} NRC - El número de registro de curso.
 * @property {string} Clave - La clave de la materia.
 * @property {string} Materia - El nombre de la materia.
 * @property {string} Ordinario - Tipo de examen ordinario.
 * @property {boolean} Kardex - Indica si se lleva registro en el kardex.
 * @property {boolean} Extraordinario - Indica si se permite examen extraordinario.
 */
```