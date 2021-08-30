import { Form, Row, Col, Button } from 'react-bootstrap';
import {useState} from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { add_question } from '../services/service';
import { LoginContext } from '../controller/loginstate';

const EditQuestion = (props) => {

    const {account, setAccount} = useContext(LoginContext);
    const [ questiondata, SetQuestiondata ] = useState(props.question);
    console.log(questiondata);
    const questionInitialValues = {
        _id: questiondata._id,
        title: questiondata.title,
        content: questiondata.content,
        usernameQ: account
    };

    const history = useHistory();

    if(questiondata.usernameQ != account)
    {
        alert("only author can edit")
        history.push('/login');
    }

    const [question, setquestion] = useState(questionInitialValues);

    const onInputChange = (e) => {
        setquestion({ ...question, [e.target.name]: e.target.value });
    }

    const clickHandler = async () => {
        let response = add_question(question);
        console.log(response);
        alert("successfully updated");
        setquestion(questionInitialValues);
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
                Edit Question
            </h4>
            <Form className="my-4">
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                            <span>Title</span>
                        </Form.Label>
                        <Form.Control onChange={(e) => onInputChange(e)} value={question.title} name="title" type="text" placeholder="enter the title of the question"/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                            <span>Type Your Question</span>
                        </Form.Label>
                        <Form.Control onChange={(e) => onInputChange(e)} value={question.content} name="content" as="textarea" placeholder="enter the question"/>
                    </Form.Group>
                </Row>
                <Button size="lg" variant="success" onClick={() => clickHandler()} style={{marginLeft: '45%', marginTop: 40}}>
                    Submit
                </Button>
            </Form>
        </div>
    ) 
}

export default EditQuestion;