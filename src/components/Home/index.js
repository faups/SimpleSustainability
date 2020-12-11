import React, { Component } from 'react';

import './index.css'

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
  search: '',
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
        this.setState({ ...INITIAL_STATE, role, username, email });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onGetReports = () => {
    // this.props.firebase
    //   .emailToggle(this.props.authUser.uid)
    //   .get()
    //   .then(doc => {
    //     this.props.firebase
    //       .emailToggle(this.props.authUser.uid)
    //       .update({
    //         toggle: !doc.data().toggle,
    //       })
    //   })
    this.props.firebase
      .excel('test')
      .getDownloadURL()
      .then(url => fetch(url).then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'test1.xlsx';
					a.click();
        })
      }))
      .catch(error => console.log(error));
  };

  render() {
    const {
      month,
      year,
      waterUsage,
      energyUsage,
      co2Emission,
      role,
      search,
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
        <div id="monthYearSelect">
          <select name="month" value={month} onChange={this.onChange}>
            <option value="">Month</option>
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="mar">March</option>
            <option value="apr">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="aug">August</option>
            <option value="sep">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
          </select>
          <select name="year" value={year} onChange={this.onChange}>
            <option value="">Year</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>
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
        <div id="monthYearSelect">
          <select name="month" value={month} onChange={this.onChange}>
            <option value="">Month</option>
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="mar">March</option>
            <option value="apr">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="aug">August</option>
            <option value="sep">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
          </select>
          <select name="year" value={year} onChange={this.onChange}>
            <option value="">Year</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <button type="button" onClick={this.onGetReports}>
            Get Reports
          </button>
        </div>
        <input
          name="search"
          value={search}
          onChange={this.onChange}
          type="text"
          placeholder="Search"
        />
        <ul>
          {this.state.reports.map(report =>
            report.month.includes(month) && report.year.includes(year) &&
              (report.username.includes(search) || report.email.includes(search)) ? (
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
              ) : (<div key={report.uid} />))}
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