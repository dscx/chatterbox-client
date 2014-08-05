
var app = {
  init: function() {
    //click handlers
    app.addFriend();
    app.handleSubmit();
    //initial fetch
    app.fetch();
    $('#sendButton').on('click', app.addMessage);
  },
  server: 'https://api.parse.com/1/classes/chatterbox',
  send: function(message) {
    $.ajax({
      type: 'POST',
      url: app.server,
      data: JSON.stringify(message),
      contentType: 'application/json',

    })
  },
  fetch: function(){
    $.ajax({
      type: 'GET',
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      success: function(data){
      //  console.log(data);
        var rooms = [];
        app.clearMessages();
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
    var text = $('#sendBox').find('#message')[0].value;
    //console.log(message[0].value);
    var message = {
      text: text,
      username: window.location.search.slice(10)
    };
    app.send(message);
    //resets text field
    $("#message")[0].value = "";
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
  setInterval(app.fetch, 1000);
});