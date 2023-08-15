const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').Server(app);
const mongoose = require('mongoose');
var io = require('socket.io')(http);
const DBurl = 'mongodb+srv://mpmcode:mpm392161@cluster0.tmve4ix.mongodb.net/?retryWrites=true&w=majority'

var Message = mongoose.model('Message',{ name : String, message : String})




app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get("/", function (req, res) {
  res.render("home", {

  })

})

app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })

  app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
        io.emit('message', req.body);
      res.sendStatus(200);
    })
  })
  


  io.on('connection', () =>{
    console.log('a user is connected')
   })

   mongoose.connect(DBurl , (err) => { 
    console.log('mongodb connected',err);
 })

   var server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
  });