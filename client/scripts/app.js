var app = {
  init: function() {
//click handlers
//initial fetch
app.fetch();
  },
  server: 'https://api.parse.com/1/classes/chatterbox',
  data: app.fetch().done(success),
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
        for(var i = 0; i < data.results.length; i++){
          $('#chats').append('<div>' + data.results[i].text + '<div>');

        }
      }
    })
  },
  clearMessages: function(){
    $('#chats').empty();
  },
  addMessage: function(message) {
    $('#chats').append('<div>' + message.text + '</div>');
  },
  addRoom: function(room){
    $('#roomSelect').append('<div>' + room +'</div>');
  },
  addFriend: function(){ 
    $('.username').append('<div>' + username + '</div>');
  }

};



app.init();