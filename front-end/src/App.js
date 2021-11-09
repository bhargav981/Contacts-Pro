import React from 'react';
import axios from 'axios';

class App extends React.Component {
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
    axios.get('http://localhost:5000/listCon')
    .then((results) => this.setState({
      contacts: results.data
    }))
    .catch(err => {
      console.error(err);
    })
  }

  render(){
    const nCon = this.state.contacts.length
    return(
      <div>
        {nCon}
      </div>
    );
  }
}
export default App