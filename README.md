# servicios-mdweb
Projecto del grupo FacilitoParece 

Para la realizacion de esta practica se utilizo: http://www.rabbitmq.com/tutorials/tutorial-five-javascript.html, que mediante topico o criterio de envio y recepcion de mensajes en una cola de RabbitMq, mediante el criterio: <idea><user><stat> permite crear 2 colas, una cola de trabajos enviados de idea y stat, y otra de "user" . 

CONSULTAS MEDIANTE POSTMAN

Action: crear idea
1. http://34.205.63.101:3000/v1/ideas
- Body: 
	{ uggesting:u1suggest3
		proposer:u1@mail.com
		name:u1name
	} 

Action: votar idea
2. http://34.205.63.101:3000/v1/idea/5af52aaa04171b1a284eef4c/votes
- Params: ideaId.
- Body: 
{
	action:true
	voterId:5af8f3b480f99b40bcb5c6a5
	voter:u1@mail.com
	idea:u1suggest3
}.
- Respuesta (pvotes creado):
{
    "__v": 0,
    "ideaId": "5af52aaa04171b1a284eef4c",
    "voterId": "5af8f3b480f99b40bcb5c6a5",
    "idea": "u1suggest3",
    "voter": "u1@mail.com",
    "_id": "5b020319cbe5df09f57cce21"
}

3. http://34.205.63.101:3000/v1/idea/5af52aaa04171b1a284eef4c/votes
- Params: ideaId.
- Body: 
{
	action:false
	voterId:5af8f3b480f99b40bcb5c6a5
	voter:u1@mail.com
	idea:u1suggest3
}.
- Respuesta (pvotes eliminado de acuerdo a ideaId y voterId):
{
    "__v": 0,
    "ideaId": "5af52aaa04171b1a284eef4c",
    "voterId": "5af8f3b480f99b40bcb5c6a5",
    "idea": "u1suggest3",
    "voter": "u1@mail.com",
    "_id": "5b020319cbe5df09f57cce21"
}

LANZAR PROCESOS PARALELOS: ESCUCHAR Y RECIBIR DE LA COLA (CONSUMIR)
- Los archivos "receiveIdeas.js" y "receiveStats.js", se encargan de lanzarlos.

PRODUCIR EVENTO VOTAR IDEA HACIA LA COLA Y CONSUMIDO POR STAT.
- Luego de votar una idea ( "patchPvotes" ), se ejecuta "sendQueueFromIdeaToStat".
- function "sendQueueFromIdeaToStat" en el archivo "ideaController.js".
	Esta funcion envia  a la cola con un argumento args=["*.*.stat", ideaId]", el primer elemento para que escuche "stat", y el segundo enviamos el id de Idea.
- Una vez que servicio stat escucha ( "*.*.stat" ), desencadena una llamada a la url: "http://api/v1/stats/" mediante POST, que se encarga de de realizar el calculo de votos ( "votes" ), y de actualizar ideas.
- La anterior llamada, ejecuta dos funciones: "countPvotesFromIdea" y "sendToQueueFromStatToIdea". 
- "countPvotesFromIdea": Mediante el "ideaId" contamos las ideas presentes en el model "Pvotes" ( votos de la idea ), y luego actualizamos el campo "votes" de "Idea". 
- "sendToQueueFromStatToIdea": Envia mensaje a la cola con args:["idea.#", mensaje] de votos ( votes ) actualizados de la Idea, para que escuche la cola. 


COMANDOS PARA CLONAR EL REPO Y ANIADIR TU RAMA(OPCIONAL).
1. En la raiz de su proyecto:
	$ git init
2. Clonar
   $ git remote add origin git@github.com:edgargregori/servicios-mdweb.git
4. Verificar datos del repo:
   $ git remote -v

5. git satus,
6. git pull origin master,
7. git branch,
8. git branch -b tu-rama,
9. git add .,
10. git commit -m "blabla",
11. git push -u origin tu-rama.

12. Trabajar en su rama, siempre verificando: 
12.1. Si la rama master cambia, entonces.
			git checkout master,
		  git pull,
			git checkout tu-rama,
			git branch, <-- verificar que estas en tu rama.
			git pull,
	    Repetir pasos 9. 10. y 11.
			 git push origin turama.

Luego de descargar/clonar, en la consola(linea de comandos Gnome-terminal Linux-Ubuntu):  
1. $ npm install --save-dev babel-preset-env,
2. $ npm --save install, 
3. $ npm start,
4. Desde el directorio queueUsers/: 
	$ ./receive_logs_dominio.js "\*.users.\*" "blabla", <-- el primer argumento: indica que este trabajador solo escuchara el servicio usuarios, el segundo argumento es opcional, para nuestro caso NO lo tomamaos en cuenta, porque el mensaje lo elaboramos en la funcion "sendQueue".
5. Desde PostMan, RESTClient, o curl:
		curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -i 'http://34.205.63.101:3000/auth/register' --data 'username=egpc&email=egpc%40mail.com&password=egpc12345',

Explicacion
1. Instalamos libreria para la sintaxis a ECMAJavascript.
2. Instalamos las demas dependencias. 
 	Se recomienda instalar en orden.
3. Iniciamos la app, y revisa la sintaxis.
		Caso de errores(volver a instalar las librerias) al ejecutar el paso 3.: 
		$ rm -r /node_modules 
		luego: ejectuar 1. y 2.
4. Este programa escucha los mensajes de la cola topic_logs que se encuentran en amqp://34.205.63.101:5672/.
		El programa que emite es:./emit_logs_dominio.js y esta incluido en 'src/controllers/userController.js'; bajo el metodo "SendQueue".
    Si quisieramos hacer una prueba sin el app-servicio-users(sin la application):
		$ ./receive_logs_dominio.js "\*.users.\*"    <-- este comando inicia a un consumidor(trabajador)
    $ ./emit_logs_dominio.js "\*.users.\*" "Hi from Sucre" <-- este comando inicia a un productor(trabajo)
 NOTA: 	si quisieramos lanzar el programa(script) que escucha(trabajador, consumidor), desde nuesta PC(linea comandos) cambiamos "localhost" a "amqp://34.205.63.101:5672", y luejo ejecutamos el paso "4.".
	
Salidas
a)Esperando mensaje de la cola desde Users
$ ./receive_logs_dominio.js "\*.users.\*"

b)REQ
$ curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -i 'http://34.205.63.101:3000/auth/register' --data 'username=egpc&email=egpc%40mail.com&password=egpc12345'

c) REP 
$ ./receive_logs_dominio.js "\*.users.\*"                       (130)
 [*] Waiting for logs. To exit press CTRL+C
 [x] \*.users.\*: 'User created:  { username: 'u2',
  email: 'u2@mail.com',
  _id: 5af3094ba8f65039c8d27266,
  created_date: 2018-05-09T14:44:27.404Z }'
^C
		
Salida crear una token:
a)REQ
 $ curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -i 'http://34.205.63.101:3000/auth/login' --data 'username=egpc&email=egpc%40mail.com&password=egpc12345'
b) REP:
...
{"token":"AASDASDFALKSDFASDLFKJALSKDJF"}

Salida crear una idea:
a) Creamos una idea(Luego de obtener el token):
$ curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H 'Authorization: JWT \<token\>' -i 'http://34.205.63.101:3000/idea' --data 'suggesting=u1suggetisng&proposer=u1%40mail.com&name=u1'

b) Lista de ideas:
$ curl -X GET -H 'Content-Type: application/x-www-form-urlencoded' -H 'Authorization: JWT <token>' -i 'http://34.205.63.101:3000/idea'


METODOS ideaController.js

receiveFromIdeaToQueue:
	Recibe de Stat de la cola emitida por stat("idea.#")

sendQueueFromStat
	Envia de Idea en la cola y luego a stat("\*.\*.stat")

METODOS statController.js

receiveFromStat:
	Recibe de Stat de la cola emitida por stat("\*.\*.stat")

sendQueueFromStatToIdea
	Envia de Stat a la cola y luego a idea ("idea.#")






