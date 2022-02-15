// Function Test.

function myFunction4(x, y) {
    console.log("Function Init");
    x.postMessage(y, "Leroy Jeeenkins!");
}


const plugin = {
    init: async (bot) => {
        this.bot = bot;
        // Post a message, connect to a database, etc
    },
    handleMessage: (message) => {
        const { trimmedText, fromUser, fromChannel } = message;
        //Do Stuff Here.

        const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        if(trimmedText.toLowerCase() === "arraytest"){
            for (x in myArray){
                this.bot.postMessage(fromChannel, myArray[x]);
            }
        }

        myFunction = () => this.bot.postMessage(fromChannel, "test");
        myFunction2 = () => this.bot.postMessage(fromChannel, "test2");
        function myFunction3(bot) {
            bot.postMessage(fromChannel, "test3");
        }
        if(trimmedText.toLowerCase() === "!test"){
            myFunction();
        }
        if(trimmedText.toLowerCase() === "!test2"){
            myFunction2();
        }
        if(trimmedText.toLowerCase() === "!test3"){
            myFunction3(this.bot);
        }
        if(trimmedText.toLowerCase() === "!test4"){
            console.log(`Command Init ${fromChannel}`);
            myFunction4(this.bot, fromChannel);
        }
    }
}

module.exports = plugin;