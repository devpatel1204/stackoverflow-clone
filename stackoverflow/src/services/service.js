import axios from 'axios';
import { useState } from 'react';

const url = 'http://localhost:5000/api';

export const authenticateSignup = async (user) => {
    try{
        return await axios.post(`${url}/signin`, user)
    }
    catch(error) {
        console.log('Error while calling signup api', error);
    }
}

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user);
    }
    catch(error) {
        console.log('Error while calling login api', error);
    }
}

export const add_question = async (question) => {
    try {
        return await axios.post(`${url}/addquestion`, question);
    }
    catch(error) {
        console.log('Error while calling login api', error);
    }
}

export const add_answer = async (answer) => {
    try {
        return await axios.post(`${url}/addanswer`, answer);
    }
    catch(error) {
        console.log('Error while calling login api', error);
    }
}



