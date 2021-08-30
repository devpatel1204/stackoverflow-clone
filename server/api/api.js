import express from 'express';
import User from '../schema/User.js';
import Answer from '../schema/Answer.js'
import Question from '../schema/Question.js';

const router=express.Router();


router.post('/signin', async (req,res,next) => {
    const exist = await User.findOne({ username: req.body.username });
    
    if(exist){
        return res.status(401).json('Username already exist');
    } 
    User.create(req.body)
    .then(data => res.json(data))
    .catch(next => console.log(next));
})

router.post('/addquestion', async (req,res,next) => {
    const exist = await Question.findOne({ _id: req.body._id});
    if(exist){
        return Question.updateOne({"_id":exist._id},{$set:{title:req.body.title, content:req.body.content}});
    } 
    else{
        Question.create(req.body)
        .then(data => res.json(data))
        .catch(next => console.log(next));
    }
})


router.post('/addanswer', async (req,res,next) => {
    const exist = await Answer.findOne({ content: req.body.content, questionid: req.body.questionid, usernameA : req.body.usernameA});
    if(exist){
        return res.status(401).json('answer already exist');
    } 
    Answer.create(req.body)
    .then(data => res.json(data))
    .catch(next => console.log(next));
})

router.get('/question/search', async (req,res,next) => {
    const exist = await Question.find({});
    if(exist){
        return res.json(exist);
    } 
    else{
        return res.json('no data found');
    }
})

router.get('/answer/search', async (req,res,next) => {
    const exist = await Answer.find(req.query);
    if(exist){
        return res.json(exist);
    } 
    else{
        return res.json('no data found');
    }
})

router.post('/login', async (req, res, next) => {
    const user = await User.findOne({username: req.body.username, password: req.body.password});
    if(user){
        return res.status(200).json(`${req.body.username} login successfull`);
    }
    else{
        return res.status(401).json('Invalid Login');
    }
})

export default router;