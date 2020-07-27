import React, { Component } from "react";
import PropTypes from "prop-types";

class Profile extends Component {
  state = {
    profile: null,
    error: "",
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.props.auth.getProfile((profile, error) => {
      this.setState({ profile, error });
    });
  }

  render() {
    return (
      <>
        <h1>Profile</h1>
        {this.props.auth && this.props.auth.isAuthenticated() ? (
          <div>
            <p>Welcome, {this.state.profile.nickname}</p>
            <button onClick={this.props.auth.logout}>Wyloguj się</button>
          </div>
        ) : (
          <button onClick={this.props.auth.login}> Zaloguj się </button>
        )}
      </>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Profile;
