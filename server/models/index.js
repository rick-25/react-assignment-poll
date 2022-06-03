const mongoose = require('mongoose');

const URI = 'mongodb+srv://aditya:123@cluster0.o7fng.mongodb.net/temp?retryWrites=true&w=majority';


mongoose.connect(URI, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("\nDatabase Connected!\n");
    }
});

let Schema = mongoose.Schema;

let Poll = new Schema({
    question: String,
    totalVotes: {type: Number, default: 0},
    options: [{
        title: String,
        voteCount: {type: Number, default: 0}
    }]
});


module.exports = mongoose.model("Poll", Poll);
