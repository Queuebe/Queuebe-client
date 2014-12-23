global.rewriteLobbies = function () {
	$("ul").html("");
	for (var i = 0; i < global.lobbies.length; i++) {
		var lobby = global.lobbies[i];
		$("ul").append("<li id=\"" + lobby.id + "\" class=\"" + (lobby.playerCount == 1 ? "pending" : "started") + "\">" + lobby.name + "</li>");
	}
};

$(function () {
	$("body").on("click", "li", function (event) {
		global.socket.write("join_lobby " + event.target.id + "\n");
	});

	$("#lobbyNameInput").keydown(function (event) {
		if(event.which !== 13) return;
		var name = event.target.value.trim();
		if(name.length === 0) return;
		global.socket.write("create_lobby " + name + "\n");
	});
});