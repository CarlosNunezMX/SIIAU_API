# SIIAU Open API
API abierta para hacer peticiones a SIIAU mediante una REST API.

## Uso básico del API.
Para conectarse al API, se requiere usar la base del endpoint `/api`, junto a el metodo que requiera usar, además de las cabezeras de autenticación

Aqui un ejemplo de una petición a un endpoint:
```javascript
    fetch("/api/shedule", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth-user": "example",
            "x-auth-password": "example"
        }
    })
```

Ahora un indice para el uso del API
* [Horario(Shedule)](api/shedule.md) `/api/shedule`
* [Verify(Verificación)](api/verify.md) `/api/verify`
* [Notes(Boleta)](api/notes.md) `/api/notes`
## Autenticación
Para cada petición se requeriran dos cabezeras:
```
    x-auth-user: <NIP del SIIAU>
    x-auth-password: <Contraseña de SIIAU>
```

En caso de que no incluya las cabezeras se le regresara el error `401`, junto con un JSON con el siguiente contenido
```json
{
    "message": "No se puede acceder a este recurso sin un correo y/o contraseña",
    "code": "EMPTY"
}
```
**Nota:** Para evitar problemas con las sesiones estas son abiertas en el momento que se abre una petición y son cerradas en el momento en el que se termina de procesar esta petición. Si en algún caso la peticion llega a crashear se utiliza la función `utils.Login.EmergencyLogout()`.

