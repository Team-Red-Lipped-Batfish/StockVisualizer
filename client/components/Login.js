import React, { Component } from 'react';


export default class Login extends React.Component {
  render() {
    return (
      <div className="GoogleLogin">
        <a href="https://accounts.google.com/ServiceLogin/signinchooser?elo=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
          <img src="https://user-images.githubusercontent.com/1531669/41761606-83b5bd42-762a-11e8-811a-b78fdf68bc04.png" />
        </a>
      </div>

    );
  }
}
