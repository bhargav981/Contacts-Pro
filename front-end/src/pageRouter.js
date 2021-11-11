import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import CreateCon from "./createContact";
import EditCon from "./editContact";

export default function PageRouter() {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/newContact" component={CreateCon} />
      <Route exact path="/editContact/:id" component={EditCon} />
    </Switch>
  </BrowserRouter>
  );
}