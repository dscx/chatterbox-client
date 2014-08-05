
var app = {
  init: function() {
    //click handlers
    app.addFriend();
    app.handleSubmit();
    //initial fetch
    app.fetch();
    $('#sendButton').on('click', app.addMessage);
  },
  server: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
  send: function(message) {
    $.ajax({
      type: 'POST',
      url: app.server,
      data: JSON.stringify(message)
    })
  },
  fetch: function(){
    $.ajax({
      type: 'GET',
      url: app.server,
      success: function(data){
        console.log(data);
        var rooms = [];
        for(var i = 0; i < data.results.length; i++){
          if(data.results[i].text !== undefined){
            data.results[i].text = data.results[i].text.replace(/</g, "&lt;");
            data.results[i].text = data.results[i].text.replace(/>/g, "&gt;");
            data.results[i].text = data.results[i].text.replace(/"/g, "&quot;");
            $('#chats').append('<div>' + data.results[i].username + ": " + data.results[i].text + '<div>');
          }
          if(data.results[i].message !== undefined){
            data.results[i].message = data.results[i].message.replace(/</g, "&lt;");
            data.results[i].message = data.results[i].message.replace(/>/g, "&gt;");
            data.results[i].message = data.results[i].message.replace(/"/g, "&quot;");
            $('#chats').append('<div>' + data.results[i].username + ": " + data.results[i].message + '<div>');
          }
          rooms.push(data.results[i].roomname);

        }
        rooms = _.uniq(rooms);
        rooms.forEach(function(room){
          $('#rooms').append('<p>' + room + '</p>');
        });
      }
    })
  },
  clearMessages: function(){
    $('#chats').empty();
  },
  addMessage: function(message) {
    message = $('#sendBox').find('#message');
    console.log(message[0]["value"]);
    //app.send(message);
    //$('#chats').append('<div>' + message.text + '</div>');
  },
  addRoom: function(room){
    $('#roomSelect').append('<div>' + room +'</div>');
    //make new rooms!
    //show all rooms
  },
  addFriend: function(message){ 
    // $('.username').append('<div>' + message.username + '</div>');
    //clickable usernames
    //bold on click
  },
  handleSubmit: function(){
    console.log("test send");
    //add input field
    //add submit button

  }

};



$(document).ready(function() {
  app.init();
});