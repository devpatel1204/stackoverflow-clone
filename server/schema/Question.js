import mongoose from 'mongoose';

const questions = new mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    usernameQ: {
        type: String,
        required: true
    }
});


const Question = mongoose.model('Question', questions);

export default Question;