const express = require('express');
const io = require('socket.io');
const http = require('http');

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

var players = [];
var playersJoin = 0; 
var jugadas=[];
var turnos=0;
var puntaje=[{usuario1:0,usuario2:0}];




function jugar(socket){
	jugadas = [];
	turnos = 0;
	console.log("TURNO JUGADOR: " + turnos);
	playersJoin++;
	if(playersJoin <= 2){
		sockets.to(socket.id).emit('assingUser',playersJoin);
		sockets.to(socket.id).emit('assingSocketId',socket.id);
		var map = new Object(); 
		map[playersJoin] = socket.id;
		players.push(map);
		console.log(players);
	}
	sockets.emit('imprimirID');
	sockets.emit('puntaje',puntaje);
	sockets.emit('mostrarUsuarios',players);
	if(playersJoin > 1){
		sockets.to(players[0][1]).emit('permitirTurno');
		sockets.emit('turnoActual',1);
	}

	socket.on('terminoTurno', function(data){
		jugadas.push(data);
		turnos++;
		console.log(turnos);
		sockets.to(data.idsocket).emit('denegarTurno');
		if(turnos <2){
			console.log(players[1][2]);
			sockets.to(players[1][2]).emit('permitirTurno');
			sockets.emit('turnoActual',2);
		}else{
			console.log(jugadas);
			var decicion1 = jugadas[0].eleccion;
			var decicion2 = jugadas[1].eleccion;
			if(decicion1 == "piedra" && decicion2 == "tijera"){
				puntaje[0].usuario1 = puntaje[0].usuario1+ 1;
				sockets.emit('ganador',"User1");
			}else if(decicion1 == "piedra" && decicion2 == "papel"){
				puntaje[0].usuario2 = puntaje[0].usuario2+1;
				sockets.emit('ganador',"User2");
			}else if(decicion1 == "piedra" &&  decicion2 == "piedra"){
				sockets.emit('ganador',"EMPATE");
			}else if(decicion1 == "papel" && decicion2=="piedra"){
				puntaje[0].usuario1 = puntaje[0].usuario1 + 1;
				sockets.emit('ganador',"User1");
			}else if(decicion1 == "papel" && decicion2 == "tijera"){
				puntaje[0].usuario2 = puntaje[0].usuario2 + 1;
				sockets.emit('ganador',"User2");
			}else if(decicion1 == "papel" && decicion2=="papel"){
				sockets.emit('ganador',"EMPATE");
			}else if(decicion1=="tijera" && decicion2== "papel"){
				puntaje[0].usuario1 = puntaje[0].usuario1 + 1;
				sockets.emit('ganador',"User1");
			}else if(decicion1=="tijera" && decicion2== "piedra"){
				puntaje[0].usuario1 = puntaje[0].usuario1 + 1;
				sockets.emit('ganador',"User2");
			}else if(decicion1=="tijera" && decicion2 == "tijera"){
				sockets.emit('ganador',"EMPATE");
			}else{
				console.log('SI LLEGASTE HASTA ESTE PUNTO NO SE QUE HIJUEPUCHAS PASO');
			}
			sockets.emit('estadoPartida',("User1 Saco: " + jugadas[0].eleccion + " y User2 Saco: " + jugadas[1].eleccion));
			sockets.emit('puntaje',puntaje);
			jugar(socket);
		}
	});
}

sockets.on('connection',function(socket){
	console.log('Un cliente se ha conectado: ' + socket.id);
	jugar(socket);
});


server.listen(app.get('port'), function() {
  console.log("Servidor corriendo en" + app.get('port'));
});
