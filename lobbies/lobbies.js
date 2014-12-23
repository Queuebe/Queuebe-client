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

		$(".inLobbyAlert").addClass("visible");
		$(".lobbiesWrapper").addClass("blurred");
		$(".inLobbyAlert > h2").text("In lobby " + event.target.innerHTML.trim());
	});

	$("#lobbyNameInput").keydown(function (event) {
		if(event.which !== 13) return;
		var name = event.target.value.trim();
		$(event.target).val("").blur();
		if(name.length === 0) return;
		global.socket.write("create_lobby " + name + "\n");

		$(".inLobbyAlert").addClass("visible");
		$(".lobbiesWrapper").addClass("blurred");
		$(".inLobbyAlert > h2").text("In lobby " + event.target.innerHTML.trim());
	});

	$(".inLobbyAlert > button").click(function () {
		global.socket.write("leave_lobby\n");
		$(".inLobbyAlert").removeClass("visible");
		$(".lobbiesWrapper").removeClass("blurred");
	});
});