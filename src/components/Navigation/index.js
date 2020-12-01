import React from 'react';
import { Link } from 'react-router-dom';

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
  <div>
    <Link to={ROUTES.LANDING}>Landing</Link>
    <code> </code>
    <Link to={ROUTES.HOME}>Home</Link>
    <code> </code>
    <Link to={ROUTES.ACCOUNT}>Account</Link>
    <code> </code>
    <Link to={ROUTES.ADMIN}>Admin</Link>
    <code> </code>
    <SignOutButton />
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <Link to={ROUTES.LANDING}>Landing</Link>
    <code> </code>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </div>
);

export default Navigation;