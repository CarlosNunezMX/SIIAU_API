# Errores
En esta parte de la documentación podras encontrar como manejar los errores que puede generar el API.

## EMPTY
+ **Causa:** Este error ocurre cuando se hace una petición al API sin las cabezeras de autenticación.
+ **Solución:** Hacer de nuevo la petición con las cabezeras: `x-auth-user & x-auth-password`.

## OPENED
+ **Causa:** Hay alguna sesión en SIIAU abierta, esto puede causarse por que el usuario ha iniciado sesión en algún otro dispocitivo o por que el programa ha tenido un bug y este no pudo cerrar la sesión.
+ **Solución:** Si el usuario fue el que abrio la sesión, la solución sera que este la cierre, de lo contrario la se intentara hacer un cerrado de sesión de emergencía.

## WRONG
+ **Causa:** El usuario ha introducido la contraseña y/o nip de SIIAU de forma erronea
+ **Solución:** Hacer de nuevo la solicitud, ahora con las credenciales correctas.

## UNKNOW 
`ESTO SE CUENTA COMO UN TODO`
+ **Causa:** El programa no pudo efectuar tu solicitud de manera erronea, se buscara cerrar la sesión para no generar incovenientes.