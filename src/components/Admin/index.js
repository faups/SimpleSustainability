import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase.users().onSnapshot(snapshot => {
      var usersList = [];

      snapshot.forEach(doc => usersList.push({
        uid: doc.id,
        email: doc.data().email,
        username: doc.data().username,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <ul>
          <strong>ID:</strong> {user.uid}
        </ul>
        <ul>
          <strong>E-Mail:</strong> {user.email}
        </ul>
        <ul>
          <strong>Username:</strong> {user.username}
        </ul>
      </li>
    ))}
  </ul>
);

export default withFirebase(AdminPage);