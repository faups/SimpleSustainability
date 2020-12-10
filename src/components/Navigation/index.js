import React from 'react';
import { Link } from 'react-router-dom';

import tsclogo from '../../assets/tsclogo.jpg';
import './index.css';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  // <div>
  //   <Link to={ROUTES.LANDING}>Landing</Link>
  //   <code> </code>
  //   <Link to={ROUTES.HOME}>Home</Link>
  //   <code> </code>
  //   <Link to={ROUTES.ACCOUNT}>Account</Link>
  //   <code> </code>
  //   <Link to={ROUTES.ADMIN}>Admin</Link>
  //   <code> </code>
  //   <SignOutButton />
  // </div>
  <header>
    <img src={tsclogo} alt="tsclogo" />
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  </header>
);

const NavigationNonAuth = () => (
  <header>
    <img src={tsclogo} alt="tsclogo" />
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;