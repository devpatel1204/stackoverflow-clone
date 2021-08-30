import { Form, Row, Col, Button } from 'react-bootstrap';
import {useState} from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { add_answer } from '../services/service';
import { LoginContext } from '../controller/loginstate';

const AddAnswer = (props) => {
console.log("---------->",props.question);
    const [questiondataid, setQuestiondataid] = useState(props.question);
    console.log(questiondataid);
    const {account, setAccount} = useContext(LoginContext);

    const history = useHistory();

    if(account === '') 
    {
        history.push('/login');
        alert("login to continue");
    }

    const answerInitialValues = {
        content: '',
        questionid: questiondataid,
        usernameA: account
    };

    const [answer, setanswer] = useState(answerInitialValues);

    const onInputChange = (e) => {
        setanswer({ ...answer, [e.target.name]: e.target.value });
        console.log(answer);
    }

    
    const clickHandler = async () => {
        console.log(answer);
        let response = await add_answer(answer);
        if(!response) {
            alert("invalid question");
            setanswer({ ...answer, content: ''});
            return;  
        }
        setanswer(answerInitialValues);
    }

    return (
        <div style={{ display: 'block', 
        width: '100%',
        margin: '50px auto',
        borderRadius: '5px',
        background: 'rgba(255,255,255, 0.15)',
        padding: 80,
        }} className="col-8">
            <h4 style={{color: '#ffffff', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 20}}>
                Add Answer
            </h4>
            <Form className="my-4">
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                            <span>Content</span>
                        </Form.Label>
                        <Form.Control onChange={(e) => onInputChange(e)} value={answer.content} name="content" as="textarea" placeholder="enter the body of your answer"/>
                    </Form.Group>
                </Row>
                <Button size="lg" variant="success" onClick={() => clickHandler()} style={{marginLeft: '45%', marginTop: 40}}>
                    Submit
                </Button>
            </Form>
        </div>
    ) 
}

export default AddAnswer;