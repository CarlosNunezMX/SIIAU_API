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
+  schedule: [Schedule[6]](#schedule)


## Declaración de las interfaces
Se incluyen los tipos de datos del retorno de este endpoint, en el lenguaje de programación Typescript/jsdoc

### Course
```typescript
interface Course{
    key: string,
    value: string
}
```


### Schedule
```typescript
interface Schedule{
    Day: string,
    Classess: Schedule_Data[]
}

interface Schedule_Data{
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
        Horario: {
            start: string,
            end: string
        },
        Edificio: string,
        Aula: string
}
´´´