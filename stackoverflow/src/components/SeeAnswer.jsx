import { Col, Row, Card, Spinner, Button } from 'react-bootstrap';
import { useEffect, useState} from 'react';
import {FaRegQuestionCircle} from 'react-icons/fa';
import {FcIdea} from 'react-icons/fc'
import axios from 'axios';


const url = 'http://localhost:5000/api';

const SeeAnswer = (props) => {
    
    const [ questiondata, setquestiondata ] = useState(props.question);
    var [ answerdata, setAnswerdata ] = useState([]);

    console.log(questiondata);

    const answerfinder = async (questiondata) => {
        console.log(questiondata);
        try {
            await axios.get(`${url}/answer/search`,{'params':{questionid: questiondata._id}})
            .then ((res) => {
                setAnswerdata([...answerdata, res.data]);
                console.log(answerdata);
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }

    useEffect(() => {
        answerfinder(questiondata);
    }, [])

    

    return (
        <div>
            <Row xs={1} md={1} className="g-4" style={{margin: '3% 3%'}}>
                <Card style = {{backgroundColor: 'rgba(255,255,255, 0.15)', color: '#ffffff', borderWidth: '2px' , borderBlockColor:'orange'}}>
                    <Card.Body> 
                        <Card.Title><span style={{color:'black', fontWeight: 600}}>Question title : </span>{questiondata.title}</Card.Title>
                        <Card.Text>
                        <span style={{color:'teal', fontWeight:600}}>Question: </span>{questiondata.content}
                            <br/>
                            <span style={{color:'#fff8dc', fontWeight:600}}>Asked By: {questiondata.usernameQ}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
            {
                <Row xs={1} md={2} className="g-4" style={{margin: '3% 3%'}}>
                {
                    (answerdata[0] === undefined)?
                        <div></div>:
                        answerdata[0].map((answer, index) => (
                            <Col className = "mb-3">
                                <Card style = {{backgroundColor: 'rgba(255,255,255, 0.15)', color: '#ffffff', borderWidth: '2px' , borderBlockColor:'orange'}}>
                                    <Card.Body> 
                                        
                                        <Card.Text>
                                            <span style={{color:'teal', fontWeight:600}}>Answer : </span>{answer.content}
                                            <br/>
                                            <br/>
                                            <span style={{color:'#fff8dc', fontWeight:600}}> solution by : {answer.usernameA}</span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                }
                </Row>
            }
         </div>
    )
}


export default SeeAnswer;