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

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      iterGrps: [],
      gname: '',
      gid: '',
      showForm: false,
      editForm: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/groups')
    .then((results) => this.setState({
      groups: results.data,
      iterGrps: JSON.stringify(this.state.groups)
    }))
    .catch(err => {
      console.error(err);
    })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  newGrp = () => {
    const gdata = {
      grp_name: this.state.gname
    };
    axios.post('http://localhost:5000/groups', gdata)
    .then((response) => {
      const newGrp = {
        id_grp: response.data.insertId,
        grp_name: gdata.grp_name
      }
      console.log(newGrp);
      this.setState({
      groups: this.state.groups.push(newGrp)
      })
    })
    .catch(err => {
      console.log(err)
    });
  }

  showForm = () => {
    return (
      <div> 
        <form id= "add-grp">
          <label>Create Group: </label>
          <input 
          type="text"
          name="gname"
          value={this.state.gname}
          onChange={this.handleInputChange}
          />
          <button onClick={() => this.setState({showForm: false}) }>
            Cancel
          </button>
          <button type="submit" onClick={() => { this.newGrp(); this.setState({showForm: false}) }}>
            Save
          </button>
        </form>
      </div>
    );
  }

  editForm = (grp) => {
    return (
      <div> 
        <form id= "edit-grp">
          <label>Rename Group: </label>
          <input type="text"
          name="groups.grp_name"
          value={grp}
          onChange={this.handleInputChange}
          /> 
          <button type="submit" onClick={() => this.setState({editForm: false}) }>
            Cancel
          </button>
          <button type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }

  deleteGrp = (id) => {
    const currGrp = this.state.groups.filter(grp => grp.id_grp !== id)
    this.setState({
      groups: currGrp
    })
    axios
      .delete(`http://localhost:5000/groups/${id}`) 
      .then(() => {
        console.log('Group Deleted')
      })
      .catch( error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      })
  }

  render(){
    const disGrp = this.state.groups.map(grp => {
    return  <div className="grpfn">
              <div className="grpdata">
                {grp.grp_name}
              </div>
              <button className="clibox" onClick={() => this.editForm(grp.grp_name)}>
                Edit
              </button>
              <button className="clidel" onClick={() => this.deleteGrp(grp.id_grp)}>
                Delete
              </button>
            </div>
    })
    return(
      <FlexWrapper>
        <div>
          <div>
            <label> 
              Groups 
            </label>
            <button className="clibox" onClick={() => this.setState({showForm: true}) }>
              New Group
            </button>
          </div>
          {this.state.showForm ? this.showForm() : null}
          <div>
            {disGrp}
          </div>
        </div>
      </FlexWrapper>
    );
  }
}
export default Groups;