import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  flex-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      id: '',
      fname: '',
      lname: '',
      pnum: ''
    };
  }
  componentDidMount() {
    axios.get('http://localhost:5000/contacts')
    .then((results) => this.setState({
      contacts: results.data
    }))
    .catch(err => {
      console.error(err);
    })
  }

  deleteCon = (id) => {
    const currCon = this.state.contacts.filter(con => con.id !== id)
    this.setState({
      contacts: currCon,
    })
    axios
      .delete(`http://localhost:5000/delContact/${id}`) 
      .then(() => {
        console.log('Contact Deleted')
      })
      .catch( error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      })
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  render(){
    const nCon = this.state.contacts.length
    const disCon = this.state.contacts.map(con => {
    return  <div className="contactfn">
              <div className="condata" onClick={() => this.nextPath(`/contacts/${con.id}`)}>
                <div className="element">
                  {con.fname}
                </div>
                <div className="element">
                  {con.lname}
                </div>
                <div className="element">
                  {con.pnum}
                </div>
              </div>
              <button className="clibox" onClick={() => this.nextPath(`/editContact/${con.id}`)}>
                Edit
              </button>
              <button className="clidel" onClick={() => this.deleteCon(con.id)}>
                Delete
              </button>
            </div>
    })
    return(
      <FlexWrapper>
        <div>
          <div>
            <label> All Contacts </label>
            {nCon}
          </div>
          <div>
            {disCon}
          </div>
        </div>
      </FlexWrapper>
    );
  }
}
export default Contacts;