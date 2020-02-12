const app = require('express')();
var http = require('http').createServer(app);
var configuracion = require('./config/configuraciones');
var io = require('socket.io')(http);


app.use('ejs', express.static(__dirname + '/views')); // Permitimos cargar las paginas de vista
app.use('/css',express.static('css'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', [__dirname + '/views']);


app.get('/',function(req,res){
	res.render('index.ejs');
});

io.on('connection',function(socket){
	console.log
})

app.listen(configuracion.puerto, function () {
  console.log('Server escuchando en puerto:  ' + configuracion.puerto);
});