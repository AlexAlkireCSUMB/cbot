const Discord = require("discord.js");
const client = new Discord.Client();
var lastDate = new Date();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!cannibalism")) {
	var thisDate = new Date();
	var msDiff = thisDate.getTime()-lastDate.getTime();
    message.channel.send(msDiff);
	lastDate = thisDate;
  }
});

client.login("NDUyMzMzMjY4MDYzMjIzODE4.DfO-Gw.OhSj3PUiJbEyxZQXKbd_1Ho-J5Y");
