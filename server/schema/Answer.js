import mongoose from 'mongoose';

const answers = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    questionid: {
        type: String,
        required: true
    },
    usernameA: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true
    }
});


const Answer = mongoose.model('Answers', answers);

export default Answer;