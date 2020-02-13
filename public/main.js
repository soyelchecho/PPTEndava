var socket = io();
var playerId = 0;
var socketId = 0;
var turno = false;


socket.on('assingUser',function(data){
  console.log('Se asigno el numero: '  + data);
  playerId = data;
});

socket.on('assingSocketId',function(data){
  console.log('Se asigno el numero: '  + data);
  socketId = data;
});

socket.on('imprimirID',function(){
  console.log(playerId);
});

socket.on('playerJoin',function(data){
  console.log(data);
  renderUserJoined(data);
});

socket.on('turnoActual',function(data){
  document.getElementById('turno').innerHTML = '<p> El Usuario: </p> <b>'+ data + ' </b> <p> esta eligiendo </p>';
});


socket.on('mostrarUsuarios',function(data){
  console.log(data);
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
  turno = true;
});

socket.on('denegarTurno',function(){
  turno = false;
});

socket.on('ganador',function(data){
  document.getElementById('ganador').innerHTML = "<p> Ganador: " +data + "</p>";
});