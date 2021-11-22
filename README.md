# <p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Henry

## Objetivos del Proyecto

- Construir una App JavaScript desde cero.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Utilizar Metodologías Ágiles.
- Trabajar en equipo.
- Usar y practicar testing.
## Trabajo en Equipo

En este proyecto, van a trabajar en equipo de 4 a 6 personas. Van a trabajar siempre en pares, al terminar una tarea, van a cambiar de pareja para llegar a trabajar con todos los compañeros.
Ninguna tarea debería llevar más de dos días en terminar, si esto sucede contactar con tu PM.

Vamos a usar **GIT** para gestionar el código y **Trello** para gestionar el proyecto y facilitar la colaboración. Recomendamos el siguiente *workflow* para una tarea dada:

- Crear una Card de Trello para una tarea.
- Asignar un equipo de dos para trabajar en la tarea.
- Hacer un `branch` por cada card de trello (incluir el nombre o ID de la card en el nombre de la branch).
- Codear en equipo hasta completar la tarea (con tests).
- Pullear de master a nuestra branch (para mergear código nuevo de master).
- Pushear nuestra Branch a git y hacer un `PR` indicando la Card que cierra.
- Mover la Card de trello a `Review`.
- Asignar a otro equipo de dos para que revise el `PR`.
- Iterar hasta que no haya más comentarios:
    + Si hay un comentario, el equipo original debe codear de nuevo la solución y volver a subir el código a github.
    + Si no hay comentarios, se aprueba el `PR` y se mergea a master
- Mergear el `PR` a master.
- Volver al punto 1 hasta terminar el proyecto.
## Horarios y Fechas

El proyecto dura cuatro semanas. El lunes siguiente al terminar el sprint se realiza una demo donde se muestra al TL el progreso de esa semana. La última semana tiene el `demo final` donde se muestra el proyecto a todo el cohorte.

El horario de trabajo sigue siendo de 9AM a 18PM.
Todos los días a un horario a definir con su TL habrá un STAND UP para revisar las tareas del día, el progreso y si están bloqueados y/o necesitan ayuda.

## Comenzando

Vamos iniciar clonando el repo de Github que se les indicará llamado: `ec-{Cohorte}-{Grupo}`. Donde vamos a invitar a todos colaboradores del proyecto.

Nosotros te vamos a dar un `boilerplate` con los modelos de Usuario y el flow de autenticación funcionando. Sobre este código vas a branchear para empezar a agregar tus propias features.

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm -v
## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` vas a tener que crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Tenés que reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado por github, ya que contiene información sensible (las credenciales).

El contenido de `client` fue creado usando: Create React App.

### Requerimientos

La aplicación del e-commerce va a contar con los siguientes requerimientos:

### Usuarios no Autenticados

Un Visitante anónimo debería poder navegar tu e-commerce, ver y buscar productos.
