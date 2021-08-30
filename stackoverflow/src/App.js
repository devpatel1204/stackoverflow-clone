import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LoginState from "./controller/loginstate";
import AddQuestion from "./components/AddQuestion";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Myprofile from "./components/Myprofile";


function App() {
  return (
    <LoginState>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Signup' component={Signup} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/add_question' component={AddQuestion} />
          <Route exact path='/myprofile' component={Myprofile} />
        </Switch>
      </BrowserRouter>
    </LoginState>
  );
}

export default App;
