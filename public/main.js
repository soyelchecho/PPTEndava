var socket = io();
var playerId = 0;
var socketId = 0;
var turno = false;
var vez = 0;


socket.on('assingUser',function(data){
  console.log('Se asigno el numero: '  + data);
  document.getElementById('scoreTitle').innerHTML = "<h2> " + data + "</h2>";
  playerId = data;
});

socket.on('assingSocketId',function(data){
  console.log('Se asigno el numero: '  + data);
  socketId = data;
});

socket.on('imprimirID',function(){
  console.log('Id:' + socketId);
});

socket.on('turnoActual',function(data){
  document.getElementById('turno').innerHTML = '<p> El Usuario: </p> <b>'+ data + ' </b> <p> esta eligiendo </p>';
});


socket.on('mostrarUsuarios',function(data){
  // + data[i][(i+1).toString()]
  let keys = Array.from( data.keys() );
  for (var i = 0; i < data.length; i++) {
    document.getElementById('user' + (i+1)).innerHTML = '<p> Usuario'  + i  + '</p>';
  }
});

socket.on('puntaje',function(data){
  document.getElementById('userS').innerHTML = '<p>' + data[0].usuario1 +'</p>';
  document.getElementById('pcSc').innerHTML = '<p>' + data[0].usuario2 +'</p>';
});


socket.on('estadoPartida',function(data){
  document.getElementById('partida').innerHTML = data;
});

socket.on('permitirTurno',function(){
  console.log("MIRA TRIPLE GONORREA ESTAS ENTRANDO AQUI POR " + vez);
  vez ++;
  turno = true;

  document.getElementById("piedra").addEventListener('click', function (event) {
      if(turno == true){
        socket.emit('terminoTurno',{idsocket:socketId,eleccion:"piedra",usuario:playerId});
        turno = false;
      }
  });
  document.getElementById("papel").addEventListener('click', function (event) {
    if(turno == true){
      socket.emit('terminoTurno',{idsocket:socketId,eleccion:"papel",usuario:playerId});
      turno = false;
    }
  });
  document.getElementById("tijera").addEventListener('click', function (event) {
    if(turno == true){
      socket.emit('terminoTurno',{idsocket:socketId,eleccion:"tijera",usuario:playerId});
      turno = false;
    }
  });
});

socket.on('denegarTurno',function(){
  turno = false;
  document.getElementById("piedra").removeEventListener('click',function(){console.log("SE QUITO PIEDRA")});
  document.getElementById("papel").removeEventListener('click',function(){console.log("SE QUITO PAPEL")});
  document.getElementById("tijera").removeEventListener('click',function(){console.log("SE QUITO TIJERA")});
});

socket.on('ganador',function(data){
  document.getElementById('ganador').innerHTML = "<p> Ganador: " +data + "</p>";
});