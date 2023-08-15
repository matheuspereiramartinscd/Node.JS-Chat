$(() => {
    $("#enviar").click(()=>{
       sendMessage({
          name: $("#nome").val(), 
          message:$("#mensagem").val()});
        })
      getMessages()
    })
    
function addMessages(message){
   $("#mensagensrecebidas").append(`
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>`)
   }
   
function getMessages(){
  $.get('http://localhost:3000/messages', (data) => {
   data.forEach(addMessages);
   })
 }
 
function sendMessage(message){
   $.post('http://localhost:3000/messages', message)
 }