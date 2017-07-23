try{
	var config = require('./config');
}catch(err){
	console.error("Error parsing config.json:\n" + err.message);
	return;
}

var SteamUser	= require('steam-user'),
	client		= new SteamUser(),
	SteamTotp	= require('steam-totp'),
	cmdProc		= require('./cmds/cmdproc.js'),
	net			= require('./lib/net.js'),
	db			= require('./lib/db.js');

net.start(config);
db.start(config);
var members = db.getMembers(config);

client.logOn({
	"accountName": config.username,
	"password": config.password,
	"twoFactorCode": SteamTotp.getAuthCode(config.sharedSecret)
});

client.on('loggedOn', function(details){
	console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
	client.setPersona(SteamUser.EPersonaState.Online);
	//client.gamesPlayed(440);
});

client.on('error', function(e){
	console.error(e);
});

client.on('friendMessage', function(steamID, message){
	if(message[0] == '/' || message[0] == '!'){
		cmdProc.process({client: client, steamID: steamID, members: members, message: message, net: net})
		return;
	}
	client.chatMessage(steamID, "What?");
});