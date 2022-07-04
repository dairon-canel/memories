import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut, signIn } from "../../actions/auth";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "385834473966-cqb8ilmjfvstt4ebfapag73vkd47gvkh.apps.googleusercontent.com", // "Google Cloud -> New Project -> Credentials -> Web client -> ClientId",
          scope: "email",
        })
        .then(() => {
          // Creating an OAuth instance
          this.auth = window.gapi.auth2.getAuthInstance();
          // Getting the current value -> true || false
          this.onAuthChange(this.auth.isSignedIn.get());
          // Listining for changes to reflect the state in real-tme
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    const { signIn, signOut } = this.props;
    isSignedIn ? signOut() : signIn(this.auth.currentUser.get().getId());
  };

  onSignInClick = () => {
    this.auth.signIn();
    this.props.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
    this.props.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;
    if (isSignedIn === null) {
      // Currently we don't know if the user is logged in
      return null;
    } else if (isSignedIn) {
      // If this ends up being true, user is logged in
      return (
        <button onClick={this.onSignOutClick} className="ui grey google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      // User is NOT loggged in
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth: { isSignedIn } }) => {
  return { isSignedIn };
};

export default connect(mapStateToProps, { signOut, signIn })(GoogleAuth);
