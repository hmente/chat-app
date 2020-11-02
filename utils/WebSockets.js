class WebSockets {
    //array holds a list of all the active users that are online using our application.
    users = [];
    connection(client) {
      // event fired when the chat room is disconnected
      client.on("disconnect", () => {
        //run a filter on users array, where the user.id === client.id is found,remove it from the sockets array
        this.users = this.users.filter((user) => user.socketId !== client.id);
      });
      // add identity of user mapped to the socket id
      // when user logs in from the front end they will make a connection with our server by giving their identity
      client.on("identity", (userId) => {
        this.users.push({
          socketId: client.id,
          userId: userId,
        });
      });
      // when a user joins a chat room this method is called
      // subscribe person to chat & other user as well
      client.on("subscribe", (room, otherUserId = "") => {
        this.subscribeOtherUser(room, otherUserId);
        client.join(room);
      });
      // when a user leaves or wants to mute a chat room
      // mute a chat room
      client.on("unsubscribe", (room) => {
        client.leave(room);
      });
    }
    //when the user joins a chat room, they have to tell about the room they want to join along with the other person who is part of that chat room
    subscribeOtherUser(room, otherUserId) {
        //be careful, same user may be logged in from both their web app or mobile phone
        //therefore, multiple socket connections were created for same user, filter them
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
      );
      userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);
        if (socketConn) {
          socketConn.join(room);
        }
      });
    }
  }
  
  export default new WebSockets();