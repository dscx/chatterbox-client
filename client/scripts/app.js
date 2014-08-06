var friends = [];
var app = {
  init: function() {
    //click handlers
    app.addFriend();
    //initial fetch
    app.fetch();
    $('#sendButton').on('click', app.addMessage);
    $('#addRoom').on('click', app.addRoom);
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
  fetch: function(roomName){
    $.ajax({
      type: 'GET',
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      success: function(data){
      //console.log(data);
        var rooms = [];
        app.clearMessages();
        if(roomName === undefined) {
          for(var i = 0; i < data.results.length; i++){
            if(data.results[i].text !== undefined){
              data.results[i].text = data.results[i].text.replace(/</g, "&lt;");
              data.results[i].text = data.results[i].text.replace(/>/g, "&gt;");
              data.results[i].text = data.results[i].text.replace(/"/g, "&quot;");
             if (friends.indexOf(data.results[i].username) > -1) {
                $('#chats').append('<div class=""><div class=" ' + data.results[i].username + ' isFriend in">' + data.results[i].username + '</div>' + ": " + '<div class="isFriend in">' + data.results[i].text + '</div></div>');
              } else {
                $('#chats').append('<div class=""><div class=" ' + data.results[i].username + ' in">' + data.results[i].username + '</div>' + ": " + '<div class="in">' + data.results[i].text + '</div></div>');                
              }
            }
            if(data.results[i].message !== undefined){
              data.results[i].message = data.results[i].message.replace(/</g, "&lt;");
              data.results[i].message = data.results[i].message.replace(/>/g, "&gt;");
              data.results[i].message = data.results[i].message.replace(/"/g, "&quot;");
              if (friends.indexOf(data.results[i].username) > -1) {
                $('#chats').append('<div class=""><div class=" ' + data.results[i].username + ' isFriend in">' + data.results[i].username + '</div>' + ": " + '<div class="isFriend in">' + data.results[i].message + '</div></div>');
              } else {
                $('#chats').append('<div class=""><div class=" ' + data.results[i].username + ' in">' + data.results[i].username + '</div>' + ": " + '<div class="in">' + data.results[i].message + '</div></div>');                
              }
            }
            rooms.push(data.results[i].roomname);
            $("." + data.results[i].username + "").on("click", function(){ app.addFriend(this.innerHTML) });
          }
        } else {
          for(var i = 0; i < data.results.length; i++){
            if(data.results[i].text !== undefined && data.results[i].roomname === roomName){
              data.results[i].text = data.results[i].text.replace(/</g, "&lt;");
              data.results[i].text = data.results[i].text.replace(/>/g, "&gt;");
              data.results[i].text = data.results[i].text.replace(/"/g, "&quot;");
              if (friends.indexOf(data.results[i].username) > -1) {
                $('#chats').append('<div class=""><div class=" ' + data.results[i].username + ' isFriend in">' + data.results[i].username + '</div>' + ": " + '<div class="isFriend in">' + data.results[i].text + '</div></div>');
              } else {
                $('#chats').append('<div class=""><div class=" ' + data.results[i].username + ' in">' + data.results[i].username + '</div>' + ": " + '<div class="in">' + data.results[i].text + '</div></div>');                
              }
            }
            if(data.results[i].message !== undefined && data.results[i].roomname === roomName){
              data.results[i].message = data.results[i].message.replace(/</g, "&lt;");
              data.results[i].message = data.results[i].message.replace(/>/g, "&gt;");
              data.results[i].message = data.results[i].message.replace(/"/g, "&quot;");
              if (friends.indexOf(data.results[i].username) > -1) {
                $('#chats').append('<div class=""><div class=" ' + data.results[i].username + ' isFriend in">' + data.results[i].username + '</div>' + ": " + '<div class="isFriend in">' + data.results[i].message + '</div></div>');
              } else {
                $('#chats').append('<div class=""><div class=" ' + data.results[i].username + ' in">' + data.results[i].username + '</div>' + ": " + '<div class="in">' + data.results[i].message + '</div></div>');                
              }
            }
            rooms.push(data.results[i].roomname);
            $("." + data.results[i].username + "").on("click", function(){ app.addFriend(this.innerHTML) });
            
          }
        }
        rooms = _.uniq(rooms);
        $('#rooms').empty();
        rooms.forEach(function(room){
          $('#rooms').append('<p>' + room + '</p>');
        });
      }
    })

  },
  clearMessages: function(){
    $('#chats').empty();
  },
  addMessage: function() {
    var text = $('#sendBox').find('#message')[0].value;
    var roomName = $('#newRoomBox').find("#newRoom")[0].value;
    var message = {
      text: text,
      username: window.location.search.slice(10),
      roomname: roomName || undefined,
    };
    app.send(message);
    //resets text field
    $("#message")[0].value = "";
  },
  addRoom: function(){
    //$('#roomSelect').append('<div>' + room +'</div>');
    //tie function to button
    //console.log($('#newRoomBox').find("#newRoom"));
    var roomName = $('#newRoomBox').find("#newRoom")[0].value;
    clearInterval(initial);
    var roomInterval = setInterval(function() {app.fetch(roomName)}, 1000);
    //check if room exists
      //if so, enter room (filter)
       //filter content
      //if not, make room and enter it
    
  },
  addFriend: function(friend){
    // $(".chats").find(".username").on("click", function(){
    console.log(friend, "FRIEND");
      console.log(JSON.stringify(friends), "friends array");
    if(friends.indexOf(friend) < 0){ friends.push(friend); }
    $("." + friend + "").addClass("isFriend");

    // })
    //clickable usernames

    //bold on click
  },

};


var initial = setInterval(app.fetch, 1000);
$(document).ready(function() {
  app.init();
});