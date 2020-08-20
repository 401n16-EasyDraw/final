import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchRecipes, resetRecipeState } from '../store/recipe-slice';
import '../styles/header.scss';
import { logout } from '../store/user-slice';

/**
 * Simple header content that shows up on every page. Contains title and nav bar
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
function Header(props) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const { searchRecipes, user, isLoggedIn, logout, resetRecipeState } = props;

  const links = [
    { displayName: 'Home', url: '/' },
    { displayName: 'Favorites', url: '/favorites' },
  ];

  const navLinks = [];

  for (let i = 0; i < links.length; i++) {
    navLinks.push(
      <Link
        className="nav-link"
        key={i}
        to={links[i].url}
        onClick={() => setTimeout(() => setExpanded(false), 100)}
      >
        {links[i].displayName}
      </Link>
    );
  }

  return (
    <>
      <Navbar id="main-header" variant="dark" expand="md" expanded={expanded}>
        <Navbar.Brand>
          <h1>EasyCook</h1>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <>{navLinks}</>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown
                title={`Hi, ${user.name}!`}
                id="collasible-nav-dropdown"
              >
                <Link to="/favorites" className="dropdown-item">
                  Favorites
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    resetRecipeState();
                    logout();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
            <Form
              inline
              onSubmit={(e) => {
                e.preventDefault();
                searchRecipes(query);
              }}
            >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                variant="outline-dark"
                onClick={() => searchRecipes(query)}
              >
                Search
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.recipeStore.searchResults,
    isLoggedIn: state.userStore.loggedIn,
    user: state.userStore.user,
  };
};

const mapDispatchToProps = { searchRecipes, logout, resetRecipeState };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
