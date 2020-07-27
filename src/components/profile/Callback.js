import React, { Component } from "react";
import PropTypes from "prop-types";

class Callback extends Component {
  componentDidMount() {
    console.log(this.props);
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback");
    }
  }

  render() {
    return <div>Loading...</div>;
  }
}

Callback.propTypes = {
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default Callback;
