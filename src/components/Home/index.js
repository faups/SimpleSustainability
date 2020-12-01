import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  month: '',
  year: '',
  waterUsage: '',
  energyUsage: '',
  co2Emission: '',
  role: '',
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  // componentDidMount() {
  //     this.props.firebase
  //       .user(this.props.authUser.uid)
  //       .get()
  //       .then(doc => this.setState({ role: doc.data().role }));
  // }

  onSubmit = authUser => event => {
    const {
      month,
      year,
      waterUsage,
      energyUsage,
      co2Emission,
    } = this.state;

    console.log('role', authUser.role);

    this.props.firebase
      .report(authUser.uid)
      .set({
        month,
        year,
        waterUsage,
        energyUsage,
        co2Emission,
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      month,
      year,
      waterUsage,
      energyUsage,
      co2Emission,
      error,
    } = this.state;

    const isInvalid =
      month === '' ||
      year === '' ||
      waterUsage === '' ||
      energyUsage === '' ||
      co2Emission === '';

    const farmerView = (authUser) => (
      <form onSubmit={this.onSubmit(authUser)}>
        <h1>Monthly Emission Report</h1>
        <input
          name="month"
          value={month}
          onChange={this.onChange}
          type="text"
          placeholder="Month"
        />
        <input
          name="year"
          value={year}
          onChange={this.onChange}
          type="text"
          placeholder="Year"
        />
        <input
          name="waterUsage"
          value={waterUsage}
          onChange={this.onChange}
          type="text"
          placeholder="Water Usage (gal)"
        />
        <input
          name="energyUsage"
          value={energyUsage}
          onChange={this.onChange}
          type="text"
          placeholder="Energy Usage (kWh)"
        />
        <input
          name="co2Emission"
          value={co2Emission}
          onChange={this.onChange}
          type="text"
          placeholder="CO2 Emission (g)"
        />
        <button disabled={isInvalid} type="submit">
          Submit
            </button>

        {error && <p>{error.message}</p>}
      </form>
    );

    const engineerView = (authUser) => (
      <h1>Engineer view</h1>
    );

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          farmerView(authUser)
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(HomePage));