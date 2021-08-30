import { Form, Row, Col, Button } from 'react-bootstrap';
import { FiLogIn } from 'react-icons/fi'
import {authenticateSignup} from '../services/service';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';




const signupInitialValues = {
    username: '',
    password: ''
};


const Signup = () => {

    const [signup, setSignup] = useState(signupInitialValues);

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const history = useHistory();
    
    const clickHandler = async () => {
        console.log(signup);
        let response = await authenticateSignup(signup);
        if(!response) {
            alert("invalid signup");
            setSignup({ ...signup, password: ''});
            return;
        }
        setSignup(signupInitialValues);
        history.push('/login');
    }

    return (
        <div style={{ display: 'block', 
        width: '30%',
        margin: '100px auto',
        borderRadius: '5px',
        background: 'rgba(255,255,255, 0.15)',
        padding: 30,
        }} className="col-8">
            <h4 style={{color: '#ffffff', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 15}}>
                <FiLogIn style={{color: '#ffffff', fontSize: 30}} className="mr-2"/>
                SignUp
            </h4>
            <Form>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                            <span>User Name</span>
                        </Form.Label>
                        <Form.Control onChange={(e) => onInputChange(e)} value={signup.username} name="username" type="text" placeholder="Enter User Name"/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                            <span>Password</span>
                        </Form.Label> 
                        <Form.Control onChange={(e) => onInputChange(e)} value={signup.password} name="password" type="password" placeholder="Enter Password"/>
                    </Form.Group>
                </Row>
                <Button size="lg" variant="success" onClick={() => clickHandler()} style={{marginLeft: '45%', marginTop: 20}}>
                    SignUp
                </Button>
            </Form>
        </div>
    ) 
}

export default Signup;