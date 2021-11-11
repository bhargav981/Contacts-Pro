import React, { Component } from 'react';
import axios from 'axios';

class CreateCon extends Component {
  constructor(props) {
    super(props);
    this.state ={
      fname: '',
      lname: '',
      pnum: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.newContact = this.newContact.bind(this);
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  nextPath(path) {
    this.props.history.push(path);
  }

  newContact = () => {
    const {fname, lname, pnum} = this.state;
    const cdata = { fname, lname, pnum };
    axios.post('http://localhost:5000/newContact', cdata)
    .then(() => console.log('newContact added'))
    .catch(err => {
      console.log(err)
    });
  }

  render(){
    return(
      <div>
        <div>
          <label> New Contact </label>
        </div>
        <div>
          <form onSubmit={this.newContact}>
            <input
            type="text"
            name="fname"
            value={this.state.fname}
            onChange={this.handleInputChange}
            />
            <input
            type="text"
            name="lname"
            value={this.state.lname}
            onChange={this.handleInputChange}
            />
            <input
            type="text"
            name="pnum"
            value={this.state.pnum}
            onChange={this.handleInputChange}
            />
            <button type="submit" onClick={() => { this.newContact(); this.nextPath("/") }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCon