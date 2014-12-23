var net = require("net");
var _ = require("lodash");

global.socket = new net.Socket();
var port = global.PORT || 18632;
global.socket.connect(port, global.IP);

function getNick() {
	var nick;
	do {
		nick = prompt("Nickname: ") || "";
	} while(nick.trim().length == 0);

	return nick;
}

var commands = {
	"nick_ok": function () {
		global.socket.write("list_lobbies\n");
	},
	"list_lobbies": function () {
		global.lobbies = [];
	},
	"lobby": function (params) {
		global.lobbies.push({
			id: params[0],
			playerCount: params[1],
			players: [],
			name: params.slice(2).join(" ")
		});
		global.rewriteLobbies();
	},
	"my_lobby": function (params) {
		global.currentLobby = _.find(global.lobbies, function (l) { return l.id === params[0]; });
		$(".inLobbyAlert > button").css({ visibility: "initial" });
	},
	"player": function (params) {
		_.find(global.lobbies, function (l) { return l.id === params[0]; }).players.push(params[1]);
	},
	"start_game": function (params) {
		otherPlayer = params[0];
		document.location.href = "../game.html";
	},
	"error": function (params) {
		alert("Error: \"" + params.join(" ") + "\"");
	}
};

$(function () {
	global.socket.on("connect", function () {
		global.socket.on("data", function (b) {
			var result = b.toString();
			var data = result.trim().split("\n");
			for (var i = 0; i < data.length; i++){
				console.log(data[i]);
				if((val = _(commands).keys().find(function (c) { return data[i].indexOf(c) === 0; })) != null)
					commands[val](data[i].split(" ").slice(1));
			}
		});

		global.socket.write("nick " + getNick() + "\n");
	});
});