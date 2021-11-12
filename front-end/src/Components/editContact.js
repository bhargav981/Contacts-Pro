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

class EditCon extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      fname: '',
      lname: '',
      pnum: ''
    }
  };
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

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  
  nextPath(path) {
    this.props.history.push(path);
  }

  editContact = () => {
    const {fname, lname, pnum} = this.state
    const cdata = { fname, lname, pnum}
    axios.put(`http://localhost:5000/editContact/${this.state.id}`, cdata)
    .then(() =>console.log('Contact Updated'))
    .catch(err => {
      console.log(err);
    })

  }
  render(){
    return(
      <FlexWrapper>
        <div>
          <form onSubmit={this.editContact}>
            <input 
            placeholder="First Name"
            type="text"
            name="fname"
            value={this.state.fname}
            onChange={this.handleInputChange}
            />
            <input 
            placeholder="Last Name"
            type="text"
            name="lname"
            value={this.state.lname}
            onChange={this.handleInputChange}
            />
            <input 
            placeholder="Phone Number"
            type="text"
            name="pnum"
            value={this.state.pnum}
            onChange={this.handleInputChange}
            />
            <button type="submit" onClick={() => { this.editContact(); this.nextPath("/") }}>
              Save
            </button>
          </form>
        </div>
      </FlexWrapper>
    );
  }
}
export default EditCon