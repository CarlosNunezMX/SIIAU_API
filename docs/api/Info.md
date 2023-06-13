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
    Certificacion: string,
    DatosAdmision: {
            Ciclo: string,
            Procedencia: string,
            PromedioEscuela: number,
            PromedioExamen: number,
            PuntajeAdmision: number,
            TipoAdmision: string,
            AportacionVoluntaria: number
        }
}
```