var _ = require("lodash");

$(function () {
	var servers = JSON.parse(localStorage["servers"] || "[]");
	for(var i = 0; i < servers.length; i++)
		$("ul").append("<li>" + servers[i] + "</li>");

	$("ul").on("click", "li", function (event) {
		splitted = $(event.target).text().split(":");
		
		global.IP = splitted[0];
		global.PORT = splitted[1];

		document.location.href = "../lobbies/lobbies.html";
	});

	$("ul").on("contextmenu", "li", function (event) {
		_.remove(servers, $(event.target).text());
		$(event.target).remove();
		localStorage["servers"] = JSON.stringify(servers);
	});

	$("input[type=text]").keydown(function (event) {
		if(event.which !== 13) return;

		servers.push(event.target.value);
		$("ul").append("<li>" + event.target.value + "</li>");
		localStorage["servers"] = JSON.stringify(servers);
	});
});