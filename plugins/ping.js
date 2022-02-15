const quotes = [
	"Quotes go here, like in the old IRC days."
];
const cardSuit = ["Hearts", "Diamonds", "Spades", "Clubs"];
const cardFace = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
const replyTest = (chan, message) => this.bot.postMessage(chan, message);

const plugin = {
    init: async (bot) => {
        this.bot = bot;
    },

    // 

    handleMessage: (message) => {
        const { trimmedText, fromUser, fromChannel, timestamp } = message;
        switch (trimmedText.toLowerCase()) {
            case 'ping':
                this.bot.postMessage(fromChannel, `<@${fromUser}> pong!`);
                break;
            case 'cheers':
                this.bot.postMessage(fromChannel, `<@${fromUser}> Cheers!`);
                break;
            case 'good bot':
                this.bot.postMessage(fromChannel, `<@${fromUser}> :)`);
                break;
            case 'bad bot':
                this.bot.postMessage(fromChannel, `<@${fromUser}> :(`);
                break;
            case 'quote':
                let x = Math.floor(Math.random() * quotes.length);
                this.bot.postMessage(fromChannel, `<@${fromUser}> ${quotes[x]}`);
                break;
            case 'testquote':
                this.bot.postMessage(fromChannel, x);
                break;
            case 'pick a card':
                let cSuit = Math.floor(Math.random() * cardSuit.length);
                let cFace = Math.floor(Math.random() * cardFace.length);
                this.bot.postMessage(fromChannel, `<@${fromUser}> You picked the ${cardFace[cFace]} of ${cardSuit[cSuit]}`);
                break;
            case '!ts':
                this.bot.postMessage(fromChannel, timestamp);
                break;
            case 'formattest':
                this.bot.postMessage(fromChannel, `\`\`\` This is a blockcode format test. \`\`\``);
                break;
            case 'formattest2':
                this.bot.postMessage(fromChannel, `\`\`\` Testing blockcode carriage returns.... \r\n This should be on a new line. \`\`\``);
                break;
            case 'formattest3':
                this.bot.postMessage(fromChannel, `<@${fromUser}> \`\`\` Testing @ calls with block code \r\n that spans multiple lines. \`\`\``);
                break;
            case 'formattest4':
                this.bot.postMessage(fromChannel, `\`\`\` <@${fromUser}> This probably won't work. \r\n It'd be a lot cooler if it did, though... \`\`\``);
                break;
            case 'hug smash':
                this.bot.postMessage(fromChannel, "hugs <@U01S09J4BUM>");
                break;
            default:
        }
    }
}

module.exports = plugin;
