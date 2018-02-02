const TelegramBot = require('node-telegram-bot-api');

let notes = [];

// Устанавливаем токен, который выдавал нам бот.
const TOKEN = '491767809:AAHfySvHArpDvBCRz3iBxEseLpshVOOWPH8';
// Включить опрос сервера
let bot = new TelegramBot(TOKEN, {polling: true});

bot.onText(/\/start/, (msg, match) => {
    bot.sendMessage(msg.from.id, 'Uhodi');
});

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
bot.onText(/\/echo (.+)/, (msg, match) => {
    const fromId = msg.from.id;
    const resp = match[1];
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/get_lyrics/, (msg, match) => {
    const fromId = msg.from.id;
    bot.sendMessage(fromId, 'Sorry, not available');
});

bot.onText(/\/help/, (msg, match) => {
    bot.sendMessage(msg.from.id, 'Lol, RIP').then(() => {
        bot.sendPhoto(msg.from.id, 'greetings.jpg');
    });
});


bot.onText(/\/напомни (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2].split(':').map(time => +time).join(':');

    notes.push( { 'uid':userId, 'time':time, 'text':text } );

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не помру :)');
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++){
        const curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if ( notes[i]['time'] == curDate ) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
                notes.splice(i,1);
            }
        }
},1000);
