# Verify (Verificación)
Este endpoint se caracteriza por hacer un incio de sesión en SIIAU y regresar si este fue exitoso, es recomendable usarlo en su formulario de login.

## Endpoint
+ **Autenticación:** Requerida
``` 
/api/verify
```

## Que retorna?
+ ok: `boolean`

**Atención aquí**: En caso de que la verificación no sea exitosa se regresara un codigo de error: 500, junto con los posibles codigo de error.
+ [Opened](./Errores.md#opened)
+ [Wrong](./Errores.md#wrong)