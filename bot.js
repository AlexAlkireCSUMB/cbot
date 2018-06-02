const Discord = require("discord.js");
const client = new Discord.Client();
var lastDate = Date();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!cannibalism")) {
	var thisDate = Date();
	var msDiff = thisDate-lastDate;
    message.channel.send(msDiff);
  }
});

client.login("NDUyMzMzMjY4MDYzMjIzODE4.DfO-Gw.OhSj3PUiJbEyxZQXKbd_1Ho-J5Y");
