const Discord = require("discord.js");
const client = new Discord.Client();
var lastDate = new Date();
var sourceFile = require('./auth.json');

const fs = require('fs');

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!test")) {
	  message.channel.send("Echo test.");
  }
  if (message.content.startsWith("!save")) {
	  message.attachments.forEach(a => {
	     fs.writeFileSync(`./${a.name}`, a.file); // Write the file to the system synchronously.
	  });
  }
  if (message.content.startsWith("!cannibalism")) {
	var thisDate = new Date();
	var msDiff = thisDate.getTime()-lastDate.getTime();
    var string = "";
	var seconds = ~~(msDiff/1000)%60;
	var minutes = ~~(msDiff/(1000*60))%60;
	var hours = ~~(msDiff/(1000*60*60))%24;
	var days = ~~(msDiff/(1000*60*60*24))%365	;
	var years = ~~(msDiff/(1000*60*60*24*365));	
	if(years>0){
		string = string+years+" years, ";
	}
	if(days>0){
		string = string+days+" days, ";
	}
	if(minutes>0){
		string = string+minutes+" minutes, ";
	}
	if(msDiff>=60*1000){
		string = string+"and ";
	}
	string = "Last mention of cannibalism was "+string+seconds+" seconds ago.";
	message.channel.send(string);
	
	lastDate = thisDate;
  }
  
});

client.login(sourceFile.authtoken);
