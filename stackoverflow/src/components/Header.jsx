import {Navbar, Nav, Button, Container, Dropdown} from 'react-bootstrap';
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { LoginContext } from '../controller/loginstate';
import { useHistory } from 'react-router-dom';
import {IoMdPower} from 'react-icons/io';
import {BiCodeAlt} from 'react-icons/bi';
import {FaRegQuestionCircle} from 'react-icons/all';

const Header = () => {

    const { account,setAccount } = useContext(LoginContext);
    
    const history = useHistory();

    const clickHandler = () => {
        history.push('/');
        setAccount('');
    }

    return (
        <Navbar style={{height: 50, background: 'black', marginTop: 0}} sticky="top">
            <Link to='/' className="mx-auto">
                <Navbar.Brand>
                    <FaRegQuestionCircle className="mb-1" style={{color: 'white'}}/>
                    <span style={{color:'#ffffff', fontWeight: 600}}>StackOver</span>
                    <span style={{color:'orange', fontWeight: 600}}>Flow</span>
                </Navbar.Brand>
            </Link>
            {
                account === '' ?
                <Nav className="ml-auto mx-auto">
                        <Link to='/Signup'>
                            <Nav.Item  className="mr-4">
                                <Button variant="outline-success">
                                    Signup
                                </Button>
                            </Nav.Item>
                        </Link>
                        <Link to='/Login'>
                            <Nav.Item style = {{color: 'white'}}>
                                <Button variant="success">
                                    Login
                                </Button>
                            </Nav.Item>
                        </Link>
                </Nav>
                :
                <Nav className="ml-auto mx-auto">
                    <Link to='/add_question'>
                        <Nav.Item  className="mr-4">
                            <Button variant="outline-success">
                                Ask Question
                            </Button>
                        </Nav.Item>
                    </Link>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {account}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Link to='/Myprofile'>
                        <Button style={{color:'black', background:'white', border:'0px'}}>
                                Myprofile
                            </Button>
                            </Link>
                            <Dropdown.Item onClick={clickHandler}>
                                <IoMdPower style={{marginRight: 10}}/>
                                Logout
                            </Dropdown.Item>
                        
                            
                        </Dropdown.Menu> 
                        

                    </Dropdown>
                </Nav> 
            }
        </Navbar>
    )
}

export default Header;
