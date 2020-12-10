import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  month: '',
  year: '',
  waterUsage: '',
  energyUsage: '',
  co2Emission: '',
  role: '',
  reports: [],
  loading: false,
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase
      .user(this.props.authUser.uid)
      .get()
      .then(doc => this.setState({
        username: doc.data().username,
        email: doc.data().email,
        role: doc.data().role,
      }));
    this.props.firebase
      .reports()
      .get()
      .then(snapshot => {
        var reportsList = [];

        snapshot.forEach(doc => reportsList.push({
          uid: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          month: doc.data().month,
          year: doc.data().year,
          waterUsage: doc.data().waterUsage,
          energyUsage: doc.data().energyUsage,
          co2Emission: doc.data().co2Emission,
        }));

        this.setState({
          reports: reportsList,
          loading: false,
        });
      });
  }

  onSubmit = event => {
    const {
      username,
      email,
      month,
      year,
      waterUsage,
      energyUsage,
      co2Emission,
      role,
    } = this.state;

    this.props.firebase
      .reports()
      .add({
        uid: this.props.authUser.uid,
        username,
        email,
        month,
        year,
        waterUsage,
        energyUsage,
        co2Emission,
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE, role });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

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
      role,
      loading,
      error,
    } = this.state;

    const isInvalid =
      month === '' ||
      year === '' ||
      waterUsage === '' ||
      energyUsage === '' ||
      co2Emission === '';

    const farmerView = () => (
      <form onSubmit={this.onSubmit}>
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

    const engineerView = () => (
      <div>
        <h1>Reports</h1>
        <ul>
          {this.state.reports.map(report => (
            <li key={report.uid}>
              <ul>
                <strong>Name: </strong> {report.username}
              </ul>
              <ul>
                <strong>Email: </strong> {report.email}
              </ul>
              <ul>
                <strong>Month: </strong> {report.month}
              </ul>
              <ul>
                <strong>Year: </strong> {report.year}
              </ul>
              <ul>
                <strong>Water Usage: </strong> {report.waterUsage} gal
              </ul>
              <ul>
                <strong>Energy Usage: </strong> {report.energyUsage} kWh
              </ul>
              <ul>
                <strong>CO2 Emission: </strong> {report.co2Emission} g
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );

    return (
      <div>
        {loading && <h1>Loading...</h1>}
        {role === 'farmer' && farmerView()}
        {role === 'engineer' && engineerView()}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(HomePage));