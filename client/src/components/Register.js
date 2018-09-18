import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//=====================================================================================================================================
export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      loggedInName: '',
      fireRedirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //=====================================================================================================================================
  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  //=====================================================================================================================================
  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'POST',
      url: '/auth/register',
      data: {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
    })
      .then(person => {
        this.setState({
          fireRedirect: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="Register">
        <div id="join">Welcome! Join mangAnime Here</div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            name="email"
            placeholder="email"
          />

          <br />

          <input
            type="text"
            onChange={this.handleChange}
            name="username"
            placeholder="username"
          />

          <br />

          <input
            type="text"
            onChange={this.handleChange}
            name="password"
            placeholder="password"
          />

          <br />

          <input type="submit" value="Sign Up" />
        </form>

        {this.state.fireRedirect ? <Redirect to="/" /> : ''}
      </div>
    );
  }
}
//=====================================================================================================================================
