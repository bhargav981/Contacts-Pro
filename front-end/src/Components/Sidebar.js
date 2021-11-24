import React, {Component} from "react";
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";

const StyledNavItem = styled.div`
height: 70px;
width: 75px;
text-align: center;
margin-bottom: 0;
a {
  font-size: 2.7em;
  color: ${(props) => props.active ? "white" : "#9FFFCB"};
  :hover {
    opacity: 0.7;
    text-decoration: none;
  }
}
`;

class NavItem extends Component {

  handleClick = () => {
    const { path, onItemClick } = this.props;
    onItemClick(path);
  }

  render() {
    const { active } = this.props;
    return(
      <StyledNavItem active={active}>
        <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
        </Link>
      </StyledNavItem>
    );
  }
}

const StyledSideBar = styled.div`
  position: fixed;
  height: 100%;
  width: 75px;
  z-index: 1;
  top: 3.4em;
  background-color: #222;
  overflow-x: hidden;
  padding-top: 10px;
`;

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePath: this.props.location.pathname,
      items: [
        {
          path: '/',
          name: 'contacts',
          css: 'fas fa-address-book',
          key: 1 
        },
        {
          path: '/newContact',
          name: 'Create Contact',
          css: 'fas fa-user-plus',
          key: 2
        },
        {
          path: '/groups',
          name: 'Create Group',
          css: 'fas fa-users',
          key: 3
        }
      ]
    }
  };

  onItemClick = (path) => {
    this.setState({ activePath: path });
  }

  render() {
    const { items, activePath} = this.state;
    return(
      <StyledSideBar>
        {
          items.map((item) => {
            return (
              <NavItem 
                path={item.path}
                name={item.name}
                css={item.css}
                onItemClick={this.onItemClick}
                active={item.path === activePath}
                key={item.key}
              />
            );
          })
        }
      </StyledSideBar>
    );
  }
}

export default withRouter(SideBar);