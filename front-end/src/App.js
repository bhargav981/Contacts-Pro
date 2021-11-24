import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Header} from './Components/Header';
import Sidebar from './Components/Sidebar';
import Contacts from './Components/Contacts';
import ConPage from './Components/ContactPage';
import CreateCon from './Components/createContact';
import EditCon from "./Components/editContact";
import Groups from './Components/Groups';

export const cusHistory = createBrowserHistory();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(
      <Router history={cusHistory}>
        <div>
          <Header/>
          <Sidebar/>
          <div>
            <Switch>
              <Route exact path="/" component={Contacts} />
              <Route path="/contacts/:id" component={ConPage} />
              <Route path="/newContact" component={CreateCon} />
              <Route path="/editContact/:id" component={EditCon} />
              <Route path="/groups" component={Groups} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;