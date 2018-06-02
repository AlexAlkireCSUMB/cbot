const Discord = require("discord.js");
const client = new Discord.Client();
var lastDate = new Date();
var sourceFile = require('./auth.json');
var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
var fs = require('fs');

const fs = require('fs');
function getImages(uri) {
    path = require('path')
 
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body)
            imgs = $('img').toArray()
            console.log("Downloading...")
            imgs.forEach(function (img) {
                //console.log(img.attribs.src)
                process.stdout.write(".");
                img_url = img.attribs.src
                if (/^https?:\/\//.test(img_url)) {
                    img_name = path.basename(img_url)
                    request(img_url).pipe(fs.createWriteStream(img_name))
                }
            })
            console.log("Done!")
        }
    })
}

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!test")) {
	  message.channel.send("Echo test.");
  }
  if (message.content.startsWith("!save")) {
    var a = (message.attachments).array()[0];
    //console.log(Attachment); //outputs array
    if(a){
		getImages(a.url);//fs.writeFileSync(`./${a.name}`, a.file)
		console.log(a.url); //undefined
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
