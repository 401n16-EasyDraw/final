import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchRecipes } from '../store/recipe-slice';
import '../styles/header.scss';

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
  const { searchRecipes } = props;

  const links = [
    { displayName: 'Home', url: '/' },
    { displayName: 'Subpage', url: '/subpage' },
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
          <h1>Some App Name</h1>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <>{navLinks}</>
          </Nav>
        </Navbar.Collapse>
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
          <Button variant="outline-dark" onClick={() => searchRecipes(query)}>
            Search`
          </Button>
        </Form>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipeStore.recipes,
  };
};

const mapDispatchToProps = { searchRecipes };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
