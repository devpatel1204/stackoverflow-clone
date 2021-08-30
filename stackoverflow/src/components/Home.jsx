import { Col, Row, Card, Spinner, Button, Container } from 'react-bootstrap';
import {FaRegQuestionCircle} from 'react-icons/fa';
import axios from 'axios';
import { LoginContext } from '../controller/loginstate';
import AddAnswer from './AddAnswer';
import EditQuestion from './EditQuestion';
import SeeAnswer from './SeeAnswer';
import { useEffect, useState, useContext} from 'react';



const url = 'http://localhost:5000/api';

const Home = () => {
    
    var [ questiondata, setQuestiondata ] = useState([]);

    const {account, setAccount} = useContext(LoginContext);

    const [ clickdone, setClickdone ] = useState("false");

    const [ clickquestionid, setClickquestionid ] =  useState();

    const questionSaver = async () => {
        try {
            await axios.get(`${url}/question/search`)
            .then ((res) => {
                console.log(res.data);
                setQuestiondata(questiondata => ([...questiondata, res.data]));
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }


    useEffect(() => {
        questionSaver();
    }, [clickdone])


    return (
        <div>
        {
            (clickdone === "false") ? 
            <div>
            {
                // component for all the questions output
                <Row xs={1} md={2} className="g-4" style={{margin: '3% 3%'}}>
                {
                    (questiondata[0] === undefined)?
                        <div></div>:
                        questiondata[0].map((question, index) => (
                            <Col className = "mb-3">
                                <Card  style = {{backgroundColor: 'rgba(255,255,255, 0.15)', color: '#ffffff', borderWidth: '2px' , borderBlockColor:'orange'}}>
                                    <Card.Body> 
                                        <Card.Title><span style={{color:'black', fontWeight: 600}}>Question title :</span> {question.title}</Card.Title>
                                        <Card.Text>
                                            <span style={{color:'teal', fontWeight:600}}>Question: </span>{question.content}
                                            <br/>
                                            <span style={{color:'#fff8dc', fontWeight:600}}>Asked By : {question.usernameQ}</span>
                                        </Card.Text>
                                        <div className="d-flex justify-content-around">
                                            <Button variant="outline-warning" size="sm" id="seeanswer" onClick={() => {setClickdone("seeanswer"); setClickquestionid(question)}}>
                                                Answers
                                            </Button>
                                            <Button variant="secondary"size="sm" id="addanswer" onClick={() => {setClickdone("addanswer"); setClickquestionid(question)}}>
                                                Add Answer
                                            </Button>
                                            
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                }
                </Row>
            }
            </div>
            :
            <div>
            {
                (clickdone === "seeanswer")?
                <div>
                    <SeeAnswer question={clickquestionid} />
                </div>
                : 
                <div>
                {
                    (clickdone === "addanswer")?
                    <div>
                        <AddAnswer question={clickquestionid._id} />
                    </div>
                    :
                    <div>
                        <EditQuestion question={clickquestionid} />
                    </div>
                }
                </div>
            }
                <div className="d-flex justify-content-center">
                    <Button variant="outline-light" style={{color:'orange'}} size="lg" id="addanswer" onClick={() => {setClickdone("false"); questionSaver(); setQuestiondata([])}}>
                        Home page
                    </Button>
                </div>
            </div>
        }
        </div>
    )
}


export default Home;