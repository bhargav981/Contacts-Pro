import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Header} from './Components/Header';
import Sidebar from './Components/Sidebar';
import Contacts from './Components/Contacts';
import ConPage from './Components/ContactPage';
import CreateCon from './Components/createContact';
import EditCon from "./Components/editContact";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(
      <Router>
        <div>
          <Header/>
          <Sidebar/>
          <div>
            <Switch>
              <Route exact path="/" component={Contacts} />
              <Route path="/contacts/:id" component={ConPage} />
              <Route path="/newContact" component={CreateCon} />
              <Route exact path="/editContact/:id" component={EditCon} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;