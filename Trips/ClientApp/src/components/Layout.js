import React, { Component } from 'react';
import NavMenu from "../components/NavMenu"
export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu/>
        <div tag="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
