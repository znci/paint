const db = require("./index.js");
var WebSocketServer = require("ws").Server;

var wss = new WebSocketServer({ noServer: true });

// On /app/collaborate/:collab_id, Handle WebSocket connections.
// Ensure req.session.user_id and the collab_id are valid.

wss.on("connection", function connection(ws) {
  var collab_id = req.params.collab_id;
  var user_id = req.session.user_id;

  if (!collab_id || !user_id) {
    ws.close();
    return;
  }

  // User checking logic
  db.query("SELECT * FROM users WHERE id = ?", [user_id], function (err, rows) {
    if (err) {
      ws.close();
      return;
    }
    if (rows.length === 0) {
      ws.close();
      return;
    }
  });

  // Add the user to the collab's list of members.
  // Send the user a list of the collab's members.
  // Send the collab's members a message that the user has joined.

  ws.on("message", function incoming(message) {
    // Send the message to the collab's members.
  });

  ws.on("close", function close() {
    // Remove the user from the collab's list of members.
    // Send the collab's members a message that the user has left.
  });
});
