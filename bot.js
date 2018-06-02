const Discord = require("discord.js");
const client = new Discord.Client();
var lastDate = new Date();
var sourceFile = require('./auth.json');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
//var spawn = require('child_process').spawn;
var DOWNLOAD_DIR = '/home/pi/bot/images'
const google = require('googleapis');

// Each API may support multiple version. With this sample, we're getting
// v1 of the urlshortener API, and using an API key to authenticate.

const drive = google.drive('v3');
const jwtClient = new google.auth.JWT(
  sourceFile.email,
  null,
  sourceFile.driveAuthToken,
  ['https://www.googleapis.com/auth/drive'],
  null
);

jwtClient.authorize((authErr) => {
  if (authErr) {
    console.log(authErr);
    return;
  }
  // Make an authorized requests
  
  // List Drive files.
  drive.files.list({ auth: jwtClient }, (listErr, resp) => {
    if (listErr) {
      console.log(listErr);
      return;
    }
    resp.files.forEach((file) => {
      console.log(`${file.name} (${file.mimeType})`);
    });
  });
});
function getImages(file_uri) {
    // extract the file name
    var file_name = url.parse(file_uri).pathname.split('/').pop();
    // compose the wget command
    var wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_uri;
    // excute wget using child_process' exec function

    var child = exec(wget, function(err, stdout, stderr) {
        if (err) throw err;
        else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
    });
}

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!test")) {
	  message.channel.send("Echo test.");
	  console.log(message.channel.name);
  }
  if (message.channel.name == "art-and-lore"){
    if(message.attachments){
		var a = (message.attachments).array()[0];
		//console.log(Attachment); //outputs array
		if(a){
			getImages(a.url);//fs.writeFileSync(`./${a.name}`, a.file)
			console.log(a.url); //undefined
		}
	}
	
	//console.log(Attachment.MessageAttachment); //undefined
    //console.log(Attachment.MessageAttachment['url']); //error
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
