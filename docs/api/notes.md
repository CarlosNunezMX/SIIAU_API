# Notes (Boleta)
Este endpoint se caracteriza por obtener la boleta de el estudiante, del ciclo correspondiente.

## Endpoint
+ **Autenticación:** Requerida
``` 
/api/notes
```

## Que retorna?
Este endpoint retornara un Arreglo en caso de tener disponible una boleta, la definicion de este arreglo esta en [Note[]](#note)

## Declaración de las interfaces
Se incluyen los tipos de datos del retorno de este endpoint, en el lenguaje de programación Typescript/jsdoc

### Note
```typescript
interface Note{
    NRC: number,
    Clave: string,
    Materia: string,
    Ordinario: string | number,
    Kardex: boolean,
    Extraordinario: boolean
};
```