const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong2!");
  }
});

client.login("NDUyMzMzMjY4MDYzMjIzODE4.DfO-Gw.OhSj3PUiJbEyxZQXKbd_1Ho-J5Y");
