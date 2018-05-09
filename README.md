# servicios-mdweb
Projecto del grupo ? 

Luego de descargar/clonar, en la consola(linea de comandos Gnome-terminal Linux-Ubuntu):  
	1. $ npm install --save-dev babel-preset-env
	2. $ npm --save install 
	3. $ npm start
	4. Desde el directorio queueUsers/: 
		$ ./receive_logs_dominio.js "*.users.*"
	5. Desde PostMan, RESTClient, o curl:
		curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -i 'http://34.205.63.101:3000/auth/register' --data 'username=egpc&email=egpc%40mail.com&password=egpc12345'

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
		
