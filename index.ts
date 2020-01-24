import TelegramBot = require("node-telegram-bot-api");

import { mock } from "mockerify-temp";

// Устанавливаем токен, который выдавал нам бот.
const TOKEN = '926301407:AAEVJNmkC_tZCJuEVreW0Qc_2Q6lqb63CJg';
// Включить опрос сервера
let bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', (msg) => {
    try {
        if (msg.text) {
            return bot.sendMessage(msg.from.id, mock(msg.text || "empty"));
        } else if (msg.photo) {
            return bot.sendPhoto(msg.from.id, './assets/sPonGE.png');
        } else {
            return bot.sendMessage(msg.from.id, mock("empty"));
        }
    } catch (error) {
        console.log(error);
        bot.sendMessage(msg.from.id, error.message || "error");
    }
});