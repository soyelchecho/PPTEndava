const express = require('express');
const io = require('socket.io');
const http = require('http')

const app = express()
const server = http.createServer(app);

var configuracion = require('./config/configuraciones');
app.set('port', configuracion.puerto);
var sockets = io.listen(server);


/*app.listen(configuracion.puerto, function () {
  console.log('Server escuchando en puerto:  ' + configuracion.puerto);
});*/




app.use('ejs', express.static(__dirname + '/views')); // Permitimos cargar las paginas de vista
app.use('/css',express.static('css'));
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', [__dirname + '/views']);





app.get('/',function(req,res){
	res.render('index.ejs');
});

var mensajes = [{

    author: "Carlos",

    text: "Hola! que tal?"

},{

    author: "Pepe",

    text: "Muy bien! y tu??"

},{

    author: "Paco",

    text: "Genial!"

}];


sockets.on('connection',function(socket){
	console.log('Un cliente se ha conectado');
	socket.emit('messages', mensajes);
	socket.on('new-message', function(data) {

	    messages.push(data);

	    sockets.sockets.emit('messages', messages);

	});
});


server.listen(app.get('port'), function() {
  console.log("Servidor corriendo en" + app.get('port'));
});
