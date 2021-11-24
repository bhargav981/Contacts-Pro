import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { cusHistory } from '../App';

const FlexWrapper = styled.div`
  display: flex;
  flex-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

class ConPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      fname: '',
      lname: '',
      pnum: ''
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:5000/contacts/${this.state.id}`)
    .then( results => this.setState({
      fname: results.data[0].fname,
      lname: results.data[0].lname,
      pnum: results.data[0].pnum
    }))
    .catch( err => {
      console.log(err);
    })
  }

  deleteCon = (id) => {
    axios
      .delete(`http://localhost:5000/contacts/${id}`) 
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
    cusHistory.push(path);
  }

  render(){
    return(
      <FlexWrapper>
        <div className="contactfn">
          <div className="condata">
            <div className="element">
              {this.state.fname}
            </div>
            <div className="element">
              {this.state.lname}
            </div>
            <div className="element">
              {this.state.pnum}
            </div>
          </div>
          <button className="clibox" onClick={() => this.nextPath(`/editContact/${this.state.id}`)}>
            Edit
          </button>
          <button className="clidel" onClick={() => this.deleteCon(this.state.id)}>
            Delete
          </button>
        </div>
      </FlexWrapper>
    );
  }
}
export default ConPage;