# servicios-mdweb
Projecto del grupo ? 

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
11. git push -u origin -b tu-rama.

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
	1. $ npm install --save-dev babel-preset-env
	2. $ npm --save install, 
	3. $ npm start,
	4. Desde el directorio queueUsers/: 
		$ ./receive_logs_dominio.js "*.users.*",
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
			El programa que emite es:./emit_logs_dominio.js y esta incluido en 'src/controllers/userController.js'; bajo el metodo sendQueue.
      Si quisieramos hacer una prueba sin el app-servicio-users:
			$ ./receive_logs_dominio.js "*.users.*"    <-- este comando inicia a un consumidor(trabajador)
      $ ./emit_logs_dominio.js "*.users.*" "Hi from Sucre" <-- este comando inicia a un producto(trabajo)
	 NOTA: 	si quisieramos lanzar el programa(script) que escucha(trabajador, consumidor), desde nuesta PC(linea comandos) cambiamos "localhost" a "amqp://34.205.63.101:5672", y luejo ejecutamos el paso "4.".
	
Salidas
a)Esperando mensaje de la cola desde Users
$ ./receive_logs_dominio.js "*.users.*"

b)REQ
$ curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -i 'http://34.205.63.101:3000/auth/register' --data 'username=egpc&email=egpc%40mail.com&password=egpc12345'

c) REP 
$ ./receive_logs_dominio.js "*.users.*"                       (130)
 [*] Waiting for logs. To exit press CTRL+C
 [x] *.users.*: 'User created:  { username: 'u2',
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
$ curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H 'Authorization: JWT <token>' -i 'http://34.205.63.101:3000/idea' --data 'suggesting=u1suggetisng&proposer=u1%40mail.com&name=u1'

b) Lista de ideas:
$ curl -X GET -H 'Content-Type: application/x-www-form-urlencoded' -H 'Authorization: JWT <token>' -i 'http://34.205.63.101:3000/idea'


