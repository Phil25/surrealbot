# SurrealBot
Steam bot of [Surreal Surfing](http://steamcommunity.com/groups/SurrealSurfing).
Working example (if online) [here](http://steamcommunity.com/id/SurrealSurfing).

# Overview
Node.js Steam bot written using [Dr. McKay](https://www.doctormckay.com/)'s Steam modules. Made purely to supply Surreal Surfing Team Fortress 2 community management purpouses, including rcon execution, notification broadcasts, game server communication and many others. __This bot is Work in Progress__.

# Dependencies
* [steam-user](https://github.com/DoctorMcKay/node-steam-user)
* [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)
* [steamid](https://github.com/DoctorMcKay/node-steamid)
* [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)
* [sourcequery](https://github.com/flamescape/SourceQuery)
* [mysql](https://github.com/mysqljs/mysql)

# Features
* ##### Game server communication
    * Sets up a server to which gameserver-side SourceMod plugin sends a register request.
        * `.reg:servername`
    * Bot can then send data back and forth using `servername` or any other aliases provided in the config file.
    * Incoming data is being distinguished by specified "type": `.type:message`.
        * e.g. `.res:Command callback string` upon executing `!rcon servername sm_some_command`.
* ##### Membership system
    * Members read from MySQL database described by the config file.
    * Barely adjustable at this point, made for Surreal Surfing hierarchy of command.
* ##### Convenient command system
    * All commands separated by file under [`./cmds/`](https://github.com/Phil25/SurrealBot/tree/master/cmds).
    * Each exports calls (aliases), [access level](https://github.com/Phil25/SurrealBot/blob/master/enums/EAccessLevel.js), description (used for `!help`) and the `exec` function.
    * Executed by putting `!` or `/` at the beginning of the chat message.
    * Exec function has automatic access to `data` object containing:
        * `client` — the `SteamUser` client,
        * steamID — of the user,
        * `net` — object for game server communication,
        * `args` — array of arguments; `0` being the command itself.
* ##### Friend flag system as nicknames
    * Friends of SteamBot have flags saved in their nicknames, making custom user settings save accross host machines.
    * [Friend flags list](https://github.com/Phil25/SurrealBot/blob/master/enums/EFriendFlag.js)
* ##### Subscription system
    * Using a command users can choose to subscribe to group's or bot's profile command notifications.
        * `!sub group/bot`/`!unsub group/bot`
    * Subscriptions are saved via friend flags.
    * Bot will broadcast a message to all appropriate subscribers should it detect a new notification displaying the amount.

# Commands
Command | Description | Usage | Access
-|-|-|-
`!broadcast`| Broadcast a message to specified flags.|`!broadcast <flags> <message> <...>`|_HeadAdmin_
`!debug`|Debug specified aspects of the bot.|`!debug <aspect>`|_HeadAdmin_
`!help`|Display all accessible commands.|`!help`|_Everyone_
`!players`|Display players of server.|`!players <server> <full>*`|_Everyone_
`!rcon`|Execute a command on a server.|`!rcon <server> <command> <...>`|_HeadAdmin_
`!say`|Say something as bot on a server.|`!say <server> <message> <...>`|_Admin_
`!subscribe`|Subscribe to notifications.|`!(un)subscribe <group/bot>`|_Everyone_
`!wipe`|Wipe bot's friends list of flagless friends.|`!wipe`|_HeadAdmin_